"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  
  // Don't render header on protected routes
  if (pathname?.startsWith("/protected")) {
    return null;
  }

  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Left side: Logo and Pricing */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <span className="font-bold text-xl">SampleApp</span>
          </Link>
          
          {/* Pricing Link */}
          <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors flex items-center pt-0.5">
            Pricing
          </Link>
        </div>
        
        {/* Right side: Navigation */}
        <nav className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
              <MessageSquare size={16} />
              <span className="hidden sm:inline">Join Discord</span>
            </a>
          </Button>
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github size={16} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
          {user == null ? (
            <Button size="sm" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          ) : (
            <Button size="sm" variant="outline" asChild>
              <Link href="/protected">Dashboard</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
