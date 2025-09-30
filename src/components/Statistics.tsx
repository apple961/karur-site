import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Users, Home, Building2, GraduationCap, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function Statistics() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('statistics-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: Users,
      label: "Population",
      value: 12847,
      growth: "+2.3%",
      color: "text-blue-500"
    },
    {
      icon: Home,
      label: "Households",
      value: 5234,
      growth: "+1.8%",
      color: "text-green-500"
    },
    {
      icon: Building2,
      label: "Businesses",
      value: 892,
      growth: "+5.2%",
      color: "text-purple-500"
    },
    {
      icon: GraduationCap,
      label: "Schools",
      value: 8,
      growth: "New campus",
      color: "text-orange-500"
    }
  ];



  const AnimatedNumber = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      if (isVisible) {
        const increment = value / (duration / 50);
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCurrent(value);
            clearInterval(timer);
          } else {
            setCurrent(Math.floor(current));
          }
        }, 50);
        return () => clearInterval(timer);
      }
    }, [isVisible, value, duration]);

    return <span>{current.toLocaleString()}</span>;
  };

  return (
    <section id="statistics-section" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-4">City by the Numbers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know Riverside through key statistics and demographic insights that showcase our growing community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <div className={`mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl mb-1">
                    <AnimatedNumber value={stat.value} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.growth}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}