import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Shield, 
  Flame, 
  Truck, 
  Zap, 
  Droplets, 
  Wifi, 
  Phone, 
  AlertTriangle,
  Clock,
  Star,
  MapPin,
  ChevronDown
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "./context/LanguageContext";

export function LocalServices() {
  const { t } = useLanguage();
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const emergencyServices = [
    {
      id: "police",
      name: "Karur Police Department",
      icon: Shield,
      phone: "100",
      nonEmergency: "+91 4324 220110",
      address: "Police Station Road, Karur, Tamil Nadu",
      hours: "24/7",
      description: "Emergency response and law enforcement services for Karur district.",
      services: ["Emergency Response", "Traffic Control", "Crime Prevention", "Public Safety"]
    },
    {
      id: "fire",
      name: "Karur Fire & Rescue Services", 
      icon: Flame,
      phone: "101",
      nonEmergency: "+91 4324 220120",
      address: "Fire Station Road, Karur",
      hours: "24/7",
      description: "Fire suppression and emergency rescue operations.",
      services: ["Fire Emergency", "Rescue Operations", "Disaster Response", "Safety Training"]
    },
    {
      id: "medical",
      name: "Emergency Medical Services",
      icon: AlertTriangle,
      phone: "108", 
      nonEmergency: "+91 4324 221100",
      address: "Government Hospital, Karur",
      hours: "24/7",
      description: "Emergency ambulance and medical response services.",
      services: ["Ambulance Service", "Emergency Care", "Patient Transport", "Medical Support"]
    },
    {
      id: "district",
      name: "District Emergency Control",
      icon: Phone,
      phone: "112",
      nonEmergency: "+91 4324 221000", 
      address: "District Control Room, Karur",
      hours: "24/7",
      description: "Centralized emergency coordination and response services.",
      services: ["Emergency Coordination", "Disaster Management", "Public Safety", "Crisis Response"]
    }
  ];

  const publicServices = [
    {
      id: "collectorate",
      name: "District Collectorate",
      icon: Zap,
      phone: "+91 4324 220100",
      address: "Collectorate Road, Karur",
      hours: "Mon-Fri 10 AM - 5 PM",
      description: "Main government administrative services for Karur district.",
      services: ["Revenue Services", "Civil Supplies", "Land Records", "Certificates"]
    },
    {
      id: "municipality",
      name: "Karur Municipality",
      icon: Truck,
      phone: "+91 4324 220200",
      address: "Municipal Office, Karur", 
      hours: "Mon-Fri 9 AM - 5 PM",
      description: "Municipal services including water, waste management, and city planning.",
      services: ["Water Supply", "Waste Collection", "Road Maintenance", "Building Permits"]
    },
    {
      id: "electricity",
      name: "TNEB Karur Division",
      icon: Droplets,
      phone: "+91 4324 220300",
      address: "Electricity Board Office, Karur",
      hours: "Mon-Fri 9 AM - 5 PM",
      description: "Electricity supply and maintenance services for Karur region.",
      services: ["Power Supply", "New Connections", "Bill Payments", "Fault Repairs"]
    },
    {
      id: "transport",
      name: "State Transport Corporation",
      icon: Wifi,
      phone: "+91 4324 220400",
      address: "Bus Stand, Karur",
      hours: "Daily 5 AM - 10 PM",
      description: "Public bus transportation services connecting Karur to other cities.",
      services: ["Inter-City Bus", "Local Transport", "Online Booking", "Parcel Service"]
    }
  ];

  const ServiceTile = ({ service, type }: { service: any; type: 'emergency' | 'public' }) => {
    const isExpanded = expandedService === service.id;
    
    return (
      <div className="relative">
        {/* Emergency Badge - Positioned absolutely */}
        {type === 'emergency' && (
          <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs px-2 py-1 z-10">
            Emergency
          </Badge>
        )}
        
        <motion.div
          animate={{ 
            scale: isExpanded ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Card 
            className={`cursor-pointer transition-all duration-300 border overflow-hidden ${
              isExpanded 
                ? type === 'emergency' 
                  ? 'shadow-lg border-red-200 bg-red-50/30' 
                  : 'shadow-lg border-blue-200 bg-blue-50/30'
                : 'hover:shadow-md'
            }`}
            onClick={() => setExpandedService(isExpanded ? null : service.id)}
          >
            <CardContent className="p-4">
              {/* Header Section - Always Visible */}
              <div className="flex items-start gap-3 mb-3">
                {/* Icon */}
                <div className={`p-2 rounded-lg flex-shrink-0 ${type === 'emergency' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                  <service.icon className="w-5 h-5" />
                </div>
                
                {/* Service Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm leading-tight">
                    {service.name}
                  </h4>
                </div>
                
                {/* Expand Arrow */}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              </div>

              {/* Expanded Content - Same Card */}
              <motion.div
                initial={false}
                animate={{ 
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                  marginTop: isExpanded ? 12 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="space-y-3 pt-3 border-t border-gray-200">
                  {/* Description */}
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Contact Information */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Phone className="w-3.5 h-3.5 text-gray-600" />
                      <span className="text-xs font-medium text-gray-800">Contact Information</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-700">
                      <div>
                        <span className="text-gray-600">Phone: </span>
                        <span className="text-gray-900 font-medium">{service.phone}</span>
                      </div>
                      {service.nonEmergency && (
                        <div>
                          <span className="text-gray-600">Non-emergency: </span>
                          <span className="text-gray-900">{service.nonEmergency}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-600">Address: </span>
                        <span className="text-gray-900">{service.address}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Hours: </span>
                        <span className="text-gray-900">{service.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="mb-3">Local Services</h2>
          <p className="text-muted-foreground">
            Essential services for residents and visitors
          </p>
        </motion.div>

        <Tabs defaultValue="emergency" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Emergency Services
            </TabsTrigger>
            <TabsTrigger value="public" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Public Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emergency">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-medium text-red-800">Emergency Information</h3>
              </div>
              <p className="text-red-700 text-xs">
                For immediate emergencies, call the numbers below. Click on any service to view full details.
              </p>
            </motion.div>

            {/* Emergency Services Grid - 2 columns */}
            <div className="grid grid-cols-2 gap-4">
              {emergencyServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ServiceTile service={service} type="emergency" />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="public">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-medium text-blue-800">Public Services</h3>
              </div>
              <p className="text-blue-700 text-xs">
                Government and municipal services for Karur residents. Click to expand details.
              </p>
            </motion.div>

            {/* Public Services Grid - 2 columns */}
            <div className="grid grid-cols-2 gap-4">
              {publicServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ServiceTile service={service} type="public" />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-3 flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Need help finding a service?
              </p>
              <div className="flex gap-2 flex-shrink-0">
                <Button size="sm" className="h-7 text-xs px-2.5">
                  <Phone className="w-3 h-3 mr-1" />
                  Contact Support
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
                  Service Directory
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}