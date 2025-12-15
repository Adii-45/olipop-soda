import Link from 'next/link';
import { Icons } from '@/components/icons';
import { socialLinks } from '@/app/data';
import { Separator } from '../ui/separator';

export default function Footer() {
  return (
    <footer className="bg-black text-primary-foreground border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <Icons.Olipop className="h-10 w-10 text-primary" />
              <span className="font-bold text-xl text-primary">OLIPOP</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">A new kind of soda.</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="#product" className="text-sm text-muted-foreground hover:text-primary">Product</Link></li>
              <li><Link href="#ingredients" className="text-sm text-muted-foreground hover:text-primary">Ingredients</Link></li>
              <li><Link href="#reviews" className="text-sm text-muted-foreground hover:text-primary">Reviews</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start items-center gap-4">
              {socialLinks.map(link => {
                const Icon = Icons[link.icon];
                return (
                  <Link key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Icon className="w-6 h-6" />
                    <span className="sr-only">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-border" />
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Olipop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
