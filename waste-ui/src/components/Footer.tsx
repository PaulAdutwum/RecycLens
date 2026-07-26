import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-text-primary">RecycLens</p>
          <p className="text-xs text-text-secondary">Scan. Classify. Recycle right.</p>
        </div>

        <a
          href="https://github.com/PaulAdutwum/RecycLens"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
      </div>

      <p className="mt-8 text-center text-xs text-text-secondary">
        © {new Date().getFullYear()} RecycLens. All rights reserved.
      </p>
    </footer>
  );
}
