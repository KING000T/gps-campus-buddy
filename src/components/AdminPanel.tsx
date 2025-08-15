import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface NewsEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  type: "news" | "event";
  priority: "high" | "medium" | "low";
}

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("faqs");
  const { toast } = useToast();

  // Mock data - in real app this would come from database
  const [faqs, setFaqs] = useState<FAQ[]>([
    { id: "1", question: "What are the class timings?", answer: "Classes run from 9:00 AM to 4:00 PM, Monday to Friday.", category: "academic" },
    { id: "2", question: "How do I apply for hostel?", answer: "Contact the hostel warden for room allotment and application process.", category: "facilities" }
  ]);

  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([
    { id: "1", title: "Annual Tech Fest 2024", description: "Join us for the biggest technical festival.", date: "2024-12-15", type: "event", priority: "high" }
  ]);

  const [newFaq, setNewFaq] = useState({ question: "", answer: "", category: "academic" });
  const [newNewsEvent, setNewNewsEvent] = useState({
    title: "", description: "", date: "", time: "", location: "", type: "news" as "news" | "event", priority: "medium" as "high" | "medium" | "low"
  });

  const handleLogin = () => {
    // Mock authentication - in real app this would verify against database
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setIsLoggedIn(true);
      toast({ title: "Login successful", description: "Welcome to admin panel" });
    } else {
      toast({ title: "Login failed", description: "Invalid credentials", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: "", password: "" });
    toast({ title: "Logged out", description: "You have been logged out" });
  };

  const addFaq = () => {
    if (!newFaq.question || !newFaq.answer) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    
    const faq: FAQ = {
      id: Date.now().toString(),
      ...newFaq
    };
    setFaqs([...faqs, faq]);
    setNewFaq({ question: "", answer: "", category: "academic" });
    toast({ title: "FAQ added", description: "New FAQ has been added successfully" });
  };

  const addNewsEvent = () => {
    if (!newNewsEvent.title || !newNewsEvent.description || !newNewsEvent.date) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    const item: NewsEvent = {
      id: Date.now().toString(),
      ...newNewsEvent,
      time: newNewsEvent.time || undefined,
      location: newNewsEvent.location || undefined
    };
    setNewsEvents([...newsEvents, item]);
    setNewNewsEvent({ title: "", description: "", date: "", time: "", location: "", type: "news", priority: "medium" });
    toast({ title: "Item added", description: "News/Event has been added successfully" });
  };

  const deleteFaq = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
    toast({ title: "FAQ deleted", description: "FAQ has been removed" });
  };

  const deleteNewsEvent = (id: string) => {
    setNewsEvents(newsEvents.filter(item => item.id !== id));
    toast({ title: "Item deleted", description: "News/Event has been removed" });
  };

  if (!isLoggedIn) {
    return (
      <section id="admin" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Admin Login
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertDescription>
                    Demo credentials: username = "admin", password = "admin123"
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    placeholder="Enter username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    placeholder="Enter password"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
                <Button onClick={handleLogin} className="w-full">
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-foreground">Admin Panel</h2>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="faqs">Manage FAQs</TabsTrigger>
              <TabsTrigger value="news">Manage News & Events</TabsTrigger>
            </TabsList>

            <TabsContent value="faqs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New FAQ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Question *</Label>
                    <Input
                      value={newFaq.question}
                      onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                      placeholder="Enter the question"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Answer *</Label>
                    <Textarea
                      value={newFaq.answer}
                      onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                      placeholder="Enter the answer"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={newFaq.category} onValueChange={(value) => setNewFaq({...newFaq, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="facilities">Facilities</SelectItem>
                        <SelectItem value="admissions">Admissions</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={addFaq} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add FAQ
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Existing FAQs ({faqs.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <div key={faq.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{faq.question}</h4>
                              <Badge variant="outline">{faq.category}</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">{faq.answer}</p>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteFaq(faq.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add News/Event</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input
                        value={newNewsEvent.title}
                        onChange={(e) => setNewNewsEvent({...newNewsEvent, title: e.target.value})}
                        placeholder="Enter title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select value={newNewsEvent.type} onValueChange={(value: "news" | "event") => setNewNewsEvent({...newNewsEvent, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="news">News</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description *</Label>
                    <Textarea
                      value={newNewsEvent.description}
                      onChange={(e) => setNewNewsEvent({...newNewsEvent, description: e.target.value})}
                      placeholder="Enter description"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Date *</Label>
                      <Input
                        type="date"
                        value={newNewsEvent.date}
                        onChange={(e) => setNewNewsEvent({...newNewsEvent, date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={newNewsEvent.time}
                        onChange={(e) => setNewNewsEvent({...newNewsEvent, time: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select value={newNewsEvent.priority} onValueChange={(value: "high" | "medium" | "low") => setNewNewsEvent({...newNewsEvent, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={newNewsEvent.location}
                      onChange={(e) => setNewNewsEvent({...newNewsEvent, location: e.target.value})}
                      placeholder="Enter location (for events)"
                    />
                  </div>
                  <Button onClick={addNewsEvent} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add {newNewsEvent.type === "event" ? "Event" : "News"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Existing News & Events ({newsEvents.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {newsEvents.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{item.title}</h4>
                              <Badge variant={item.type === "event" ? "default" : "secondary"}>
                                {item.type.toUpperCase()}
                              </Badge>
                              <Badge variant="outline">{item.priority.toUpperCase()}</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                            <div className="text-xs text-muted-foreground">
                              Date: {item.date} {item.time && `| Time: ${item.time}`} {item.location && `| Location: ${item.location}`}
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteNewsEvent(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;