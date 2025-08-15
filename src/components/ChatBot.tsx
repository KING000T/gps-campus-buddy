import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQ_RESPONSES: Record<string, string> = {
  "class timings": "Classes run from 9:00 AM to 4:00 PM, Monday to Friday. Lab sessions may extend until 5:00 PM.",
  "exam schedule": "End semester exams are scheduled for December 2024. Mid-semester exams will be in October 2024.",
  "admissions": "Admissions for 2024-25 are closed. Next admissions will open in June 2025. Check our website for updates.",
  "campus facilities": "Our campus has modern labs, library, canteen, hostel, sports ground, and computer center with high-speed internet.",
  "library hours": "Library is open from 8:00 AM to 8:00 PM on weekdays and 9:00 AM to 5:00 PM on weekends.",
  "hostel": "Hostel accommodation is available for both boys and girls. Contact the hostel warden for room allotment.",
  "canteen": "Canteen serves breakfast (8-10 AM), lunch (12-2 PM), and snacks (4-6 PM) at subsidized rates.",
  "placement": "Our placement cell helps students with internships and job opportunities. Many top companies visit our campus.",
  "fees": "Semester fees vary by course. Contact the accounts section for detailed fee structure.",
  "courses": "We offer diploma courses in Computer Engineering, Mechanical Engineering, Civil Engineering, and Electronics.",
  "contact": "Contact: +91-1905-123456 | Email: info@gptsundernagar.edu.in | Address: Sundernagar, Mandi, HP",
  "what's new": "Check our News & Events section for the latest updates and upcoming activities."
};

const QUICK_QUESTIONS = [
  "Class timings",
  "Exam schedule", 
  "Campus facilities",
  "Library hours",
  "What's new"
];

const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Smart Campus Helper. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
      if (lowerInput.includes(key.toLowerCase())) {
        return response;
      }
    }
    
    return "I'm sorry, I don't have information about that. Please try asking about class timings, exam schedule, campus facilities, admissions, library hours, hostel, canteen, placement, fees, courses, or contact information.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 md:items-end md:justify-end md:p-6">
      <Card className="w-full max-w-md h-[600px] md:h-[500px] flex flex-col shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground rounded-t-lg flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <CardTitle className="text-lg">Campus Helper</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-primary-foreground hover:bg-primary-foreground/20">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 max-w-[80%]",
                    message.isBot ? "justify-start" : "justify-end ml-auto"
                  )}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 text-sm",
                      message.isBot
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    {message.text}
                  </div>
                  {!message.isBot && (
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-secondary" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-2 text-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          <div className="p-4 border-t bg-muted/30">
            <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm" className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;