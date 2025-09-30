import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Input } from "./ui/input";
import { 
  Building2,
  Hospital,
  Bus,
  ShoppingBag,
  Film,
  Search,
  MapPin,
  Clock,
  Phone,
  Sparkles,
  Train,
  CreditCard,
  Stethoscope,
  UtensilsCrossed,
  Hotel,
  Star,
  Wifi
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./context/LanguageContext";
import { useState, useMemo, useEffect } from "react";

export function EssentialServices() {
  const { t, language } = useLanguage();
  const [banksSheetOpen, setBanksSheetOpen] = useState(false);
  const [hospitalsSheetOpen, setHospitalsSheetOpen] = useState(false);
  const [transportSheetOpen, setTransportSheetOpen] = useState(false);
  const [shopsSheetOpen, setShopsSheetOpen] = useState(false);
  const [theatresSheetOpen, setTheatresSheetOpen] = useState(false);
  const [restaurantsSheetOpen, setRestaurantsSheetOpen] = useState(false);
  const [hotelsSheetOpen, setHotelsSheetOpen] = useState(false);
  const [bankSearch, setBankSearch] = useState("");
  const [hospitalSearch, setHospitalSearch] = useState("");
  const [transportSearch, setTransportSearch] = useState("");
  const [shopSearch, setShopSearch] = useState("");
  const [restaurantSearch, setRestaurantSearch] = useState("");
  const [hotelSearch, setHotelSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const banks = [
    {
      name: "State Bank of India",
      nameTa: "ஸ்டேட் பேங்க் ஆஃப் இந்தியா",
      branch: "Main Branch, Karur",
      ifsc: "SBIN0001234",
      services: ["Savings", "Loans", "ATM", "Net Banking"],
      timings: "10:00 AM - 4:00 PM"
    },
    {
      name: "Indian Bank",
      nameTa: "இந்தியன் வங்கி",
      branch: "Kovai Road",
      ifsc: "IDIB0002345",
      services: ["Current Account", "FD", "Lockers", "Mobile Banking"],
      timings: "10:00 AM - 4:00 PM"
    },
    {
      name: "Karur Vysya Bank",
      nameTa: "கரூர் வைசிய வங்கி",
      branch: "Head Office",
      ifsc: "KVBL0001234",
      services: ["Business Loans", "Credit Cards", "Insurance", "Investment"],
      timings: "10:00 AM - 5:00 PM"
    },
    {
      name: "ICICI Bank",
      nameTa: "ஐசிஐசிஐ வங்கி",
      branch: "Bus Stand Road",
      ifsc: "ICIC0003456",
      services: ["Personal Loans", "Debit Cards", "Online Services", "Wealth Management"],
      timings: "9:30 AM - 5:30 PM"
    }
  ];

  const hospitals = [
    {
      name: "Karur Government Hospital",
      nameTa: "கரூர் அரசு மருத்துவமனை",
      specialty: "Multi-specialty",
      beds: "500+",
      services: ["Emergency 24/7", "ICU", "Surgery", "Maternity"],
      phone: "+91-4324-220000"
    },
    {
      name: "Annai Hospitals",
      nameTa: "அன்னை மருத்துவமனை",
      specialty: "Multi-specialty Private",
      beds: "150",
      services: ["Cardiology", "Orthopedics", "Pediatrics", "Diagnostics"],
      phone: "+91-4324-221234"
    },
    {
      name: "KVR Hospital",
      nameTa: "கேவிஆர் மருத்துவமனை",
      specialty: "General & Surgical",
      beds: "100",
      services: ["General Medicine", "Gynecology", "ENT", "Pharmacy"],
      phone: "+91-4324-223456"
    },
    {
      name: "Shiva Clinic & Nursing Home",
      nameTa: "சிவா மருத்துவமனை",
      specialty: "Nursing Home",
      beds: "50",
      services: ["Outpatient", "Diagnostics", "Minor Surgery", "Vaccination"],
      phone: "+91-4324-225678"
    }
  ];

  const transportRoutes = [
    {
      type: "bus",
      destination: "Chennai",
      destinationTa: "சென்னை",
      timings: ["5:30 AM", "8:00 AM", "12:00 PM", "3:00 PM", "9:00 PM"],
      duration: "7-8 hours",
      operator: "TNSTC / Private"
    },
    {
      type: "bus",
      destination: "Coimbatore",
      destinationTa: "கோயம்புத்தூர்",
      timings: ["6:00 AM", "9:00 AM", "1:00 PM", "5:00 PM", "10:00 PM"],
      duration: "3-4 hours",
      operator: "TNSTC / Private"
    },
    {
      type: "train",
      destination: "Chennai Egmore",
      destinationTa: "சென்னை எழும்பூர்",
      timings: ["5:45 AM", "11:30 AM", "6:15 PM", "11:00 PM"],
      duration: "6-7 hours",
      operator: "Southern Railway"
    },
    {
      type: "train",
      destination: "Trichy Junction",
      destinationTa: "திருச்சி சந்திப்பு",
      timings: ["6:30 AM", "10:15 AM", "2:45 PM", "7:30 PM"],
      duration: "1.5-2 hours",
      operator: "Southern Railway"
    },
    {
      type: "bus",
      destination: "Bangalore",
      destinationTa: "பெங்களூர்",
      timings: ["10:00 PM", "10:30 PM", "11:00 PM"],
      duration: "6-7 hours",
      operator: "KSRTC / Private"
    },
    {
      type: "train",
      destination: "Madurai",
      destinationTa: "மதுரை",
      timings: ["7:00 AM", "1:30 PM", "8:15 PM"],
      duration: "3-4 hours",
      operator: "Southern Railway"
    }
  ];

  const shops = [
    {
      name: "Karur Main Market",
      nameTa: "கரூர் பிரதான சந்தை",
      type: "Traditional Market",
      items: ["Vegetables", "Fruits", "Groceries", "Clothing"],
      area: "Town Center"
    },
    {
      name: "Textile Showrooms (Gandhi Road)",
      nameTa: "ஜவுளி கடைகள் (காந்தி சாலை)",
      type: "Textile Shopping",
      items: ["Sarees", "Fabrics", "Home Textiles", "Bed Sheets"],
      area: "Gandhi Road"
    },
    {
      name: "Spencer's Daily",
      nameTa: "ஸ்பென்சர்ஸ்",
      type: "Supermarket",
      items: ["Groceries", "Fresh Produce", "Daily Needs", "Household"],
      area: "Kovai Road"
    },
    {
      name: "Pothy's",
      nameTa: "போத்தீஸ்",
      type: "Textile & Jewelry",
      items: ["Sarees", "Jewelry", "Kids Wear", "Men's Wear"],
      area: "Main Road"
    },
    {
      name: "Karur Angadi",
      nameTa: "கரூர் அங்காடி",
      type: "Shopping Complex",
      items: ["Electronics", "Mobiles", "Fashion", "Accessories"],
      area: "Bus Stand Area"
    }
  ];

  const theatres = [
    {
      name: "Inox Multiplex",
      nameTa: "ஐனாக்ஸ் மல்டிபிளக்ஸ்",
      screens: "3 Screens",
      facilities: ["Dolby Atmos", "3D", "Online Booking", "Food Court"],
      location: "KVB Complex"
    },
    {
      name: "Abirami Theatre",
      nameTa: "அபிராமி தியேட்டர்",
      screens: "2 Screens",
      facilities: ["AC", "Parking", "Canteen"],
      location: "Kovai Road"
    },
    {
      name: "Shanthi Theatre",
      nameTa: "சாந்தி தியேட்டர்",
      screens: "Single Screen",
      facilities: ["AC", "Balcony", "Parking"],
      location: "Main Bazaar"
    }
  ];

  const restaurants = [
    {
      name: "Hotel Aasife Biryani",
      nameTa: "ஹோட்டல் ஆசிஃப் பிரியாணி",
      cuisine: "South Indian & Biryani",
      specialties: ["Mutton Biryani", "Chicken 65", "Meals"],
      priceRange: "₹₹",
      location: "Bus Stand Road",
      timings: "11:00 AM - 11:00 PM"
    },
    {
      name: "Annapoorna",
      nameTa: "அன்னபூரணா",
      cuisine: "Pure Vegetarian",
      specialties: ["South Indian Thali", "Dosa", "Idli", "Sweets"],
      priceRange: "₹",
      location: "Main Road",
      timings: "6:00 AM - 10:30 PM"
    },
    {
      name: "KFC & Pizza Hut",
      nameTa: "கேஎஃப்சி & பீட்சா ஹட்",
      cuisine: "Fast Food",
      specialties: ["Fried Chicken", "Pizza", "Burgers", "Sides"],
      priceRange: "₹₹",
      location: "Kovai Road",
      timings: "11:00 AM - 11:00 PM"
    },
    {
      name: "Karur Parambariya Hotel",
      nameTa: "கரூர் பாரம்பரிய ஹோட்டல்",
      cuisine: "Traditional Tamil",
      specialties: ["Chettinad Cuisine", "Fish Fry", "Mutton Curry", "Parotta"],
      priceRange: "₹₹",
      location: "Gandhi Road",
      timings: "12:00 PM - 11:00 PM"
    },
    {
      name: "Cafe Coffee Day",
      nameTa: "கஃபே காஃபி டே",
      cuisine: "Cafe & Beverages",
      specialties: ["Coffee", "Sandwiches", "Pasta", "Desserts"],
      priceRange: "₹₹",
      location: "KVB Complex",
      timings: "9:00 AM - 10:00 PM"
    },
    {
      name: "Saravana Bhavan",
      nameTa: "சரவணா பவன்",
      cuisine: "South Indian",
      specialties: ["Variety Dosa", "Filter Coffee", "Mini Tiffin", "Meals"],
      priceRange: "₹₹",
      location: "Near Railway Station",
      timings: "7:00 AM - 11:00 PM"
    }
  ];

  const hotels = [
    {
      name: "Hotel Jayam",
      nameTa: "ஹோட்டல் ஜெயம்",
      type: "3-Star",
      rooms: "45 Rooms",
      amenities: ["AC Rooms", "Restaurant", "Free WiFi", "Parking"],
      priceRange: "₹₹₹",
      location: "Kovai Road",
      phone: "+91-4324-234567"
    },
    {
      name: "Hotel KVB Towers",
      nameTa: "ஹோட்டல் கேவிபி டவர்ஸ்",
      type: "Business Hotel",
      rooms: "50 Rooms",
      amenities: ["Conference Hall", "Restaurant", "Gym", "WiFi", "Parking"],
      priceRange: "₹₹₹₹",
      location: "Main Road",
      phone: "+91-4324-235678"
    },
    {
      name: "Meridian Hotel",
      nameTa: "மெரிடியன் ஹோட்டல்",
      type: "Budget Hotel",
      rooms: "30 Rooms",
      amenities: ["AC/Non-AC", "TV", "Room Service", "Parking"],
      priceRange: "₹₹",
      location: "Bus Stand Area",
      phone: "+91-4324-236789"
    },
    {
      name: "RK Residency",
      nameTa: "ஆர்கே ரெசிடென்சி",
      type: "Serviced Apartments",
      rooms: "20 Units",
      amenities: ["Fully Furnished", "Kitchen", "Laundry", "WiFi", "Security"],
      priceRange: "₹₹₹",
      location: "Gandhi Road",
      phone: "+91-4324-237890"
    },
    {
      name: "Sri Balaji Lodge",
      nameTa: "ஸ்ரீ பாலாஜி லாட்ஜ்",
      type: "Budget Lodge",
      rooms: "25 Rooms",
      amenities: ["Non-AC/AC", "TV", "Clean Rooms", "Parking"],
      priceRange: "₹",
      location: "Near Railway Station",
      phone: "+91-4324-238901"
    }
  ];

  const filteredBanks = useMemo(() => {
    return banks.filter(bank => 
      bank.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
      bank.branch.toLowerCase().includes(bankSearch.toLowerCase()) ||
      bank.services.some(s => s.toLowerCase().includes(bankSearch.toLowerCase()))
    );
  }, [bankSearch]);

  const filteredHospitals = useMemo(() => {
    return hospitals.filter(hospital => 
      hospital.name.toLowerCase().includes(hospitalSearch.toLowerCase()) ||
      hospital.specialty.toLowerCase().includes(hospitalSearch.toLowerCase()) ||
      hospital.services.some(s => s.toLowerCase().includes(hospitalSearch.toLowerCase()))
    );
  }, [hospitalSearch]);

  const filteredTransport = useMemo(() => {
    return transportRoutes.filter(route => 
      route.destination.toLowerCase().includes(transportSearch.toLowerCase()) ||
      route.operator.toLowerCase().includes(transportSearch.toLowerCase())
    );
  }, [transportSearch]);

  const filteredShops = useMemo(() => {
    return shops.filter(shop => 
      shop.name.toLowerCase().includes(shopSearch.toLowerCase()) ||
      shop.type.toLowerCase().includes(shopSearch.toLowerCase()) ||
      shop.items.some(i => i.toLowerCase().includes(shopSearch.toLowerCase()))
    );
  }, [shopSearch]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(restaurantSearch.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(restaurantSearch.toLowerCase()) ||
      restaurant.specialties.some(s => s.toLowerCase().includes(restaurantSearch.toLowerCase()))
    );
  }, [restaurantSearch]);

  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => 
      hotel.name.toLowerCase().includes(hotelSearch.toLowerCase()) ||
      hotel.type.toLowerCase().includes(hotelSearch.toLowerCase()) ||
      hotel.amenities.some(a => a.toLowerCase().includes(hotelSearch.toLowerCase()))
    );
  }, [hotelSearch]);

  return (
    <section className="py-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="mb-2">
            {language === 'ta' ? 'அத்தியாவசிய சேவைகள்' : 'Essential Services'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'ta' 
              ? 'கரூரில் உள்ள வங்கிகள், மருத்துவமனைகள், உணவகங்கள், தங்குமிடங்கள் மற்றும் பல'
              : 'Everything you need - Banks, Hospitals, Dining, Hotels, Transport & More'}
          </p>
        </motion.div>

        {/* Compact CTA Grid */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
              {/* Banks Button */}
              <Card 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100"
                onClick={() => setBanksSheetOpen(true)}
              >
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-1 text-blue-900">
                    {language === 'ta' ? 'வங்கிகள்' : 'Banks'}
                  </h4>
                  <p className="text-xs text-blue-700">{banks.length} branches</p>
                </CardContent>
              </Card>

              {/* Hospitals Button */}
              <Card 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-green-400 bg-gradient-to-br from-green-50 to-green-100"
                onClick={() => setHospitalsSheetOpen(true)}
              >
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Hospital className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-1 text-green-900">
                    {language === 'ta' ? 'மருத்துவமனைகள்' : 'Hospitals'}
                  </h4>
                  <p className="text-xs text-green-700">{hospitals.length} facilities</p>
                </CardContent>
              </Card>

              {/* Transport Button */}
              <Card 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-400 bg-gradient-to-br from-purple-50 to-purple-100"
                onClick={() => setTransportSheetOpen(true)}
              >
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Bus className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-1 text-purple-900">
                    {language === 'ta' ? 'போக்குவரத்து' : 'Transport'}
                  </h4>
                  <p className="text-xs text-purple-700">Bus & Train</p>
                </CardContent>
              </Card>

              {/* Shops Button */}
              <Card 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-400 bg-gradient-to-br from-orange-50 to-orange-100"
                onClick={() => setShopsSheetOpen(true)}
              >
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-1 text-orange-900">
                    {language === 'ta' ? 'கடைகள்' : 'Shopping'}
                  </h4>
                  <p className="text-xs text-orange-700">{shops.length} places</p>
                </CardContent>
              </Card>

              {/* Theatres Button */}
              <Card 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-400 bg-gradient-to-br from-pink-50 to-pink-100"
                onClick={() => setTheatresSheetOpen(true)}
              >
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Film className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-1 text-pink-900">
                    {language === 'ta' ? 'திரையரங்குகள்' : 'Theatres'}
                  </h4>
                  <p className="text-xs text-pink-700">{theatres.length} screens</p>
                </CardContent>
              </Card>

              {/* Restaurants Button */}
              <Card 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-red-400 bg-gradient-to-br from-red-50 to-red-100"
                onClick={() => setRestaurantsSheetOpen(true)}
              >
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <UtensilsCrossed className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-1 text-red-900">
                    {language === 'ta' ? 'உணவகங்கள்' : 'Dining'}
                  </h4>
                  <p className="text-xs text-red-700">{restaurants.length} places</p>
                </CardContent>
              </Card>

              {/* Hotels Button */}
              <Card 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-cyan-400 bg-gradient-to-br from-cyan-50 to-cyan-100"
                onClick={() => setHotelsSheetOpen(true)}
              >
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Hotel className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-1 text-cyan-900">
                    {language === 'ta' ? 'தங்குமிடங்கள்' : 'Hotels'}
                  </h4>
                  <p className="text-xs text-cyan-700">{hotels.length} options</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Banks Sheet */}
        <Sheet open={banksSheetOpen} onOpenChange={setBanksSheetOpen}>
          <SheetContent 
            side={isMobile ? "bottom" : "right"} 
            className={`p-0 overflow-hidden ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : 'w-full sm:max-w-2xl'
            }`}
          >
            <div className={`relative bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 ${
              isMobile ? 'p-5 pb-6 rounded-t-3xl' : 'p-6 pb-8'
            }`}>
              <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
              {isMobile && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/30 rounded-full"></div>
              )}
              <div className={`relative z-10 ${isMobile ? 'pt-3' : ''}`}>
                <SheetHeader>
                  <SheetTitle className={`flex items-center gap-3 text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <Building2 className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
                    </div>
                    {language === 'ta' ? 'வங்கிகள்' : 'Banks in Karur'}
                  </SheetTitle>
                  <SheetDescription className="text-white/90 flex items-center gap-2 mt-2 text-sm">
                    <Sparkles className="w-4 h-4" />
                    {language === 'ta' ? 'நம்பகமான வங்கி சேவைகள்' : 'Banking services across Karur'}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input 
                    placeholder={language === 'ta' ? 'வங்கிகளைத் தேடுங்கள்...' : 'Search banks...'} 
                    value={bankSearch}
                    onChange={(e) => setBankSearch(e.target.value)}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                  />
                </div>
              </div>
            </div>

            <div className={`overflow-y-auto bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'p-4 h-[calc(85vh-200px)]' : 'p-6 h-[calc(100vh-220px)]'
            }`}>
              <AnimatePresence mode="popLayout">
                {filteredBanks.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-muted-foreground"
                  >
                    {language === 'ta' ? 'வங்கிகள் இல்லை' : 'No banks found'}
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {filteredBanks.map((bank, index) => (
                      <motion.div
                        key={bank.name}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 group hover:scale-[1.02]">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <h4 className="flex items-center gap-2 group-hover:text-blue-600 transition-colors mb-1">
                                  <Building2 className="w-4 h-4 text-blue-600" />
                                  {language === 'ta' ? bank.nameTa : bank.name}
                                </h4>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {bank.branch}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200">
                                <CreditCard className="w-3 h-3 mr-1" />
                                {bank.ifsc}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                              <Clock className="w-3 h-3" />
                              {bank.timings}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {bank.services.map((service, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </SheetContent>
        </Sheet>

        {/* Hospitals Sheet */}
        <Sheet open={hospitalsSheetOpen} onOpenChange={setHospitalsSheetOpen}>
          <SheetContent 
            side={isMobile ? "bottom" : "right"} 
            className={`p-0 overflow-hidden ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : 'w-full sm:max-w-2xl'
            }`}
          >
            <div className={`relative bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 ${
              isMobile ? 'p-5 pb-6 rounded-t-3xl' : 'p-6 pb-8'
            }`}>
              <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
              {isMobile && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/30 rounded-full"></div>
              )}
              <div className={`relative z-10 ${isMobile ? 'pt-3' : ''}`}>
                <SheetHeader>
                  <SheetTitle className={`flex items-center gap-3 text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <Hospital className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
                    </div>
                    {language === 'ta' ? 'மருத்துவமனைகள்' : 'Hospitals in Karur'}
                  </SheetTitle>
                  <SheetDescription className="text-white/90 flex items-center gap-2 mt-2 text-sm">
                    <Sparkles className="w-4 h-4" />
                    {language === 'ta' ? 'தரமான சுகாதார சேவைகள்' : 'Quality healthcare facilities'}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input 
                    placeholder={language === 'ta' ? 'மருத்துவமனைகளைத் தேடுங்கள்...' : 'Search hospitals...'} 
                    value={hospitalSearch}
                    onChange={(e) => setHospitalSearch(e.target.value)}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                  />
                </div>
              </div>
            </div>

            <div className={`overflow-y-auto bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'p-4 h-[calc(85vh-200px)]' : 'p-6 h-[calc(100vh-220px)]'
            }`}>
              <AnimatePresence mode="popLayout">
                {filteredHospitals.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-muted-foreground"
                  >
                    {language === 'ta' ? 'மருத்துவமனைகள் இல்லை' : 'No hospitals found'}
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {filteredHospitals.map((hospital, index) => (
                      <motion.div
                        key={hospital.name}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500 group hover:scale-[1.02]">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <h4 className="flex items-center gap-2 group-hover:text-green-600 transition-colors mb-1">
                                  <Hospital className="w-4 h-4 text-green-600" />
                                  {language === 'ta' ? hospital.nameTa : hospital.name}
                                </h4>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Stethoscope className="w-3 h-3" />
                                  {hospital.specialty}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs bg-green-50 border-green-200">
                                {hospital.beds} beds
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                              <Phone className="w-3 h-3" />
                              {hospital.phone}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {hospital.services.map((service, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </SheetContent>
        </Sheet>

        {/* Transport Sheet */}
        <Sheet open={transportSheetOpen} onOpenChange={setTransportSheetOpen}>
          <SheetContent 
            side={isMobile ? "bottom" : "right"} 
            className={`p-0 overflow-hidden ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : 'w-full sm:max-w-2xl'
            }`}
          >
            <div className={`relative bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 ${
              isMobile ? 'p-5 pb-6 rounded-t-3xl' : 'p-6 pb-8'
            }`}>
              <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
              {isMobile && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/30 rounded-full"></div>
              )}
              <div className={`relative z-10 ${isMobile ? 'pt-3' : ''}`}>
                <SheetHeader>
                  <SheetTitle className={`flex items-center gap-3 text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <Bus className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
                    </div>
                    {language === 'ta' ? 'போக்குவரத்து' : 'Transport from Karur'}
                  </SheetTitle>
                  <SheetDescription className="text-white/90 flex items-center gap-2 mt-2 text-sm">
                    <Sparkles className="w-4 h-4" />
                    {language === 'ta' ? 'பேருந்து மற்றும் ரயில் விவரங்கள்' : 'Bus & Train schedules'}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input 
                    placeholder={language === 'ta' ? 'இடங்களைத் தேடுங்கள்...' : 'Search destination...'} 
                    value={transportSearch}
                    onChange={(e) => setTransportSearch(e.target.value)}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                  />
                </div>
              </div>
            </div>

            <div className={`overflow-y-auto bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'p-4 h-[calc(85vh-200px)]' : 'p-6 h-[calc(100vh-220px)]'
            }`}>
              <AnimatePresence mode="popLayout">
                {filteredTransport.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-muted-foreground"
                  >
                    {language === 'ta' ? 'வழிகள் இல்லை' : 'No routes found'}
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {filteredTransport.map((route, index) => (
                      <motion.div
                        key={`${route.type}-${route.destination}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500 group hover:scale-[1.02]">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <h4 className="flex items-center gap-2 group-hover:text-purple-600 transition-colors mb-1">
                                  {route.type === 'bus' ? (
                                    <Bus className="w-4 h-4 text-purple-600" />
                                  ) : (
                                    <Train className="w-4 h-4 text-purple-600" />
                                  )}
                                  {language === 'ta' ? route.destinationTa : route.destination}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {route.operator}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs bg-purple-50 border-purple-200 capitalize">
                                {route.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                              <Clock className="w-3 h-3" />
                              Duration: {route.duration}
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-2">
                                {language === 'ta' ? 'நேரங்கள்:' : 'Timings:'}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {route.timings.map((time, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {time}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </SheetContent>
        </Sheet>

        {/* Shops Sheet */}
        <Sheet open={shopsSheetOpen} onOpenChange={setShopsSheetOpen}>
          <SheetContent 
            side={isMobile ? "bottom" : "right"} 
            className={`p-0 overflow-hidden ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : 'w-full sm:max-w-2xl'
            }`}
          >
            <div className={`relative bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 ${
              isMobile ? 'p-5 pb-6 rounded-t-3xl' : 'p-6 pb-8'
            }`}>
              <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
              {isMobile && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/30 rounded-full"></div>
              )}
              <div className={`relative z-10 ${isMobile ? 'pt-3' : ''}`}>
                <SheetHeader>
                  <SheetTitle className={`flex items-center gap-3 text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <ShoppingBag className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
                    </div>
                    {language === 'ta' ? 'கடைகள் & சந்தைகள்' : 'Shopping in Karur'}
                  </SheetTitle>
                  <SheetDescription className="text-white/90 flex items-center gap-2 mt-2 text-sm">
                    <Sparkles className="w-4 h-4" />
                    {language === 'ta' ? 'சந்தைகள் மற்றும் கடைகள்' : 'Markets, malls & shopping areas'}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input 
                    placeholder={language === 'ta' ? 'கடைகளைத் தேடுங்கள்...' : 'Search shops...'} 
                    value={shopSearch}
                    onChange={(e) => setShopSearch(e.target.value)}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                  />
                </div>
              </div>
            </div>

            <div className={`overflow-y-auto bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'p-4 h-[calc(85vh-200px)]' : 'p-6 h-[calc(100vh-220px)]'
            }`}>
              <AnimatePresence mode="popLayout">
                {filteredShops.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-muted-foreground"
                  >
                    {language === 'ta' ? 'கடைகள் இல்லை' : 'No shops found'}
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {filteredShops.map((shop, index) => (
                      <motion.div
                        key={shop.name}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500 group hover:scale-[1.02]">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <h4 className="flex items-center gap-2 group-hover:text-orange-600 transition-colors mb-1">
                                  <ShoppingBag className="w-4 h-4 text-orange-600" />
                                  {language === 'ta' ? shop.nameTa : shop.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {shop.type}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs bg-orange-50 border-orange-200">
                                <MapPin className="w-3 h-3 mr-1" />
                                {shop.area}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {shop.items.map((item, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </SheetContent>
        </Sheet>

        {/* Theatres Sheet */}
        <Sheet open={theatresSheetOpen} onOpenChange={setTheatresSheetOpen}>
          <SheetContent 
            side={isMobile ? "bottom" : "right"} 
            className={`p-0 overflow-hidden ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : 'w-full sm:max-w-2xl'
            }`}
          >
            <div className={`relative bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 ${
              isMobile ? 'p-5 pb-6 rounded-t-3xl' : 'p-6 pb-8'
            }`}>
              <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
              {isMobile && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/30 rounded-full"></div>
              )}
              <div className={`relative z-10 ${isMobile ? 'pt-3' : ''}`}>
                <SheetHeader>
                  <SheetTitle className={`flex items-center gap-3 text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <Film className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
                    </div>
                    {language === 'ta' ? 'திரையரங்குகள்' : 'Theatres in Karur'}
                  </SheetTitle>
                  <SheetDescription className="text-white/90 flex items-center gap-2 mt-2 text-sm">
                    <Sparkles className="w-4 h-4" />
                    {language === 'ta' ? 'சினிமா அரங்குகள்' : 'Cinema halls & multiplexes'}
                  </SheetDescription>
                </SheetHeader>
              </div>
            </div>

            <div className={`overflow-y-auto bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'p-4 h-[calc(85vh-180px)]' : 'p-6 h-[calc(100vh-200px)]'
            }`}>
              <div className="space-y-4">
                {theatres.map((theatre, index) => (
                  <motion.div
                    key={theatre.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-pink-500 group hover:scale-[1.02]">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <h4 className="flex items-center gap-2 group-hover:text-pink-600 transition-colors mb-1">
                              <Film className="w-4 h-4 text-pink-600" />
                              {language === 'ta' ? theatre.nameTa : theatre.name}
                            </h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {theatre.location}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs bg-pink-50 border-pink-200">
                            {theatre.screens}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {theatre.facilities.map((facility, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {facility}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Restaurants Sheet */}
        <Sheet open={restaurantsSheetOpen} onOpenChange={setRestaurantsSheetOpen}>
          <SheetContent 
            side={isMobile ? "bottom" : "right"} 
            className={`p-0 overflow-hidden ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : 'w-full sm:max-w-2xl'
            }`}
          >
            <div className={`relative bg-gradient-to-br from-red-600 via-rose-600 to-red-700 ${
              isMobile ? 'p-5 pb-6 rounded-t-3xl' : 'p-6 pb-8'
            }`}>
              <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
              {isMobile && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/30 rounded-full"></div>
              )}
              <div className={`relative z-10 ${isMobile ? 'pt-3' : ''}`}>
                <SheetHeader>
                  <SheetTitle className={`flex items-center gap-3 text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <UtensilsCrossed className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
                    </div>
                    {language === 'ta' ? 'உணவகங்கள்' : 'Food & Dining in Karur'}
                  </SheetTitle>
                  <SheetDescription className="text-white/90 flex items-center gap-2 mt-2 text-sm">
                    <Sparkles className="w-4 h-4" />
                    {language === 'ta' ? 'சுவையான உணவுகள் மற்றும் உணவகங்கள்' : 'Delicious local & multi-cuisine restaurants'}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input 
                    placeholder={language === 'ta' ? 'உணவகங்களைத் தேடுங்கள்...' : 'Search restaurants...'} 
                    value={restaurantSearch}
                    onChange={(e) => setRestaurantSearch(e.target.value)}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                  />
                </div>
              </div>
            </div>

            <div className={`overflow-y-auto bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'p-4 h-[calc(85vh-200px)]' : 'p-6 h-[calc(100vh-220px)]'
            }`}>
              <AnimatePresence mode="popLayout">
                {filteredRestaurants.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-muted-foreground"
                  >
                    {language === 'ta' ? 'உணவகங்கள் இல்லை' : 'No restaurants found'}
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {filteredRestaurants.map((restaurant, index) => (
                      <motion.div
                        key={restaurant.name}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500 group hover:scale-[1.02]">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <h4 className="flex items-center gap-2 group-hover:text-red-600 transition-colors mb-1">
                                  <UtensilsCrossed className="w-4 h-4 text-red-600" />
                                  {language === 'ta' ? restaurant.nameTa : restaurant.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {restaurant.cuisine}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs bg-red-50 border-red-200">
                                {restaurant.priceRange}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                              <MapPin className="w-3 h-3" />
                              {restaurant.location}
                              <span className="mx-1">•</span>
                              <Clock className="w-3 h-3" />
                              {restaurant.timings}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {restaurant.specialties.map((specialty, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </SheetContent>
        </Sheet>

        {/* Hotels Sheet */}
        <Sheet open={hotelsSheetOpen} onOpenChange={setHotelsSheetOpen}>
          <SheetContent 
            side={isMobile ? "bottom" : "right"} 
            className={`p-0 overflow-hidden ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : 'w-full sm:max-w-2xl'
            }`}
          >
            <div className={`relative bg-gradient-to-br from-cyan-600 via-blue-600 to-cyan-700 ${
              isMobile ? 'p-5 pb-6 rounded-t-3xl' : 'p-6 pb-8'
            }`}>
              <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
              {isMobile && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/30 rounded-full"></div>
              )}
              <div className={`relative z-10 ${isMobile ? 'pt-3' : ''}`}>
                <SheetHeader>
                  <SheetTitle className={`flex items-center gap-3 text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <Hotel className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
                    </div>
                    {language === 'ta' ? 'தங்குமிடங்கள்' : 'Hotels & Accommodation'}
                  </SheetTitle>
                  <SheetDescription className="text-white/90 flex items-center gap-2 mt-2 text-sm">
                    <Sparkles className="w-4 h-4" />
                    {language === 'ta' ? 'வசதியான தங்குமிட வசதிகள்' : 'Comfortable stay options in Karur'}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input 
                    placeholder={language === 'ta' ? 'ஹோட்டல்களைத் தேடுங்கள்...' : 'Search hotels...'} 
                    value={hotelSearch}
                    onChange={(e) => setHotelSearch(e.target.value)}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                  />
                </div>
              </div>
            </div>

            <div className={`overflow-y-auto bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'p-4 h-[calc(85vh-200px)]' : 'p-6 h-[calc(100vh-220px)]'
            }`}>
              <AnimatePresence mode="popLayout">
                {filteredHotels.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-muted-foreground"
                  >
                    {language === 'ta' ? 'ஹோட்டல்கள் இல்லை' : 'No hotels found'}
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {filteredHotels.map((hotel, index) => (
                      <motion.div
                        key={hotel.name}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-cyan-500 group hover:scale-[1.02]">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <h4 className="flex items-center gap-2 group-hover:text-cyan-600 transition-colors mb-1">
                                  <Hotel className="w-4 h-4 text-cyan-600" />
                                  {language === 'ta' ? hotel.nameTa : hotel.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {hotel.type}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs bg-cyan-50 border-cyan-200">
                                {hotel.priceRange}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                              <MapPin className="w-3 h-3" />
                              {hotel.location}
                              <span className="mx-1">•</span>
                              <Phone className="w-3 h-3" />
                              {hotel.phone}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                              <Star className="w-3 h-3" />
                              {hotel.rooms}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {hotel.amenities.map((amenity, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}