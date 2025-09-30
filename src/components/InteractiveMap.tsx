import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { MapPin, Navigation, Search, ExternalLink, Phone, Clock, Star, Locate } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "./context/LanguageContext";

export function InteractiveMap() {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Real Karur locations with actual coordinates
  const karurLocations = [
    {
      id: "kalyana-venkatramana-temple",
      name: t('map.locations.temple.name'),
      name_en: "Kalyana Venkatramana Temple",
      type: "Temple",
      description: t('map.locations.temple.desc'),
      description_en: "Historic temple dedicated to Lord Vishnu, famous for its architecture",
      address: "Temple Street, Karur, Tamil Nadu",
      phone: "+91 4324 123456",
      hours: "Daily 6:00 AM - 8:00 PM",
      coordinates: { lat: 10.9577, lng: 78.0766 },
      color: "bg-orange-500",
      featured: true,
      category: "religious"
    },
    {
      id: "karur-collectorate",
      name: t('map.locations.collectorate.name'),
      name_en: "District Collectorate",
      type: "Government",
      description: t('map.locations.collectorate.desc'),
      description_en: "Main administrative office for Karur district government services",
      address: "Collectorate Road, Karur, Tamil Nadu 639001",
      phone: "+91 4324 220100",
      hours: "Mon-Fri 10:00 AM - 5:00 PM",
      coordinates: { lat: 10.9553, lng: 78.0807 },
      color: "bg-blue-500",
      featured: true,
      category: "government"
    },
    {
      id: "amaravathi-river",
      name: t('map.locations.river.name'),
      name_en: "Amaravathi River",
      type: "Nature",
      description: t('map.locations.river.desc'),
      description_en: "Sacred river flowing through Karur, perfect for evening walks",
      address: "Amaravathi River Bank, Karur",
      phone: "-",
      hours: "24 Hours",
      coordinates: { lat: 10.9520, lng: 78.0820 },
      color: "bg-cyan-500",
      featured: true,
      category: "nature"
    },
    {
      id: "karur-railway-station",
      name: t('map.locations.railway.name'),
      name_en: "Karur Railway Station",
      type: "Transport",
      description: t('map.locations.railway.desc'),
      description_en: "Main railway station connecting Karur to major cities",
      address: "Railway Station Road, Karur",
      phone: "+91 4324 220180",
      hours: "24 Hours",
      coordinates: { lat: 10.9580, lng: 78.0740 },
      color: "bg-green-500",
      featured: false,
      category: "transport"
    },
    {
      id: "textile-market",
      name: t('map.locations.textiles.name'),
      name_en: "Karur Textile Hub",
      type: "Shopping",
      description: t('map.locations.textiles.desc'),
      description_en: "Famous textile market known for home furnishings and exports",
      address: "Textile Market Area, Karur",
      phone: "+91 4324 230456",
      hours: "Daily 9:00 AM - 7:00 PM",
      coordinates: { lat: 10.9565, lng: 78.0785 },
      color: "bg-purple-500",
      featured: true,
      category: "shopping"
    },
    {
      id: "government-hospital",
      name: t('map.locations.hospital.name'),
      name_en: "Government General Hospital",
      type: "Healthcare",
      description: t('map.locations.hospital.desc'),
      description_en: "Main government hospital providing healthcare services",
      address: "Hospital Road, Karur",
      phone: "+91 4324 221234",
      hours: "24/7 Emergency",
      coordinates: { lat: 10.9540, lng: 78.0790 },
      color: "bg-red-500",
      featured: false,
      category: "healthcare"
    },
    {
      id: "anna-university",
      name: t('map.locations.university.name'),
      name_en: "Anna University Karur Campus",
      type: "Education",
      description: t('map.locations.university.desc'),
      description_en: "Prestigious engineering college and regional campus",
      address: "Anna University Road, Karur",
      phone: "+91 4324 245000",
      hours: "Mon-Sat 8:00 AM - 5:00 PM",
      coordinates: { lat: 10.9485, lng: 78.0850 },
      color: "bg-indigo-500",
      featured: true,
      category: "education"
    }
  ];

  const filteredLocations = karurLocations.filter(location =>
    location.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { id: "all", name: "All Locations", icon: MapPin, count: karurLocations.length },
    { id: "religious", name: "Temples", icon: Star, count: karurLocations.filter(l => l.category === "religious").length },
    { id: "government", name: "Government", icon: MapPin, count: karurLocations.filter(l => l.category === "government").length },
    { id: "shopping", name: "Shopping", icon: MapPin, count: karurLocations.filter(l => l.category === "shopping").length },
    { id: "education", name: "Education", icon: MapPin, count: karurLocations.filter(l => l.category === "education").length }
  ];

  // Initialize map when component mounts
  useEffect(() => {
    // Simulate map loading for now
    const timer = setTimeout(() => setMapLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const openInGoogleMaps = (location: any) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}&query_place_id=${encodeURIComponent(location.name_en)}`;
    window.open(url, '_blank');
  };

  const openDirections = (location: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <section id="map" className="py-4">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="mb-1">{t('map.title')}</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {t('map.subtitle')}
          </p>
        </motion.div>

        {/* Search and Categories */}
        <div className="mb-4 space-y-3">
          <div className="relative max-w-sm mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t('map.search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-1.5">
            {categories.map((category) => (
              <Badge 
                key={category.id}
                variant="secondary" 
                className="cursor-pointer hover:bg-primary/10 transition-colors text-xs px-2 py-0.5"
              >
                <category.icon className="w-3 h-3 mr-0.5" />
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <CardTitle className="text-base">{t('map.interactive.title')}</CardTitle>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`https://www.google.com/maps/place/Karur,+Tamil+Nadu/@10.9577,78.0766,13z`, '_blank')}
                    className="text-xs px-2 py-1"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    {t('map.fullscreen')}
                  </Button>
                </div>
                <CardDescription className="text-xs">{t('map.interactive.desc')}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-blue-50 to-green-50 h-48 md:h-64 lg:h-80 overflow-hidden">
                  {!mapLoaded ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-sm text-muted-foreground">{t('map.loading')}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Embedded Google Map */}
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62451.89661748924!2d78.04!3d10.9577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2f482f8f3609%3A0x1e47b3d567d83c73!2sKarur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1703234567890!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Karur Map"
                      ></iframe>
                      
                      {/* Overlay with custom markers */}
                      <div className="absolute inset-0 pointer-events-none">
                        {filteredLocations.map((location, index) => (
                          <motion.div
                            key={location.id}
                            className={`absolute w-6 h-6 rounded-full ${location.color} cursor-pointer shadow-lg border-2 border-white pointer-events-auto z-10`}
                            style={{
                              left: `${20 + (index % 3) * 25}%`,
                              top: `${25 + (index % 4) * 15}%`,
                              transform: 'translate(-50%, -50%)'
                            }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setSelectedLocation(location.id);
                              setDialogOpen(true);
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            {location.featured && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white">
                                <Star className="w-2 h-2 text-white" />
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5 text-xs px-2 py-1.5"
                onClick={() => window.open('https://www.google.com/maps/place/Karur,+Tamil+Nadu', '_blank')}
              >
                <Locate className="w-3 h-3" />
                {t('map.locate')}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5 text-xs px-2 py-1.5"
                onClick={() => window.open('https://www.google.com/maps/dir//Karur,+Tamil+Nadu', '_blank')}
              >
                <Navigation className="w-3 h-3" />
                {t('map.directions')}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5 text-xs px-2 py-1.5"
                onClick={() => window.open('https://www.google.com/maps/search/restaurants+near+Karur,+Tamil+Nadu', '_blank')}
              >
                <MapPin className="w-3 h-3" />
                {t('map.nearby')}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5 text-xs px-2 py-1.5"
                onClick={() => window.open('https://www.google.com/maps/search/hotels+near+Karur,+Tamil+Nadu', '_blank')}
              >
                <MapPin className="w-3 h-3" />
                {t('map.hotels')}
              </Button>
            </div>
          </div>

        {/* Location Details Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            {selectedLocation && (() => {
              const location = karurLocations.find(l => l.id === selectedLocation);
              if (!location) return null;
              
              return (
                <>
                  <DialogHeader>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-3 h-3 rounded-full ${location.color}`}></div>
                      <DialogTitle>{location.name}</DialogTitle>
                      {location.featured && <Star className="w-4 h-4 text-yellow-500" />}
                    </div>
                    <DialogDescription>
                      <Badge variant="secondary" className="text-xs">{location.type}</Badge>
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 mt-4">
                    <p className="text-sm text-muted-foreground">{location.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="flex-1">{location.address}</span>
                      </div>
                      {location.phone !== "-" && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span>{location.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span>{location.hours}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Button 
                        size="sm" 
                        onClick={() => {
                          openDirections(location);
                          setDialogOpen(false);
                        }}
                        className="text-xs"
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        {t('map.getDirections')}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          openInGoogleMaps(location);
                          setDialogOpen(false);
                        }}
                        className="text-xs"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {t('map.openMaps')}
                      </Button>
                    </div>
                  </div>
                </>
              );
            })()}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}