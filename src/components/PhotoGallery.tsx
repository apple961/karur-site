import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Camera, Calendar, MapPin, Heart, Share2, Download, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "./context/LanguageContext";

export function PhotoGallery() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const categories = [
    { id: "all", label: t('gallery.allPhotos'), count: 24 },
    { id: "events", label: t('gallery.events'), count: 8 },
    { id: "nature", label: t('gallery.nature'), count: 6 },
    { id: "historic", label: t('gallery.historic'), count: 5 },
    { id: "community", label: t('gallery.community'), count: 5 }
  ];

  const photos = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1558742527-f21ddb6b29c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMHRvd24lMjBtYWluJTIwc3RyZWV0JTIwaGlzdG9yaWMlMjBkb3dudG93bnxlbnwxfHx8fDE3NTg2MzI4ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Historic Main Street",
      category: "historic",
      date: "2024-03-15",
      location: "Downtown District",
      photographer: "City Archives",
      likes: 45,
      description: "Our beautifully preserved main street showcasing 19th century architecture."
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1659439267635-c1e1ccedaf71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3duJTIwZmVzdGl2YWwlMjBjZWxlYnJhdGlvbiUyMGNvbW11bml0eXxlbnwxfHx8fDE3NTg2MzI4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Annual Harvest Festival",
      category: "events",
      date: "2023-10-14",
      location: "Community Park",
      photographer: "Sarah Johnson",
      likes: 78,
      description: "Community members enjoying live music and local vendors at our biggest annual celebration."
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1694364196192-c749238fcca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMHBhcmslMjBwbGF5Z3JvdW5kJTIwZmFtaWxpZXN8ZW58MXx8fHwxNzU4NjMyODg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Community Park",
      category: "nature",
      date: "2024-01-20",
      location: "Riverside Park",
      photographer: "Mike Chen",
      likes: 32,
      description: "Families enjoying a beautiful day at our 50-acre community park."
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1732796717250-bd45e706c19d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMHRvd24lMjBjaXR5JTIwaGFsbCUyMGhpc3RvcmljJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU4NjMyODg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "City Hall",
      category: "historic",
      date: "2024-02-10",
      location: "Government District",
      photographer: "City Archives",
      likes: 28,
      description: "Our historic city hall building, built in 1895 and recently renovated."
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1558742527-f21ddb6b29c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMHRvd24lMjBtYWluJTIwc3RyZWV0JTIwaGlzdG9yaWMlMjBkb3dudG93bnxlbnwxfHx8fDE3NTg2MzI4ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Farmers Market",
      category: "community",
      date: "2024-03-02",
      location: "Main Street",
      photographer: "Lisa Williams",
      likes: 56,
      description: "Local vendors and farmers gathering every Saturday morning on Main Street."
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1694364196192-c749238fcca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMHBhcmslMjBwbGF5Z3JvdW5kJTIwZmFtaWxpZXN8ZW58MXx8fHwxNzU4NjMyODg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Mill Creek Trail",
      category: "nature",
      date: "2024-02-28",
      location: "Mill Creek",
      photographer: "Tom Rodriguez",
      likes: 41,
      description: "The scenic 3-mile nature trail along Mill Creek, popular with hikers and cyclists."
    }
  ];

  const filteredPhotos = selectedCategory === "all" 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = selectedImage;
    const totalImages = filteredPhotos.length;
    
    if (direction === 'prev') {
      setSelectedImage(currentIndex === 0 ? totalImages - 1 : currentIndex - 1);
    } else {
      setSelectedImage(currentIndex === totalImages - 1 ? 0 : currentIndex + 1);
    }
  };

  const currentPhoto = selectedImage !== null ? filteredPhotos[selectedImage] : null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-4">{t('gallery.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all duration-200"
            >
              {category.label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -3 }}
            >
              <Card 
                className="overflow-hidden cursor-pointer group hover:shadow-md transition-all duration-300"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <ImageWithFallback
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs bg-white/90 px-2 py-1">
                      {categories.find(c => c.id === photo.category)?.label}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-3">
                  <h3 className="font-medium mb-2 text-sm leading-tight">{photo.title}</h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="truncate">{photo.photographer}</span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Heart className="w-3 h-3" />
                        <span>{photo.likes}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
          <DialogContent className="max-w-4xl w-full p-0">
            <DialogHeader className="sr-only">
              <DialogTitle>{currentPhoto?.title || 'Photo Gallery'}</DialogTitle>
              <DialogDescription>{currentPhoto?.description || 'View photo in full size'}</DialogDescription>
            </DialogHeader>
            {currentPhoto && (
              <div className="relative">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={currentPhoto.src}
                    alt={currentPhoto.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Buttons */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => navigateImage('prev')}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => navigateImage('next')}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>

                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                    onClick={closeLightbox}
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl mb-2">{currentPhoto.title}</h3>
                      <p className="text-muted-foreground">{currentPhoto.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4 mr-2" />
                        {currentPhoto.likes}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        <span>{currentPhoto.photographer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{currentPhoto.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(currentPhoto.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {categories.find(c => c.id === currentPhoto.category)?.label}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Upload CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium">Share Your Photos</h3>
                <p className="text-xs text-muted-foreground">Help showcase our community</p>
              </div>
            </div>
            <Button size="sm" className="flex-shrink-0">
              <Camera className="w-3 h-3 mr-1" />
              Submit
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}