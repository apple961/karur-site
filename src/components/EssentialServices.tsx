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
  Wifi,
  Leaf,
  Eye,
  Activity,
  ChevronLeft,
  ChevronRight,
  Tag,
  Utensils
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./context/LanguageContext";
import { useState, useMemo, useEffect, useRef } from "react";

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
  const [hospitalTab, setHospitalTab] = useState<'allopathy' | 'homeopathy' | 'ayurvedic' | 'dental' | 'eye'>('allopathy');
  const [isMobile, setIsMobile] = useState(false);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  
  // Detail View States
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [selectedTransport, setSelectedTransport] = useState<any>(null);
  const [selectedShop, setSelectedShop] = useState<any>(null);
  const [selectedTheatre, setSelectedTheatre] = useState<any>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);

  // Search input refs to prevent auto-focus on mobile
  const bankSearchRef = useRef<HTMLInputElement>(null);
  const hospitalSearchRef = useRef<HTMLInputElement>(null);
  const transportSearchRef = useRef<HTMLInputElement>(null);
  const shopSearchRef = useRef<HTMLInputElement>(null);
  const restaurantSearchRef = useRef<HTMLInputElement>(null);
  const hotelSearchRef = useRef<HTMLInputElement>(null);

  // "Can focus" states to prevent auto-focus keyboard on mobile
  const [bankCanFocus, setBankCanFocus] = useState(true);
  const [hospitalCanFocus, setHospitalCanFocus] = useState(true);
  const [transportCanFocus, setTransportCanFocus] = useState(true);
  const [shopCanFocus, setShopCanFocus] = useState(true);
  const [restaurantCanFocus, setRestaurantCanFocus] = useState(true);
  const [hotelCanFocus, setHotelCanFocus] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle tab scroll gradient visibility
  const handleTabScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setShowLeftGradient(scrollLeft > 10);
      setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Auto-center active tab
  useEffect(() => {
    if (tabsContainerRef.current && hospitalsSheetOpen) {
      const container = tabsContainerRef.current;
      const activeButton = container.querySelector(`[data-tab="${hospitalTab}"]`) as HTMLElement;
      
      if (activeButton) {
        const containerWidth = container.clientWidth;
        const buttonLeft = activeButton.offsetLeft;
        const buttonWidth = activeButton.clientWidth;
        const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
        
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
      
      // Update gradient visibility
      setTimeout(handleTabScroll, 300);
    }
  }, [hospitalTab, hospitalsSheetOpen]);

  // Prevent auto-focus on mobile when sheets open by temporarily disabling focus
  useEffect(() => {
    if (isMobile && banksSheetOpen) {
      setBankCanFocus(false);
      setTimeout(() => {
        setBankCanFocus(true);
      }, 500);
    }
  }, [banksSheetOpen, isMobile]);

  useEffect(() => {
    if (isMobile && hospitalsSheetOpen) {
      setHospitalCanFocus(false);
      setTimeout(() => {
        setHospitalCanFocus(true);
      }, 500);
    }
  }, [hospitalsSheetOpen, isMobile]);

  useEffect(() => {
    if (isMobile && transportSheetOpen) {
      setTransportCanFocus(false);
      setTimeout(() => {
        setTransportCanFocus(true);
      }, 500);
    }
  }, [transportSheetOpen, isMobile]);

  useEffect(() => {
    if (isMobile && shopsSheetOpen) {
      setShopCanFocus(false);
      setTimeout(() => {
        setShopCanFocus(true);
      }, 500);
    }
  }, [shopsSheetOpen, isMobile]);

  useEffect(() => {
    if (isMobile && restaurantsSheetOpen) {
      setRestaurantCanFocus(false);
      setTimeout(() => {
        setRestaurantCanFocus(true);
      }, 500);
    }
  }, [restaurantsSheetOpen, isMobile]);

  useEffect(() => {
    if (isMobile && hotelsSheetOpen) {
      setHotelCanFocus(false);
      setTimeout(() => {
        setHotelCanFocus(true);
      }, 500);
    }
  }, [hotelsSheetOpen, isMobile]);

  const banks = [
    {
      name: "State Bank of India",
      nameTa: "ஸ்டேட் பேங்க் ஆஃப் இந்தியா",
      branch: "Main Branch, Karur",
      ifsc: "SBIN0001234",
      services: ["Savings", "Loans", "ATM", "Net Banking"],
      timings: "10:00 AM - 4:00 PM",
      phone: "+91-4324-220100"
    },
    {
      name: "Indian Bank",
      nameTa: "இந்தியன் வங்கி",
      branch: "Kovai Road",
      ifsc: "IDIB0002345",
      services: ["Current Account", "FD", "Lockers", "Mobile Banking"],
      timings: "10:00 AM - 4:00 PM",
      phone: "+91-4324-220200"
    },
    {
      name: "Karur Vysya Bank",
      nameTa: "கரூர் வைசிய வங்கி",
      branch: "Head Office",
      ifsc: "KVBL0001234",
      services: ["Business Loans", "Credit Cards", "Insurance", "Investment"],
      timings: "10:00 AM - 5:00 PM",
      phone: "+91-4324-220300"
    },
    {
      name: "ICICI Bank",
      nameTa: "ஐசிஐசிஐ வங்கி",
      branch: "Bus Stand Road",
      ifsc: "ICIC0003456",
      services: ["Personal Loans", "Debit Cards", "Online Services", "Wealth Management"],
      timings: "9:30 AM - 5:30 PM",
      phone: "+91-4324-220400"
    }
  ];

  const hospitals = {
    allopathy: [
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
    ],
    homeopathy: [
      {
        name: "Dr. Batra's Homeopathy Clinic",
        nameTa: "டாக்டர் பத்ரா ஹோமியோபதி கிளினிக்",
        specialty: "Homeopathic Treatment",
        beds: "N/A",
        services: ["Skin & Hair", "Allergies", "Chronic Diseases", "Child Health"],
        phone: "+91-4324-240001"
      },
      {
        name: "Hahnemann Homeopathic Center",
        nameTa: "ஹானிமான் ஹோமியோபதி மையம்",
        specialty: "Classical Homeopathy",
        beds: "N/A",
        services: ["Acute & Chronic Cases", "Pediatrics", "Women's Health", "Immunity Booster"],
        phone: "+91-4324-240002"
      },
      {
        name: "Shree Homeo Clinic",
        nameTa: "ஸ்ரீ ஹோமியோ கிளினிக்",
        specialty: "General Homeopathy",
        beds: "N/A",
        services: ["Diabetes", "Asthma", "Arthritis", "Lifestyle Disorders"],
        phone: "+91-4324-240003"
      },
      {
        name: "Karur Homeopathic Dispensary",
        nameTa: "கரூர் ஹோமியோபதி மருந்தகம்",
        specialty: "Government Homeopathy",
        beds: "N/A",
        services: ["Free Consultation", "Medicine Distribution", "Health Camps", "OPD Services"],
        phone: "+91-4324-240004"
      }
    ],
    ayurvedic: [
      {
        name: "Arya Vaidya Pharmacy",
        nameTa: "ஆர்ய வைத்ய பார்மசி",
        specialty: "Ayurvedic Treatment",
        beds: "20",
        services: ["Panchakarma", "Herbal Medicine", "Massage Therapy", "Yoga Consultation"],
        phone: "+91-4324-250001"
      },
      {
        name: "Siddha Medical Center",
        nameTa: "சித்த மருத்துவ மையம்",
        specialty: "Siddha Medicine",
        beds: "15",
        services: ["Traditional Therapy", "Varmam", "Maruthuvam", "Diet Counseling"],
        phone: "+91-4324-250002"
      },
      {
        name: "Kerala Ayurveda Hospital",
        nameTa: "கேரளா ஆயுர்வேத மருத்துவமனை",
        specialty: "Authentic Ayurveda",
        beds: "30",
        services: ["Abhyangam", "Shirodhara", "Pizhichil", "Nasyam"],
        phone: "+91-4324-250003"
      },
      {
        name: "Government Ayurvedic Dispensary",
        nameTa: "அரசு ஆயுர்வேத மருந்தகம்",
        specialty: "Free Ayurvedic Care",
        beds: "N/A",
        services: ["OPD", "Medicine Supply", "Basic Treatment", "Health Advice"],
        phone: "+91-4324-250004"
      }
    ],
    dental: [
      {
        name: "Smile Dental Care",
        nameTa: "ஸ்மைல் டென்டல் கேர்",
        specialty: "Multi-specialty Dental",
        beds: "N/A",
        services: ["Root Canal", "Braces", "Implants", "Cosmetic Dentistry"],
        phone: "+91-4324-260001"
      },
      {
        name: "Dr. Kumar's Dental Clinic",
        nameTa: "டாக்டர் குமார் பல் மருத்துவமனை",
        specialty: "General Dentistry",
        beds: "N/A",
        services: ["Extractions", "Fillings", "Cleaning", "Whitening"],
        phone: "+91-4324-260002"
      },
      {
        name: "Karur Dental Hospital",
        nameTa: "கரூர் பல் மருத்துவமனை",
        specialty: "Advanced Dental Care",
        beds: "N/A",
        services: ["Orthodontics", "Periodontics", "Oral Surgery", "Pediatric Dentistry"],
        phone: "+91-4324-260003"
      },
      {
        name: "Perfect Smile Orthodontics",
        nameTa: "பெர்ஃபெக்ட் ஸ்மைல் ஆர்த்தோடான்டிக்ஸ்",
        specialty: "Orthodontic Specialist",
        beds: "N/A",
        services: ["Invisible Braces", "Metal Braces", "Retainers", "Aligners"],
        phone: "+91-4324-260004"
      }
    ],
    eye: [
      {
        name: "Aravind Eye Hospital",
        nameTa: "அரவிந்த் கண் மருத்துவமனை",
        specialty: "Eye Care Center",
        beds: "100",
        services: ["Cataract Surgery", "LASIK", "Retina Care", "Glaucoma Treatment"],
        phone: "+91-4324-270001"
      },
      {
        name: "Vision Eye Clinic",
        nameTa: "விஷன் கண் கிளினிக்",
        specialty: "General Eye Care",
        beds: "N/A",
        services: ["Eye Testing", "Spectacles", "Contact Lenses", "Minor Surgery"],
        phone: "+91-4324-270002"
      },
      {
        name: "Dr. Ravi Eye Care",
        nameTa: "டாக்டர் ரவி கண் பராமரிப்பு",
        specialty: "Ophthalmology",
        beds: "25",
        services: ["Comprehensive Eye Exam", "Diabetic Retinopathy", "Cornea Treatment", "Pediatric Eye Care"],
        phone: "+91-4324-270003"
      },
      {
        name: "Karur Eye Foundation",
        nameTa: "கரூர் கண் அறக்கட்டளை",
        specialty: "Charitable Eye Hospital",
        beds: "50",
        services: ["Free Camps", "Affordable Surgery", "Screening Programs", "Vision Correction"],
        phone: "+91-4324-270004"
      }
    ]
  };

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
    const currentHospitals = hospitals[hospitalTab];
    return currentHospitals.filter(hospital => 
      hospital.name.toLowerCase().includes(hospitalSearch.toLowerCase()) ||
      hospital.specialty.toLowerCase().includes(hospitalSearch.toLowerCase()) ||
      hospital.services.some(s => s.toLowerCase().includes(hospitalSearch.toLowerCase()))
    );
  }, [hospitalSearch, hospitalTab]);

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
                  <p className="text-xs text-green-700">
                    {Object.values(hospitals).reduce((acc, arr) => acc + arr.length, 0)} facilities
                  </p>
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
        <Sheet open={banksSheetOpen} onOpenChange={(open) => {
          setBanksSheetOpen(open);
          if (!open) setSelectedBank(null);
        }}>
          <SheetContent 
            side={isMobile ? "bottom" : "left"} 
            className={`p-0 overflow-hidden transition-all duration-300 ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : selectedBank ? 'sm:max-w-[85vw] max-w-6xl' : 'sm:max-w-xl'
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
                    ref={bankSearchRef}
                    placeholder={language === 'ta' ? 'வங்கிகளைத் தேடுங்கள்...' : 'Search banks...'} 
                    value={bankSearch}
                    onChange={(e) => setBankSearch(e.target.value)}
                    onFocus={(e) => {
                      if (isMobile && !bankCanFocus) {
                        e.target.blur();
                      }
                    }}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                    autoFocus={false}
                  />
                </div>
              </div>
            </div>

            <div className={`flex bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'flex-col h-[calc(85vh-200px)]' : 'flex-row h-[calc(100vh-220px)]'
            }`}>
              {/* Left Side - List */}
              <div className={`flex-shrink-0 overflow-y-auto ${
                isMobile ? 'p-4 w-full' : selectedBank ? 'w-[45%] p-6 border-r border-gray-200' : 'w-full p-6'
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
                          <Card 
                            className={`hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 group hover:scale-[1.02] cursor-pointer ${
                              selectedBank?.name === bank.name ? 'ring-2 ring-blue-500 shadow-lg' : ''
                            }`}
                            onClick={() => setSelectedBank(bank)}
                          >
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

              {/* Right Side - Details (Desktop) */}
              <AnimatePresence>
                {selectedBank && !isMobile && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-white to-blue-50/30"
                  >
                    <div className="sticky top-0 bg-white pb-4 mb-4 border-b border-gray-200 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl text-blue-900 mb-1">{language === 'ta' ? selectedBank.nameTa : selectedBank.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {selectedBank.branch}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedBank(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* IFSC Code */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-blue-600 mb-1">{language === 'ta' ? 'IFSC குறியீடு' : 'IFSC Code'}</p>
                            <p className="text-xl text-blue-900">{selectedBank.ifsc}</p>
                          </div>
                          <CreditCard className="w-10 h-10 text-blue-600 opacity-50" />
                        </div>
                      </div>

                      {/* Timings */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          <Clock className="w-5 h-5 text-blue-600" />
                          {language === 'ta' ? 'நேரம்' : 'Timings'}
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-gray-700">{selectedBank.timings}</p>
                        </div>
                      </div>

                      {/* Services */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          <Sparkles className="w-5 h-5 text-blue-600" />
                          {language === 'ta' ? 'சேவைகள்' : 'Services'}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedBank.services.map((service: string, idx: number) => (
                            <div key={idx} className="bg-gradient-to-br from-blue-50 to-white p-3 rounded-lg border border-blue-100">
                              <p className="text-sm text-blue-900">{service}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          <Phone className="w-5 h-5 text-blue-600" />
                          {language === 'ta' ? 'தொடர்பு' : 'Contact'}
                        </h4>
                        <a 
                          href={`tel:${selectedBank.phone}`}
                          className="block bg-blue-600 text-white p-4 rounded-xl text-center hover:bg-blue-700 transition-colors"
                        >
                          {selectedBank.phone}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* User-Friendly Bottom Sheet - Banks */}
              <AnimatePresence>
                {selectedBank && isMobile && (
                  <>
                    {/* Subtle Background Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/40 z-40"
                      onClick={() => setSelectedBank(null)}
                    />
                    
                    {/* Bottom Sheet */}
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                      className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh]"
                    >
                      {/* Neural Network Background Effect */}
                      {/* Modern Bottom Sheet Container */}
                      <div className="bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-full">
                        {/* Drag Handle */}
                        <div className="pt-3 pb-2 flex justify-center">
                          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        {/* Header with Gradient */}
                        <div className="px-5 pb-4 pt-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-blue-100">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                                <Building2 className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-gray-900 truncate">
                                  {language === 'ta' ? selectedBank.nameTa : selectedBank.name}
                                </h3>
                                <p className="text-gray-600 text-sm flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span className="truncate">{selectedBank.branch}</span>
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedBank(null)}
                              className="p-2 hover:bg-white/50 rounded-xl transition-colors ml-2"
                            >
                              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ maxHeight: 'calc(80vh - 180px)' }}>
                          {/* IFSC Code Card */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-blue-100 text-sm">{language === 'ta' ? 'IFSC குறியீடு' : 'IFSC Code'}</span>
                              <CreditCard className="w-5 h-5 text-blue-200" />
                            </div>
                            <p className="text-white text-xl tracking-widest font-mono">{selectedBank.ifsc}</p>
                          </motion.div>

                          {/* Business Hours */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="bg-gray-50 rounded-2xl p-4 border border-gray-200"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-5 h-5 text-blue-600" />
                              <h4 className="text-gray-900">{language === 'ta' ? 'நேரம்' : 'Business Hours'}</h4>
                            </div>
                            <p className="text-gray-700 text-sm">{selectedBank.timings}</p>
                          </motion.div>

                          {/* Services Grid */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <Sparkles className="w-5 h-5 text-indigo-600" />
                              <h4 className="text-gray-900">{language === 'ta' ? 'சேவைகள்' : 'Services'}</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {selectedBank.services.map((service: string, idx: number) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.25 + idx * 0.03 }}
                                  className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm"
                                >
                                  <p className="text-gray-700 text-sm">{service}</p>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </div>

                        {/* Action Button */}
                        <div className="p-5 bg-gray-50 border-t border-gray-200">
                          <motion.a
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            href={`tel:${selectedBank.phone}`}
                            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl hover:shadow-lg transition-all active:scale-95"
                          >
                            <Phone className="w-5 h-5" />
                            <span>{selectedBank.phone}</span>
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </SheetContent>
        </Sheet>

        {/* Hospitals Sheet */}
        <Sheet open={hospitalsSheetOpen} onOpenChange={(open) => {
          setHospitalsSheetOpen(open);
          if (!open) setSelectedHospital(null);
        }}>
          <SheetContent 
            side={isMobile ? "bottom" : "left"}
            className={`p-0 overflow-hidden transition-all duration-300 ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : selectedHospital ? 'sm:max-w-[85vw] max-w-6xl' : 'sm:max-w-xl'
            }`}
          >
            <div className={`relative bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 ${
              isMobile ? 'p-4 pb-4 rounded-t-3xl' : 'p-6 pb-8'
            }`}>
              <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
              {isMobile && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/30 rounded-full"></div>
              )}
              <div className={`relative z-10 ${isMobile ? 'pt-2' : ''}`}>
                <SheetHeader>
                  <SheetTitle className={`flex items-center gap-3 text-white ${isMobile ? 'text-lg' : 'text-2xl'}`}>
                    <div className={`p-2 bg-white/20 backdrop-blur-sm rounded-lg ${isMobile ? 'p-1.5' : 'p-2'}`}>
                      <Hospital className={isMobile ? 'w-4 h-4' : 'w-6 h-6'} />
                    </div>
                    {language === 'ta' ? 'மருத்துவமனைகள்' : 'Hospitals in Karur'}
                  </SheetTitle>
                  <SheetDescription className={`text-white/90 flex items-center gap-2 mt-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <Sparkles className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
                    {language === 'ta' ? 'தரமான சுகாதார சேவைகள்' : 'Quality healthcare facilities'}
                  </SheetDescription>
                </SheetHeader>
                
                {/* Category Tabs with Intelligent Navigation */}
                <div className={`${isMobile ? 'mt-2' : 'mt-4'} relative group`}>
                  {/* Left Navigation Arrow */}
                  <AnimatePresence>
                    {showLeftGradient && (
                      <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        onClick={() => {
                          if (tabsContainerRef.current) {
                            tabsContainerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
                          }
                        }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-gradient-to-r from-green-700 via-green-600 to-transparent rounded-full flex items-center justify-center hover:from-green-600 hover:via-green-500 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChevronLeft className="w-4 h-4 text-white" />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {/* Right Navigation Arrow */}
                  <AnimatePresence>
                    {showRightGradient && (
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        onClick={() => {
                          if (tabsContainerRef.current) {
                            tabsContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
                          }
                        }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-gradient-to-l from-green-700 via-green-600 to-transparent rounded-full flex items-center justify-center hover:from-green-600 hover:via-green-500 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChevronRight className="w-4 h-4 text-white" />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {/* Tabs Container */}
                  <div 
                    ref={tabsContainerRef}
                    onScroll={handleTabScroll}
                    className="flex gap-2 overflow-x-auto scrollbar-hide p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 scroll-smooth snap-x snap-mandatory"
                    style={{ 
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    <motion.button
                      data-tab="allopathy"
                      className={`snap-center flex-shrink-0 flex items-center justify-center gap-1 ${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-md text-xs font-medium transition-all duration-300 ${
                        hospitalTab === 'allopathy'
                          ? 'bg-gradient-to-r from-green-500/40 to-emerald-500/40 text-white border border-white/30 shadow-lg shadow-green-500/30 scale-105'
                          : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                      }`}
                      onClick={() => setHospitalTab('allopathy')}
                      whileHover={{ scale: hospitalTab === 'allopathy' ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Activity className={isMobile ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
                      <span>{language === 'ta' ? 'அலோபதி' : 'Allopathy'}</span>
                    </motion.button>
                    <motion.button
                      data-tab="homeopathy"
                      className={`snap-center flex-shrink-0 flex items-center justify-center gap-1 ${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-md text-xs font-medium transition-all duration-300 ${
                        hospitalTab === 'homeopathy'
                          ? 'bg-gradient-to-r from-teal-500/40 to-cyan-500/40 text-white border border-white/30 shadow-lg shadow-teal-500/30 scale-105'
                          : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                      }`}
                      onClick={() => setHospitalTab('homeopathy')}
                      whileHover={{ scale: hospitalTab === 'homeopathy' ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles className={isMobile ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
                      <span>{language === 'ta' ? 'ஹோமியோபதி' : 'Homeopathy'}</span>
                    </motion.button>
                    <motion.button
                      data-tab="ayurvedic"
                      className={`snap-center flex-shrink-0 flex items-center justify-center gap-1 ${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-md text-xs font-medium transition-all duration-300 ${
                        hospitalTab === 'ayurvedic'
                          ? 'bg-gradient-to-r from-lime-500/40 to-green-500/40 text-white border border-white/30 shadow-lg shadow-lime-500/30 scale-105'
                          : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                      }`}
                      onClick={() => setHospitalTab('ayurvedic')}
                      whileHover={{ scale: hospitalTab === 'ayurvedic' ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Leaf className={isMobile ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
                      <span>{language === 'ta' ? 'ஆயுர்வேதம்' : 'Ayurvedic'}</span>
                    </motion.button>
                    <motion.button
                      data-tab="dental"
                      className={`snap-center flex-shrink-0 flex items-center justify-center gap-1 ${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-md text-xs font-medium transition-all duration-300 ${
                        hospitalTab === 'dental'
                          ? 'bg-gradient-to-r from-blue-500/40 to-indigo-500/40 text-white border border-white/30 shadow-lg shadow-blue-500/30 scale-105'
                          : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                      }`}
                      onClick={() => setHospitalTab('dental')}
                      whileHover={{ scale: hospitalTab === 'dental' ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Hospital className={isMobile ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
                      <span>{language === 'ta' ? 'பல்' : 'Dental'}</span>
                    </motion.button>
                    <motion.button
                      data-tab="eye"
                      className={`snap-center flex-shrink-0 flex items-center justify-center gap-1 ${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-md text-xs font-medium transition-all duration-300 ${
                        hospitalTab === 'eye'
                          ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white border border-white/30 shadow-lg shadow-purple-500/30 scale-105'
                          : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                      }`}
                      onClick={() => setHospitalTab('eye')}
                      whileHover={{ scale: hospitalTab === 'eye' ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye className={isMobile ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
                      <span>{language === 'ta' ? 'கண்' : 'Eye Care'}</span>
                    </motion.button>
                  </div>
                  
                  {/* Dot Navigation Indicators */}
                  <div className="mt-2 flex justify-center gap-1.5">
                    {['allopathy', 'homeopathy', 'ayurvedic', 'dental', 'eye'].map((tab) => (
                      <motion.button
                        key={tab}
                        onClick={() => setHospitalTab(tab as typeof hospitalTab)}
                        className={`transition-all duration-300 rounded-full ${
                          hospitalTab === tab 
                            ? 'w-6 h-1.5 bg-gradient-to-r from-white to-white/80' 
                            : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Switch to ${tab}`}
                      />
                    ))}
                  </div>
                </div>

                <div className={`${isMobile ? 'mt-2' : 'mt-3'} relative`}>
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-white/60`} />
                  <Input 
                    ref={hospitalSearchRef}
                    placeholder={language === 'ta' ? 'மருத்துவமனைகளைத் தேடுங்கள்...' : 'Search hospitals...'} 
                    value={hospitalSearch}
                    onChange={(e) => setHospitalSearch(e.target.value)}
                    onFocus={(e) => {
                      if (isMobile && !hospitalCanFocus) {
                        e.target.blur();
                      }
                    }}
                    className={`pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50 ${isMobile ? 'h-9 text-sm' : ''}`}
                    autoFocus={false}
                  />
                </div>
              </div>
            </div>

            <div className={`flex bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'flex-col h-[calc(85vh-280px)]' : 'flex-row h-[calc(100vh-340px)]'
            }`}>
              {/* Left Side - List */}
              <div className={`flex-shrink-0 overflow-y-auto ${
                isMobile ? 'p-4 w-full' : selectedHospital ? 'w-[45%] p-6 border-r border-gray-200' : 'w-full p-6'
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
                          <Card 
                            className={`hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500 group hover:scale-[1.02] cursor-pointer ${
                              selectedHospital?.name === hospital.name ? 'ring-2 ring-green-500 shadow-lg' : ''
                            }`}
                            onClick={() => setSelectedHospital(hospital)}
                          >
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

              {/* Right Side - Details */}
              <AnimatePresence>
                {selectedHospital && !isMobile && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-white to-green-50/30"
                  >
                    <div className="sticky top-0 bg-gradient-to-br from-white to-green-50/30 pb-4 mb-4 border-b border-gray-200 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl text-green-900 mb-1">{language === 'ta' ? selectedHospital.nameTa : selectedHospital.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Stethoscope className="w-4 h-4" />
                          {selectedHospital.specialty}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedHospital(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Beds */}
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-green-600 mb-1">{language === 'ta' ? 'படுக்கைகள்' : 'Beds Available'}</p>
                            <p className="text-xl text-green-900">{selectedHospital.beds}</p>
                          </div>
                          <Activity className="w-10 h-10 text-green-600 opacity-50" />
                        </div>
                      </div>

                      {/* Services */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          <Sparkles className="w-5 h-5 text-green-600" />
                          {language === 'ta' ? 'சேவைகள்' : 'Services'}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedHospital.services.map((service: string, idx: number) => (
                            <div key={idx} className="bg-gradient-to-br from-green-50 to-white p-3 rounded-lg border border-green-100">
                              <p className="text-sm text-green-900">{service}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          <Phone className="w-5 h-5 text-green-600" />
                          {language === 'ta' ? 'தொடர்பு' : 'Contact'}
                        </h4>
                        <a 
                          href={`tel:${selectedHospital.phone}`}
                          className="block bg-green-600 text-white p-4 rounded-xl text-center hover:bg-green-700 transition-colors"
                        >
                          {selectedHospital.phone}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* User-Friendly Bottom Sheet - Hospitals */}
              <AnimatePresence>
                {selectedHospital && isMobile && (
                  <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedHospital(null)} />
                    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh]">
                      <div className="bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-full">
                        <div className="pt-3 pb-2 flex justify-center"><div className="w-12 h-1.5 bg-gray-300 rounded-full" /></div>
                        <div className="px-5 pb-4 pt-2 bg-gradient-to-br from-green-50 to-emerald-50 border-b border-green-100">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg"><Hospital className="w-6 h-6 text-white" /></div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-gray-900 truncate">{language === 'ta' ? selectedHospital.nameTa : selectedHospital.name}</h3>
                                <p className="text-gray-600 text-sm flex items-center gap-1.5"><Stethoscope className="w-3.5 h-3.5 flex-shrink-0" /><span className="truncate">{selectedHospital.specialty}</span></p>
                              </div>
                            </div>
                            <button onClick={() => setSelectedHospital(null)} className="p-2 hover:bg-white/50 rounded-xl transition-colors ml-2">
                              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ maxHeight: 'calc(80vh - 180px)' }}>
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 shadow-lg">
                            <div className="flex items-center justify-between mb-2"><span className="text-green-100 text-sm">{language === 'ta' ? 'படுக்கைகள்' : 'Beds Available'}</span><Activity className="w-5 h-5 text-green-200" /></div>
                            <p className="text-white text-xl">{selectedHospital.beds}</p>
                          </motion.div>
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                            <div className="flex items-center gap-2 mb-3"><Sparkles className="w-5 h-5 text-emerald-600" /><h4 className="text-gray-900">{language === 'ta' ? 'சேவைகள்' : 'Medical Services'}</h4></div>
                            <div className="grid grid-cols-2 gap-2">{selectedHospital.services.map((service: string, idx: number) => <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + idx * 0.03 }} className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm"><p className="text-gray-700 text-sm">{service}</p></motion.div>)}</div>
                          </motion.div>
                        </div>
                        <div className="p-5 bg-gray-50 border-t border-gray-200">
                          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} href={`tel:${selectedHospital.phone}`} className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-2xl hover:shadow-lg transition-all active:scale-95"><Phone className="w-5 h-5" /><span>{selectedHospital.phone}</span></motion.a>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </SheetContent>
        </Sheet>

        {/* Transport Sheet */}
        <Sheet open={transportSheetOpen} onOpenChange={(open) => {
          setTransportSheetOpen(open);
          if (!open) setSelectedTransport(null);
        }}>
          <SheetContent 
            side={isMobile ? "bottom" : "left"} 
            className={`p-0 overflow-hidden transition-all duration-300 ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : selectedTransport ? 'sm:max-w-[85vw] max-w-6xl' : 'sm:max-w-xl'
            }`}
          >
            <div className={`relative bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 ${
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
                    {language === 'ta' ? 'போக்குவரத்து' : 'Transport Routes'}
                  </SheetTitle>
                  <SheetDescription className="text-white/90 flex items-center gap-2 mt-2 text-sm">
                    <Sparkles className="w-4 h-4" />
                    {language === 'ta' ? 'பேரூந்து மற்றும் ரயில் சேவைகள்' : 'Bus & Train services from Karur'}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input 
                    ref={transportSearchRef}
                    placeholder={language === 'ta' ? 'இலக்குகளைத் தேடுங்கள்...' : 'Search destinations...'} 
                    value={transportSearch}
                    onChange={(e) => setTransportSearch(e.target.value)}
                    onFocus={(e) => {
                      if (isMobile && !transportCanFocus) {
                        e.target.blur();
                      }
                    }}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                    autoFocus={false}
                  />
                </div>
              </div>
            </div>

            <div className={`flex bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'flex-col h-[calc(85vh-200px)]' : 'flex-row h-[calc(100vh-220px)]'
            }`}>
              {/* Left Side - List */}
              <div className={`flex-shrink-0 overflow-y-auto ${
                isMobile ? 'p-4 w-full' : selectedTransport ? 'w-[45%] p-6 border-r border-gray-200' : 'w-full p-6'
              }`}>
                <AnimatePresence mode="popLayout">
                  {filteredTransport.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 text-muted-foreground"
                    >
                      {language === 'ta' ? 'வழித்தடங்கள் இல்லை' : 'No routes found'}
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      {filteredTransport.map((route, index) => (
                        <motion.div
                          key={route.destination}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Card 
                            className={`hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500 group hover:scale-[1.02] cursor-pointer ${
                              selectedTransport?.destination === route.destination ? 'ring-2 ring-purple-500 shadow-lg' : ''
                            }`}
                            onClick={() => setSelectedTransport(route)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex-1">
                                  <h4 className="flex items-center gap-2 group-hover:text-purple-600 transition-colors mb-1">
                                    {route.type === 'bus' ? <Bus className="w-4 h-4 text-purple-600" /> : <Train className="w-4 h-4 text-purple-600" />}
                                    {language === 'ta' ? route.destinationTa : route.destination}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {route.operator}
                                  </p>
                                </div>
                                <Badge variant="outline" className="text-xs bg-purple-50 border-purple-200">
                                  {route.type === 'bus' ? 'Bus' : 'Train'}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {route.duration}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Side - Details */}
              <AnimatePresence>
                {selectedTransport && !isMobile && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-white to-purple-50/30"
                  >
                    <div className="sticky top-0 bg-gradient-to-br from-white to-purple-50/30 pb-4 mb-4 border-b border-gray-200 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl text-purple-900 mb-1">{language === 'ta' ? selectedTransport.destinationTa : selectedTransport.destination}</h3>
                        <p className="text-sm text-muted-foreground">{selectedTransport.operator}</p>
                      </div>
                      <button
                        onClick={() => setSelectedTransport(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Duration */}
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-purple-600 mb-1">{language === 'ta' ? 'பயண நேரம்' : 'Journey Duration'}</p>
                            <p className="text-xl text-purple-900">{selectedTransport.duration}</p>
                          </div>
                          <Clock className="w-10 h-10 text-purple-600 opacity-50" />
                        </div>
                      </div>

                      {/* Transport Type */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          {selectedTransport.type === 'bus' ? <Bus className="w-5 h-5 text-purple-600" /> : <Train className="w-5 h-5 text-purple-600" />}
                          {language === 'ta' ? 'போக்குவரத்து வகை' : 'Transport Type'}
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-gray-700 capitalize">{selectedTransport.type}</p>
                        </div>
                      </div>

                      {/* Timings */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          <Clock className="w-5 h-5 text-purple-600" />
                          {language === 'ta' ? 'நேரங்கள்' : 'Available Timings'}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedTransport.timings.map((timing: string, idx: number) => (
                            <div key={idx} className="bg-gradient-to-br from-purple-50 to-white p-3 rounded-lg border border-purple-100">
                              <p className="text-sm text-purple-900">{timing}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* User-Friendly Bottom Sheet - Transport */}
              <AnimatePresence>
                {selectedTransport && isMobile && (
                  <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedTransport(null)} />
                    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh]">
                      <div className="bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-full">
                        <div className="pt-3 pb-2 flex justify-center"><div className="w-12 h-1.5 bg-gray-300 rounded-full" /></div>
                        <div className="px-5 pb-4 pt-2 bg-gradient-to-br from-purple-50 to-indigo-50 border-b border-purple-100">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg"><Bus className="w-6 h-6 text-white" /></div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-gray-900 truncate">{language === 'ta' ? selectedTransport.nameTa : selectedTransport.name}</h3>
                                <p className="text-gray-600 text-sm flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 flex-shrink-0" /><span className="truncate">{selectedTransport.location}</span></p>
                              </div>
                            </div>
                            <button onClick={() => setSelectedTransport(null)} className="p-2 hover:bg-white/50 rounded-xl transition-colors ml-2">
                              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ maxHeight: 'calc(80vh - 180px)' }}>
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-4 shadow-lg">
                            <div className="flex items-center justify-between mb-2"><span className="text-purple-100 text-sm">{language === 'ta' ? 'வகை' : 'Transport Type'}</span><Train className="w-5 h-5 text-purple-200" /></div>
                            <p className="text-white text-xl">{selectedTransport.type}</p>
                          </motion.div>
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                            <div className="flex items-center gap-2 mb-3"><Clock className="w-5 h-5 text-purple-600" /><h4 className="text-gray-900">{language === 'ta' ? 'நேரங்கள்' : 'Timings'}</h4></div>
                            <div className="grid grid-cols-2 gap-2">{selectedTransport.timings.map((timing: string, idx: number) => <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + idx * 0.03 }} className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm"><p className="text-gray-700 text-sm">{timing}</p></motion.div>)}</div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </SheetContent>
        </Sheet>

        {/* Shopping Sheet */}
        <Sheet open={shopsSheetOpen} onOpenChange={(open) => {
          setShopsSheetOpen(open);
          if (!open) setSelectedShop(null);
        }}>
          <SheetContent 
            side={isMobile ? "bottom" : "left"} 
            className={`p-0 overflow-hidden transition-all duration-300 ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : selectedShop ? 'sm:max-w-[85vw] max-w-6xl' : 'sm:max-w-xl'
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
                    {language === 'ta' ? 'கடைகள்' : 'Shopping in Karur'}
                  </SheetTitle>
                  <SheetDescription className="text-white/90 flex items-center gap-2 mt-2 text-sm">
                    <Sparkles className="w-4 h-4" />
                    {language === 'ta' ? 'சந்தைகள் மற்றும் கடைகள்' : 'Markets & Shopping Centers'}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input 
                    ref={shopSearchRef}
                    placeholder={language === 'ta' ? 'கடைகளைத் தேடுங்கள்...' : 'Search shops...'} 
                    value={shopSearch}
                    onChange={(e) => setShopSearch(e.target.value)}
                    onFocus={(e) => {
                      if (isMobile && !shopCanFocus) {
                        e.target.blur();
                      }
                    }}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                    autoFocus={false}
                  />
                </div>
              </div>
            </div>

            <div className={`flex bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'flex-col h-[calc(85vh-200px)]' : 'flex-row h-[calc(100vh-220px)]'
            }`}>
              {/* Left Side - List */}
              <div className={`flex-shrink-0 overflow-y-auto ${
                isMobile ? 'p-4 w-full' : selectedShop ? 'w-[45%] p-6 border-r border-gray-200' : 'w-full p-6'
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
                          <Card 
                            className={`hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500 group hover:scale-[1.02] cursor-pointer ${
                              selectedShop?.name === shop.name ? 'ring-2 ring-orange-500 shadow-lg' : ''
                            }`}
                            onClick={() => setSelectedShop(shop)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex-1">
                                  <h4 className="flex items-center gap-2 group-hover:text-orange-600 transition-colors mb-1">
                                    <ShoppingBag className="w-4 h-4 text-orange-600" />
                                    {language === 'ta' ? shop.nameTa : shop.name}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">{shop.type}</p>
                                </div>
                                <Badge variant="outline" className="text-xs bg-orange-50 border-orange-200">
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

              {/* Right Side - Details */}
              <AnimatePresence>
                {selectedShop && !isMobile && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-white to-orange-50/30"
                  >
                    <div className="sticky top-0 bg-gradient-to-br from-white to-orange-50/30 pb-4 mb-4 border-b border-gray-200 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl text-orange-900 mb-1">{language === 'ta' ? selectedShop.nameTa : selectedShop.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedShop.type}</p>
                      </div>
                      <button
                        onClick={() => setSelectedShop(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Location */}
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border-2 border-orange-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-orange-600 mb-1">{language === 'ta' ? 'இடம்' : 'Location'}</p>
                            <p className="text-xl text-orange-900">{selectedShop.area}</p>
                          </div>
                          <MapPin className="w-10 h-10 text-orange-600 opacity-50" />
                        </div>
                      </div>

                      {/* Items Available */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          <ShoppingBag className="w-5 h-5 text-orange-600" />
                          {language === 'ta' ? 'கிடைக்கும் பொருட்கள்' : 'Items Available'}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedShop.items.map((item: string, idx: number) => (
                            <div key={idx} className="bg-gradient-to-br from-orange-50 to-white p-3 rounded-lg border border-orange-100">
                              <p className="text-sm text-orange-900">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* User-Friendly Bottom Sheet - Shopping */}
              <AnimatePresence>
                {selectedShop && isMobile && (
                  <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedShop(null)} />
                    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh]">
                      <div className="bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-full">
                        <div className="pt-3 pb-2 flex justify-center"><div className="w-12 h-1.5 bg-gray-300 rounded-full" /></div>
                        <div className="px-5 pb-4 pt-2 bg-gradient-to-br from-orange-50 to-amber-50 border-b border-orange-100">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                              <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-lg"><ShoppingBag className="w-6 h-6 text-white" /></div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-gray-900 truncate">{language === 'ta' ? selectedShop.nameTa : selectedShop.name}</h3>
                                <p className="text-gray-600 text-sm flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 flex-shrink-0" /><span className="truncate">{selectedShop.location}</span></p>
                              </div>
                            </div>
                            <button onClick={() => setSelectedShop(null)} className="p-2 hover:bg-white/50 rounded-xl transition-colors ml-2">
                              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ maxHeight: 'calc(80vh - 180px)' }}>
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-4 shadow-lg">
                            <div className="flex items-center justify-between mb-2"><span className="text-orange-100 text-sm">{language === 'ta' ? 'வகை' : 'Category'}</span><Tag className="w-5 h-5 text-orange-200" /></div>
                            <p className="text-white text-xl">{selectedShop.type}</p>
                          </motion.div>
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                            <div className="flex items-center gap-2 mb-3"><Sparkles className="w-5 h-5 text-orange-600" /><h4 className="text-gray-900">{language === 'ta' ? 'பொருட்கள்' : 'Available Items'}</h4></div>
                            <div className="grid grid-cols-2 gap-2">{selectedShop.items.map((item: string, idx: number) => <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + idx * 0.03 }} className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm"><p className="text-gray-700 text-sm">{item}</p></motion.div>)}</div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </SheetContent>
        </Sheet>

        {/* Theatres Sheet */}
        <Sheet open={theatresSheetOpen} onOpenChange={(open) => {
          setTheatresSheetOpen(open);
          if (!open) setSelectedTheatre(null);
        }}>
          <SheetContent 
            side={isMobile ? "bottom" : "left"} 
            className={`p-0 overflow-hidden transition-all duration-300 ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : selectedTheatre ? 'sm:max-w-[85vw] max-w-6xl' : 'sm:max-w-xl'
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
                    {language === 'ta' ? 'திரைப்பட அரங்குகள்' : 'Movie theatres and multiplexes'}
                  </SheetDescription>
                </SheetHeader>
              </div>
            </div>

            <div className={`flex bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'flex-col h-[calc(85vh-180px)]' : 'flex-row h-[calc(100vh-200px)]'
            }`}>
              {/* Left Side - List */}
              <div className={`flex-shrink-0 overflow-y-auto ${
                isMobile ? 'p-4 w-full' : selectedTheatre ? 'w-[45%] p-6 border-r border-gray-200' : 'w-full p-6'
              }`}>
                <div className="space-y-4">
                  {theatres.map((theatre, index) => (
                    <motion.div
                      key={theatre.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card 
                        className={`hover:shadow-lg transition-all duration-300 border-l-4 border-l-pink-500 group hover:scale-[1.02] cursor-pointer ${
                          selectedTheatre?.name === theatre.name ? 'ring-2 ring-pink-500 shadow-lg' : ''
                        }`}
                        onClick={() => setSelectedTheatre(theatre)}
                      >
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

              {/* Right Side - Details */}
              <AnimatePresence>
                {selectedTheatre && !isMobile && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-white to-pink-50/30"
                  >
                    <div className="sticky top-0 bg-gradient-to-br from-white to-pink-50/30 pb-4 mb-4 border-b border-gray-200 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl text-pink-900 mb-1">{language === 'ta' ? selectedTheatre.nameTa : selectedTheatre.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {selectedTheatre.location}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedTheatre(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Screens */}
                      <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl border-2 border-pink-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-pink-600 mb-1">{language === 'ta' ? 'திரைகள்' : 'Screens'}</p>
                            <p className="text-xl text-pink-900">{selectedTheatre.screens}</p>
                          </div>
                          <Film className="w-10 h-10 text-pink-600 opacity-50" />
                        </div>
                      </div>

                      {/* Facilities */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          <Sparkles className="w-5 h-5 text-pink-600" />
                          {language === 'ta' ? 'வசதிகள்' : 'Facilities'}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedTheatre.facilities.map((facility: string, idx: number) => (
                            <div key={idx} className="bg-gradient-to-br from-pink-50 to-white p-3 rounded-lg border border-pink-100">
                              <p className="text-sm text-pink-900">{facility}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SheetContent>
        </Sheet>

        {/* Restaurants Sheet */}
        <Sheet open={restaurantsSheetOpen} onOpenChange={(open) => {
          setRestaurantsSheetOpen(open);
          if (!open) setSelectedRestaurant(null);
        }}>
          <SheetContent 
            side={isMobile ? "bottom" : "left"} 
            className={`p-0 overflow-hidden transition-all duration-300 ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : selectedRestaurant ? 'sm:max-w-[85vw] max-w-6xl' : 'sm:max-w-xl'
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
                    {language === 'ta' ? 'உணவகங்கள்' : 'Restaurants in Karur'}
                  </SheetTitle>
                  <SheetDescription className="text-white/90 flex items-center gap-2 mt-2 text-sm">
                    <Sparkles className="w-4 h-4" />
                    {language === 'ta' ? 'உணவு மற்றும் உணவகங்கள்' : 'Dining & Food Options'}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input 
                    ref={restaurantSearchRef}
                    placeholder={language === 'ta' ? 'உணவகங்களைத் தேடுங்கள்...' : 'Search restaurants...'} 
                    value={restaurantSearch}
                    onChange={(e) => setRestaurantSearch(e.target.value)}
                    onFocus={(e) => {
                      if (isMobile && !restaurantCanFocus) {
                        e.target.blur();
                      }
                    }}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                    autoFocus={false}
                  />
                </div>
              </div>
            </div>

            <div className={`flex bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'flex-col h-[calc(85vh-200px)]' : 'flex-row h-[calc(100vh-220px)]'
            }`}>
              {/* Left Side - List */}
              <div className={`flex-shrink-0 overflow-y-auto ${
                isMobile ? 'p-4 w-full' : selectedRestaurant ? 'w-[45%] p-6 border-r border-gray-200' : 'w-full p-6'
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
                          <Card 
                            className={`hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500 group hover:scale-[1.02] cursor-pointer ${
                              selectedRestaurant?.name === restaurant.name ? 'ring-2 ring-red-500 shadow-lg' : ''
                            }`}
                            onClick={() => setSelectedRestaurant(restaurant)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex-1">
                                  <h4 className="flex items-center gap-2 group-hover:text-red-600 transition-colors mb-1">
                                    <UtensilsCrossed className="w-4 h-4 text-red-600" />
                                    {language === 'ta' ? restaurant.nameTa : restaurant.name}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
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
                                {restaurant.specialties.slice(0, 3).map((specialty, idx) => (
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

              {/* Right Side - Details */}
              <AnimatePresence>
                {selectedRestaurant && !isMobile && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-white to-red-50/30"
                  >
                    <div className="sticky top-0 bg-gradient-to-br from-white to-red-50/30 pb-4 mb-4 border-b border-gray-200 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl text-red-900 mb-1">{language === 'ta' ? selectedRestaurant.nameTa : selectedRestaurant.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedRestaurant.cuisine}</p>
                      </div>
                      <button
                        onClick={() => setSelectedRestaurant(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Price Range */}
                      <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border-2 border-red-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-red-600 mb-1">{language === 'ta' ? 'விலை வரம்பு' : 'Price Range'}</p>
                            <p className="text-xl text-red-900">{selectedRestaurant.priceRange}</p>
                          </div>
                          <UtensilsCrossed className="w-10 h-10 text-red-600 opacity-50" />
                        </div>
                      </div>

                      {/* Location & Timings */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          <MapPin className="w-5 h-5 text-red-600" />
                          {language === 'ta' ? 'இடம் & நேரம்' : 'Location & Timings'}
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                          <p className="text-gray-700 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {selectedRestaurant.location}
                          </p>
                          <p className="text-gray-700 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {selectedRestaurant.timings}
                          </p>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          <Sparkles className="w-5 h-5 text-red-600" />
                          {language === 'ta' ? 'சிறப்பு உணவுகள்' : 'Specialties'}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedRestaurant.specialties.map((specialty: string, idx: number) => (
                            <div key={idx} className="bg-gradient-to-br from-red-50 to-white p-3 rounded-lg border border-red-100">
                              <p className="text-sm text-red-900">{specialty}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SheetContent>
        </Sheet>

        {/* Hotels Sheet */}
        <Sheet open={hotelsSheetOpen} onOpenChange={(open) => {
          setHotelsSheetOpen(open);
          if (!open) setSelectedHotel(null);
        }}>
          <SheetContent 
            side={isMobile ? "bottom" : "left"} 
            className={`p-0 overflow-hidden transition-all duration-300 ${
              isMobile ? 'h-[85vh] rounded-t-3xl' : selectedHotel ? 'sm:max-w-[85vw] max-w-6xl' : 'sm:max-w-xl'
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
                    {language === 'ta' ? 'ஹோட்டல்கள் மற்றும் லாட்ஜ்கள்' : 'Hotels, Lodges & Accommodations'}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input 
                    ref={hotelSearchRef}
                    placeholder={language === 'ta' ? 'ஹோட்டல்களைத் தேடுங்கள்...' : 'Search hotels...'} 
                    value={hotelSearch}
                    onChange={(e) => setHotelSearch(e.target.value)}
                    onFocus={(e) => {
                      if (isMobile && !hotelCanFocus) {
                        e.target.blur();
                      }
                    }}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                    autoFocus={false}
                  />
                </div>
              </div>
            </div>

            <div className={`flex bg-gradient-to-b from-gray-50 to-white ${
              isMobile ? 'flex-col h-[calc(85vh-200px)]' : 'flex-row h-[calc(100vh-220px)]'
            }`}>
              {/* Left Side - List */}
              <div className={`flex-shrink-0 overflow-y-auto ${
                isMobile ? 'p-4 w-full' : selectedHotel ? 'w-[45%] p-6 border-r border-gray-200' : 'w-full p-6'
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
                          <Card 
                            className={`hover:shadow-lg transition-all duration-300 border-l-4 border-l-cyan-500 group hover:scale-[1.02] cursor-pointer ${
                              selectedHotel?.name === hotel.name ? 'ring-2 ring-cyan-500 shadow-lg' : ''
                            }`}
                            onClick={() => setSelectedHotel(hotel)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex-1">
                                  <h4 className="flex items-center gap-2 group-hover:text-cyan-600 transition-colors mb-1">
                                    <Hotel className="w-4 h-4 text-cyan-600" />
                                    {language === 'ta' ? hotel.nameTa : hotel.name}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">{hotel.type}</p>
                                </div>
                                <Badge variant="outline" className="text-xs bg-cyan-50 border-cyan-200">
                                  {hotel.priceRange}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                <MapPin className="w-3 h-3" />
                                {hotel.location}
                                <span className="mx-1">•</span>
                                <Star className="w-3 h-3" />
                                {hotel.rooms}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {hotel.amenities.slice(0, 3).map((amenity, idx) => (
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

              {/* Right Side - Details */}
              <AnimatePresence>
                {selectedHotel && !isMobile && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-white to-cyan-50/30"
                  >
                    <div className="sticky top-0 bg-gradient-to-br from-white to-cyan-50/30 pb-4 mb-4 border-b border-gray-200 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl text-cyan-900 mb-1">{language === 'ta' ? selectedHotel.nameTa : selectedHotel.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedHotel.type}</p>
                      </div>
                      <button
                        onClick={() => setSelectedHotel(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Price Range & Rooms */}
                      <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-xl border-2 border-cyan-200">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-sm text-cyan-600 mb-1">{language === 'ta' ? 'விலை வரம்பு' : 'Price Range'}</p>
                            <p className="text-xl text-cyan-900">{selectedHotel.priceRange}</p>
                          </div>
                          <Hotel className="w-10 h-10 text-cyan-600 opacity-50" />
                        </div>
                        <div className="border-t border-cyan-200 pt-3">
                          <p className="text-sm text-cyan-600 mb-1">{language === 'ta' ? 'அறைகள்' : 'Rooms Available'}</p>
                          <p className="text-lg text-cyan-900">{selectedHotel.rooms}</p>
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          <MapPin className="w-5 h-5 text-cyan-600" />
                          {language === 'ta' ? 'இடம்' : 'Location'}
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-gray-700">{selectedHotel.location}</p>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          <Sparkles className="w-5 h-5 text-cyan-600" />
                          {language === 'ta' ? 'வசதிகள்' : 'Amenities'}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedHotel.amenities.map((amenity: string, idx: number) => (
                            <div key={idx} className="bg-gradient-to-br from-cyan-50 to-white p-3 rounded-lg border border-cyan-100">
                              <p className="text-sm text-cyan-900">{amenity}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div>
                        <h4 className="flex items-center gap-2 text-gray-900 mb-3">
                          <Phone className="w-5 h-5 text-cyan-600" />
                          {language === 'ta' ? 'தொடர்பு' : 'Contact'}
                        </h4>
                        <a 
                          href={`tel:${selectedHotel.phone}`}
                          className="block bg-cyan-600 text-white p-4 rounded-xl text-center hover:bg-cyan-700 transition-colors"
                        >
                          {selectedHotel.phone}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </section>
  );
}
