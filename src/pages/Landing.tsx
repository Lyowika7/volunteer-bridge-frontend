import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  FolderOpen,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Globe,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import MainLayout from "@/layouts/MainLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

const features = [
  {
    icon: FolderOpen,
    title: "Project Management",
    desc: "Create, track, and manage volunteer projects from start to finish.",
  },
  {
    icon: Users,
    title: "Volunteer Matching",
    desc: "Connect the right volunteers to the right projects based on skills.",
  },
  {
    icon: TrendingUp,
    title: "Impact Reports",
    desc: "Track and measure the real impact of every volunteer effort.",
  },
  {
    icon: Shield,
    title: "Secure Donations",
    desc: "Accept donations securely to fund community projects.",
  },
  {
    icon: Globe,
    title: "Community Driven",
    desc: "Build a network of passionate people making a difference.",
  },
  {
    icon: Sparkles,
    title: "Smart Dashboard",
    desc: "Get real-time insights into your volunteer activities.",
  },
];

const stats = [
  { value: "10K+", label: "Volunteers" },
  { value: "500+", label: "Projects" },
  { value: "50K+", label: "Hours Donated" },
  { value: "200+", label: "Communities" },
];

const LandingPage = () => (
  <MainLayout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />

      {/* Overlay (adjust this if needed) */}
      <div className="absolute inset-0 bg-white/50" />

      {/* Glow Effects */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="container mx-auto px-4 py-24 md:py-36 relative">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Heart className="h-4 w-4 fill-primary" />
            Making Volunteering Effortless
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-foreground leading-tight text-balance"
          >
            Bridge the Gap Between{" "}
            <span className="gradient-text">Passion</span> &{" "}
            <span className="gradient-text">Purpose</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto text-balance"
          >
            Volunteer Bridge connects volunteers with meaningful projects,
            empowering communities to create lasting change together.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link to="/register">
              <Button
                size="lg"
                className="text-base px-8 h-12 rounded-xl shadow-glow"
              >
                Start Volunteering{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link to="/projects">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 h-12 rounded-xl"
              >
                Explore Projects
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 border-y border-border bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-display font-extrabold gradient-text">
                {s.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Everything You Need to Make an Impact
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            A complete platform to organize, track, and grow your volunteer efforts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card p-8 transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="rounded-xl bg-primary/10 p-3 w-fit mb-4">
                <f.icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="font-display font-bold text-lg text-foreground">
                {f.title}
              </h3>

              <p className="text-sm text-muted-foreground mt-2">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-5" />

      <div className="container mx-auto px-4 relative">
        <div className="glass-card p-12 md:p-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Ready to Make a Difference?
          </h2>

          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Join thousands of volunteers building stronger communities through meaningful action.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link to="/register">
              <Button size="lg" className="px-8 h-12 rounded-xl shadow-glow">
                Join Volunteer Bridge
              </Button>
            </Link>

            <Link to="/donations">
              <Button variant="outline" size="lg" className="px-8 h-12 rounded-xl">
                <Heart className="mr-2 h-4 w-4" />
                Make a Donation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
);

export default LandingPage;