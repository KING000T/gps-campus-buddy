import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X } from "lucide-react";

interface HeaderProps {
  onChatToggle: () => void;
  isChatOpen: boolean;
}

const Header = ({ onChatToggle, isChatOpen }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-primary-dark to-primary text-primary-foreground shadow-2xl relative z-50 backdrop-blur-md border-b border-primary-light/20">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 group">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-foreground/30 to-primary-foreground/10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 border border-primary-foreground/20">
              <span className="text-2xl font-bold bg-gradient-to-br from-primary-foreground to-primary-foreground/80 bg-clip-text">GP</span>
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-xl font-bold tracking-wide">Govt. Polytechnic Sundernagar</h1>
              <p className="text-primary-foreground/90 text-sm font-medium">Smart Campus Helper</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="relative px-3 py-2 rounded-lg hover:bg-primary-foreground/10 transition-all duration-300 group">
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-primary-foreground/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>
            <a href="#map" className="relative px-3 py-2 rounded-lg hover:bg-primary-foreground/10 transition-all duration-300 group">
              <span className="relative z-10">Campus Map</span>
              <div className="absolute inset-0 bg-primary-foreground/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>
            <a href="#news" className="relative px-3 py-2 rounded-lg hover:bg-primary-foreground/10 transition-all duration-300 group">
              <span className="relative z-10">News & Events</span>
              <div className="absolute inset-0 bg-primary-foreground/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>
            <a href="#admin" className="relative px-3 py-2 rounded-lg hover:bg-primary-foreground/10 transition-all duration-300 group">
              <span className="relative z-10">Admin</span>
              <div className="absolute inset-0 bg-primary-foreground/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={onChatToggle}
              className="hidden md:flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className={`w-4 h-4 ${isChatOpen ? 'animate-pulse' : ''}`} />
              {isChatOpen ? "Close Chat" : "Ask Helper"}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-primary-foreground/20">
            <div className="flex flex-col space-y-3">
              <a href="#home" className="hover:text-primary-foreground/80 transition-colors">
                Home
              </a>
              <a href="#map" className="hover:text-primary-foreground/80 transition-colors">
                Campus Map
              </a>
              <a href="#news" className="hover:text-primary-foreground/80 transition-colors">
                News & Events
              </a>
              <a href="#admin" className="hover:text-primary-foreground/80 transition-colors">
                Admin
              </a>
              <Button
                variant="secondary"
                size="sm"
                onClick={onChatToggle}
                className="flex items-center gap-2 self-start mt-2"
              >
                <MessageCircle className="w-4 h-4" />
                {isChatOpen ? "Close Chat" : "Ask Helper"}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;