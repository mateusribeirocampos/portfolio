import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background ">
      <div className="container flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left ml-96">© 2025 Mateus R Campos | All rights reserved.
        </p>
        <div className="flex gap-4 mr-96">
          <Link href="https://github.com/mateusribeirocampos" className="text-muted-foreground hover:text-foreground">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="https://www.linkedin.com/in/mateus-ribeiro-de-campos-6a135331/" className="text-muted-foreground hover:text-foreground">
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href="mailto:mateus@example.com" className="text-muted-foreground hover:text-foreground">
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}