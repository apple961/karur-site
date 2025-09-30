import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.history': 'History',
    'nav.attractions': 'Attractions',
    'nav.map': 'Map',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Welcome to Karur',
    'hero.subtitle': 'Textile Capital of South India',
    'hero.description': 'Discover the rich heritage, vibrant culture, and thriving textile industry of Karur district in Tamil Nadu. From ancient temples to modern manufacturing, explore what makes our city special.',
    'hero.explore': 'Explore Our City',
    'hero.learn': 'Learn More',
    
    // History Section
    'history.title': 'Our Rich History',
    'history.subtitle': 'Journey through centuries of heritage and culture',
    'history.ancient.title': 'Ancient Period (300 BCE - 300 CE)',
    'history.ancient.desc': 'Karur was a significant trading center during the Sangam period, known as Karuvur. It was the capital of the Chera dynasty and a major hub for trade with the Roman Empire.',
    'history.ancient.details': 'Archaeological excavations have revealed Roman coins, pottery, and artifacts indicating extensive trade relationships. The city was strategically located on the banks of river Amaravathi, facilitating inland and overseas commerce.',
    'history.medieval.title': 'Medieval Era (300 - 1500 CE)',
    'history.medieval.desc': 'Under various dynasties including the Pallavas, Cholas, and Vijayanagara Empire, Karur continued to flourish as an important commercial center.',
    'history.medieval.details': 'During this period, several temples were constructed and the region became known for its skilled artisans and craftsmen. The Chola period saw significant architectural developments and cultural prosperity.',
    'history.colonial.title': 'Colonial Period (1500 - 1947)',
    'history.colonial.desc': 'During British rule, Karur became known for its handloom textiles and emerged as a major textile manufacturing center in South India.',
    'history.colonial.details': 'The introduction of power looms and modern textile machinery transformed the local economy. Many traditional weaving families established successful textile businesses that continue to this day.',
    'history.modern.title': 'Modern Era (1947 - Present)',
    'history.modern.desc': 'Post-independence, Karur has evolved into the textile capital of India, known worldwide for its home textiles, terry towels, and garments.',
    'history.modern.details': 'Today, Karur exports textiles to over 100 countries and houses more than 800 textile units. The city has embraced modern technology while preserving its rich cultural heritage and traditional craftsmanship.',
    
    // History Stats
    'history.stats.years': 'Years of History',
    'history.stats.temples': 'Ancient Temples',
    'history.stats.textiles': 'Textile Units',
    'history.stats.awards': 'Export Awards',
    
    // Story section
    'history.story.title': 'The Story of Karur',
    'history.story.para1': 'Known as "Vanji" in ancient times, Karur was the capital of the Chera dynasty during the Sangam period. Located on the banks of river Amaravathi, it was a major trading center connecting South India with the Roman Empire.',
    'history.story.para2': 'Through millennia, Karur has evolved from an ancient kingdom to India\'s textile capital. The city\'s rich cultural heritage blends seamlessly with modern industrial prowess, making it a unique destination in Tamil Nadu.',
    'history.story.para3': 'Today, Karur stands as a testament to continuous innovation - from handloom traditions to high-tech textile manufacturing, serving global markets while preserving its cultural identity.',
    'history.timeline.title': 'Interactive Timeline',
    'history.ancient.capital': 'Ancient Vanji',
    'history.category.ancient': 'Ancient',
    'history.category.medieval': 'Medieval',
    'history.category.colonial': 'Colonial',
    'history.category.modern': 'Modern',
    
    // Attractions Section
    'attractions.title': 'Popular Attractions',
    'attractions.subtitle': 'Discover the beauty and heritage of Karur',
    'attractions.temple.title': 'Kalyana Pasupatheeswarar Temple',
    'attractions.temple.desc': 'Ancient Shiva temple with stunning Dravidian architecture and rich spiritual significance.',
    'attractions.textiles.title': 'Textile Showrooms',
    'attractions.textiles.desc': 'World-class textile manufacturing units and showrooms showcasing Karur\'s textile excellence.',
    'attractions.river.title': 'Kaveri River Banks',
    'attractions.river.desc': 'Scenic river banks perfect for evening walks and experiencing the natural beauty of the region.',
    'attractions.market.title': 'Karur Market',
    'attractions.market.desc': 'Bustling local markets offering traditional handicrafts, textiles, and local delicacies.',
    
    // Services Section
    'services.title': 'Local Services',
    'services.subtitle': 'Essential services for residents and visitors',
    'services.emergency': 'Emergency Services',
    'services.public': 'Public Services',
    'services.emergency.info': 'Emergency Information',
    'services.emergency.text': 'For immediate emergencies, call 911. For non-emergency situations, use the direct numbers listed below.',
    'services.needHelp': 'Need Help Finding a Service?',
    'services.helpText': 'Our customer service team is here to help connect you with the right department or service.',
    
    // Emergency Services
    'services.police.name': 'Riverside Police Department',
    'services.police.desc': 'Community policing with quick response times and neighborhood programs.',
    'services.police.address': '100 Safety Blvd',
    'services.police.hours': '24/7',
    'services.police.emergency': '911',
    'services.police.nonemergency': 'Non-emergency: (555) 123-4567',
    
    'services.fire.name': 'Riverside Fire Department',
    'services.fire.desc': 'Full-service fire and rescue with paramedic capabilities.',
    'services.fire.address': '200 Rescue Ave',
    'services.fire.hours': '24/7',
    'services.fire.emergency': '911',
    'services.fire.nonemergency': 'Non-emergency: (555) 234-5678',
    
    'services.medical.name': 'Emergency Medical Services',
    'services.medical.desc': 'Advanced life support ambulance services with hospital coordination.',
    'services.medical.emergency': '911',
    'services.medical.nonemergency': 'Non-emergency: (555) 345-6789',
    'services.medical.locations': 'Multiple Locations',
    'services.medical.hours': '24/7',
    
    // Public Services
    'services.power.name': 'City Electric Department',
    'services.power.desc': 'Reliable electrical service with emergency repair and maintenance programs.',
    'services.water.name': 'Water Department', 
    'services.water.desc': 'Clean, safe drinking water with regular quality testing and monitoring.',
    'services.internet.name': 'Municipal Broadband',
    'services.internet.desc': 'High-speed internet access for residents and businesses.',
    
    // Gallery Section
    'gallery.title': 'Photo Gallery',
    'gallery.subtitle': 'Glimpses of our beautiful city',
    'gallery.allPhotos': 'All Photos',
    'gallery.events': 'Events',
    'gallery.nature': 'Nature',
    'gallery.historic': 'Historic',
    'gallery.community': 'Community',
    
    // Education Section
    'education.title': 'Education & Events',
    'education.subtitle': 'Learning opportunities and cultural celebrations',
    'education.excellence': 'Education Excellence',
    'education.excellenceSubtitle': 'Quality schools for every student',
    'education.communityEvents': 'Community Events',
    'education.eventsSubtitle': 'Year-round celebrations and activities',
    'education.comingUp': 'Coming Up',
    'education.annualTraditions': 'Annual Traditions',
    'education.institutions': 'Educational Institutions',
    'education.events': 'Cultural Events',
    'education.colleges': 'Engineering Colleges',
    'education.schools': 'Schools & Universities',
    'education.festivals': 'Traditional Festivals',
    'education.cultural': 'Cultural Programs',
    
    // Map Section
    'map.title': 'Interactive Map',
    'map.subtitle': 'Navigate through Karur district',
    'map.loading': 'Loading map...',
    'map.interactive.title': 'Karur Map',
    'map.interactive.desc': 'Click on markers to view location details',
    'map.fullscreen': 'Fullscreen',
    'map.locate': 'Locate',
    'map.directions': 'Directions',
    'map.nearby': 'Nearby',
    'map.hotels': 'Hotels',
    'map.search.placeholder': 'Search places, services...',
    'map.details.title': 'Location Details',
    'map.details.selected': 'Click another marker to switch locations',
    'map.details.instruction': 'Click on a map marker to view details',
    'map.getDirections': 'Get Directions',
    'map.openMaps': 'Open in Maps',
    'map.selectLocation': 'Select a location on the map to view its details',
    'map.facts.title': 'Quick Facts',
    'map.facts.district': 'District',
    'map.facts.state': 'State',
    'map.facts.pincode': 'Pincode',
    'map.facts.elevation': 'Elevation',
    'map.facts.timezone': 'Timezone',
    
    // Map Locations
    'map.locations.temple.name': 'Kalyana Venkatramana Temple',
    'map.locations.temple.desc': 'Historic temple dedicated to Lord Vishnu, famous for its architecture',
    'map.locations.collectorate.name': 'District Collectorate',
    'map.locations.collectorate.desc': 'Main administrative office for Karur district government services',
    'map.locations.river.name': 'Amaravathi River',
    'map.locations.river.desc': 'Sacred river flowing through Karur, perfect for evening walks',
    'map.locations.railway.name': 'Karur Railway Station',
    'map.locations.railway.desc': 'Main railway station connecting Karur to major cities',
    'map.locations.textiles.name': 'Karur Textile Hub',
    'map.locations.textiles.desc': 'Famous textile market known for home furnishings and exports',
    'map.locations.hospital.name': 'Government General Hospital',
    'map.locations.hospital.desc': 'Main government hospital providing healthcare services',
    'map.locations.university.name': 'Anna University Karur Campus',
    'map.locations.university.desc': 'Prestigious engineering college and regional campus',
    
    // City Info
    'cityinfo.title': 'City Information',
    'cityinfo.overview': 'Overview',
    'cityinfo.economy': 'Economy',
    'cityinfo.culture': 'Culture',
    
    // Common UI elements
    'common.call': 'Call',
    'common.hours': 'Hours',
    'common.location': 'Location',
    'common.services': 'Services',
    'common.emergency': 'Emergency',
    'common.rating': 'Rating',
    'common.featured': 'Featured',
    'common.viewMore': 'View More',
    'common.loadMore': 'Load More',
    'common.getDirections': 'Get Directions',
    
    // Footer
    'footer.contact': 'Contact Us',
    'footer.quickLinks': 'Quick Links',
    'footer.about': 'About Karur',
    'footer.government': 'Government',
    'footer.tourism': 'Tourism',
    'footer.business': 'Business',
    'footer.connect': 'Connect With Us',
    'footer.rights': '© 2024 Karur District. All rights reserved.',
    
    // Weather
    'weather.loading': 'Loading...',
    'weather.humidity': 'humidity',
    'weather.live': 'Live Weather Data',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.viewMore': 'View More',
    'common.readMore': 'Read More',
  },
  ta: {
    // Header
    'nav.home': 'முகப்பு',
    'nav.history': 'வரலாறு',
    'nav.attractions': 'சுற்றுலா',
    'nav.map': 'வரைபடம்',
    'nav.services': 'சேவைகள்',
    'nav.gallery': 'படத்தொகுப்பு',
    'nav.education': 'கல்வி',
    'nav.contact': 'தொடர்பு',
    
    // Hero Section
    'hero.title': 'கரூருக்கு வரவேற்கிறோம்',
    'hero.subtitle': 'தென்னிந்தியாவின் நெசவுத் தலைநகரம்',
    'hero.description': 'தமிழ்நாட்டின் கரூர் மாவட்டத்தின் பன்னீர் மரபு, உற்சாகமிக்க கலாச்சாரம் மற்றும் செழிப்பான நெசவுத் தொழிலை கண்டறியுங்கள். பழைய கோவில்களிலிருந்து நவீன உற்பத்தி வரை, எங்கள் நகரத்தை சிறப்பாக்குவதை ஆராயுங்கள்.',
    'hero.explore': 'எங்கள் நகரத்தை ஆராயுங்கள்',
    'hero.learn': 'மேலும் அறிக',
    
    // History Section
    'history.title': 'எங்கள் வளமான வரலாறு',
    'history.subtitle': 'பல நூற்றாண்டுகால மரபு மற்றும் கலாச்சாரத்தின் பயணம்',
    'history.ancient.title': 'பண்டைய காலம் (கி.மு. 300 - கி.பி. 300)',
    'history.ancient.desc': 'கரூர் சங்க காலத்தில் கருவூர் என்று அழைக்கப்பட்ட ஒரு முக்கியமான வர்த்தக மையமாக இருந்தது. இது சேர வம்சத்தின் தலைநகராக இருந்தது மற்றும் ரோமானியப் பேரரசுடன் வர்த்தகத்திற்கான முக்கிய மையமாக இருந்தது.',
    'history.ancient.details': 'தொல்பொருள் அகழ்வாராய்ச்சிகள் ரோமானிய நாணயங்கள், மட்பாண்டங்கள் மற்றும் விரிவான வர்த்தக உறவுகளைக் குறிக்கும் கலைப்பொருட்களை வெளிப்படுத்தியுள்ளன. நகரம் அமராவதி நதியின் கரையில் மூலோபாய முக்கியத்துவத்துடன் அமைந்திருந்தது.',
    'history.medieval.title': 'இடைக்கால யுகம் (300 - 1500 கி.பி.)',
    'history.medieval.desc': 'பல்லவர்கள், சோழர்கள் மற்றும் விஜயநகரப் பேரரசு உட்பட பல்வேறு வம்சங்களின் கீழ், கரூர் ஒரு முக்கியமான வணிக மையமாக தொடர்ந்து வளர்ந்தது.',
    'history.medieval.details': 'இந்த காலகட்டத்தில், பல கோவில்கள் கட்டப்பட்டன மற்றும் இந்த பகுதி திறமையான கைவினைஞர்கள் மற்றும் கலைஞர்களுக்கு பெயர் பெற்றது. சோழர் காலம் முக்கியமான கட���டிடக்கலை வளர்ச்சி மற்றும் கலாச்சார செழுமையைக் கண்டது.',
    'history.colonial.title': 'காலனித்துவ காலம் (1500 - 1947)',
    'history.colonial.desc': 'ஆங்கிலேய ஆட்சியின் போது, கரூர் அதன் கைத்தறி நெசவுகளுக்கு பெயர் பெற்றது மற்றும் தென்னிந்தியாவில் ஒரு முக்கிய நெசவு உற்பத்தி மையமாக உருவானது.',
    'history.colonial.details': 'மின்சக்தி தறிகள் மற்றும் நவீன நெசவு இயந்திரங்களின் அறிமுகம் உள்ளூர் பொருளாதாரத்தை மாற்றியது. பல பாரம்பரிய நெசவு குடும்பங்கள் வெற்றிகரமான நெசவு வணிகங்களை நிறுவின, அவை இன்றும் தொடர்கின்றன.',
    'history.modern.title': 'நவீன யுகம் (1947 - தற்போது)',
    'history.modern.desc': 'சுதந்திரத்திற்குப் பிறகு, கரூர் இந்தியாவின் நெசவுத் தலைநகராக உருவெடுத்தது, உலகம் முழுவதும் அதன் வீட்டு நெசவுகள், டெர்ரி டவல்கள் மற்றும் ஆடைகளுக்கு புகழ் பெற்றது.',
    'history.modern.details': 'இன்று, கரூர் 100க்கும் மேற்பட்ட நாடுகளுக்கு நெசவுகளை ஏற்றுமதி செய்கிறது மற்றும் 800க்கும் மேற்பட்ட நெசவு அலகுகளைக் கொண்டுள்ளது. நகரம் அதன் வளமான கலாச்சார மரபு மற்றும் பாரம்பரிய கைவினைத்திறனைப் பாதுকாத்து நவீன தொழில்நுட்பத்தை ஏற்றுக்கொண்டுள்ளது.',
    
    // History Stats
    'history.stats.years': 'வரலாற்று ஆண்டுகள்',
    'history.stats.temples': 'பழங்கால கோவில்கள்',
    'history.stats.textiles': 'நெசவு அலகுகள்',
    'history.stats.awards': 'ஏற்றுமதி விருதுகள்',
    
    // Story section
    'history.story.title': 'கரூரின் கதை',
    'history.story.para1': 'பண்டைய காலத்தில் "வஞ்சி" என்று அழைக்கப்பட்ட கரூர், சங்க காலத்தில் சேர வம்சத்தின் தலைநகராக இருந்தது. அமராவதி நதியின் கரையில் அமைந்திருந்த இது, தென்னிந்தியாவை ரோமானியப் பேரரசுடன் இணைக்கும் முக்கிய வர்த்தக மையமாக இருந்தது.',
    'history.story.para2': 'ஆயிரமாண்டுகளாக, கரூர் ஒரு பண்டைய அரசிலிருந்து இந்தியாவின் நெசவுத் தலைநகராக உருவெடுத்துள்ளது. நகரத்தின் வளமான கலாச்சார மரபு நவீன தொழில்துறை வளர்ச்சியுடன் இணைந்து, தமிழ்நாட்டில் ஒரு தனித்துவமான இடமாக மாற்றியுள்ளது.',
    'history.story.para3': 'இன்று, கரூர் தொடர்ச்சியான புதுமைகளுக்கான சாட்சியாக நிற்கிறது - கைத்தறி பாரம்பரியத்திலிருந்து உயர்தொழில்நுட்ப நெசவு உற்பத்தி வரை, அதன் கலாச்சார அடையாளத்தைப் பாதுகாத்து உலக சந்தைகளுக்கு சேவை செய்கிறது.',
    'history.timeline.title': 'ஊடாடும் காலவரிசை',
    'history.ancient.capital': 'பண்டைய வஞ்சி',
    'history.category.ancient': 'பண்டைய',
    'history.category.medieval': 'இடைக்கால',
    'history.category.colonial': 'காலனித்துவ',
    'history.category.modern': 'நவீன',
    
    // Attractions Section
    'attractions.title': 'பிரபலமான இடங்கள்',
    'attractions.subtitle': 'கரூரின் அழகு மற்றும் மரபை கண்டறியுங்கள்',
    'attractions.temple.title': 'கல்யாண பசுபதீஸ்வரர் கோவில்',
    'attractions.temple.desc': 'அற்புதமான திராவிட கட்டிடக்கலை மற்றும் வளமான ஆன்மீக முக்கியத்துவம் கொண்ட பழைய சிவன் கோவில்.',
    'attractions.textiles.title': 'நெசவு காட்சியகங்கள்',
    'attractions.textiles.desc': 'கரூரின் நெசவு மிகுதியை காட்டும் உலகத் தரம் வாய்ந்த நெசவு உற்பத்தி நிலையங்கள் மற்றும் காட்சியகங்கள்.',
    'attractions.river.title': 'காவேரி ஆற்றங்கரை',
    'attractions.river.desc': 'மாலை நடைக்கும் பகுதியின் இயற்கை அழகை அனுபவிக்கும் அழகான ஆற்றங்கரைகள்.',
    'attractions.market.title': 'கரூர் சந்தை',
    'attractions.market.desc': 'பாரம்பரிய கைவினைப் பொருட்கள், நெசவுகள் மற்றும் உள்ளூர் சுவையான உணவுகளை வழங்கும் சலசலப்பான உள்ளூர் சந்தைகள்.',
    
    // Services Section
    'services.title': 'உள்ளூர் சேவைகள்',
    'services.subtitle': 'குடியிருப்பாளர்கள் மற்றும் பார்வையாளர்களுக்கான அத்தியாவசிய சேவைகள்',
    'services.hospital': 'அரசு மருத்துவமனை',
    'services.police': 'காவல் நிலையம்',
    'services.transport': 'பேருந்து நிலையம்',
    'services.tourism': 'சுற்றுலா அலுவலகம்',
    'services.hospital.desc': 'அவசர சேவைகளுடன் கூடிய முதன்மை சுகாதார வசதி',
    'services.police.desc': 'சட்ட அமலாக்கம் மற்றும் பொது பாதுகாப்பு சேவைகள்',
    'services.transport.desc': 'நகரங்களுக்கு இடையிலான மற்றும் உள்ளூர் பே���ுந்து போக்குவரத்து மையம்',
    'services.tourism.desc': 'சுற்றுலாப் பயணிகளுக்கான தகவல் மற்றும் உதவி மையம்',
    'services.emergency': 'அவசர சேவைகள்',
    'services.public': 'பொது சேவைகள்',
    'services.emergency.info': 'அவசர தகவல்',
    'services.emergency.text': 'உடனடி அவசரநிலைகளுக்கு, 100 அழைக்கவும். அவசரமல்லாத சூழ்நிலைகளுக்கு, கீழே பட்டியலிடப்பட்ட நேரடி எண்களைப் பயன்படுத்தவும்.',
    'services.needHelp': 'சேவையைக் கண்டறிய உதவி தேவையா?',
    'services.helpText': 'எங்கள் வாடிக்கையாளர் சேவைக் குழு உங்களை சரியான துறை அல்லது சேவையுடன் இணைக்க உதவுகிறது.',
    'services.police.name': 'கரூர் காவல் துறை',
    'services.fire.name': 'கரூர் தீயணைப்புத் துறை',
    'services.medical.name': 'அவசர மருத்துவ சேவைகள்',
    'services.power.name': 'நகர மின்சார துறை',
    'services.water.name': 'நீர் துறை',
    'services.internet.name': 'முனிசிபல் பிராட்பேண்ட்',
    
    // Gallery Section
    'gallery.title': 'படத்தொகுப்பு',
    'gallery.subtitle': 'எங்கள் அழகான நகரத்தின் பார்வைகள்',
    'gallery.allPhotos': 'அனைத்து படங்கள்',
    'gallery.events': 'நிகழ்வுகள்',
    'gallery.nature': 'இயற்கை',
    'gallery.historic': 'வரலாற்று',
    'gallery.community': 'சமூகம்',
    
    // Education Section
    'education.title': 'கல்வி மற்றும் நிகழ்வுகள்',
    'education.subtitle': 'கற்றல் வாய்ப்புகள் மற்றும் கலாச்சார கொண்டாட்டங்கள்',
    'education.excellence': 'கல்வி சிறப்பு',
    'education.excellenceSubtitle': 'ஒவ்வொரு மாணவருக்கும் தரமான பள்ளிகள்',
    'education.communityEvents': 'சமூக நிகழ்வுகள்',
    'education.eventsSubtitle': 'ஆண்டு முழுவதும் கொண்டாட்டங்கள் மற்றும் செயல்பாடுகள்',
    'education.comingUp': 'வரும் நிகழ்வுகள்',
    'education.annualTraditions': 'ஆண்டு பாரம்பரியங்கள்',
    'education.institutions': 'கல்வி நிறுவனங்கள்',
    'education.events': 'கலாச்சார நிகழ்வுகள்',
    'education.colleges': 'பொறியியல் கல்லூரிகள்',
    'education.schools': 'பள்ளிகள் மற்றும் பல்கலைக்கழகங்கள்',
    'education.festivals': 'பாரம்பரிய திருவிழாகள்',
    'education.cultural': 'கலாச்சார நிகழ்ச்சிகள்',
    
    // Map Section
    'map.title': 'ஊடாடும் வரைபடம்',
    'map.subtitle': 'கரூர் மாவட்டத்தில் வழிநடத்துங்கள்',
    'map.loading': 'வரைபடம் ஏற்றுகிறது...',
    'map.interactive.title': 'கரூர் வரைபடம்',
    'map.interactive.desc': 'இடங்களின் விவரங்களைக் காண மார்க்கர்களைக் கிளிக் செய்யவும்',
    'map.fullscreen': 'முழுத்திரை',
    'map.locate': 'கண்டறியவும்',
    'map.directions': 'திசைகள்',
    'map.nearby': 'அருகில்',
    'map.hotels': 'தங்குமிடங்கள்',
    'map.search.placeholder': 'இடங்கள், சேவைகள் தேடுங்கள்...',
    'map.details.title': 'இட விவரங்கள்',
    'map.details.selected': 'மற்ற இடமாக மாற்ற இன்னொரு மார்க்கரைக் கிளிக் செய்யவும்',
    'map.details.instruction': 'விவரங்களைக் காண வரைபட மார்க்கரைக் கிளிக் செய்யவும்',
    'map.getDirections': 'திசைகளைப் பெறு',
    'map.openMaps': 'வரைபடத்தில் திற',
    'map.selectLocation': 'வரைபடத்தில் ஒரு இடத்தைத் தேர்வு செய்யவும்',
    'map.facts.title': 'விரைவு தகவல்கள்',
    'map.facts.district': 'மாவட்டம்',
    'map.facts.state': 'மாநிலம்',
    'map.facts.pincode': 'அஞ்சல் குறியீடு',
    'map.facts.elevation': 'உயரம்',
    'map.facts.timezone': 'நேர மண்டலம்',
    
    // Map Locations
    'map.locations.temple.name': 'கல்யாண வெங்கட்ராமண கோவில்',
    'map.locations.temple.desc': 'விஷ்ணு பகவானுக்கு அர்பணிக்கப்பட்ட வரலாற்று கோவில், கட்டிடக்கலைக்கு பிரபலமானது',
    'map.locations.collectorate.name': 'மாவட்ட ஆட்சியர் அலுவலகம்',
    'map.locations.collectorate.desc': 'கரூர் மாவட்ட அரசு சேவைகளுக்கான முக்கிய நிர்வாக அலுவலகம்',
    'map.locations.river.name': 'அமராவதி ஆறு',
    'map.locations.river.desc': 'கரூர் வழியாக ஓடும் புனித ஆறு, மாலை நடைக்கு சிறந்தது',
    'map.locations.railway.name': 'கரூர் ரயில் நிலையம்',
    'map.locations.railway.desc': 'முக்கிய நகரங்களுடன் கரூரை இணைக்கும் முக்கிய ரயில் நிலையம்',
    'map.locations.textiles.name': 'கரூர் நெசவு மையம்',
    'map.locations.textiles.desc': 'வீட்டு அலங்காரம் மற்றும் ஏற்றுமதிக்கு பிரபலமான நெசவு சந்தை',
    'map.locations.hospital.name': 'அரசு பொது மருத்துவமனை',
    'map.locations.hospital.desc': 'சுகாதார சேவைகள் வழங்கும் முக்கிய அரசு மருத்துவமனை',
    'map.locations.university.name': 'அண்ணா பல்கலைக்கழகம் கரூர் வளாகம்',
    'map.locations.university.desc': 'மதிப்புமிக்க பொறியியல் கல்லூரி மற்றும் பிராந்திய வளாகம்',
    
    // City Info
    'cityinfo.title': 'நகர தகவல்',
    'cityinfo.overview': 'மேலோட்டம்',
    'cityinfo.economy': 'பொருளாதாரம்',
    'cityinfo.culture': 'கலாச்சாரம்',
    
    // Common UI elements
    'common.call': 'அழைக்கவும்',
    'common.hours': 'நேரம்',
    'common.location': 'இடம்',
    'common.services': 'சேவைகள்',
    'common.emergency': 'அவசரநிலை',
    'common.rating': 'மதிப்பீடு',
    'common.featured': 'சிறப்பம்சம்',
    'common.viewMore': 'மேலும் பார்க்க',
    'common.loadMore': 'மேலும் ஏற்ற',
    'common.getDirections': 'திசைகளைப் பெறுங்கள்',
    
    // Footer
    'footer.contact': 'எங்களை தொடர்பு கொள்ளுங்கள்',
    'footer.quickLinks': 'விரைவு இணைப்புகள்',
    'footer.about': 'கரூர் பற்றி',
    'footer.government': 'அரசு',
    'footer.tourism': 'சுற்றுலா',
    'footer.business': 'வணிகம்',
    'footer.connect': 'எங்களுடன் இணையுங்கள்',
    'footer.rights': '© 2024 கரூர் மாவட்டம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    
    // Weather
    'weather.loading': 'ஏற்றுகிறது...',
    'weather.humidity': 'ஈரப்பதம்',
    'weather.live': 'நேரடி வானிலை தகவல்',
    
    // Common
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.viewMore': 'மேலும் பார்க்க',
    'common.readMore': 'மேலும் படிக்க',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};