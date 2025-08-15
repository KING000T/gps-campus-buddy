import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, MapPin } from "lucide-react";

interface Facility {
  id: string;
  name: string;
  description: string;
  type: string;
  x: number; // percentage from left
  y: number; // percentage from top
}

const facilities: Facility[] = [
  {
    id: "1",
    name: "Main Building",
    description: "Administrative offices, principal's office, and main classrooms",
    type: "academic",
    x: 50,
    y: 30
  },
  {
    id: "2", 
    name: "Computer Lab",
    description: "State-of-the-art computer lab with 50 systems and high-speed internet",
    type: "lab",
    x: 30,
    y: 45
  },
  {
    id: "3",
    name: "Library",
    description: "Central library with 10,000+ books, journals, and digital resources",
    type: "facility",
    x: 70,
    y: 40
  },
  {
    id: "4",
    name: "Mechanical Workshop",
    description: "Fully equipped mechanical engineering workshop and lab",
    type: "lab",
    x: 25,
    y: 65
  },
  {
    id: "5",
    name: "Canteen",
    description: "Student canteen serving fresh meals and snacks at subsidized rates",
    type: "facility",
    x: 75,
    y: 70
  },
  {
    id: "6",
    name: "Boys Hostel",
    description: "Accommodation facility for male students with 200 rooms",
    type: "hostel",
    x: 15,
    y: 80
  },
  {
    id: "7",
    name: "Girls Hostel", 
    description: "Accommodation facility for female students with 150 rooms",
    type: "hostel",
    x: 85,
    y: 85
  },
  {
    id: "8",
    name: "Sports Ground",
    description: "Multi-purpose sports ground for cricket, football, and athletics",
    type: "facility",
    x: 50,
    y: 85
  }
];

const CampusMap = () => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "academic": return "bg-primary";
      case "lab": return "bg-secondary";
      case "facility": return "bg-accent";
      case "hostel": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "academic": return "Academic";
      case "lab": return "Laboratory";
      case "facility": return "Facility";
      case "hostel": return "Hostel";
      default: return type;
    }
  };

  return (
    <section id="map" className="py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '-1s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium border border-secondary/20">
            🗺️ Navigation Made Easy
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Interactive Campus
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent block">
              Map
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our state-of-the-art campus facilities. Click on any marker to discover detailed information about that location.
          </p>
        </div>

        <div className="max-w-5xl mx-auto animate-slide-up">
          <Card className="overflow-hidden shadow-2xl border border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-accent/10 border-b border-primary/10">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                Campus Layout
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-br from-green-100 to-green-200 aspect-[4/3] overflow-hidden">
                {/* Campus Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100">
                  {/* Roads */}
                  <div className="absolute top-1/2 left-0 w-full h-4 bg-gray-400 transform -translate-y-1/2 shadow-inner"></div>
                  <div className="absolute top-0 left-1/2 w-4 h-full bg-gray-400 transform -translate-x-1/2 shadow-inner"></div>
                  
                  {/* Green areas with better design */}
                  <div className="absolute top-10 left-10 w-24 h-24 bg-green-300 rounded-full opacity-70 shadow-lg"></div>
                  <div className="absolute bottom-10 right-10 w-36 h-24 bg-green-300 rounded-2xl opacity-70 shadow-lg"></div>
                  <div className="absolute top-20 right-20 w-20 h-20 bg-green-300 rounded-full opacity-70 shadow-lg"></div>
                  
                  {/* Water feature */}
                  <div className="absolute top-1/3 left-1/4 w-16 h-12 bg-blue-200 rounded-lg opacity-80 shadow-inner"></div>
                </div>

                {/* Facility Markers */}
                {facilities.map((facility, index) => (
                  <div
                    key={facility.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 z-10 group animate-fade-in`}
                    style={{ 
                      left: `${facility.x}%`, 
                      top: `${facility.y}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                    onClick={() => setSelectedFacility(facility)}
                  >
                    <div className={`w-5 h-5 ${getMarkerColor(facility.type)} rounded-full border-3 border-white shadow-xl group-hover:animate-pulse relative`}>
                      <div className={`absolute inset-0 ${getMarkerColor(facility.type)} rounded-full animate-ping opacity-75 group-hover:opacity-100`}></div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-bold text-center whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {facility.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="p-6 bg-gradient-to-r from-background/80 to-primary/5 border-t border-primary/10 backdrop-blur-sm">
                <h4 className="font-bold mb-4 text-lg text-foreground">Legend:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white/50 border border-primary/10 hover:bg-primary/5 transition-colors duration-300">
                    <div className="w-4 h-4 bg-primary rounded-full shadow-md border-2 border-white"></div>
                    <span className="font-medium">Academic</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white/50 border border-secondary/10 hover:bg-secondary/5 transition-colors duration-300">
                    <div className="w-4 h-4 bg-secondary rounded-full shadow-md border-2 border-white"></div>
                    <span className="font-medium">Laboratory</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white/50 border border-accent/10 hover:bg-accent/5 transition-colors duration-300">
                    <div className="w-4 h-4 bg-accent rounded-full shadow-md border-2 border-white"></div>
                    <span className="font-medium">Facility</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white/50 border border-destructive/10 hover:bg-destructive/5 transition-colors duration-300">
                    <div className="w-4 h-4 bg-destructive rounded-full shadow-md border-2 border-white"></div>
                    <span className="font-medium">Hostel</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Facility Details Modal */}
        {selectedFacility && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <Card className="max-w-lg w-full shadow-2xl border border-primary/20 bg-card/95 backdrop-blur-xl animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-3 text-xl mb-2">
                      <div className={`w-5 h-5 ${getMarkerColor(selectedFacility.type)} rounded-full shadow-md border-2 border-white animate-pulse`}></div>
                      {selectedFacility.name}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20">
                      {getTypeLabel(selectedFacility.type)}
                    </Badge>
                  </div>
                  <button
                    onClick={() => setSelectedFacility(null)}
                    className="text-muted-foreground hover:text-destructive transition-colors duration-300 p-2 rounded-lg hover:bg-destructive/10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed text-lg">{selectedFacility.description}</p>
                <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-xs text-muted-foreground">💡 <strong>Tip:</strong> Click on other markers to explore more campus facilities!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default CampusMap;