import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-secondary/30">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-foreground">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            Volunteer Bridge
          </Link>
          <p className="text-sm text-muted-foreground mt-3 max-w-sm">
            Connecting passionate volunteers with meaningful projects. Together, we build stronger communities.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Platform</h4>
          <div className="space-y-2">
            <Link to="/projects" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
            <Link to="/donations" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Donate</Link>
            <Link to="/register" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Join Us</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Company</h4>
          <div className="space-y-2">
            <span className="block text-sm text-muted-foreground">About</span>
            <span className="block text-sm text-muted-foreground">Contact</span>
            <span className="block text-sm text-muted-foreground">Privacy Policy</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Volunteer Bridge. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
