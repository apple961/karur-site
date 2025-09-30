import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

export function Events() {
  const upcomingEvents = [
    {
      title: "Spring Cleanup Day",
      date: "April 15, 2024",
      time: "8:00 AM - 2:00 PM",
      location: "City Park",
      description: "Join your neighbors for our annual community cleanup. Coffee and donuts provided!",
      category: "Community",
      attendees: "200+ expected"
    },
    {
      title: "Farmers Market Opening",
      date: "April 22, 2024", 
      time: "8:00 AM - 2:00 PM",
      location: "Main Street",
      description: "The season kicks off with special activities, live music, and fresh spring produce.",
      category: "Market",
      attendees: "500+ expected"
    },
    {
      title: "Memorial Day Parade",
      date: "May 27, 2024",
      time: "10:00 AM - 12:00 PM", 
      location: "Downtown",
      description: "Honor our veterans with our traditional parade followed by a ceremony at Veterans Memorial.",
      category: "Holiday",
      attendees: "1,000+ expected"
    }
  ];

  const annualEvents = [
    {
      name: "Harvest Festival",
      month: "October",
      description: "Our signature fall celebration with live music, food vendors, crafts, and family activities.",
      highlight: true
    },
    {
      name: "Christmas Tree Lighting",
      month: "December", 
      description: "Community gathering to light the town Christmas tree with caroling and hot cocoa."
    },
    {
      name: "Independence Day Celebration",
      month: "July",
      description: "Patriotic parade, BBQ competition, and spectacular fireworks display at the park."
    },
    {
      name: "Spring Arts Festival",
      month: "May",
      description: "Local artists showcase their work in downtown galleries and outdoor displays."
    },
    {
      name: "Summer Concert Series",
      month: "June-August",
      description: "Free outdoor concerts every Friday evening in the park bandstand."
    },
    {
      name: "Winter Ice Festival",
      month: "February",
      description: "Ice sculptures, winter sports demonstrations, and warm treats downtown."
    }
  ];

  return (
    <section id="events" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Events & Community</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Riverside comes alive with year-round events that bring our community together.
            From seasonal festivals to weekly gatherings, there's always something happening.
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h3 className="text-2xl mb-8 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Upcoming Events
          </h3>
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {event.title}
                        <Badge variant="secondary">{event.category}</Badge>
                      </CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      Add to Calendar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{event.attendees}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Annual Events */}
        <div>
          <h3 className="text-2xl mb-8">Annual Traditions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {annualEvents.map((event, index) => (
              <Card key={index} className={`hover:shadow-lg transition-shadow ${event.highlight ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {event.name}
                    <Badge variant={event.highlight ? "default" : "secondary"}>
                      {event.month}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Involvement */}
        <div className="mt-16">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Get Involved</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Riverside thrives because of community participation. Here's how you can be part of it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="mb-2">Volunteer</h4>
                  <p className="text-sm opacity-90">
                    Help with events, community projects, and local initiatives.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2">Join a Committee</h4>
                  <p className="text-sm opacity-90">
                    Parks & Recreation, Planning Commission, or Historical Society.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2">Attend Meetings</h4>
                  <p className="text-sm opacity-90">
                    City Council meets monthly. Your voice matters in local decisions.
                  </p>
                </div>
              </div>
              <div className="text-center mt-6">
                <Button variant="secondary" size="lg">
                  Contact City Hall to Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}