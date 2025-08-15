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
    <section id="map" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Interactive Campus Map
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our campus facilities. Click on any marker to learn more about that location.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Campus Layout
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-br from-green-100 to-green-200 aspect-[4/3] overflow-hidden">
                {/* Campus Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100">
                  {/* Roads */}
                  <div className="absolute top-1/2 left-0 w-full h-3 bg-gray-300 transform -translate-y-1/2"></div>
                  <div className="absolute top-0 left-1/2 w-3 h-full bg-gray-300 transform -translate-x-1/2"></div>
                  
                  {/* Green areas */}
                  <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-60"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-20 bg-green-200 rounded-lg opacity-60"></div>
                  <div className="absolute top-20 right-20 w-16 h-16 bg-green-200 rounded-full opacity-60"></div>
                </div>

                {/* Facility Markers */}
                {facilities.map((facility) => (
                  <div
                    key={facility.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 z-10`}
                    style={{ left: `${facility.x}%`, top: `${facility.y}%` }}
                    onClick={() => setSelectedFacility(facility)}
                  >
                    <div className={`w-4 h-4 ${getMarkerColor(facility.type)} rounded-full border-2 border-white shadow-lg`}></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium text-center whitespace-nowrap bg-white px-2 py-1 rounded shadow-md">
                      {facility.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="p-4 bg-background border-t">
                <h4 className="font-semibold mb-3 text-sm">Legend:</h4>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Academic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span>Laboratory</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span>Facility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span>Hostel</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Facility Details Modal */}
        {selectedFacility && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-3 h-3 ${getMarkerColor(selectedFacility.type)} rounded-full`}></div>
                    {selectedFacility.name}
                  </CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {getTypeLabel(selectedFacility.type)}
                  </Badge>
                </div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{selectedFacility.description}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default CampusMap;