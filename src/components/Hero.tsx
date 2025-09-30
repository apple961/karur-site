import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { MapPin, Users, Calendar, Star } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "./context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickStats = [
    { icon: Users, label: "Population", value: "1,76,595" },
    { icon: MapPin, label: "Area", value: "2,895 km²" },
    { icon: Calendar, label: "Established", value: "Ancient Era" },
    { icon: Star, label: "Industries", value: "500+ Textile" }
  ];

  return (
    <section id="about" className="relative min-h-[700px] flex items-center justify-center overflow-hidden pt-16 md:pt-20 pb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1636986056375-184676d8ca14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUYW1pbCUyME5hZHUlMjB0ZXh0aWxlJTIwaW5kdXN0cnklMjB3ZWF2aW5nfGVufDF8fHx8MTc1ODgwMjkzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Karur textile industry"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Floating particles animation */}
      <div className="absolute inset-0 z-15">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            {t('hero.subtitle')}
          </Badge>
          <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text">
            {t('hero.title')}
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection('history')}
          >
            {t('hero.explore')}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/80 text-white bg-transparent hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            onClick={() => scrollToSection('attractions')}
          >
            {t('hero.learn')}
          </Button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-white/80" />
              <div className="text-lg font-semibold">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}