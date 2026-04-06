import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { profileAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, User } from "lucide-react";
import { toast } from "sonner";
import Loader from "@/components/Loader";

const ProfilePage = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ skills: "", availability: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    profileAPI.get(user.id)
      .then((res) => {
        const p = res.data?.volunteer || res.data;
        if (p) {
          setForm({ skills: p.skills || "", availability: p.availability || "", bio: p.bio || "" });
          setHasProfile(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (hasProfile) {
        await profileAPI.update(user!.id, form);
      } else {
        await profileAPI.create({ ...form, userId: user!.id });
        setHasProfile(true);
      }
      toast.success("Profile saved!");
    } catch {
      toast.error("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <MainLayout><Loader /></MainLayout>;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="rounded-full bg-primary/10 p-4">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">{user?.name}</h1>
            <p className="text-sm text-muted-foreground">{user?.email} · <span className="capitalize">{user?.role}</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
          <div className="space-y-2">
            <Label>Skills</Label>
            <Input placeholder="e.g., Teaching, Gardening, Web Development" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="h-11" />
          </div>
          <div className="space-y-2">
            <Label>Availability</Label>
            <Input placeholder="e.g., Weekends, 10hrs/week" value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} className="h-11" />
          </div>
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea rows={4} placeholder="Tell us about yourself..." value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </div>
          <Button type="submit" className="w-full h-11 rounded-xl" disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : hasProfile ? "Update Profile" : "Create Profile"}
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
