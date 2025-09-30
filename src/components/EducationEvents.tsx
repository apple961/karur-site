import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
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
  GraduationCap, 
  School,
  BookOpen,
  Award,
  Building2,
  Search,
  MapPin,
  Users,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./context/LanguageContext";
import { useState, useMemo, useEffect } from "react";

export function EducationEvents() {
  const { t } = useLanguage();
  const [schoolsSheetOpen, setSchoolsSheetOpen] = useState(false);
  const [collegesSheetOpen, setCollegesSheetOpen] = useState(false);
  const [schoolSearch, setSchoolSearch] = useState("");
  const [collegeSearch, setCollegeSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const schools = [
    {
      name: "Riverside Elementary",
      grades: "K-5",
      students: "485",
      rating: "9/10",
      type: "Public",
      highlights: ["STEM Program", "Art Focus", "Garden Club"]
    },
    {
      name: "Mill Creek Middle School", 
      grades: "6-8",
      students: "320",
      rating: "8/10",
      type: "Public",
      highlights: ["Band Program", "Sports Teams", "Science Fair"]
    },
    {
      name: "Riverside High School",
      grades: "9-12",
      students: "580",
      rating: "9/10", 
      type: "Public",
      highlights: ["College Prep", "Vocational Training", "Championship Athletics"]
    },
    {
      name: "St. Mary's Academy",
      grades: "K-12",
      students: "240",
      rating: "8/10",
      type: "Private",
      highlights: ["Small Classes", "College Counseling", "Community Service"]
    }
  ];

  const colleges = [
    {
      name: "Karur Arts & Science College",
      type: "Arts & Science",
      students: "1,200",
      rating: "9/10",
      category: "Public",
      highlights: ["Research Center", "Industry Partnerships", "Placement Cell"]
    },
    {
      name: "Government Engineering College",
      type: "Engineering",
      students: "850",
      rating: "9/10",
      category: "Government",
      highlights: ["AICTE Approved", "Advanced Labs", "Innovation Hub"]
    },
    {
      name: "Karur Polytechnic College",
      type: "Technical",
      students: "600",
      rating: "8/10",
      category: "Government",
      highlights: ["Diploma Programs", "Skill Training", "Job Placement"]
    },
    {
      name: "Vivekananda College of Education",
      type: "Education",
      students: "320",
      rating: "8/10",
      category: "Private",
      highlights: ["B.Ed Programs", "Teacher Training", "Research Focus"]
    }
  ];

  const filteredSchools = useMemo(() => {
    return schools.filter(school => 
      school.name.toLowerCase().includes(schoolSearch.toLowerCase()) ||
      school.highlights.some(h => h.toLowerCase().includes(schoolSearch.toLowerCase()))
    );
  }, [schools, schoolSearch]);

  const filteredColleges = useMemo(() => {
    return colleges.filter(college => 
      college.name.toLowerCase().includes(collegeSearch.toLowerCase()) ||
      college.type.toLowerCase().includes(collegeSearch.toLowerCase()) ||
      college.highlights.some(h => h.toLowerCase().includes(collegeSearch.toLowerCase()))
    );
  }, [colleges, collegeSearch]);



  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="mb-2">{t('education.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('education.subtitle')}
          </p>
        </motion.div>

        {/* Main Content - CTA Card */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Call to Action Card */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <h3 className="mb-3">Explore Karur's Educational Excellence</h3>
                <p className="mb-5 opacity-90 text-sm">
                  Discover quality education from primary schools to higher education institutions that shape Karur's future.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="secondary" 
                    onClick={() => setSchoolsSheetOpen(true)}
                  >
                    <School className="w-4 h-4 mr-2" />
                    School Information
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={() => setCollegesSheetOpen(true)}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    College Information
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Schools Sheet - Futuristic Design */}
        <Sheet open={schoolsSheetOpen} onOpenChange={setSchoolsSheetOpen}>
          <SheetContent 
            side={isMobile ? "bottom" : "right"} 
            className={`p-0 overflow-hidden ${
              isMobile 
                ? 'h-[85vh] rounded-t-3xl' 
                : 'w-full sm:max-w-2xl'
            }`}
          >
            {/* Header with Gradient */}
            <div className={`relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 ${
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
                      <School className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
                    </div>
                    Schools in Karur
                  </SheetTitle>
                  <SheetDescription className="text-white/90 flex items-center gap-2 mt-2 text-sm">
                    <Sparkles className="w-4 h-4" />
                    Quality K-12 education institutions shaping young minds
                  </SheetDescription>
                </SheetHeader>
                
                {/* Search Bar */}
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input 
                    placeholder="Search schools..." 
                    value={schoolSearch}
                    onChange={(e) => setSchoolSearch(e.target.value)}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                  />
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className={`overflow-y-auto bg-gradient-to-b from-gray-50 to-white ${
              isMobile 
                ? 'p-4 h-[calc(85vh-200px)]' 
                : 'p-6 h-[calc(100vh-220px)]'
            }`}>
              <AnimatePresence mode="popLayout">
                {filteredSchools.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-muted-foreground"
                  >
                    No schools found matching your search.
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {filteredSchools.map((school, index) => (
                      <motion.div
                        key={school.name}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 group hover:scale-[1.02]">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <CardTitle className="flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                                  <School className="w-5 h-5 text-blue-600" />
                                  {school.name}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-3 mt-2 flex-wrap">
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" />
                                    Grades {school.grades}
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {school.students} students
                                  </span>
                                </CardDescription>
                              </div>
                              <div className="text-right shrink-0">
                                <Badge variant={school.type === 'Public' ? 'default' : 'secondary'} className="mb-2">
                                  {school.type}
                                </Badge>
                                <div className="flex items-center gap-1 justify-end">
                                  <Award className="w-4 h-4 text-yellow-500" />
                                  <span className="text-sm">{school.rating}</span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex flex-wrap gap-2">
                              {school.highlights.map((highlight, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                                  {highlight}
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

        {/* Colleges Sheet - Futuristic Design */}
        <Sheet open={collegesSheetOpen} onOpenChange={setCollegesSheetOpen}>
          <SheetContent 
            side={isMobile ? "bottom" : "right"} 
            className={`p-0 overflow-hidden ${
              isMobile 
                ? 'h-[85vh] rounded-t-3xl' 
                : 'w-full sm:max-w-2xl'
            }`}
          >
            {/* Header with Gradient */}
            <div className={`relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 ${
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
                    Colleges in Karur
                  </SheetTitle>
                  <SheetDescription className="text-white/90 flex items-center gap-2 mt-2 text-sm">
                    <Sparkles className="w-4 h-4" />
                    Higher education institutions fostering academic excellence
                  </SheetDescription>
                </SheetHeader>
                
                {/* Search Bar */}
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input 
                    placeholder="Search colleges..." 
                    value={collegeSearch}
                    onChange={(e) => setCollegeSearch(e.target.value)}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                  />
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className={`overflow-y-auto bg-gradient-to-b from-gray-50 to-white ${
              isMobile 
                ? 'p-4 h-[calc(85vh-200px)]' 
                : 'p-6 h-[calc(100vh-220px)]'
            }`}>
              <AnimatePresence mode="popLayout">
                {filteredColleges.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-muted-foreground"
                  >
                    No colleges found matching your search.
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {filteredColleges.map((college, index) => (
                      <motion.div
                        key={college.name}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500 group hover:scale-[1.02]">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <CardTitle className="flex items-center gap-2 group-hover:text-purple-600 transition-colors">
                                  <Building2 className="w-5 h-5 text-purple-600" />
                                  {college.name}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-3 mt-2 flex-wrap">
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" />
                                    {college.type}
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {college.students} students
                                  </span>
                                </CardDescription>
                              </div>
                              <div className="text-right shrink-0">
                                <Badge variant={college.category === 'Government' || college.category === 'Public' ? 'default' : 'secondary'} className="mb-2">
                                  {college.category}
                                </Badge>
                                <div className="flex items-center gap-1 justify-end">
                                  <Award className="w-4 h-4 text-yellow-500" />
                                  <span className="text-sm">{college.rating}</span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex flex-wrap gap-2">
                              {college.highlights.map((highlight, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-purple-50 border-purple-200 text-purple-700">
                                  {highlight}
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