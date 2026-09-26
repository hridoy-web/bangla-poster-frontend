import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 sm:px-6 lg:px-8">
        
      <div className="max-w-md w-full bg-card border border-border/60 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-sm text-center space-y-6">
        
        {/* Icon */}
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl mx-auto flex items-center justify-center shadow-inner">
          <FileQuestion className="w-10 h-10 animate-bounce" />
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h1 className="text-6xl font-black tracking-tight text-primary">404</h1>
          <h2 className="text-xl font-bold">Page Not Found</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Oops! The page you are looking for might have been removed or is temporarily unavailable.
          </p>
        </div>

        {/* Home Button */}
        <div className="pt-2">
          <Button
            asChild
            className="w-full bg-gradient-btn rounded-full h-11 font-bold text-xs cursor-pointer border-0 text-white gap-2 shadow-lg hover:opacity-95 transition-opacity"
          >
            <Link href="/">
              <Home className="w-4 h-4" /> Go Back to Home
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}