import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake, FolderKanban, BellRing } from "lucide-react";

const features = [
  {
    icon: HeartHandshake,
    title: "Connect Volunteers",
    description: "Bring volunteers, project managers, and donors together in one place.",
  },
  {
    icon: FolderKanban,
    title: "Manage Projects",
    description: "Track tasks, progress, and reports with a clean and simple workflow.",
  },
  {
    icon: BellRing,
    title: "Stay Updated",
    description: "Receive notifications and stay informed about important activities.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />

        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
                <HeartHandshake className="h-4 w-4" />
                Community impact made simple
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                Bridging
                <span className="text-primary"> volunteers</span>,
                projects, and
                <span className="text-primary"> donors</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-8 mb-8">
                Volunteer Bridge helps communities organize projects, assign tasks,
                track progress, and support meaningful initiatives through transparent collaboration.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground font-medium shadow-lg transition hover:opacity-90"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3 font-medium transition hover:bg-secondary"
                >
                  Sign In
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-primary">Tasks</p>
                  <p className="text-sm text-muted-foreground">Assign and update work easily</p>
                </div>
                <div className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-primary">Reports</p>
                  <p className="text-sm text-muted-foreground">Track project outcomes clearly</p>
                </div>
                <div className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-primary">Donations</p>
                  <p className="text-sm text-muted-foreground">Support impact transparently</p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-3xl" />
              <div className="relative rounded-[2rem] border border-border bg-card/80 p-4 shadow-2xl backdrop-blur">
                <img
                  src="/placeholder.png"
                  alt="Volunteer Bridge"
                  className="w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Index;