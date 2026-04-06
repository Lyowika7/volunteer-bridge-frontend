import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { donationsAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Heart, Banknote, CreditCard, Globe } from "lucide-react";
import { toast } from "sonner";

const DonationsPage = () => {
  const [form, setForm] = useState({
    amount: "",
    method: "card" as "card" | "bank_transfer" | "cash",
    reportId: "",
    donorRegion: "nigeria",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.amount || Number(form.amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    if (!form.reportId.trim()) {
      toast.error("Report ID is required");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await donationsAPI.create({
        report_id: form.reportId,
        amount: Number(form.amount),
        paymentMethod: form.method,
      });

      setResult(res.data);

      toast.success("Donation submitted successfully!");

      setForm({
        amount: "",
        method: "card",
        reportId: "",
        donorRegion: "nigeria",
      });
    } catch (err: any) {
      console.error("Donation failed:", err);
      toast.error(
        err?.response?.data?.message || "Donation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Make a Donation
          </h1>
          <p className="text-muted-foreground mt-2">
            Support community projects using Nigerian or international payment methods.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              type="number"
              min="1"
              placeholder="5000"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="h-11 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label>Donor Region</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "nigeria", label: "Nigeria" },
                { value: "international", label: "International" },
              ].map((region) => (
                <button
                  key={region.value}
                  type="button"
                  onClick={() => setForm({ ...form, donorRegion: region.value })}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                    form.donorRegion === region.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80"
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  {region.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Payment Method</Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "card", label: "Card", icon: CreditCard },
                { value: "bank_transfer", label: "Bank Transfer", icon: Banknote },
                { value: "cash", label: "Cash", icon: Banknote },
              ].map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      method: m.value as "card" | "bank_transfer" | "cash",
                    })
                  }
                  className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                    form.method === m.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80"
                  }`}
                >
                  <m.icon className="h-4 w-4" />
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Report ID</Label>
            <Input
              placeholder="Enter report ID"
              value={form.reportId}
              onChange={(e) => setForm({ ...form, reportId: e.target.value })}
              className="h-11"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl shadow-glow"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Donate Now"
            )}
          </Button>
        </form>

        {result && (
          <div className="glass-card p-6 mt-6 text-center">
            <h3 className="font-display font-semibold text-foreground mb-2">
              Thank You! 🎉
            </h3>
            <p className="text-sm text-muted-foreground">
              {result.message ||
                result.paymentInstruction ||
                "Your donation has been recorded."}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DonationsPage;