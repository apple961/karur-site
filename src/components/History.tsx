import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Users, Building, Award } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "./context/LanguageContext";

export function History() {
  const { t } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const timelineEvents = [
    {
      year: "300 BCE - 300 CE",
      title: t('history.ancient.title'),
      description: t('history.ancient.desc'),
      icon: Building,
      category: "Ancient",
      details: t('history.ancient.details')
    },
    {
      year: "300 - 1500 CE",
      title: t('history.medieval.title'), 
      description: t('history.medieval.desc'),
      icon: Award,
      category: "Medieval",
      details: t('history.medieval.details')
    },
    {
      year: "1500 - 1947",
      title: t('history.colonial.title'),
      description: t('history.colonial.desc'),
      icon: Users,
      category: "Colonial",
      details: t('history.colonial.details')
    },
    {
      year: "1947 - Present",
      title: t('history.modern.title'),
      description: t('history.modern.desc'),
      icon: Building,
      category: "Modern",
      details: t('history.modern.details')
    }
  ];

  const milestones = [
    { label: t('history.stats.years'), value: "3000+", icon: Calendar },
    { label: t('history.stats.temples'), value: "25+", icon: Building },
    { label: t('history.stats.textiles'), value: "500+", icon: Building },
    { label: t('history.stats.awards'), value: "12", icon: Award }
  ];

  return (
    <section id="history" className="py-8 bg-gradient-to-br from-secondary/20 via-chart-1/5 to-chart-2/5 relative overflow-hidden">
      {/* Futuristic background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_var(--chart-1),transparent_70%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_var(--chart-2),transparent_70%)]"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl mb-4">{t('history.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('history.subtitle')}
          </p>
        </motion.div>

        {/* Historical Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.label}
              className="text-center p-4 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg hover:shadow-xl hover:shadow-chart-1/10 transition-all duration-300 hover:scale-105 hover:border-chart-1/30"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-2 bg-gradient-to-br from-chart-1/20 to-chart-2/20 rounded-lg w-fit mx-auto mb-2 border border-chart-1/20">
                <milestone.icon className="w-6 h-6 text-chart-1" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent mb-1">{milestone.value}</div>
              <p className="text-xs text-muted-foreground">{milestone.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1689947674001-f9a8a08f0480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwVGFtaWwlMjB0ZW1wbGUlMjBoaXN0b3JpY2FsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1ODgwMjk2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Ancient Tamil Temple Architecture"
                className="w-full h-[300px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary/90 text-white">
                  {t('history.ancient.capital')}
                </Badge>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl mb-4">{t('history.story.title')}</h3>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                {t('history.story.para1')}
              </p>
              <p className="text-muted-foreground">
                {t('history.story.para2')}
              </p>
              <p className="text-muted-foreground">
                {t('history.story.para3')}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="space-y-3">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-base text-center mb-3 bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent"
          >
            {t('history.timeline.title')}
          </motion.h3>
          
          {/* Desktop Timeline */}
          <div className="relative max-w-4xl mx-auto hidden md:block">
            {/* Clean Straight Timeline */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-chart-1 via-chart-2 to-chart-3 transform -translate-x-1/2 opacity-60"></div>
            
            <div className="space-y-2 relative z-10">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`relative flex items-center min-h-[100px] ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 w-3 h-3 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full z-20 border-2 border-white shadow-lg -translate-x-1/2 animate-pulse"></div>
                  
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-2' : 'pl-2'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                          selectedEvent === index 
                            ? 'bg-gradient-to-br from-chart-1/15 via-chart-2/8 to-chart-3/15 ring-1 ring-chart-1/40 shadow-lg shadow-chart-1/15 border-chart-1/30' 
                            : 'bg-gradient-to-br from-white/90 to-white/70 hover:from-chart-1/8 hover:to-chart-2/8 hover:shadow-md hover:shadow-chart-1/10 border-white/60 hover:border-chart-1/20'
                        }`}
                        onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                      >
                        <CardHeader className="pb-1 pt-2">
                          <div className="flex items-center gap-1.5">
                            <div className="p-1 bg-gradient-to-br from-chart-1/20 to-chart-2/20 rounded border border-chart-1/20">
                              <event.icon className="w-2.5 h-2.5 text-chart-1" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-xs bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent">{event.year}</CardTitle>
                              <CardDescription className="text-xs truncate">{event.title}</CardDescription>
                            </div>
                            <Badge 
                              variant="outline" 
                              className="text-xs px-1 py-0 bg-gradient-to-r from-chart-2/10 to-chart-3/10 border-chart-2/30 text-chart-2 shrink-0"
                            >
                              {t(`history.category.${event.category.toLowerCase()}`)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 pb-2">
                          <p className="text-muted-foreground text-xs leading-tight">{event.description}</p>
                          {selectedEvent === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-1.5 p-1.5 rounded bg-gradient-to-r from-chart-1/8 to-chart-2/8 border border-chart-1/20"
                            >
                              <p className="text-xs text-muted-foreground leading-tight">
                                {event.details}
                              </p>
                            </motion.div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline - Proper Timeline Layout */}
          <div className="md:hidden">
            <div className="relative max-w-md mx-auto px-4">
              {/* Timeline Line */}
              <div className="absolute left-8 top-6 bottom-6 w-px bg-gradient-to-b from-chart-1 via-chart-2 to-chart-3"></div>
              
              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline Dot & Year */}
                    <div className="flex items-center gap-4">
                      <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full border-3 border-white shadow-lg">
                        <event.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className="bg-gradient-to-r from-chart-1/10 to-chart-2/10 border-chart-1/40 text-chart-1 px-3 py-1"
                      >
                        {event.year}
                      </Badge>
                    </div>

                    {/* Timeline Content */}
                    <div className="ml-12 mt-2">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div 
                          className={`cursor-pointer transition-all duration-300 rounded-lg border p-4 ${
                            selectedEvent === index 
                              ? 'bg-gradient-to-br from-chart-1/10 via-chart-2/5 to-chart-3/10 border-chart-1/30 shadow-lg' 
                              : 'bg-white/80 border-gray-200 hover:bg-gradient-to-br hover:from-chart-1/5 hover:to-chart-2/5 hover:border-chart-1/20 hover:shadow-md'
                          }`}
                          onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                        >
                          {/* Header - Always Visible */}
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="font-medium text-gray-900 leading-tight">{event.title}</h4>
                              <Badge 
                                variant="secondary" 
                                className="mt-1 text-xs bg-gradient-to-r from-chart-2/15 to-chart-3/15 text-chart-2"
                              >
                                {t(`history.category.${event.category.toLowerCase()}`)}
                              </Badge>
                            </div>
                          </div>

                          {/* Content - Only Show When Expanded */}
                          {selectedEvent === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-chart-1/20 pt-3 mt-3 space-y-3"
                            >
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {event.description}
                              </p>
                              <div className="p-3 rounded bg-gradient-to-r from-chart-1/8 to-chart-2/8 border border-chart-1/20">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {event.details}
                                </p>
                              </div>
                            </motion.div>
                          )}

                          {/* Tap indicator */}
                          <div className="flex items-center justify-center mt-3">
                            <div className={`w-8 h-1 rounded-full transition-all duration-300 ${
                              selectedEvent === index 
                                ? 'bg-gradient-to-r from-chart-1 to-chart-2' 
                                : 'bg-gray-300'
                            }`}></div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}