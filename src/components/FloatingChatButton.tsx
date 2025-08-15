import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingChatButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

const FloatingChatButton = ({ onClick, isVisible }: FloatingChatButtonProps) => {
  if (!isVisible) return null;

  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary shadow-2xl hover:shadow-primary/30 transition-all duration-500 z-40 animate-float group"
    >
      <MessageCircle className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute -top-2 -right-2 w-5 h-5 bg-accent rounded-full animate-pulse"></div>
    </Button>
  );
};

export default FloatingChatButton;