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
    <header className="bg-gradient-to-r from-primary-dark to-primary text-primary-foreground shadow-lg relative z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold">GP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Govt. Polytechnic Sundernagar</h1>
              <p className="text-primary-foreground/80 text-sm">Smart Campus Helper</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
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
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={onChatToggle}
              className="hidden md:flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
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