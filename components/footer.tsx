import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background border-border">
      <div className="container mx-32 px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center md:justify-items-start">

          <div className="space-y-4 space-x-2 text-center md:text-left">
            <h3 className="text-lg font-semibold">Portfolio</h3>
            <p className="text-sm text-foreground/60">© 2025 Mateus R Campos | All rights reserved.</p>
          </div>

          <div className="space-y-4 space-x-2 text-center md:text-left">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link className="text-sm text-foreground/60 hover:text-foreground" href="/about">About</Link>
              <Link className="text-sm text-foreground/60 hover:text-foreground" href="/contact">Contact</Link>
              <Link className="text-sm text-foreground/60 hover:text-foreground" href="/projects">Projects</Link>
            </div>
          </div>

          <div className="space-y-4 space-x-2 text-center md:text-left">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link
                href="https://github.com/mateusribeirocampos"
                target="_blank"
                className="text-muted-foreground hover:text-foreground"
                aria-label="GitHub Profile"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/mateus-ribeiro-de-campos-6a135331/"
                target="_blank"
                className="text-muted-foreground hover:text-foreground"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:mateus@example.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}