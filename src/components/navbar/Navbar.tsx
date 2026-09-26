import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import Logo from "../shared/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-2 min-w-0">
          <MobileMenu />
          <div className="truncate">
            <Logo />
          </div>
        </div>

        <div className="hidden md:block">
          <NavLinks />
        </div>

        <div className="flex items-center shrink-0">
          <UserMenu />
        </div>

      </div>
    </header>
  );
}