import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  type: "news" | "event";
  priority: "high" | "medium" | "low";
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Annual Tech Fest 2024",
    description: "Join us for the biggest technical festival featuring coding competitions, robotics exhibitions, and guest lectures from industry experts.",
    date: "2024-12-15",
    time: "9:00 AM",
    location: "Main Auditorium",
    type: "event",
    priority: "high"
  },
  {
    id: "2",
    title: "Winter Break Notice",
    description: "Classes will remain suspended from December 25, 2024 to January 5, 2025 for winter holidays.",
    date: "2024-12-25",
    type: "news",
    priority: "high"
  },
  {
    id: "3",
    title: "Industrial Visit - Maruti Suzuki",
    description: "Mechanical Engineering students will visit Maruti Suzuki plant in Gurgaon for practical exposure.",
    date: "2024-12-10",
    time: "6:00 AM",
    location: "Campus Bus Stop",
    type: "event",
    priority: "medium"
  },
  {
    id: "4",
    title: "New Library Books Arrival",
    description: "Latest editions of engineering textbooks and technical journals have been added to the library collection.",
    date: "2024-11-28",
    type: "news",
    priority: "low"
  },
  {
    id: "5",
    title: "Campus Placement Drive",
    description: "Leading IT companies will be visiting campus for final year student placements. Register at placement cell.",
    date: "2024-12-20",
    time: "10:00 AM",
    location: "Seminar Hall",
    type: "event",
    priority: "high"
  },
  {
    id: "6",
    title: "Sports Week 2024",
    description: "Inter-department sports competitions including cricket, football, badminton, and table tennis tournaments.",
    date: "2024-12-08",
    time: "2:00 PM",
    location: "Sports Ground",
    type: "event",
    priority: "medium"
  }
];

const NewsEvents = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive";
      case "medium": return "bg-accent";
      case "low": return "bg-secondary";
      default: return "bg-muted";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "event" ? Calendar : Clock;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const sortedNews = newsItems.sort((a, b) => {
    // Sort by date (newest first), then by priority
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateB.getTime() - dateA.getTime();
    }
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <section id="news" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            News & Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest happenings, announcements, and upcoming events at our campus.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {sortedNews.map((item) => {
              const TypeIcon = getTypeIcon(item.type);
              const isUpcoming = new Date(item.date) >= new Date();
              
              return (
                <Card key={item.id} className={`hover:shadow-lg transition-all duration-300 ${isUpcoming ? 'border-l-4 border-l-primary' : 'opacity-75'}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 ${getPriorityColor(item.priority)}/20 rounded-lg flex items-center justify-center`}>
                            <TypeIcon className={`w-4 h-4 ${getPriorityColor(item.priority).replace('bg-', 'text-')}`} />
                          </div>
                          <Badge variant={item.type === "event" ? "default" : "secondary"}>
                            {item.type.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={`${getPriorityColor(item.priority)} text-white`}>
                            {item.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(item.date)}
                          </div>
                          {item.time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {item.time}
                            </div>
                          )}
                          {item.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {item.location}
                            </div>
                          )}
                        </div>
                      </div>
                      {isUpcoming && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          Upcoming
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;