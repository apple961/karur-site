import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Clock, Star } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";

export function Attractions() {
  const { t } = useLanguage();
  
  const attractions = [
    {
      name: t('attractions.temple.title'),
      description: t('attractions.temple.desc'),
      image: "https://images.unsplash.com/photo-1665003757407-db665cffa69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTb3V0aCUyMEluZGlhbiUyMHRlbXBsZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTg4MDMwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Temple", "History", "Architecture"],
      hours: "Daily 6 AM - 8 PM",
      featured: true
    },
    {
      name: t('attractions.textiles.title'),
      description: t('attractions.textiles.desc'),
      image: "https://images.unsplash.com/photo-1648396004864-f74eb58e8d90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB0ZXh0aWxlJTIwc2hvd3Jvb20lMjBmYWJyaWNzfGVufDF8fHx8MTc1ODgwMzA0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Shopping", "Textiles", "Export"],
      hours: "Daily 9 AM - 7 PM",
      featured: true
    },
    {
      name: t('attractions.river.title'),
      description: t('attractions.river.desc'),
      image: "https://images.unsplash.com/photo-1624807136278-e2973be118ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjByaXZlciUyMGxhbmRzY2FwZSUyMG5hdHVyZXxlbnwxfHx8fDE3NTg4MDMwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Nature", "River", "Relaxation"],
      hours: "24 Hours",
      featured: false
    },
    {
      name: t('attractions.market.title'),
      description: t('attractions.market.desc'),
      image: "https://images.unsplash.com/photo-1726931535415-edbc43d42c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBoYW5kY3JhZnQlMjBhcnRpc2FuJTIwd29ya3Nob3B8ZW58MXx8fHwxNzU4ODAzMDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Crafts", "Handloom", "Culture"],
      hours: "Mon-Sat 10 AM - 6 PM",
      featured: false
    },
    {
      name: "Karur Trade Fair",
      description: "Annual textile and trade fair showcasing the best of Karur's industries with cultural programs and exhibitions.",
      image: "https://images.unsplash.com/photo-1721786839848-d9f9fd9e1e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBtYXJrZXQlMjBmZXN0aXZhbCUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc1ODgwMzA1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Fair", "Trade", "Culture"],
      hours: "January Event",
      featured: true
    },
    {
      name: "Karur Educational Hub",
      description: "Visit prestigious institutions like Anna University and engineering colleges that make Karur an educational center.",
      image: "https://images.unsplash.com/photo-1626023160253-88d281fc1d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBlZHVjYXRpb25hbCUyMGluc3RpdHV0aW9uJTIwY29sbGVnZXxlbnwxfHx8fDE3NTg4MDMwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Education", "Campus", "Learning"],
      hours: "Academic Hours",
      featured: false
    }
  ];

  return (
    <section id="attractions" className="py-6">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="mb-1">{t('attractions.title')}</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {t('attractions.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {attractions.map((attraction, index) => (
            <Card key={index} className={`relative hover:shadow-sm transition-shadow ${attraction.featured ? 'ring-1 ring-primary/50' : ''}`}>
              {attraction.featured && (
                <div className="absolute -top-0.5 -right-0.5 z-10">
                  <Badge className="bg-primary text-primary-foreground text-xs px-1 py-0">
                    <Star className="w-2 h-2 mr-0.5" />
                    Featured
                  </Badge>
                </div>
              )}
              
              <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardHeader className="pb-0.5 pt-2">
                <CardTitle className="text-xs leading-tight">
                  {attraction.name}
                </CardTitle>
                <CardDescription className="text-xs leading-tight line-clamp-2">{attraction.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0.5 pb-2">
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="w-2 h-2 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{attraction.hours}</span>
                </div>
                
                <div className="flex flex-wrap gap-0.5">
                  {attraction.tags.slice(0, 2).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs px-1 py-0">
                      {tag}
                    </Badge>
                  ))}
                  {attraction.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      +{attraction.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}