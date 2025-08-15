import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CampusMap from "@/components/CampusMap";
import NewsEvents from "@/components/NewsEvents";
import AdminPanel from "@/components/AdminPanel";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

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
    </div>
  );
};

export default Index;
