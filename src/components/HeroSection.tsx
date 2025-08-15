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
    <section id="home" className="min-h-[90vh] bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '-1s'}}></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '-2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-12 animate-fade-in">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
              🎓 Govt. Polytechnic Sundernagar
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Smart Campus
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent block animate-glow">
                Helper
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Your intelligent assistant for seamless campus experience. Get instant answers, 
              navigate effortlessly, and stay connected with the latest updates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
              <Button 
                size="lg" 
                onClick={onChatOpen}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary text-lg px-10 py-7 h-auto shadow-2xl hover:shadow-primary/30 transition-all duration-500 glow-on-hover relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <MessageCircle className="w-6 h-6 mr-3 relative z-10" />
                <span className="relative z-10">Start Chatting</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-10 py-7 h-auto border-2 border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300 backdrop-blur-sm"
              >
                <MapPin className="w-6 h-6 mr-3" />
                Explore Campus
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-primary/20 bg-card/50 backdrop-blur-sm relative overflow-hidden glow-on-hover"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="w-8 h-8 text-primary group-hover:animate-pulse" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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