import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, MapPin, Calendar, Settings } from "lucide-react";

interface HeroSectionProps {
  onChatOpen: () => void;
}

const HeroSection = ({ onChatOpen }: HeroSectionProps) => {
  const features = [
    {
      icon: MessageCircle,
      title: "Smart Assistant",
      description: "Get instant answers to your campus-related questions"
    },
    {
      icon: MapPin,
      title: "Campus Map",
      description: "Navigate easily with our interactive campus map"
    },
    {
      icon: Calendar,
      title: "Events & News",
      description: "Stay updated with latest campus events and announcements"
    },
    {
      icon: Settings,
      title: "Admin Panel",
      description: "Manage content and keep information up-to-date"
    }
  ];

  return (
    <section id="home" className="min-h-[80vh] bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Smart Campus
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
                Helper
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your intelligent assistant for Govt. Polytechnic Sundernagar. Get instant answers, 
              navigate the campus, and stay connected with the latest updates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onChatOpen}
                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Chatting
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-8 py-6 h-auto border-2 hover:bg-primary/5"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Explore Campus
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;