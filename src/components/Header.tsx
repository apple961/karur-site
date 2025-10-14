import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { MapPin, Menu, Clock, Sun, Cloud, CloudSun, Snowflake, Loader2, Droplets, Wind, Languages, Home, History, MapPinned, Briefcase, GraduationCap, Image, Mail, Sparkles, Circle, Newspaper, TrendingUp, Calendar, Radio, Video, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useWeather } from "./hooks/useWeather";
import { useLanguage } from "./context/LanguageContext";
import { useKarurNews, getTimeAgo, VideoItem } from "./hooks/useKarurNews";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'news' | 'videos'>('news');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const islandRef = useRef<HTMLDivElement>(null);
  const { weather, loading: weatherLoading, error: weatherError } = useWeather('Karur');
  const { language, setLanguage, t } = useLanguage();
  const { news, videos, loading: newsLoading } = useKarurNews();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Click outside to close Dynamic Island
    const handleClickOutside = (event: MouseEvent) => {
      if (islandRef.current && !islandRef.current.contains(event.target as Node)) {
        setIslandExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      clearInterval(timer);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu after navigation
      setMobileMenuOpen(false);
    }
  };

  // Dynamic Island News Feed Data - Map real news to display format
  const newsCategories = [Newspaper, TrendingUp, Calendar, Radio, Sparkles, MapPin];
  const newsColors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500", 
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-violet-500",
    "from-rose-500 to-pink-500"
  ];

  const newsItems = news.map((item, index) => ({
    icon: newsCategories[index % newsCategories.length],
    title: item.title,
    desc: item.description,
    time: getTimeAgo(item.publishedAt, language),
    color: newsColors[index % newsColors.length],
    url: item.url,
    source: item.source
  }));

  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'sun':
        return Sun;
      case 'cloud':
        return Cloud;
      case 'cloud-sun':
        return CloudSun;
      case 'snowflake':
        return Snowflake;
      default:
        return Sun;
    }
  };

  const getWeatherColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'bg-yellow-500/40 border-yellow-400/50 text-yellow-200';
      case 'cloudy':
        return 'bg-gray-500/40 border-gray-400/50 text-gray-200';
      case 'partly cloudy':
        return 'bg-blue-500/40 border-blue-400/50 text-blue-200';
      case 'snow':
        return 'bg-blue-300/40 border-blue-300/50 text-blue-100';
      default:
        return 'bg-green-500/40 border-green-400/50 text-green-200';
    }
  };

  const navItems = [
    { label: t('nav.home'), href: "about", icon: Home, color: "from-blue-500 to-cyan-500" },
    { label: t('nav.history'), href: "history", icon: History, color: "from-purple-500 to-pink-500" },
    { label: t('nav.attractions'), href: "attractions", icon: MapPinned, color: "from-green-500 to-emerald-500" },
    { label: t('nav.services'), href: "services", icon: Briefcase, color: "from-orange-500 to-red-500" },
    { label: t('nav.education'), href: "events", icon: GraduationCap, color: "from-indigo-500 to-purple-500" },
    { label: t('nav.gallery'), href: "gallery", icon: Image, color: "from-pink-500 to-rose-500" },
    { label: t('nav.contact'), href: "contact", icon: Mail, color: "from-teal-500 to-cyan-500" }
  ];

  return (
    <motion.header
      className="fixed top-0 w-full z-50 p-2"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`max-w-5xl mx-auto transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20' 
          : 'bg-black/20 backdrop-blur-lg border border-white/15 shadow-xl shadow-black/10'
      } rounded-xl px-4 py-2 text-white relative overflow-hidden`}
      >
        {/* Crystal reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/8 pointer-events-none rounded-xl" />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none rounded-xl" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <motion.div 
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => scrollToSection('about')}
              >
                <div className="p-1.5 bg-white/25 backdrop-blur-sm rounded-lg border border-white/40 shadow-lg">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">Karur</h1>
                  <p className="text-xs text-white/80">Textile Capital</p>
                </div>
              </motion.div>

              {/* Dynamic Island Empty Space - Mobile Only */}
              <motion.div
                onClick={() => setIslandExpanded(!islandExpanded)}
                className="lg:hidden flex-1 max-w-[120px] relative h-8 bg-gradient-to-r from-black/30 via-black/20 to-black/30 backdrop-blur-md rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Pulsing indicator dots - Live indicator */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
                  {newsLoading ? (
                    <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
                  ) : (
                    <>
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-green-400"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      {newsItems.length > 0 && (
                        <motion.div
                          className="w-1 h-1 rounded-full bg-red-500"
                          animate={{ 
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1.5
                  }}
                />
              </motion.div>
            </div>
          
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  className="px-3 py-1.5 rounded-lg text-sm text-white/95 hover:text-white hover:bg-white/25 backdrop-blur-sm transition-all duration-300 cursor-pointer relative group border border-transparent hover:border-white/40"
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.label}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </motion.a>
              ))}
            </nav>

            {/* Desktop Status Info */}
            <div className="hidden xl:flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <Clock className="h-3 w-3 text-white/90" />
                <span className="text-white/95">{currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`px-2 py-1 backdrop-blur-sm rounded-lg border flex items-center gap-1 cursor-help transition-all duration-300 hover:scale-105 ${
                      weather ? getWeatherColor(weather.condition) : 'bg-green-500/40 border-green-400/50 text-green-200'
                    }`}>
                      {weatherLoading ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        (() => {
                          const IconComponent = weather ? getWeatherIcon(weather.icon) : Sun;
                          return <IconComponent className="w-3 h-3" />;
                        })()
                      )}
                      <span className="text-xs">
                        {weatherLoading ? 'Loading...' : weather ? `${Math.round((weather.temperature - 32) * 5/9)}°C` : '28°C'}
                      </span>
                    </div>
                  </TooltipTrigger>
                  {weather && !weatherLoading && (
                    <TooltipContent className="bg-black/80 backdrop-blur-xl border-white/20 text-white">
                      <div className="space-y-1">
                        <div className="font-medium">{weather.condition} in {weather.city}, Tamil Nadu</div>
                        <div className="flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1">
                            <Droplets className="w-3 h-3" />
                            <span>{weather.humidity}% humidity</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Wind className="w-3 h-3" />
                            <span>{weather.windSpeed} km/h</span>
                          </div>
                        </div>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              
              {/* Language Toggle */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
                      className="h-7 px-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/30 text-white/95 hover:text-white transition-all duration-300"
                    >
                      <Languages className="h-3 w-3 mr-1" />
                      <span className="text-xs font-medium">
                        {language === 'en' ? 'தமிழ்' : 'EN'}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black/80 backdrop-blur-xl border-white/20 text-white">
                    <span className="text-xs">
                      {language === 'en' ? 'தமிழில் மாற்றவும்' : 'Switch to English'}
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <motion.button 
                    className="relative p-2 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300 overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Menu className="h-5 w-5 text-white relative z-10" />
                    <motion.div 
                      className="absolute inset-0 bg-white/20"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0 border-none bg-transparent">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Futuristic navigation menu for Karur city website
                  </SheetDescription>
                  
                  {/* Futuristic Container */}
                  <div className="h-full relative overflow-hidden bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-2xl">
                    {/* Animated Background Grid */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `
                          linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                      }} />
                    </div>
                    
                    {/* Animated Gradient Orbs */}
                    <motion.div 
                      className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/30 to-teal-500/30 rounded-full blur-3xl"
                      animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <div className="relative z-10 h-full flex flex-col p-4">
                      {/* Header Section with Glassmorphism */}
                      <motion.div 
                        className="mb-3 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg blur-md opacity-50" />
                              <div className="relative p-1.5 bg-gradient-to-br from-blue-500/90 to-purple-500/90 rounded-lg">
                                <MapPin className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            <div>
                              <h2 className="text-base font-bold text-white">Karur</h2>
                              <p className="text-xs text-white/60">Textile Capital</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <div className="flex-1 flex items-center gap-1.5 px-2 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                              <Clock className="h-3.5 w-3.5 text-blue-400" />
                              <span className="text-xs text-white/90">{currentTime.toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}</span>
                            </div>
                            
                            <div className={`px-2 py-1.5 backdrop-blur-sm rounded-lg border flex items-center gap-1.5 ${
                              weather ? getWeatherColor(weather.condition) : 'bg-green-500/20 border-green-400/30 text-green-300'
                            }`}>
                              {weatherLoading ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                (() => {
                                  const IconComponent = weather ? getWeatherIcon(weather.icon) : Sun;
                                  return <IconComponent className="w-3.5 h-3.5" />;
                                })()
                              )}
                              <span className="text-xs font-medium">
                                {weatherLoading ? '...' : weather ? `${Math.round((weather.temperature - 32) * 5/9)}°C` : '28°C'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Navigation Items */}
                      <nav className="flex-1 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {navItems.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <motion.button
                              key={item.label}
                              className="group relative w-full text-left p-2.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden"
                              onClick={() => scrollToSection(item.href)}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.06 }}
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* Gradient Background on Hover */}
                              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                              
                              {/* Shimmer Effect */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.6 }}
                              />
                              
                              <div className="relative z-10 flex items-center gap-2.5">
                                <div className={`relative p-1.5 rounded-md bg-gradient-to-br ${item.color} bg-opacity-20`}>
                                  <Icon className="h-4 w-4 text-white" />
                                  <motion.div
                                    className="absolute inset-0 rounded-md bg-white/20"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1.5, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                  />
                                </div>
                                <div className="flex-1">
                                  <span className="text-white text-sm font-medium">{item.label}</span>
                                </div>
                                <motion.div
                                  className="text-white/40 group-hover:text-white/80 transition-colors text-sm"
                                  initial={{ x: 0 }}
                                  whileHover={{ x: 4 }}
                                >
                                  →
                                </motion.div>
                              </div>
                              
                              {/* Bottom Glow */}
                              <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            </motion.button>
                          );
                        })}
                      </nav>
                      
                      {/* Language Toggle Section */}
                      <motion.div 
                        className="mt-2 p-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                        <motion.button
                          className="relative w-full flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/20 hover:border-white/40 transition-all duration-300 group"
                          onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md bg-white/10 group-hover:bg-white/20 transition-colors">
                              <Languages className="h-4 w-4 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="text-xs text-white font-medium">
                                {language === 'en' ? 'தமிழில் மாற்றவும்' : 'Switch to English'}
                              </div>
                            </div>
                          </div>
                          <div className="px-2 py-1 rounded-md bg-white/10 border border-white/20">
                            <span className="text-xs font-bold text-white">
                              {language === 'en' ? 'தமிழ்' : 'EN'}
                            </span>
                          </div>
                        </motion.button>
                      </motion.div>
                      
                      {/* Footer Sparkle */}
                      <motion.div 
                        className="mt-2 flex items-center justify-center gap-1.5 text-xs text-white/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <Sparkles className="h-3 w-3" />
                        <span>Intelligent Navigation</span>
                        <Sparkles className="h-3 w-3" />
                      </motion.div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Expanded News Feed - Dynamic Island Style */}
        <AnimatePresence>
          {islandExpanded && (
            <motion.div
              ref={islandRef}
              className="lg:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="px-4 pb-4 pt-2">
                <motion.div
                  className="bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden relative"
                  initial={{ scale: 0.95, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: -10 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '15px 15px'
                    }} />
                  </div>
                  
                  <motion.div 
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl pointer-events-none"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <div className="relative z-10 p-4">
                    {/* Header with Tabs */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-lg">
                            {activeTab === 'news' ? (
                              <Newspaper className="h-4 w-4 text-white" />
                            ) : (
                              <Video className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">
                              {language === 'en' ? 'Latest Updates' : 'சமீபத்திய செய்திகள்'}
                            </h4>
                            <p className="text-[10px] text-white/60">
                              {language === 'en' ? 'Karur District' : 'கரூர் மாவட்டம்'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Tabs */}
                      <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                        <motion.button
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                            activeTab === 'news'
                              ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white border border-white/20'
                              : 'text-white/60 hover:text-white/80'
                          }`}
                          onClick={() => setActiveTab('news')}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Newspaper className="h-3.5 w-3.5" />
                          <span>{language === 'en' ? 'News' : 'செய்திகள்'}</span>
                        </motion.button>
                        <motion.button
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                            activeTab === 'videos'
                              ? 'bg-gradient-to-r from-red-500/30 to-pink-500/30 text-white border border-white/20'
                              : 'text-white/60 hover:text-white/80'
                          }`}
                          onClick={() => setActiveTab('videos')}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Video className="h-3.5 w-3.5" />
                          <span>{language === 'en' ? 'Videos' : 'காணொளிகள்'}</span>
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* Content - News or Videos */}
                    <div className="relative -mx-1">
                      {newsLoading ? (
                        // Loading State
                        <div className="flex items-center justify-center py-8">
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-6 w-6 text-cyan-400 animate-spin" />
                            <span className="text-[10px] text-white/60">
                              {language === 'en' ? 'Loading latest content...' : 'சமீபத்திய உள்ளடக்கத்தை ஏற்றுகிறது...'}
                            </span>
                          </div>
                        </div>
                      ) : activeTab === 'news' ? (
                        // NEWS TAB
                        newsItems.length === 0 ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="flex flex-col items-center gap-2 text-center">
                              <Newspaper className="h-6 w-6 text-white/40" />
                              <span className="text-[10px] text-white/60">
                                {language === 'en' ? 'No news from today yet' : 'இன்று செய்திகள் இல்லை'}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex gap-3 overflow-x-auto scrollbar-hide px-1 pb-2 snap-x snap-mandatory">
                              {newsItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                  <motion.a
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex-shrink-0 w-[260px] p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer snap-start"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.08 }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                  >
                                    <div className="flex flex-col h-full">
                                      <div className="flex items-start gap-2.5 mb-2">
                                        <div className={`flex-shrink-0 p-2.5 rounded-lg bg-gradient-to-br ${item.color}`}>
                                          <Icon className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h5 className="text-xs font-medium text-white mb-1 line-clamp-2">
                                            {item.title}
                                          </h5>
                                          {item.source && (
                                            <span className="text-[9px] text-cyan-400/80">
                                              {item.source}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      <p className="text-[10px] text-white/70 mb-2 line-clamp-3 flex-1">
                                        {item.desc}
                                      </p>
                                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                                        <span className="text-[9px] text-white/50">
                                          {item.time}
                                        </span>
                                        <motion.div
                                          className="text-white/40 group-hover:text-white/80 transition-colors"
                                          initial={{ x: 0 }}
                                          whileHover={{ x: 2 }}
                                        >
                                          →
                                        </motion.div>
                                      </div>
                                    </div>
                                  </motion.a>
                                );
                              })}
                            </div>
                            
                            {/* Scroll Indicator */}
                            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                style={{ width: '40%' }}
                                initial={{ x: '-100%' }}
                                animate={{ x: '0%' }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                              />
                            </div>
                          </>
                        )
                      ) : (
                        // VIDEOS TAB
                        videos.length === 0 ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="flex flex-col items-center gap-2 text-center">
                              <Video className="h-6 w-6 text-white/40" />
                              <span className="text-[10px] text-white/60">
                                {language === 'en' ? 'No recent videos available' : 'சமீபத்திய காணொளிகள் இல்லை'}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex gap-3 overflow-x-auto scrollbar-hide px-1 pb-2 snap-x snap-mandatory">
                              {videos.map((video, index) => (
                                <motion.div
                                  key={index}
                                  onClick={() => {
                                    setSelectedVideo(video);
                                    setVideoDialogOpen(true);
                                  }}
                                  className="group flex-shrink-0 w-[260px] rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer snap-start overflow-hidden"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.08 }}
                                  whileHover={{ scale: 1.02, y: -2 }}
                                >
                                  {/* Video Thumbnail */}
                                  <div className="relative w-full aspect-video bg-black/40">
                                    <img
                                      src={video.thumbnail}
                                      alt={video.title}
                                      className="w-full h-full object-cover"
                                    />
                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-300">
                                      <motion.div
                                        className="p-3 rounded-full bg-red-500/90 group-hover:bg-red-500 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                      >
                                        <Play className="h-5 w-5 text-white fill-white" />
                                      </motion.div>
                                    </div>
                                    {/* Duration Badge */}
                                    {video.duration && (
                                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-[9px] text-white font-medium">
                                        {video.duration}
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Video Info */}
                                  <div className="p-3">
                                    <h5 className="text-xs font-medium text-white mb-1 line-clamp-2">
                                      {video.title}
                                    </h5>
                                    <div className="flex items-center justify-between text-[9px]">
                                      <span className="text-red-400/80">{video.channel}</span>
                                      <span className="text-white/50">
                                        {getTimeAgo(video.publishedAt, language)}
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                            
                            {/* Scroll Indicator */}
                            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                                style={{ width: '40%' }}
                                initial={{ x: '-100%' }}
                                animate={{ x: '0%' }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                              />
                            </div>
                          </>
                        )
                      )}
                    </div>
                    
                    {/* Footer */}
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                            activeTab === 'news' ? 'bg-green-400' : 'bg-red-400'
                          }`} />
                          <span className="text-white/50">
                            {language === 'en' 
                              ? (activeTab === 'news' ? 'Live • Today\'s News' : 'Live • Video Updates')
                              : (activeTab === 'news' ? 'நேரடி • இன்றைய செய்திகள்' : 'நேரடி • காணொளி புதுப்பிப்புகள்')
                            }
                          </span>
                        </div>
                        <span className="text-white/40">
                          {language === 'en' ? 'Swipe for more' : 'மேலும் காண ஸ்வைப்'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Player Dialog */}
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-white/20">
          <DialogHeader className="sr-only">
            <DialogTitle>Video Player</DialogTitle>
            <DialogDescription>
              Watch the video from {selectedVideo?.channel}
            </DialogDescription>
          </DialogHeader>
          
          {selectedVideo && (
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setVideoDialogOpen(false)}
                className="absolute -top-10 right-0 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              {/* Video Player */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              </div>
              
              {/* Video Info */}
              <div className="p-4 bg-gradient-to-b from-black/80 to-black/60">
                <h3 className="text-white mb-2">
                  {selectedVideo.title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-400">{selectedVideo.channel}</span>
                  <span className="text-white/60">
                    {getTimeAgo(selectedVideo.publishedAt, language)}
                  </span>
                </div>
                {selectedVideo.description && (
                  <p className="text-white/70 text-sm mt-3">
                    {selectedVideo.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </motion.header>
  );
}