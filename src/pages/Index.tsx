import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CampusMap from "@/components/CampusMap";
import NewsEvents from "@/components/NewsEvents";
import AdminPanel from "@/components/AdminPanel";
import ChatBot from "@/components/ChatBot";
import FloatingChatButton from "@/components/FloatingChatButton";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingButton(true);
    }, 3000); // Show floating button after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onChatToggle={handleChatToggle} isChatOpen={isChatOpen} />
      <main>
        <HeroSection onChatOpen={handleChatOpen} />
        <CampusMap />
        <NewsEvents />
        <AdminPanel />
      </main>
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <FloatingChatButton 
        onClick={handleChatOpen} 
        isVisible={showFloatingButton && !isChatOpen} 
      />
    </div>
  );
};

export default Index;
