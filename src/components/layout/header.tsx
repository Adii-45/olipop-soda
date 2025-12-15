'use client';

import Link from 'next/link';
import { Icons } from '@/components/icons';
import { navLinks } from '@/app/data';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
      let currentSection = '';
      for (const section of sections) {
        if (section && window.scrollY >= section.offsetTop - 100) {
          currentSection = section.id;
        }
      }
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-colors duration-300",
      scrolled ? 'bg-background/80 backdrop-blur-sm border-b border-border' : 'bg-transparent'
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Icons.Olipop className="h-8 w-8 text-primary" />
          <span className="font-bold text-lg text-primary">OLIPOP</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={cn(
                "font-medium text-muted-foreground transition-colors hover:text-primary",
                activeSection === link.href.substring(1) && "text-primary border-b-2 border-[hsl(var(--brand-accent))]"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background w-full">
              <nav className="flex flex-col items-center justify-center h-full gap-8 text-lg">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "font-medium text-muted-foreground transition-colors hover:text-primary",
                      activeSection === link.href.substring(1) && "text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
