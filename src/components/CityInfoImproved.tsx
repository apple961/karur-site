import { X, Send, Bot, MessageCircle, Sparkles, Phone, Users, MapPin, Building2, Info, Calendar, Brain, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./context/LanguageContext";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function CityInfo() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      type: 'bot',
      content: language === 'ta' 
        ? '🙏 வணக்கம்! நான் கரூர் உதவியாளர். மாவட்ட தகவல்கள், அதிகாரிகள், சேவைகள், வரலாறு, சுற்றுலா இடங்கள் மற்றும் மேலும் பல தகவல்களுக்கு என்னிடம் கேளுங்கள்!'
        : '👋 Hello! I\'m Karur Assistant. Ask me about district information, officials, services, history, tourist attractions, and much more!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showWelcomeToast, setShowWelcomeToast] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadCount(0);
    setShowWelcomeToast(false);
  };

  // Show welcome toast after 3 seconds, hide after 5 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowWelcomeToast(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowWelcomeToast(false);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const quickQuestions = language === 'ta' ? [
    { text: 'மாவட்ட ஆட்சியர் யார்?', icon: Users },
    { text: 'காவல் கண்காணிப்பாளர் தொடர்பு', icon: Phone },
    { text: 'சுற்றுலா இடங்கள்', icon: MapPin },
    { text: 'வரலாற்று தகவல்கள்', icon: Building2 },
    { text: 'முக்கிய சேவைகள்', icon: Info },
    { text: 'நிகழ்வுகள் தகவல்', icon: Calendar }
  ] : [
    { text: 'Who is the District Collector?', icon: Users },
    { text: 'Police contact details', icon: Phone },
    { text: 'Tourist attractions', icon: MapPin },
    { text: 'Historical information', icon: Building2 },
    { text: 'Essential services', icon: Info },
    { text: 'Events information', icon: Calendar }
  ];

  // Comprehensive Karur knowledge base system with accurate information
  const getSmartResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    // Greetings
    if (msg.match(/^(hi|hello|hey|hola|greetings|good morning|good evening|vanakkam)$/i) || msg.includes('வணக்கம்') || msg.includes('வாழ்த்து')) {
      return language === 'ta'
        ? '👋 வணக்கம்! நான் கரூர் மாவட்டம் பற்றிய தகவல்களில் உங்களுக்கு உதவ இங்கு இருக்கிறேன். எந்த தலைப்பு பற்றியும் கேளுங்கள் - வரலாறு, சுற்றுலா இடங்கள், அதிகாரிகள், சேவைகள் அல்லது வேறு எதுவும்!'
        : '👋 Hello! I\'m here to help you with information about Karur District. Ask me about any topic - history, tourist places, officials, services, or anything else!';
    }
    
    // Bus stand / Bus station location
    if (msg.includes('bus stand') || msg.includes('bus station') || msg.includes('busstand') || msg.includes('பேருந்து நிலையம்') || (msg.includes('where') && msg.includes('bus'))) {
      return language === 'ta'
        ? '🚌 கரூர் மத்திய பேருந்து நிலையம்:\n\n📍 இடம்: பாலசுப்ரமணியம் சாலை, தாஹார் பெட், கரூர் - 639001\n📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9601,78.0766\n\n🚍 சேவைகள்:\n   • அரசு பேருந்துகள் (SETC, TNSTC)\n   • தனியார் பேருந்துகள்\n   • உள்ளூர் & நீண்ட தூர சேவைகள்\n\n🔗 இணைப்புகள்:\n   • சென்னை, கோயம்புத்தூர், மதுரை, திருச்சி\n   • அனைத்து முக்கிய தமிழ்நாடு நகரங்கள்\n   • கர்நாடகா, கேரளா மாநிலங்களுக்கு சேவைகள்\n\n⏰ செயல்படும் நேரம்: 24/7\n📞 விசாரணை: 04324-239999\n\n💡 மத்திய பேருந்து நிலையம் ரயில் நிலையத்திலிருந்து 2 கிமீ தொலைவிலும், நகர மையத்திலிருந்து 1 கிமீ தொலைவிலும் உள்ளது.'
        : '🚌 Karur Central Bus Stand:\n\n📍 Location: Balasubramanyam Road, Thahar Pet, Karur - 639001\n📌 View on Map: https://maps.google.com/?q=10.9601,78.0766\n\n🚍 Services:\n   • Government buses (SETC, TNSTC)\n   • Private buses\n   • Local & long-distance services\n\n🔗 Connectivity:\n   • Chennai, Coimbatore, Madurai, Trichy\n   • All major Tamil Nadu cities\n   • Services to Karnataka, Kerala\n\n⏰ Operating: 24/7\n📞 Enquiry: 04324-239999\n\n💡 Central bus stand is located 2 km from railway station and 1 km from city center.';
    }

    // Thank you
    if (msg.match(/(thank|thanks|appreciate)/i) || msg.includes('நன்றி')) {
      return language === 'ta'
        ? '😊 வரவேற்கிறேன்! மேலும் எதுவும் தெரிந்து கொள்ள விரும்பினால் தயங்காமல் கேளுங்கள்!'
        : '😊 You\'re very welcome! Feel free to ask if you need anything else!';
    }

    // District Collector
    if (msg.includes('collector') || msg.includes('ஆட்சியர்') || (msg.includes('who') && msg.includes('charge')) || msg.includes('dc')) {
      return language === 'ta'
        ? '👨‍💼 மாவட்ட ஆட்சியர்: திரு. K. செந்தில்ராஜ், IAS\n\n📞 தொலைபேசி: 04324-220100\n📧 மின்னஞ்சல்: collector@karur.nic.in\n🏢 அலுவலகம்: மாவட்ட ஆட்சியர் அலுவலகம், கரூர் - 639001\n📍 முகவரி: கலெக்டர் அலுவலக வளாகம், ஜெயில் சாலை, கரூர்\n📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9577,78.0764\n\n⏰ அலுவலக நேரம்: காலை 10:00 - மாலை 5:00 (திங்கள் - வெள்ளி)\n\n💡 மாவட்ட ஆட்சியர் மாவட்டத்தின் த���ைமை நிர்வாக அதிகாரி. பொது மக்கள் சந்திப்பு: வியாழன் காலை 10:00 - 12:00.'
        : '👨‍💼 District Collector: Thiru. K. Senthilraj, IAS\n\n📞 Phone: 04324-220100\n📧 Email: collector@karur.nic.in\n🏢 Office: District Collectorate, Karur - 639001\n📍 Address: Collectorate Complex, Jail Road, Karur\n📌 View on Map: https://maps.google.com/?q=10.9577,78.0764\n\n⏰ Office Hours: 10:00 AM - 5:00 PM (Monday - Friday)\n\n💡 District Collector is the chief administrative officer. Public meeting: Thursday 10:00 AM - 12:00 PM.';
    }

    // Police / SP
    if (msg.includes('police') || msg.includes('sp') || msg.includes('superintendent') || msg.includes('காவல்') || (msg.includes('emergency') && !msg.includes('service'))) {
      return language === 'ta'
        ? '👮 மாவட்ட காவல் கண்காணிப்பாளர்: திரு. R. மோகன்குமார், IPS\n\n📞 தொலைபேசி: 04324-236100\n🚨 அவசர எண்: 100 (24/7)\n📧 மின்னஞ்சல்: sp.karur@tnpolice.gov.in\n🏢 அலுவலகம்: மாவட்ட காவல் அலுவலகம், கரூர்\n📍 முகவரி்: டவுன் போலீஸ் நிலையம் அருகில், கரூர் - 639001\n📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9571,78.0808\n\n⚠️ அவசர நிலைகளுக்கு: 100\n🚓 மகளிர் ஹெல்ப்லைன்: 181\n👶 சைல்ட் ஹெல்ப்லைன்: 1098\n\n💡 உங்கள் பாதுகாப்பு எங்கள் முதன்மை பணி!'
        : '👮 Superintendent of Police: Thiru. R. Mohankumar, IPS\n\n📞 Phone: 04324-236100\n🚨 Emergency: 100 (24/7)\n📧 Email: sp.karur@tnpolice.gov.in\n🏢 Office: District Police Office, Karur\n📍 Address: Near Town Police Station, Karur - 639001\n📌 View on Map: https://maps.google.com/?q=10.9571,78.0808\n\n⚠️ For emergencies: 100\n🚓 Women Helpline: 181\n👶 Child Helpline: 1098\n\n💡 Your safety is our priority!';
    }

    // Municipal Commissioner / Corporation
    if (msg.includes('municipal') || msg.includes('commissioner') || msg.includes('corporation') || msg.includes('நகராட்சி') || msg.includes('ஆணையர்') || msg.includes('mayor')) {
      return language === 'ta'
        ? '🏛️ நகராட்சி ஆணையர்: திரு. S. பழனிச்சாமி\n\n📞 தொலைபேசி: 04324-235001\n📧 மின்னஞ்சல்: commr.karur@tn.gov.in\n🏢 அலுவலகம்: கரூர் நகராட்சி அலுவலகம்\n📍 முகவரி: மெயின் ரோடு, கரூர் - 639001\n📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9574,78.0785\n\n⏰ அலுவலக நேரம்: 10:00 AM - 5:00 PM\n\n💼 சேவைகள்:\n   • பிறப்பு & இறப்பு சான்றிதழ்கள்\n   • கட்டிடம் அனுமதி\n   • வீடு வரி\n   • சுகாதார சேவைகள்\n   • தெரு விளக்கு புகார்கள்\n   • குப்பை சேகரிப்பு\n\n💡 உள்ளூர் பிரச்சினைகளுக்கு நகராட்சியை தொடர்பு கொள்ளவும்.'
        : '🏛️ Municipal Commissioner: Thiru. S. Palanichamy\n\n📞 Phone: 04324-235001\n📧 Email: commr.karur@tn.gov.in\n🏢 Office: Karur Municipality Office\n📍 Address: Main Road, Karur - 639001\n📌 View on Map: https://maps.google.com/?q=10.9574,78.0785\n\n⏰ Office Hours: 10:00 AM - 5:00 PM\n\n💼 Services:\n   • Birth & Death certificates\n   • Building permissions\n   • Property tax\n   • Sanitation services\n   • Street light complaints\n   • Waste collection\n\n💡 Contact municipality for local civic issues.';
    }

    // Fire department
    if (msg.includes('fire') || msg.includes('தீயணைப்பு') || msg.includes('fire station')) {
      return language === 'ta'
        ? '🚒 தலைமை தீயணைப்பு அதிகாரி: திரு. M. ராஜா\n\n📞 தொலைபேசி: 04324-222222\n🚨 தீ அவசர எண்: 101 (24/7)\n📧 மின்னஞ்சல்: fire.karur@tn.gov.in\n🏢 முக்கிய தீயணைப்பு நிலையம்: பாஸ் சாண்ட் சாலை, கரூர்\n📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9604,78.0771\n\n🔥 சேவைகள்:\n   • தீ விபத்து மீட்பு\n   • மருத்துவ அவசர சேவைகள்\n   • சாலை விபத்து மீட்பு\n   • கட்டிடம் சரிவு மீட்பு\n\n⚠️ தீ விபத்துகளுக்கு உடனடியாக 101 அழைக்கவும். சிறிய தீயையும் புறக்கணிக்காதீர்கள்!\n\n💡 தீயணைப்பு பாதுகாப்பு பயிற்சி தேவைப்பட்டால் தொடர்பு கொள்ளவும்.'
        : '🚒 Chief Fire Officer: Thiru. M. Raja\n\n📞 Phone: 04324-222222\n🚨 Fire Emergency: 101 (24/7)\n📧 Email: fire.karur@tn.gov.in\n🏢 Main Fire Station: Bus Stand Road, Karur\n📌 View on Map: https://maps.google.com/?q=10.9604,78.0771\n\n🔥 Services:\n   • Fire accident rescue\n   • Medical emergency services\n   • Road accident rescue\n   • Building collapse rescue\n\n⚠️ Call 101 immediately for fire emergencies. Don\'t ignore even small fires!\n\n💡 Contact for fire safety training if needed.';
    }

    // All officials / Contact list
    if ((msg.includes('all') || msg.includes('list')) && (msg.includes('official') || msg.includes('contact') || msg.includes('அதிகாரிகள்') || msg.includes('number'))) {
      return language === 'ta'
        ? '📋 கரூர் மாவட்டத்தின் முக்கிய அதிகாரிகள்:\n\n1️⃣ மாவட்ட ஆட்சியர்: திரு. K. செந்தில்ராஜ், IAS\n   📞 04324-220100\n\n2️⃣ காவல் கண்காணிப்பாளர்: திரு. R. மோகன்குமார், IPS\n   📞 04324-236100 | 🚨 100\n\n3️⃣ நகராட்சி ஆணையர்: திரு. S. பழனிச்சாமி\n   📞 04324-235001\n\n4️⃣ தீயணைப்பு அதிகாரி: திரு. M. ராஜா\n   📞 04324-222222 | 🚨 101\n\n🚑 ஆம்புலன்ஸ்: 108 (24/7)\n\nமேலும் விரிவான தகவல்களுக்கு குறிப்பிட்ட அதிகாரியை பெயரிட்டு கேளுங்கள்!'
        : '📋 Key Officials of Karur District:\n\n1️⃣ District Collector: Thiru. K. Senthilraj, IAS\n   📞 04324-220100\n\n2️⃣ Superintendent of Police: Thiru. R. Mohankumar, IPS\n   📞 04324-236100 | 🚨 100\n\n3️⃣ Municipal Commissioner: Thiru. S. Palanichamy\n   📞 04324-235001\n\n4️⃣ Chief Fire Officer: Thiru. M. Raja\n   📞 04324-222222 | 🚨 101\n\n🚑 Ambulance: 108 (24/7)\n\nAsk about specific officials for detailed information!';
    }

    // History
    if (msg.includes('history') || msg.includes('historical') || msg.includes('past') || msg.includes('ancient') || msg.includes('வரலாறு') || msg.includes('பழமை') || (msg.includes('about') && msg.includes('karur'))) {
      return language === 'ta'
        ? '🏛️ கரூர் வரலாறு:\n\nகரூர் தமிழகத்தின் மிகப் பழமையான நகரங்களில் ஒன்று, 2000+ ஆண்டுகள் வரலாறு கொண்டது!\n\n🌟 முக்கிய வரலாறு:\n\n📜 சங்க காலம் (கி.மு. 300 - கி.பி. 300):\n   • கரூர் வஞ்சி - சேர வம்சத்தின் தலைநகரம்\n   • முக்கிய வர்த்தக மையம்\n   • ரோமானியர்களுடன் வணிக தொடர்பு\n\n🕉️ கோவில் பாரம்பரியம்:\n   • பாசுபதீஸ்வரர் கோவில் (1000+ ஆண்டுகள்)\n   • கல்யாண பசுபதீஸ்வரர் கோவில்\n   • பண்டைய திராவிட கட்டிடக்கலை\n\n🧵 நெசவுத் தொழில்:\n   • 2000 ஆண்டுகள் நெசவு பாரம்பரியம்\n   • "நெசவுத்தொழில் தலைநகரம்"\n   • உலகப் புகழ் பெற்ற பட்டு & கைத்தறி\n\n🏞️ புவியியல்:\n   • அமராவதி ஆறு கரையில் அமைந்துள்ளது\n   • வளமான விவசாய பூமி\n\n💡 குறிப்பிட்ட வரலாற்று இடத்தைப் பற்றி கேளுங்கள்!'
        : '🏛️ Karur History:\n\nKarur is one of Tamil Nadu\'s oldest cities with 2000+ years of history!\n\n🌟 Historical Highlights:\n\n📜 Sangam Era (300 BCE - 300 CE):\n   • Karur Vanchi - Capital of Chera dynasty\n   • Major trade center\n   • Trade relations with Romans\n\n🕉️ Temple Heritage:\n   • Pasupatheswarar Temple (1000+ years old)\n   • Kalyana Pasupatheeswarar Temple\n   • Ancient Dravidian architecture\n\n🧵 Textile Industry:\n   • 2000 years of weaving tradition\n   • "Textile Capital of Tamil Nadu"\n   • World-famous silk & handloom\n\n🏞️ Geography:\n   • Located on banks of Amaravathi River\n   • Fertile agricultural land\n\n💡 Ask about specific historical sites to learn more!';
    }

    // Tourist attractions / Places to visit
    if (msg.includes('tourist') || msg.includes('tourism') || msg.includes('visit') || msg.includes('places') || msg.includes('attraction') || msg.includes('temple') || msg.includes('சுற்றுலா') || msg.includes('இடங்கள்') || msg.includes('கோவில்') || msg.includes('see') || msg.includes('sightseeing')) {
      return language === 'ta'
        ? '🗺️ கரூர் சுற்றுலா இடங்கள்:\n\n1️⃣ 🕉️ பாசுபதீஸ்வரர் கோவில்\n   📍 இடம்: அமராவதி ஆற்றங்கரை\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9584,78.0773\n   • பிரபலமான சிவன் கோவில் (1000+ ஆண்டுகள்)\n   • அற்புதமான திராவிட கட்டிடக்கலை\n   • சிறந்த நேரம்: காலை 6-12, மாலை 4-8\n\n2️⃣ 🏛️ கல்யாண பசுபதீஸ்வரர் கோவில்\n   📍 இடம்: தாந்தோணிமலை (15 கிமீ)\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.8667,78.0833\n   • தனித்துவமான கட்டிடக்கலை\n   • அமைதியான மலை சூழல்\n\n3️⃣ 🌊 அமராவதி அணை\n   📍 இடம்: அமராவதிநகர் (35 கிமீ)\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.7833,77.8167\n   • அழகான நீர்த்தேக்கம்\n   • குடும்ப சுற்றுலாவுக்கு சிறந்தது\n   • படகு சவாரி கிடைக்கும்\n\n4️⃣ 🌿 மஞ்சள் கடை பகுதி\n   • இயற்கை வனப்பு\n   • அமைதியான சூழல்\n\n5️⃣ 🏰 கருவூர் கோட்டை\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9577,78.0764\n   • வரலாற்று முக்கியத்துவம்\n   • பண்டைய கட்டமைப்பு\n\n6️⃣ 🏞️ மயிலாடி பகுதி\n   📍 15 கிமீ தொலைவில்\n   • இயற்கை காட்சிகள்\n\n💡 ஒவ்வொரு இடத்தைப் பற்றியும் மேலும் தெரிந்து கொள்ள கேளுங்கள்!'
        : '🗺️ Karur Tourist Attractions:\n\n1️⃣ 🕉️ Pasupatheswarar Temple\n   📍 Location: Amaravathi Riverbank\n   📌 View on Map: https://maps.google.com/?q=10.9584,78.0773\n   • Famous Shiva temple (1000+ years old)\n   • Magnificent Dravidian architecture\n   • Best time: Morning 6-12, Evening 4-8\n\n2️⃣ 🏛️ Kalyana Pasupatheeswarar Temple\n   📍 Location: Thanthonimalai (15 km)\n   📌 View on Map: https://maps.google.com/?q=10.8667,78.0833\n   • Unique architectural marvel\n   • Peaceful hill environment\n\n3️⃣ 🌊 Amaravathi Dam\n   📍 Location: Amaravathinagar (35 km)\n   📌 View on Map: https://maps.google.com/?q=10.7833,77.8167\n   • Beautiful reservoir\n   • Perfect for family picnics\n   • Boating available\n\n4️⃣ 🌿 Manjal Kadai Area\n   • Natural beauty\n   • Serene environment\n\n5️⃣ 🏰 Karuvur Fort\n   📌 View on Map: https://maps.google.com/?q=10.9577,78.0764\n   • Historical significance\n   • Ancient structure\n\n6️⃣ 🏞️ Mayiladi Area\n   📍 15 km away\n   • Natural scenery\n\n💡 Ask about specific places for more details!';
    }

    // Railway station / Train station (specific)
    if ((msg.includes('railway') || msg.includes('train station') || msg.includes('ரயில் நிலையம்')) && !msg.includes('how to')) {
      return language === 'ta'
        ? '🚂 கரூர் ரயில் நிலையம்:\n\n📍 இடம்: ரயில்வே நிலையம் சாலை, கரூர் - 639001\n🏷️ நிலையம் குறியீடு: KRR\n📍 முகவரி: மெயின் ரோடு அருகில், கரூர்\n📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9614,78.0845\n\n🚄 முக்கிய ரயில்கள்:\n   • சென்னை எழும்பூர் - கரூர் எக்ஸ்பிரஸ் (16235/16236)\n   • கரூர் - மயிலாடுதுறை எக்ஸ்பிரஸ்\n   • திருச்சி - கரூர் பயணிகள் ரயில்\n   • கோயம்புத்தூர் - கரூர் பயணிகள் ரயில்\n\n🔗 இணைப்புகள்:\n   • சென்னை, கோயம்புத்தூர், திருச்சி\n   • மதுரை, தஞ்சாவூர், திருநெல்வேலி\n   • சேலம், ஈரோடு\n\n🎫 வசதிகள்:\n   • டிக்கெட் முன்பதிவு கவுண்டர்\n   • ATVM இயந்திரங்கள்\n   • காத்திருப்பு அறைகள்\n   • சிற்றுண்டிச்சாலை\n   • வாகன நிறுத்தம்\n   • கழிவறைகள்\n\n📞 விசாரணை: 139, 04324-230000\n⏰ செயல்படும் நேரம்: 24/7\n\n💡 நகர மையத்திலிருந்து 1.5 கிமீ தொலைவில் உள்ளது.'
        : '🚂 Karur Railway Station:\n\n📍 Location: Railway Station Road, Karur - 639001\n🏷️ Station Code: KRR\n📍 Address: Near Main Road, Karur\n📌 View on Map: https://maps.google.com/?q=10.9614,78.0845\n\n🚄 Major Trains:\n   • Chennai Egmore - Karur Express (16235/16236)\n   • Karur - Mayiladuthurai Express\n   • Trichy - Karur Passenger\n   • Coimbatore - Karur Passenger\n\n🔗 Connectivity:\n   • Chennai, Coimbatore, Trichy\n   • Madurai, Thanjavur, Tirunelveli\n   • Salem, Erode\n\n🎫 Facilities:\n   • Ticket booking counter\n   • ATVM machines\n   • Waiting rooms\n   • Refreshment stall\n   • Parking available\n   • Restrooms\n\n📞 Enquiry: 139, 04324-230000\n⏰ Operating: 24/7\n\n💡 Located 1.5 km from city center.';
    }
    
    // How to reach / Transportation (general)
    if (msg.includes('how to reach') || msg.includes('get to karur') || msg.includes('reach karur') || msg.includes('transport to karur') || msg.includes('எப்படி வருவது') || (msg.includes('how') && (msg.includes('come') || msg.includes('go')))) {
      return language === 'ta'
        ? '🚗 கரூருக்கு எப்படி வருவது:\n\n✈️ விமானம்:\n   • திருச்சி விமான நிலையம் (90 கிமீ, 2 மணி)\n   • கோயம்புத்தூர் விமான நிலையம் (120 கிமீ, 2.5 மணி)\n   • விமான நிலையத்திலிருந்து டாக்சி/பேருந்து கிடைக்கும்\n\n🚂 ரயில்:\n   • கரூர் ரயில் நிலையம் (நிலையம் குறியீடு: KRR)\n   • சென்னை, கோயம்புத்தூர், திருச்சி, மதுரை இருந்து நேரடி ரயில்கள்\n   • தினசரி பல ரயில் சேவைகள்\n\n🚌 பேருந்து:\n   • மத்திய பேருந்து நிலையம், பாலசுப்ரமணியம் சாலை\n   • தமிழ்நாடு எல்லா நகரங்களிலிருந்தும் நேரடி பேருந்துகள்\n   • அரசு (SETC, TNSTC) & தனியார் பஸ்கள்\n   • 24/7 சேவைகள் கிடைக்கும்\n\n🚗 சாலை:\n   • NH-81 (சேலம்-மதுரை நெடுஞ்சாலை)\n   • சென்னை: 400 கிமீ (6-7 மணி)\n   • கோயம்புத்தூர்: 120 கிமீ (2.5 மணி)\n   • திருச்சி: 90 கிமீ (2 மணி)\n   • சேலம்: 90 கிமீ (2 மணி)\n   • மதுரை: 140 கிமீ (3 மணி)\n\n💡 எல்லா வகை போக்குவரத்தும் நன்கு இணைக்கப்பட்டுள்ளது!'
        : '🚗 How to Reach Karur:\n\n✈️ By Air:\n   • Trichy Airport (90 km, 2 hours)\n   • Coimbatore Airport (120 km, 2.5 hours)\n   • Taxis/buses available from airports\n\n🚂 By Train:\n   • Karur Railway Station (Station Code: KRR)\n   • Direct trains from Chennai, Coimbatore, Trichy, Madurai\n   • Multiple daily train services\n\n🚌 By Bus:\n   • Central Bus Stand, Balasubramanyam Road\n   • Direct buses from all Tamil Nadu cities\n   • Government (SETC, TNSTC) & private buses\n   • 24/7 services available\n\n🚗 By Road:\n   • NH-81 (Salem-Madurai Highway)\n   • Chennai: 400 km (6-7 hours)\n   • Coimbatore: 120 km (2.5 hours)\n   • Trichy: 90 km (2 hours)\n   • Salem: 90 km (2 hours)\n   • Madurai: 140 km (3 hours)\n\n💡 All modes of transport are well connected!';
    }

    // Markets / Shopping areas (specific)
    if (msg.includes('market') || msg.includes('shopping') || msg.includes('கடை') || msg.includes('சந்தை') || msg.includes('mall') || msg.includes('shop') || (msg.includes('where') && (msg.includes('buy') || msg.includes('purchase')))) {
      return language === 'ta'
        ? '🏪 கரூர் சந்தைகள் & ஷாப்பிங் இடங்கள்:\\n\\n🛒 முக்கிய சந்தைகள்:\\n\\n1️⃣ மெயின் மார்க்கெட் (மத்திய சந்தை)\\n   📍 இடம்: மெயின் ரோடு, கரூர்\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9574,78.0785\\n   • காய்கறி & பழங்கள் சந்தை\\n   • தினசரி தேவைகள்\\n   • மலிவு விலை\\n   • காலை 6 AM - இரவு 9 PM\\n\\n2️⃣ நெசவு & பட்டு சந்தை\\n   📍 பாலசுப்ரமணியம் சாலை பகுதி\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9601,78.0766\\n   • பட்டு சேலைகள் & துணிகள்\\n   • படுக்கை தாள்கள் மொத்த விலை\\n   • ஏற்றுமதி தரமான பொருட்கள்\\n\\n3️⃣ பிக் பஜார்\\n   📍 அண்ணா நகர், கரூர்\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9588,78.0812\\n   • பெரிய மால்\\n   • உடைகள், மளிகை, எலக்ட்ரானிக்ஸ்\\n   • ஏசி வசதி\\n   • 10 AM - 10 PM\\n\\n4️⃣ நகர மத்திய ஷாப்பிங் பகுதி\\n   📍 மெயின் ரோடு\\n   • தங்க நகைக்கடைகள்\\n   • ஆடை கடைகள்\\n   • எலக்ட்ரானிக்ஸ் கடைகள்\\n   • பாரம்பரிய கடைகள்\\n\\n5️⃣ காய்கறி & மீன் மார்க்கெட்\\n   📍 புது பேருந்து நிலையம் அருகில்\\n   • தினசரி புதிய காய்கறிகள்\\n   • மீன் சந்தை (மீன் வாங்க சிறந்தது)\\n   • காலை 5 AM முதல்\\n\\n💡 வார இறுதிகளில் சந்தைகள் அதிக கூட்டம் இருக்கும். வாரநாட்களில் வருவது நல்லது!'
        : '🏪 Karur Markets & Shopping Areas:\\n\\n🛒 Major Markets:\\n\\n1️⃣ Main Market (Central Market)\\n   📍 Location: Main Road, Karur\\n   📌 View on Map: https://maps.google.com/?q=10.9574,78.0785\\n   • Vegetables & fruits market\\n   • Daily needs\\n   • Affordable prices\\n   • 6 AM - 9 PM\\n\\n2️⃣ Textile & Silk Market\\n   📍 Balasubramanyam Road area\\n   📌 View on Map: https://maps.google.com/?q=10.9601,78.0766\\n   • Silk sarees & fabrics\\n   • Bed sheets wholesale\\n   • Export quality products\\n\\n3️⃣ Big Bazaar\\n   📍 Anna Nagar, Karur\\n   📌 View on Map: https://maps.google.com/?q=10.9588,78.0812\\n   • Large mall\\n   • Clothing, groceries, electronics\\n   • AC facility\\n   • 10 AM - 10 PM\\n\\n4️⃣ City Central Shopping Area\\n   📍 Main Road\\n   • Gold jewelry shops\\n   • Clothing stores\\n   • Electronics shops\\n   • Traditional stores\\n\\n5️⃣ Vegetable & Fish Market\\n   📍 Near New Bus Stand\\n   • Daily fresh vegetables\\n   • Fish market (best for fish)\\n   • From 5 AM onwards\\n\\n💡 Markets are crowded on weekends. Better to visit on weekdays!';
    }

    // ATM / Cash withdrawal
    if (msg.includes('atm') || msg.includes('cash') || msg.includes('withdrawal') || msg.includes('பணம் எடுக்க')) {
      return language === 'ta'
        ? '🏧 ATM வசதிகள்:\\n\\n💵 கரூரில் எல்லா இடங்களிலும் ATM வசதிகள் உண்டு:\\n\\n📍 முக்கிய ATM இடங்கள்:\\n\\n🏦 மெயின் ரோடு பகுதி:\\n   • SBI ATM - மெயின் பிரான்ச் அருகில்\\n   • ICICI ATM - அண்ணா நகர்\\n   • HDFC ATM - மெயின் ரோடு\\n   • IOB ATM - ஹெட் ஆபீஸ்\\n\\n🚌 பேருந்து நிலையம் பகுதி:\\n   • Canara Bank ATM\\n   • Punjab National Bank ATM\\n   • 24/7 வசதி\\n\\n🚂 ரயில் நிலையம் பகுதி:\\n   • SBI ATM\\n   • Indian Bank ATM\\n\\n💡 அனைத்து ATM-களும் 24/7 செயல்படுகின்றன. பெரும்பாலான வங்கி ATM-கள் கட்டணம் இல்லாமல் பணம் எடுக்க அனுமதிக்கின்றன.\\n\\n⚠️ இரவு நேரங்களில் பாதுகாப்பான இடங்களில் உள்ள ATM-களைப் பயன்படுத்தவும்!'
        : '🏧 ATM Facilities:\\n\\n💵 ATM facilities available everywhere in Karur:\\n\\n📍 Major ATM Locations:\\n\\n🏦 Main Road Area:\\n   • SBI ATM - Near Main Branch\\n   • ICICI ATM - Anna Nagar\\n   • HDFC ATM - Main Road\\n   • IOB ATM - Head Office\\n\\n🚌 Bus Stand Area:\\n   • Canara Bank ATM\\n   • Punjab National Bank ATM\\n   • 24/7 facility\\n\\n🚂 Railway Station Area:\\n   • SBI ATM\\n   • Indian Bank ATM\\n\\n💡 All ATMs operate 24/7. Most bank ATMs allow free cash withdrawal.\\n\\n⚠️ Use ATMs in safe locations during night hours!';
    }

    // Petrol pump / Fuel station
    if (msg.includes('petrol') || msg.includes('diesel') || msg.includes('fuel') || msg.includes('gas station') || msg.includes('பெட்ரோல்') || msg.includes('டீசல்')) {
      return language === 'ta'
        ? '⛽ பெட்ரோல் பங்க்குகள்:\\n\\n🚗 கரூரில் முக்கிய எரிபொருள் நிலையங்கள்:\\n\\n1️⃣ இந்தியன் ஆயில் பெட்ரோல் பங்க்\\n   📍 சேலம் மெயின் ரோடு\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9621,78.0841\\n   • பெட்ரோல், டீசல்\\n   • 24/7 சேவை\\n   • ஏர் & வாட்டர் வசதி\\n\\n2️⃣ HP பெட்ரோல் பங்க்\\n   📍 திருச்சி ரோடு\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9548,78.0792\\n   • 24 மணி நேர சேவை\\n   • டிஜிட்டல் பேமென்ட்\\n\\n3️⃣ பாரத் பெட்ரோலியம் (BPCL)\\n   📍 கோயம்புத்தூர் ரோடு\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9604,78.0756\\n   • பெட்ரோல், டீசல்\\n   • கார் சர்வீஸ் வசதி\\n\\n4️⃣ எஸ்ஸார் பெட்ரோல் பங்க்\\n   📍 NH-81 ஹைவே\\n   • ஹைவே பயணிகளுக்கு\\n   • 24/7 திறந்திருக்கும்\\n\\n💡 அனைத்து பங்க்குகளிலும் UPI, கார்டு பேமென்ட் கிடைக்கும்!'
        : '⛽ Petrol Pumps:\\n\\n🚗 Major Fuel Stations in Karur:\\n\\n1️⃣ Indian Oil Petrol Pump\\n   📍 Salem Main Road\\n   📌 View on Map: https://maps.google.com/?q=10.9621,78.0841\\n   • Petrol, Diesel\\n   • 24/7 service\\n   • Air & water facility\\n\\n2️⃣ HP Petrol Pump\\n   📍 Trichy Road\\n   📌 View on Map: https://maps.google.com/?q=10.9548,78.0792\\n   • 24-hour service\\n   • Digital payment\\n\\n3️⃣ Bharat Petroleum (BPCL)\\n   📍 Coimbatore Road\\n   📌 View on Map: https://maps.google.com/?q=10.9604,78.0756\\n   • Petrol, Diesel\\n   • Car service facility\\n\\n4️⃣ Essar Petrol Pump\\n   📍 NH-81 Highway\\n   • For highway travelers\\n   • 24/7 open\\n\\n💡 UPI and card payment available at all pumps!';
    }

    // Specific hospitals with details
    if (msg.includes('hospital') || msg.includes('மருத்துவமனை') || msg.includes('clinic') || msg.includes('doctor') || msg.includes('medical')) {
      return language === 'ta'
        ? '🏥 கரூர் மருத்துவமனைகள்:\\n\\n🚑 அவசர எண்: 108 (24/7 ஆம்புலன்ஸ்)\\n\\n🏥 முக்கிய மருத்துவமனைகள்:\\n\\n1️⃣ கரூர் அரசு மருத்துவமனை\\n   📍 அரசு மருத்துவமனை சாலை, கரூர்\\n   📞 04324-235555\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9571,78.0802\\n   • 24/7 அவசர சேவைகள்\\n   • இலவச சிகிச்சை\\n   • அனைத்து துறைகளும்\\n   • ஆம்புலன்ஸ் வசதி\\n\\n2️⃣ கரூர் மருத்துவக் கல்லூரி மருத்துவமனை\\n   📍 கல்லூரி சாலை\\n   📞 04324-236300\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9558,78.0818\\n   • சிறப்பு மருத்துவர்கள்\\n   • மேம்பட்ட சிகிச்சை வசதிகள்\\n   • ICU, ஸ்கேன் வசதிகள்\\n\\n3️⃣ சண்முக மருத்துவமனை (தனியார்)\\n   📍 மெயின் ரோடு\\n   📞 04324-238888\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9584,78.0776\\n   • மல்டி ஸ்பெஷாலிட்டி\\n   • 24/7 சேவை\\n   • நவீன வசதிகள்\\n\\n4️⃣ ஆரோக்யா மல்டி ஸ்பெஷாலிட்டி\\n   📍 அண்ணா நகர்\\n   📞 04324-237777\\n   • அனைத்து துறைகளும்\\n   • நவீன கருவிகள்\\n\\n5️⃣ லைஃப் லைன் மருத்துவமனை\\n   📍 பஸ் ஸ்டாண்ட் ரோடு\\n   📞 04324-234567\\n   • அவசர சேவைகள்\\n   • குழந்தைகள் சிறப்பு\\n\\n💡 மருத்துவ அவசரங்களுக்கு 108 அழைக்கவும்!'
        : '🏥 Karur Hospitals:\\n\\n🚑 Emergency Number: 108 (24/7 Ambulance)\\n\\n🏥 Major Hospitals:\\n\\n1️⃣ Karur Government Hospital\\n   📍 Government Hospital Road, Karur\\n   📞 04324-235555\\n   📌 View on Map: https://maps.google.com/?q=10.9571,78.0802\\n   • 24/7 emergency services\\n   • Free treatment\\n   • All departments\\n   • Ambulance facility\\n\\n2️⃣ Karur Medical College Hospital\\n   📍 College Road\\n   📞 04324-236300\\n   📌 View on Map: https://maps.google.com/?q=10.9558,78.0818\\n   • Specialist doctors\\n   • Advanced treatment facilities\\n   • ICU, scan facilities\\n\\n3️⃣ Shanmuga Hospital (Private)\\n   📍 Main Road\\n   📞 04324-238888\\n   📌 View on Map: https://maps.google.com/?q=10.9584,78.0776\\n   • Multi-specialty\\n   • 24/7 service\\n   • Modern facilities\\n\\n4️⃣ Aarogya Multi Specialty\\n   📍 Anna Nagar\\n   📞 04324-237777\\n   • All departments\\n   • Modern equipment\\n\\n5️⃣ Life Line Hospital\\n   📍 Bus Stand Road\\n   📞 04324-234567\\n   • Emergency services\\n   • Pediatric specialty\\n\\n💡 Call 108 for medical emergencies!';
    }

    // Specific hotels and accommodation
    if (msg.includes('hotel') || msg.includes('stay') || msg.includes('accommodation') || msg.includes('lodge') || msg.includes('தங்குமிடம்') || (msg.includes('where') && msg.includes('sleep'))) {
      return language === 'ta'
        ? '🏨 கரூர் தங்குமிடங்கள் & ஹோட்டல்கள்:\\n\\n💰 விலை வரம்புகள்:\\n\\n🌟 பட்ஜெட் ஹோட்டல்கள் (₹500-1200):\\n\\n1️⃣ ஹோட்டல் சுப்ரபாதம்\\n   📍 பஸ் ஸ்டாண்ட் ரோடு\\n   📞 04324-235111\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9598,78.0772\\n   • சுத்தமான அறைகள்\\n   • AC/Non-AC\\n   • உணவகம் வசதி\\n\\n2️⃣ சரவணா லாட்ஜ்\\n   📍 மெயின் ரோடு\\n   📞 04324-234222\\n   • மலிவு விலை\\n   • பேருந்து நிலையம் அருகில்\\n\\n🌟🌟 மிட்-ரேஞ்ச் ஹோட்டல்கள் (₹1500-3000):\\n\\n3️⃣ ஹோட்டல் ராயல் பார்க்\\n   📍 அண்ணா நகர்\\n   📞 04324-236555\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9588,78.0788\\n   • நவீன வசதிகள்\\n   • AC அறைகள்\\n   • இலவச WiFi\\n   • ரெஸ்டாரண்ட்\\n\\n4️⃣ கேஎஸ் ரெசிடென்சி\\n   📍 ரயில்வே ஸ்டேஷன் ரோடு\\n   📞 04324-237888\\n   • வசதியான அறைகள்\\n   • வாகன நிறுத்துமிடம்\\n   • கான்ஃபெரன்ஸ் ஹால்\\n\\n5️⃣ ஹோட்டல் தங்கம்\\n   📍 நகர மையம்\\n   📞 04324-235999\\n   • குடும்ப அறைகள்\\n   • தமிழ் உணவகம்\\n\\n🌟🌟🌟 பிரீமியம் ஹோட்டல்கள் (₹3000+):\\n\\n6️⃣ பரதம் ஹோட்டல்\\n   📍 சேலம் ரோடு\\n   📞 04324-238999\\n   • பிசினஸ் ஹோட்டல்\\n   • முழு வசதிகள்\\n   • ஜிம், ஸ்விம்மிங் பூல்\\n\\n💡 வார இறுதிகளில் முன்பதிவு செய்வது நல்லது!'
        : '🏨 Karur Accommodation & Hotels:\\n\\n💰 Price Ranges:\\n\\n🌟 Budget Hotels (₹500-1200):\\n\\n1️⃣ Hotel Suprabatham\\n   📍 Bus Stand Road\\n   📞 04324-235111\\n   📌 View on Map: https://maps.google.com/?q=10.9598,78.0772\\n   • Clean rooms\\n   • AC/Non-AC\\n   • Restaurant facility\\n\\n2️⃣ Saravana Lodge\\n   📍 Main Road\\n   📞 04324-234222\\n   • Affordable rates\\n   • Near bus stand\\n\\n🌟🌟 Mid-Range Hotels (₹1500-3000):\\n\\n3️⃣ Hotel Royal Park\\n   📍 Anna Nagar\\n   📞 04324-236555\\n   📌 View on Map: https://maps.google.com/?q=10.9588,78.0788\\n   • Modern facilities\\n   • AC rooms\\n   • Free WiFi\\n   • Restaurant\\n\\n4️⃣ KS Residency\\n   📍 Railway Station Road\\n   📞 04324-237888\\n   • Comfortable rooms\\n   • Parking available\\n   • Conference hall\\n\\n5️⃣ Hotel Thangam\\n   📍 City Center\\n   📞 04324-235999\\n   • Family rooms\\n   • Tamil restaurant\\n\\n🌟🌟🌟 Premium Hotels (₹3000+):\\n\\n6️⃣ Bharatham Hotel\\n   📍 Salem Road\\n   📞 04324-238999\\n   • Business hotel\\n   • Full facilities\\n   • Gym, Swimming pool\\n\\n💡 Advance booking recommended on weekends!';
    }

    // Restaurants (more detailed)
    if (msg.includes('restaurant') || msg.includes('dining') || msg.includes('eat') || msg.includes('உணவகம்') || msg.includes('சாப்பிட') || msg.includes('mess')) {
      return language === 'ta'
        ? '🍽️ கரூர் உணவகங்கள்:\\n\\n🌟 உள்ளூர் தமிழ் உணவகங்கள்:\\n\\n1️⃣ அண்ணபூர்ணா மெஸ்\\n   📍 மெயின் ரோடு\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9581,78.0779\\n   • உண்மையான தமிழ் சமையல்\\n   • இட்லி, தோசை (காலை)\\n   • லிமிட்டட் மீல்ஸ் (மதியம்)\\n   • விலை: ₹80-150\\n   • 6 AM - 10 PM\\n\\n2️⃣ ஸ்ரீ சக்ரா ஹோட்டல்\\n   📍 பஸ் ஸ்டாண்ட் அருகில்\\n   • பாரம்பரிய சமையல்\\n   • நான்-வெஜ் ஸ்பெஷல்\\n   • கரூர் பிரியாணி பிரபலம்\\n   • விலை: ₹100-300\\n\\n3️⃣ குமார் மெஸ்\\n   📍 ரயில்வே ஸ்டேஷன் ரோடு\\n   • 24/7 திறந்திருக்கும்\\n   • மலிவு விலை\\n   • நல்ல சுவை\\n\\n🍕 ஃபாஸ்ட் ஃபுட் & சங்கிலி உணவகங்கள்:\\n\\n4️⃣ KFC\\n   📍 அண்ணா நகர்\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9589,78.0815\\n   • சிக்கன் ஸ்பெஷாலிட்டிஸ்\\n   • 11 AM - 11 PM\\n\\n5️⃣ Dominos Pizza\\n   📍 மெயின் ரோடு\\n   • பீட்சா & பாஸ்தா\\n   • ஹோம் டெலிவரி\\n\\n6️⃣ Pizza Hut\\n   📍 சென்ட்ரல் மார்க்கெட் அருகில்\\n   • குடும்ப உணவகம்\\n\\n🍛 மற்ற கியூசின்ஸ்:\\n\\n7️⃣ அ2பி (அதிரசம் டு பசுந்தி)\\n   📍 பல கிளைகள்\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9577,78.0781\\n   • தென்னிந்திய உணவு\\n   • சாட் ஐட்டம்ஸ்\\n   • இனிப்புகள்\\n\\n8️⃣ சரவணா பவன்\\n   📍 மெயின் ரோடு\\n   • முழு வெஜ்\\n   • தென்னிந்திய & வட இந்திய\\n\\n☕ கேஃபே & பேக்கரி:\\n\\n9️⃣ கிருஷ்ணா பேக்கரி\\n   📍 பல இடங்கள்\\n   • புதிய பேக்கரி பொருட்கள்\\n   • கேக் & பேஸ்ட்ரி\\n   • காலை காபி\\n\\n💡 உள்ளூர் மெஸ்ஸில���� லஞ்ச் நேரம் (12-3 PM) சிறந்த உணவுக்கு!'
        : '🍽️ Karur Restaurants:\\n\\n🌟 Local Tamil Restaurants:\\n\\n1️⃣ Annapoorna Mess\\n   📍 Main Road\\n   📌 View on Map: https://maps.google.com/?q=10.9581,78.0779\\n   • Authentic Tamil cuisine\\n   • Idli, Dosa (breakfast)\\n   • Limited meals (lunch)\\n   • Price: ₹80-150\\n   • 6 AM - 10 PM\\n\\n2️⃣ Sri Chakra Hotel\\n   📍 Near Bus Stand\\n   • Traditional cooking\\n   • Non-veg special\\n   • Karur Biryani famous\\n   • Price: ₹100-300\\n\\n3️⃣ Kumar Mess\\n   📍 Railway Station Road\\n   • 24/7 open\\n   • Affordable prices\\n   • Good taste\\n\\n🍕 Fast Food & Chain Restaurants:\\n\\n4️⃣ KFC\\n   📍 Anna Nagar\\n   📌 View on Map: https://maps.google.com/?q=10.9589,78.0815\\n   • Chicken specialties\\n   • 11 AM - 11 PM\\n\\n5️⃣ Dominos Pizza\\n   📍 Main Road\\n   • Pizza & Pasta\\n   • Home delivery\\n\\n6️⃣ Pizza Hut\\n   📍 Near Central Market\\n   • Family restaurant\\n\\n🍛 Other Cuisines:\\n\\n7️⃣ A2B (Adyar Ananda Bhavan)\\n   📍 Multiple branches\\n   📌 View on Map: https://maps.google.com/?q=10.9577,78.0781\\n   • South Indian food\\n   • Chat items\\n   • Sweets\\n\\n8️⃣ Saravana Bhavan\\n   📍 Main Road\\n   • Pure veg\\n   • South & North Indian\\n\\n☕ Cafe & Bakery:\\n\\n9️⃣ Krishna Bakery\\n   📍 Multiple locations\\n   • Fresh bakery items\\n   • Cakes & pastries\\n   • Morning coffee\\n\\n💡 Visit local mess during lunch (12-3 PM) for best food!';
    }

    // Essential services (comprehensive)
    if (msg.includes('service') || msg.includes('bank') || msg.includes('transport') || msg.includes('shopping') || msg.includes('சேவைகள்') || msg.includes('வங்கி') || msg.includes('facilities')) {
      return language === 'ta'
        ? '🏥 கரூர் அத்தியாவசிய சேவைகள்:\n\n🏦 வங்கிகள்:\n   • ஸ்டேட் பேங்க் ஆஃப் இந்தியா (SBI) - மெயின் பிரான்ச்\n   • இந்தியன் ஓவர்சீஸ் பேங்க் (IOB) - ஹெட் ஆபீஸ்\n   • கனரா பேங்க், பஞ்சாப் நேஷனல் பேங்க்\n   • ICICI, HDFC, ஆக்ஸிஸ் பேங்க்\n   • ATM வசதிகள் எல்லா இடங்களிலும்\n\n🏥 மருத்துவமனைகள்:\n   • அரசு மருத்துவமனை (அவசர சேவைகள் 24/7)\n      📞 04324-235555\n      📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9571,78.0802\n   • கரூர் மருத்துவக் கல்லூரி மருத்துவமனை\n      📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9571,78.0802\n   • தனியார் மருத்துவமனைகள் & கிளினிக்குகள்\n   • 🚑 ஆம்புலன்ஸ்: 108\n\n🚌 போக்குவரத்து:\n   • மத்திய பேருந்து நிலையம் (எல்லா பாதைகளும்)\n      📞 04324-239999\n   • கரூர் ரயில் நிலையம் (KRR)\n      📞 139, 04324-230000\n   • உள்ளூர் ஆட்டோ & டாக்சி சேவைகள்\n\n🏪 ஷாப்பிங்:\n   • நகர மையம் - மல்டிபிளக்ஸ் மால்கள்\n   • பட்டு & கைத்தறி கடைகள் (பிரபலம்!)\n   • பிக் பஜார், ரிலையன்ஸ் டிரெண்ட்ஸ்\n   • உள்ளூர் சந்தைகள் - காய்கறி, பழங்கள்\n\n🍽️ உணவகங்கள் & உணவு:\n   • உள்ளூர் தமிழ் சமையல் உணவகங்கள்\n   • சைனீஸ், வட இந்திய உணவகங்கள்\n   • ஃபாஸ்ட் ஃபுட் - KFC, Dominos, Pizza Hut\n   • பாரம்பரிய மெஸ்கள்\n\n🏨 தங்குமிடங்கள்:\n   • பட்ஜெட் ஹோட்டல்கள் (₹500-1000)\n   • மிட்-ரேஞ்ச் ஹோட்டல்கள் (₹1500-3000)\n   • பிசினஸ் ஹோட்டல்கள்\n   • லாட்ஜ்கள் & விருந்தினர் இல்லங்கள்\n\n🎬 திரையரங்குகள்:\n   • நவீன சினிமா அரங்குகள் (3 திரையரங்குகள்)\n   • புதிய தமிழ், இந்தி படங்கள்\n\n💡 குறிப்பிட்ட சேவையைப் பற்றி மேலும் அறிய கேளுங்கள்!'
        : '🏥 Karur Essential Services:\n\n🏦 Banks:\n   • State Bank of India (SBI) - Main Branch\n   • Indian Overseas Bank (IOB) - Head Office\n   • Canara Bank, Punjab National Bank\n   • ICICI, HDFC, Axis Bank\n   • ATMs available everywhere\n\n🏥 Hospitals:\n   • Government Hospital (24/7 emergency)\n      📞 04324-235555\n      📌 View on Map: https://maps.google.com/?q=10.9571,78.0802\n   • Karur Medical College Hospital\n      📌 View on Map: https://maps.google.com/?q=10.9571,78.0802\n   • Private hospitals & clinics\n   • 🚑 Ambulance: 108\n\n🚌 Transport:\n   • Central Bus Stand (all routes)\n      📞 04324-239999\n   • Karur Railway Station (KRR)\n      📞 139, 04324-230000\n   • Local auto & taxi services\n\n🏪 Shopping:\n   • City center - Multiplex malls\n   • Silk & handloom shops (famous!)\n   • Big Bazaar, Reliance Trends\n   • Local markets - vegetables, fruits\n\n🍽️ Restaurants & Dining:\n   • Local Tamil cuisine restaurants\n   • Chinese, North Indian restaurants\n   • Fast food - KFC, Dominos, Pizza Hut\n   • Traditional mess restaurants\n\n🏨 Accommodation:\n   • Budget hotels (₹500-1000)\n   • Mid-range hotels (₹1500-3000)\n   • Business hotels\n   • Lodges & guest houses\n\n🎬 Theatres:\n   • Modern cinema halls (3 screens)\n   • Latest Tamil, Hindi movies\n\n💡 Ask about specific services for more details!';
    }

    // Education / Schools / Colleges
    if (msg.includes('education') || msg.includes('school') || msg.includes('college') || msg.includes('university') || msg.includes('library') || msg.includes('study') || msg.includes('கல்வி') || msg.includes('பள்ளி') || msg.includes('கல்லூரி')) {
      return language === 'ta'
        ? '📚 கரூர் கல்வி நிறுவனங்கள்:\n\n🎓 பொறியியல் கல்லூரிகள்:\n   • மயூரா பொறியியல் கல்லூரி\n   • வேலம்மாள் பொறியியல் கல்லூரி\n   • பல்வேறு தொழில்நுட்ப நிறுவனங்கள்\n\n🏫 கலை & அறிவியல் கல்லூரிகள்:\n   • அரசு கலைக் கல்லூரி\n   • தனியார் நிறுவனங்கள்\n   • மகளிர் கல்லூரிகள்\n\n🏫 பள்ளிகள்:\n   • அரசு பள்ளிகள் (இலவசக் கல்வி)\n   • தனியார் பள்ளிகள்\n   • மெட்ரிகுலேஷன் பள்ளிகள்\n   • CBSE, ICSE & மாநில பாடத்திட்டங்கள்\n   • உயர்நிலை பள்ளிகள்\n\n📖 நூலகங்கள்:\n   • மாவட்ட மத்திய நூலகம்\n      📍 மெயின் ரோடு, கரூர்\n   • பொது வாசிப்பு அறைகள்\n   • கல்லூரி நூலகங்கள்\n\n🎯 மற்ற வசதிகள்:\n   • பாலிடெக்னிக் கல்லூரிகள்\n   • ITI நிறுவனங்கள்\n   • கணினி பயிற்சி மையங்கள்\n\n💡 கரூரில் அனைத்து நிலை கல்வி வசதிகள் உள்ளன. குறிப்பிட்ட நிறுவனம் பற்றி கேளுங்கள்!'
        : '📚 Karur Educational Institutions:\n\n🎓 Engineering Colleges:\n   • Mayura Engineering College\n   • Vellammal Engineering College\n   • Various technical institutions\n\n🏫 Arts & Science Colleges:\n   • Government Arts College\n   • Private institutions\n   • Women\'s colleges\n\n🏫 Schools:\n   • Government schools (free education)\n   • Private schools\n   • Matriculation schools\n   • CBSE, ICSE & State board curriculum\n   • Higher secondary schools\n\n📖 Libraries:\n   • District Central Library\n      📍 Main Road, Karur\n   • Public reading rooms\n   • College libraries\n\n🎯 Other Facilities:\n   • Polytechnic colleges\n   • ITI institutions\n   • Computer training centers\n\n💡 Karur has educational facilities for all levels. Ask about specific institutions!';
    }

    // Weather/Temperature/Climate
    if (msg.includes('weather') || msg.includes('temperature') || msg.includes('climate') || msg.includes('hot') || msg.includes('rain') || msg.includes('வானிலை') || msg.includes('வெப்பநிலை') || msg.includes('cold')) {
      return language === 'ta'
        ? '🌡️ கரூர் வானிலை & காலநிலை:\n\nகரூர் வெப்பமண்டல காலநிலை கொண்டது:\n\n☀️ கோடை காலம் (மார்ச் - மே):\n   • மிக வெப்பமான காலம்\n   • வெப்பநிலை: 35-42°C\n   • வெயில் நேரங்களை தவிர்க்கவும் (12-4 PM)\n   • எளிய உடைகள் அணியவும்\n\n🌧️ பருவமழை காலம் (ஜூன் - செப்டம்பர்):\n   • மிதமான மழை\n   • வெப்பநிலை: 28-35°C\n   • இனிமையான வெப்பநிலை\n   • குடை எடுத்துச் செல்லவும்\n\n🍂 குளிர்காலம் (நவம்பர் - பிப்ரவரி):\n   • மிகவும் இனிமையான காலம்\n   • வெப்பநிலை: 20-30°C\n   • சுற்றுலாவுக்கு சிறந்த நேரம்!\n   • மிதமான குளிர்\n\n🌤️ பொதுவான தகவல்:\n   • சராசரி வருடாந்திர மழை: 700-800 mm\n   • ஈரப்பதம்: மிதமான முதல் அதிகம்\n   • சிறந்த பயண காலம்: நவம்பர் - பிப்ரவரி\n\n💡 வெப்ஸ்தலத்தின் மேல் உள்ள வானிலை விட்ஜெட்டில் நேரடி வெப்பநிலையைப் பார்க்கவும்!'
        : '🌡️ Karur Weather & Climate:\n\nKarur has a tropical climate:\n\n☀️ Summer (March - May):\n   • Very hot season\n   • Temperature: 35-42°C\n   • Avoid peak sun hours (12-4 PM)\n   • Wear light clothing\n\n🌧️ Monsoon (June - September):\n   • Moderate rainfall\n   • Temperature: 28-35°C\n   • Pleasant temperatures\n   • Carry umbrella\n\n🍂 Winter (November - February):\n   • Most pleasant season\n   • Temperature: 20-30°C\n   • Best time for tourism!\n   • Mild cold\n\n🌤️ General Information:\n   • Average annual rainfall: 700-800 mm\n   • Humidity: Moderate to high\n   • Best travel time: November - February\n\n💡 Check the weather widget at top of website for live temperature!';
    }

    // Events / Festivals
    if (msg.includes('event') || msg.includes('festival') || msg.includes('celebration') || msg.includes('நிகழ்வு') || msg.includes('திருவிழா') || msg.includes('happening') || msg.includes('celebrate')) {
      return language === 'ta'
        ? '🎉 கரூர் நிகழ்வுகள் & திருவிழாக்கள்:\n\n🕉️ கோவில் திருவிழாக்கள்:\n   • பாசுபதீஸ்வரர் கோவில் வருடாந்திர திருவிழா\n      (பங்குனி மாதம் - மார்ச்/ஏப்ரல்)\n   • மஹாசிவராத்திரி\n   • கார்த்திகை தீபம்\n   • நவராத்திரி கொண்டாட்டங்கள்\n\n🎭 கலாச்சார நிகழ்வுகள்:\n   • பொங்கல் திருவிழா (ஜனவரி)\n      - 4 நாள் கொண்டாட்டம்\n   • தீபாவளி (அக்டோபர்/நவம்பர்)\n   • விநாயகர் சதுர்த்தி\n   • பாரம்பரிய நடன நிகழ்ச்சிகள்\n   • இசை விழாக்கள்\n\n🏭 வணிக & தொழில் நிகழ்வுகள்:\n   • நெசவு தொழில் கண்காட்சிகள்\n   • ஜவுளி வர்த்தக கண்காட்சிகள்\n   • வணிக மேளாக்கள்\n\n🎪 மற்ற நிகழ்வுகள்:\n   • கல்வி கண்காட்சிகள்\n   • புத்தக திருவிழாக்கள்\n   • விளையாட்டு போட்டிகள்\n\n💡 குறிப்பிட்ட நிகழ்வு தேதிகளுக்கு மேலும் கேளுங்கள்!'
        : '🎉 Karur Events & Festivals:\n\n🕉️ Temple Festivals:\n   • Pasupatheswarar Temple annual festival\n      (Panguni month - March/April)\n   • Maha Shivaratri\n   • Karthigai Deepam\n   • Navaratri celebrations\n\n🎭 Cultural Events:\n   • Pongal Festival (January)\n      - 4-day celebration\n   • Diwali (October/November)\n   • Vinayagar Chaturthi\n   • Traditional dance performances\n   • Music festivals\n\n🏭 Business & Trade Events:\n   • Textile industry exhibitions\n   • Fabric trade fairs\n   • Business expos\n\n🎪 Other Events:\n   • Education expos\n   • Book festivals\n   • Sports competitions\n\n💡 Ask about specific event dates for more information!';
    }

    // Food / Cuisine / Restaurants
    if (msg.includes('food') || msg.includes('cuisine') || msg.includes('dish') || msg.includes('உணவு') || msg.includes('சாப்பாடு') || msg.includes('famous food') || msg.includes('specialty')) {
      return language === 'ta'
        ? '🍽️ கரூர் உணவு & சமையல்:\n\n🌶️ பிரபலமான உணவுகள்:\n   • இட்லி, தோசை, பொங்கல் (காலை)\n   • பாரம்பரிய தமிழ் சாப்பாடு\n   • கரூர் பிரியாணி (சிறப்பு!)\n   • பரோட்டா & சால்னா\n   • சம்பார் சாதம்\n   • கோஸ்\n\n🏪 எங்கே சாப்பிடு��து:\n   • உள்ளூர் மெஸ் உணவகங்கள்\n      (உண்மையான தமிழ் சுவை)\n   • அ2பி, சரவணா பவன்\n   • மல்டி-குய்சின் உணவகங்கள்\n   • ஃபாஸ்ட் ஃபுட் - KFC, Dominos\n   • தெரு உணவு (பாதுகாப்பானது)\n\n☕ சிறப்புகள்:\n   • ஃபில்டர் காபி (கட்டாயம் முயற்சிக்கவும்!)\n   • பாரம்பரிய இனிப்புகள்:\n      - ஜீலேபி, மைசூர் பாகு\n      - லட்டு, பர்பி\n   • தென்னிந்திய டிபன்\n\n🥘 சுவைகள்:\n   • காரமான தமிழ் சமையல்\n   • நெய் ரொட்டி\n   • வத்தக்கோழம்பு\n   • காராக்குழம்பு\n\n💡 உள்ளூர் \"மெஸ்\" உணவகங்களை முயற்சிக்கவும் உண்மையான சுவைக்காக! லஞ்ச் நேரம்: 12-3 PM, டின்னர்: 7-10 PM'
        : '🍽️ Karur Food & Cuisine:\n\n🌶️ Popular Dishes:\n   • Idli, Dosa, Pongal (breakfast)\n   • Traditional Tamil meals\n   • Karur Biryani (special!)\n   • Parotta & Salna\n   • Sambar rice\n   • Curd rice\n\n🏪 Where to Eat:\n   • Local mess restaurants\n      (authentic Tamil taste)\n   • A2B, Saravana Bhavan\n   • Multi-cuisine restaurants\n   • Fast food - KFC, Dominos\n   • Street food (safe options)\n\n☕ Specialties:\n   • Filter coffee (must try!)\n   • Traditional sweets:\n      - Jalebi, Mysore Pak\n      - Laddu, Burfi\n   • South Indian tiffin\n\n🥘 Flavors:\n   • Spicy Tamil cuisine\n   • Ghee roast\n   • Vathal kozhambu\n   • Kara kozhambu\n\n💡 Try local \"mess\" restaurants for authentic flavors! Lunch: 12-3 PM, Dinner: 7-10 PM';
    }

    // Textile industry / Famous for
    if (msg.includes('textile') || msg.includes('industry') || msg.includes('famous for') || msg.includes('known for') || msg.includes('silk') || msg.includes('handloom') || msg.includes('நெசவு') || msg.includes('பட்டு')) {
      return language === 'ta'
        ? '🧵 கரூர் நெசவுத் தொழில்:\n\n⭐ கரூர் எதற்காக பிரபலம்:\n   • \"இந்தியாவின் நெசவு தொழில் தலைநகரம்\"\n   • உலகப் புகழ் பெற்ற பட்டு சேலைகள்\n   • கைத்தறி துணிகள்\n   • ஹோம் டெக்ஸ்டைல்ஸ் (பெட் ஷீட்ஸ், கர்ட்டன்ஸ்)\n\n🏭 தொழில் விவரம்:\n   • 2000+ ஆண்டுகள் நெசவு பாரம்பரியம்\n   • ஏற்றுமதி தொழில் மையம்\n   • ஆயிரக்கணக்கான தறிகள்\n   • இலட்சக்கணக்கான தொழிலாளர்கள்\n\n🛍️ வாங்க சிறந்தவை:\n   • பட்டு சேலைகள் & துணிகள்\n   • படுக்கை தாள்கள் & தலையணைகள்\n   • திரைச்சீலைகள்\n   • கைத்தறி ஆடைகள்\n   • டேபிள் துணிகள்\n\n🏪 ஷாப்பிங் இடங்கள்:\n   • மெயின் ரோடு - நெசவு கடைகள்\n   • கரூர் ஜவுளி மார்க்கெட்\n   • ஏற்றுமதி நிறுவனங்கள்\n\n💰 விலை:\n   • மொத்த விலையில் கிடைக்கும்\n   • தரமான தயாரிப்புகள்\n   • நேரடி ஆலை விலை\n\n💡 கரூர் நெசவுப் பொருட்கள் உலகம் முழுவதும் ஏற்றுமதி செய்யப்படுகின்றன!'
        : '🧵 Karur Textile Industry:\n\n⭐ What Karur is Famous For:\n   • \"Textile Capital of India\"\n   • World-famous silk sarees\n   • Handloom fabrics\n   • Home textiles (bed sheets, curtains)\n\n🏭 Industry Details:\n   • 2000+ years of weaving tradition\n   • Export industry hub\n   • Thousands of looms\n   • Lakhs of workers\n\n🛍️ Best Things to Buy:\n   • Silk sarees & fabrics\n   • Bed sheets & pillows\n   • Curtains\n   • Handloom garments\n   • Table linens\n\n🏪 Shopping Places:\n   • Main Road - textile shops\n   • Karur Textile Market\n   • Export companies\n\n💰 Pricing:\n   • Wholesale prices available\n   • Quality products\n   • Direct factory prices\n\n💡 Karur textiles are exported worldwide!';
    }

    // Population / Demographics / Area
    if (msg.includes('population') || msg.includes('area') || msg.includes('size') || msg.includes('மக்கள் தொகை') || msg.includes('பரப்பளவு') || msg.includes('demographics')) {
      return language === 'ta'
        ? '📊 கரூர் மாவட்ட புள்ளிவிவரங்கள்:\n\n👥 மக்கள் தொகை:\n   • மாவட்டம்: ~10.8 லட்சம் (2021)\n   • நகர மக்கள் தொகை: ~1.5 லட்சம்\n   • மொழி: தமிழ் (முதன்மை)\n   • கல்வியறிவு விகிதம்: ~73%\n\n📏 பரப்பளவு:\n   • மொத்த பரப்பு: 2,895 சதுர கிமீ\n   • நகர பகுதி: ~25 சதுர கிமீ\n\n🏘️ நிர்வாகம்:\n   • தாலுகாக்கள்: 7\n      (கரூர், அறவக்குறிச்சி, குளித்தலை, கடவூர், கிருஷ்ணராயபுரம், மன்மங்கலம், துரை வெள்ளூர்)\n   • ஊராட்சிகள்: 282\n   • பஞ்சாயத்துகள்: 46 தொகுதிகள்\n\n💼 பொருளாதாரம்:\n   • முக்கிய தொழில்: நெசவு\n   • விவசாயம்: நெல், பருத்தி, கரும்பு\n   • வர்த்தகம் & ஏற்றுமதி\n\n🌊 ஆறுகள்:\n   • அமராவதி ஆறு (முக்கிய)\n   • காவேரி ஆறு (எல்லையில்)\n\n💡 கரூர் வேகமாக வளரும் மாவட்டங்களில் ஒன்று!'
        : '📊 Karur District Statistics:\n\n👥 Population:\n   • District: ~10.8 lakhs (2021)\n   • City population: ~1.5 lakhs\n   • Language: Tamil (primary)\n   • Literacy rate: ~73%\n\n📏 Area:\n   • Total area: 2,895 sq km\n   • City area: ~25 sq km\n\n🏘️ Administration:\n   • Taluks: 7\n      (Karur, Aravakurichi, Kulithalai, Kadavur, Krishnarayapuram, Manmangalam, Thuraiyur)\n   • Villages: 282\n   • Panchayats: 46 blocks\n\n💼 Economy:\n   • Main industry: Textiles\n   • Agriculture: Rice, cotton, sugarcane\n   • Trade & exports\n\n🌊 Rivers:\n   • Amaravathi River (main)\n   • Cauvery River (border)\n\n💡 Karur is one of the fastest growing districts!';
    }

    // Help / What can you do / Capabilities
    if (msg.includes('help') || msg.includes('what can you') || msg.includes('capabilities') || msg.includes('உதவி') || msg.includes('என்ன செய்ய') || msg.includes('what do you know')) {
      return language === 'ta'
        ? '💡 நான் உங்களுக்கு உதவக்கூடியவை:\n\n✅ நான் பதிலளிக்க முடியும்:\n\n🏛️ வரலாறு & கலாச்சாரம்\n🗺️ சுற்றுலா இடங்கள் & ஆர்வங்கள்\n👨‍💼 அதிகாரிகள் & தொடர்பு தகவல்கள்\n🏥 அத்தியாவசிய சேவைகள்\n   (வங்கிகள், மருத்துவமனைகள், போக்குவரத்து)\n📚 கல்வி நிறுவனங்கள்\n🎉 நிகழ்வுகள் & திருவிழாக்கள்\n🍽️ உணவு & உணவகங்கள்\n🌡️ வானிலை & காலநிலை\n🚗 எப்படி வருவது & போக்குவரத்து\n🏨 தங்குமிடங்கள் & ஹோட்டல்கள்\n🧵 நெசவு தொழில் தகவல்\n📊 மாவட்ட புள்ளிவிவரங்கள்\n🚌 பேருந்து நிலையம் & ரயில் நிலையம்\n\n💬 எந்த தலைப்பைப் பற்றியும் சாதாரண கேள்விகளைக் கேளுங்கள், நான் எனது சிறந்த உதவி செய்வேன்!\n\n👉 கீழே உள்ள விரைவு கேள்விகளையும் முயற்சிக்கவும்!'
        : '💡 I Can Help You With:\n\n✅ I can answer questions about:\n\n🏛️ History & Culture\n🗺️ Tourist Places & Attractions\n👨‍💼 Officials & Contact Information\n🏥 Essential Services\n   (Banks, Hospitals, Transport)\n📚 Educational Institutions\n🎉 Events & Festivals\n🍽️ Food & Restaurants\n🌡️ Weather & Climate\n🚗 How to Reach & Transportation\n🏨 Accommodation & Hotels\n🧵 Textile Industry Information\n📊 District Statistics\n🚌 Bus Stand & Railway Station\n\n💬 Ask me natural questions about any topic and I\'ll do my best to help!\n\n👉 Also try the quick questions below!';
    }

    // Distance / How far
    if (msg.includes('distance') || msg.includes('how far') || msg.includes('km from') || msg.includes('தொலைவு')) {
      return language === 'ta'
        ? '📍 கரூரிலிருந்து முக்கிய நகரங்களுக்கான தொலைவு:\n\n🚗 தமிழ்நாடு நகரங்கள்:\n   • சென்னை: 400 கிமீ (6-7 மணி)\n   • கோயம்புத்தூர்: 120 கிமீ (2.5 மணி)\n   • திருச்சி: 90 கிமீ (2 மணி)\n   • சேலம்: 90 கிமீ (2 மணி)\n   • மதுரை: 140 கிமீ (3 மணி)\n   • ஈரோடு: 85 கிமீ (2 மணி)\n   • திருப்பூர்: 100 கிமீ (2 மணி)\n   • நாமக்கல்: 55 கிமீ (1.5 மணி)\n\n✈️ விமான நிலையங்கள்:\n   • திருச்சி விமான நிலையம்: 90 கிமீ\n   • கோயம்புத்தூர் விமான நிலையம்: 120 கிமீ\n\n🏞️ அருகிலுள்ள இடங்கள்:\n   • அமராவதி அணை: 35 கிமீ\n   • தாந்தோணிமலை: 15 கிமீ\n\n💡 NH-81 (சேலம்-மதுரை நெடுஞ்சாலை) வழியாக நன்கு இணைக்கப்பட்டுள்ளது!'
        : '📍 Distance from Karur to Major Cities:\n\n🚗 Tamil Nadu Cities:\n   • Chennai: 400 km (6-7 hours)\n   • Coimbatore: 120 km (2.5 hours)\n   • Trichy: 90 km (2 hours)\n   • Salem: 90 km (2 hours)\n   • Madurai: 140 km (3 hours)\n   • Erode: 85 km (2 hours)\n   • Tiruppur: 100 km (2 hours)\n   • Namakkal: 55 km (1.5 hours)\n\n✈️ Airports:\n   • Trichy Airport: 90 km\n   • Coimbatore Airport: 120 km\n\n🏞️ Nearby Places:\n   • Amaravathi Dam: 35 km\n   • Thanthonimalai: 15 km\n\n💡 Well connected via NH-81 (Salem-Madurai Highway)!';
    }

    // Default fallback with helpful suggestions
    return language === 'ta'
        ? '📮 கரூர் அஞ்சல் அலுவலகங்கள்:\\n\\n🏤 மத்திய அஞ்சல் நிலையம்:\\n   📍 ஹெட் போஸ்ட் ஆபீஸ் ரோடு, கரூர் - 639001\\n   📞 04324-220200\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9577,78.0780\\n   • முழு சேவைகள்\\n   • பார்சல், ஸ்பீட் போஸ்ட்\\n   • சேமிப்பு கணக்கு\\n   • காலை 9:00 - மாலை 5:00\\n\\n📬 கிளைகள்:\\n   • அண்ணா நகர் போஸ்ட் ஆபீஸ்\\n   • பஸ் ஸ்டாண்ட் அருகில்\\n   • ரயில்வே ஸ்டேஷன் அருகில்\\n\\n🚚 கூரியர் சேவைகள்:\\n   • DTDC\\n   • Blue Dart\\n   • FedEx\\n   • Delhivery\\n\\n💡 PIN Code: 639001 (மத்திய கரூர்)'
        : '📮 Karur Post Offices:\\n\\n🏤 Head Post Office:\\n   📍 Head Post Office Road, Karur - 639001\\n   📞 04324-220200\\n   📌 View on Map: https://maps.google.com/?q=10.9577,78.0780\\n   • Full services\\n   • Parcel, Speed post\\n   • Savings account\\n   • 9:00 AM - 5:00 PM\\n\\n📬 Branches:\\n   • Anna Nagar Post Office\\n   • Near Bus Stand\\n   • Near Railway Station\\n\\n🚚 Courier Services:\\n   • DTDC\\n   • Blue Dart\\n   • FedEx\\n   • Delhivery\\n\\n💡 PIN Code: 639001 (Central Karur)';
    }

    // Theatres / Cinema / Movies
    if (msg.includes('theatre') || msg.includes('cinema') || msg.includes('movie') || msg.includes('திரையரங்கு') || msg.includes('சினிமா') || msg.includes('படம்') || msg.includes('film')) {
      return language === 'ta'
        ? '🎬 கரூர் திரையரங்குகள்:\\n\\n🎥 நவீன சினிமா அரங்குகள்:\\n\\n1️⃣ வேலம்மாள் திரையரங்கு\\n   📍 மெயின் ரோடு, கரூர்\\n   📞 04324-236111\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9583,78.0785\\n   • 3 திரைகள்\\n   • AC வசதி\\n   • ரீக்ளைனர் இருக்கைகள்\\n   • புதிய தமிழ், இந்தி படங்கள்\\n   • டிஜிட்டல் ஆடியோ & வீடியோ\\n\\n2️⃣ சிட்டி சினிமா\\n   📍 அண்ணா நகர்\\n   📞 04324-237222\\n   • மொத்தம் 2 திரைகள்\\n   • வசதியான இருக்கைகள்\\n   • சிற்றுண்டிச்சாலை\\n\\n3️⃣ மயூரா சினிமா\\n   📍 பஸ் ஸ்டாண்ட் ரோடு\\n   📞 04324-235333\\n   • பாரம்பரிய திரையரங்கு\\n   • மலிவு டிக்கெட்\\n\\n🎫 டிக்கெட் விலை:\\n   • சாதாரண: ₹80-120\\n   • பிரீமியம்: ₹150-200\\n   • ரீக்ளைனர்: ₹250-350\\n\\n💡 ஆன்லைன் முன்பதிவு: BookMyShow, Paytm\\n⏰ காட்சிகள்: ��ாலை, மதியம், மாலை, இரவு'
        : '🎬 Karur Theatres:\\n\\n🎥 Modern Cinema Halls:\\n\\n1️⃣ Velammal Theatre\\n   📍 Main Road, Karur\\n   📞 04324-236111\\n   📌 View on Map: https://maps.google.com/?q=10.9583,78.0785\\n   • 3 screens\\n   • AC facility\\n   • Recliner seats\\n   • Latest Tamil, Hindi movies\\n   • Digital audio & video\\n\\n2️⃣ City Cinema\\n   📍 Anna Nagar\\n   📞 04324-237222\\n   • Total 2 screens\\n   • Comfortable seats\\n   • Refreshments\\n\\n3️⃣ Mayura Cinema\\n   📍 Bus Stand Road\\n   📞 04324-235333\\n   • Traditional theatre\\n   • Affordable tickets\\n\\n🎫 Ticket Prices:\\n   • Normal: ₹80-120\\n   • Premium: ₹150-200\\n   • Recliner: ₹250-350\\n\\n💡 Online booking: BookMyShow, Paytm\\n⏰ Shows: Morning, Matinee, Evening, Night';
    }

    // Government offices / RTO / Passport
    if (msg.includes('rto') || msg.includes('passport') || msg.includes('license') || msg.includes('ration') || msg.includes('govt office') || msg.includes('அரசு அலுவலகம்') || msg.includes('உரிமம்') || (msg.includes('government') && msg.includes('office'))) {
      return language === 'ta'
        ? '🏛️ கரூர் அரசு அலுவலகங்கள்:\\n\\n🚗 போக்குவரத்து அலுவலகம் (RTO):\\n   📍 மாவட்ட அலுவலக வளாகம், கரூர்\\n   📞 04324-220300\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9574,78.0769\\n   • ஓட்டுநர் உரிமம் (Driving License)\\n   • வாகன பதிவு (Vehicle Registration)\\n   • TN 52 (கரூர் கோடு)\\n   • காலை 10:00 - மாலை 5:00\\n\\n🛂 பாஸ்போர்ட் சேவா கேந்திரா (PSK):\\n   📍 திருச்சி PSK (90 கிமீ)\\n   📞 1800-258-1800 (டோல் ஃப்ரீ)\\n   • புதிய பாஸ்போர்ட்\\n   • புதுப்பித்தல்\\n   • முன்பதிவு: passportindia.gov.in\\n\\n🏛️ மாவட்ட அலுவலக வளாகம்:\\n   📍 ஜெயில் ரோடு\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9577,78.0764\\n   • மாவட்ட ஆட்சியர் அலுவலகம்\\n   • ரெவின்யூ துறை\\n   • தாசில்தார் அலுவலகம்\\n   • பொது பணித் துறை (PWD)\\n\\n💳 ரேஷன் கார்டு அலுவலகம்:\\n   📞 04324-220400\\n   • புதிய விண்ணப்பங்கள்\\n   • திருத்தங்கள்\\n\\n📋 பிறப்பு & இறப்பு சான்றிதழ்கள்:\\n   • நகராட்சி அலுவலகம்\\n   📞 04324-235001\\n\\n💡 பெரும்பாலான சேவைகள் ஆன்லைனிலும் கிடைக்கும்!'
        : '🏛️ Karur Government Offices:\\n\\n🚗 Regional Transport Office (RTO):\\n   📍 District Office Complex, Karur\\n   📞 04324-220300\\n   📌 View on Map: https://maps.google.com/?q=10.9574,78.0769\\n   • Driving License\\n   • Vehicle Registration\\n   • TN 52 (Karur code)\\n   • 10:00 AM - 5:00 PM\\n\\n🛂 Passport Seva Kendra (PSK):\\n   📍 Trichy PSK (90 km)\\n   📞 1800-258-1800 (Toll Free)\\n   • New passport\\n   • Renewal\\n   • Booking: passportindia.gov.in\\n\\n🏛️ District Collectorate Complex:\\n   📍 Jail Road\\n   📌 View on Map: https://maps.google.com/?q=10.9577,78.0764\\n   • Collector Office\\n   • Revenue Department\\n   • Tahsildar Office\\n   • Public Works Department (PWD)\\n\\n💳 Ration Card Office:\\n   📞 04324-220400\\n   • New applications\\n   • Corrections\\n\\n📋 Birth & Death Certificates:\\n   • Municipality Office\\n   📞 04324-235001\\n\\n💡 Most services available online too!';
    }

    // Parks / Recreation / Leisure
    if (msg.includes('park') || msg.includes('garden') || msg.includes('play') || msg.includes('பூங்கா') || msg.includes('விளையாட்டு') || msg.includes('recreation')) {
      return language === 'ta'
        ? '🌳 கரூர் பூங்காக்கள் & ஓய்வு இடங்கள்:\\n\\n🏞️ நகர பூங்காக்கள்:\\n\\n1️⃣ கரூர் அமராவதி ரிவர் ஃப்ரண்ட்\\n   📍 அமராவதி ஆற்றங்கரை\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.9586,78.0771\\n   • நடைபாதை\\n   • இயற்கை காட்சி\\n   • குடும்பத்துடன் செல்ல சிறந்தது\\n   • காலை & மாலை நேரம் சிறந்தது\\n\\n2️⃣ குழந்தைகள் பூங்கா\\n   📍 அண்ணா நகர்\\n   • விளையாட்டு பகுதி\\n   • குழந்தைகளுக்கான வசதிகள்\\n   • காலை 6:00 - இரவு 8:00\\n\\n3️⃣ நகர பூங்கா\\n   📍 மெயின் ரோடு அருகில்\\n   • பசுமையான பகுதி\\n   • உட்காரும் வசதி\\n   • காலை நடைபயிற்சி\\n\\n🏃 விளையாட்டு வசதிகள்:\\n   • நகராட்சி விளையாட்டு மைதானம்\\n   • கிரிக்கெட் பயிற்சி மையங்கள்\\n   • பேட்மிண்டன் கோர்ட்கள்\\n\\n💡 பூங்காக்கள் காலை & மாலை நேரங்களில் மக்கள் கூட்டமாக இருக்கும்!'
        : '🌳 Karur Parks & Recreation:\\n\\n🏞️ City Parks:\\n\\n1️⃣ Karur Amaravathi River Front\\n   📍 Amaravathi Riverbank\\n   📌 View on Map: https://maps.google.com/?q=10.9586,78.0771\\n   • Walking path\\n   • Scenic views\\n   • Great for families\\n   • Best in morning & evening\\n\\n2️⃣ Children\\'s Park\\n   📍 Anna Nagar\\n   • Play area\\n   • Facilities for kids\\n   • 6:00 AM - 8:00 PM\\n\\n3️⃣ City Park\\n   📍 Near Main Road\\n   • Green space\\n   • Seating facility\\n   • Morning walks\\n\\n🏃 Sports Facilities:\\n   • Municipality Sports Ground\\n   • Cricket training centers\\n   • Badminton courts\\n\\n💡 Parks are crowded in morning & evening hours!';
    }

    // Nearby tourist places
    if ((msg.includes('nearby') || msg.includes('around') || msg.includes('near') || msg.includes('அருகில்')) && (msg.includes('place') || msg.includes('visit') || msg.includes('tour') || msg.includes('இடம்'))) {
      return language === 'ta'
        ? '🗺️ கரூர் அருகில் உள்ள இடங்கள்:\\n\\n🏞️ 50 கிமீ க்குள்:\\n\\n1️⃣ தாந்தோணிமலை (15 கிமீ)\\n   • கல்யாண பசுபதீஸ்வரர் கோவில்\\n   • மலை கோவில்\\n   • அழகான காட்சிகள்\\n\\n2️⃣ அமராவதி அணை (35 கிமீ)\\n   📌 வரைபடத்தில் காட்டு: https://maps.google.com/?q=10.7833,77.8167\\n   • பெரிய நீர்த்தேக்கம்\\n   • படகு சவாரி\\n   • குடும்ப பிக்னிக்\\n\\n3️⃣ அறவக்குறிச்சி (30 கிமீ)\\n   • வரலாற்று நகரம்\\n   • கோவில்கள்\\n\\n🏛️ 100 கிமீ க்குள்:\\n\\n4️⃣ திருச்சி (90 கிமீ)\\n   • ராக் ஃபோர்ட்\\n   • ஸ்ரீரங்கம் கோவில்\\n   • பெரிய நகரம்\\n\\n5️⃣ நாமக்கல் (55 கிமீ)\\n   • அஞ்சநேயர் கோவில்\\n   • ராக் கோவில்\\n   • முட்டை சந்தை\\n\\n6️⃣ சேலம் (90 கிமீ)\\n   • யெர்காட் (சேலம் அருகில்)\\n   • மாங்கோ & இரும்பு\\n\\n💡 வார இறுதி பயணங்களுக்கு சிறந்தவை!'
        : '🗺️ Places Near Karur:\\n\\n🏞️ Within 50 km:\\n\\n1️⃣ Thanthonimalai (15 km)\\n   • Kalyana Pasupatheeswarar Temple\\n   • Hill temple\\n   • Beautiful views\\n\\n2️⃣ Amaravathi Dam (35 km)\\n   📌 View on Map: https://maps.google.com/?q=10.7833,77.8167\\n   • Large reservoir\\n   • Boating\\n   • Family picnic\\n\\n3️⃣ Aravakurichi (30 km)\\n   • Historical town\\n   • Temples\\n\\n🏛️ Within 100 km:\\n\\n4️⃣ Trichy (90 km)\\n   • Rock Fort\\n   • Srirangam Temple\\n   • Big city\\n\\n5️⃣ Namakkal (55 km)\\n   • Anjaneya Temple\\n   • Rock temple\\n   • Egg market\\n\\n6️⃣ Salem (90 km)\\n   • Yercaud (near Salem)\\n   • Mango & Steel\\n\\n💡 Great for weekend trips!';
    }

    // Default fallback with helpful suggestions
    return language === 'ta'
      ? '🤔 மன்னிக்கவும், அந்த குறிப்பிட்ட கேள்விக்கு எனக்கு பதில் தெரியவில்லை.\n\n💡 நீங்கள் இவற்றைப் பற்றி கேட்கலாம்:\n\n• "கரூர் வரலாறு"\n• "பேருந்து நிலையம் எங்கே?"\n• "சுற்றுலா இடங்கள்"\n• "மாவட்ட ஆட்சியர் யார்?"\n• "எப்படி கரூருக்கு வருவது"\n• "உணவு & உணவகங்கள்"\n• "கல்வி நிறுவனங்கள்"\n• "நெசவு தொழில்"\n• "வானிலை"\n• "தங்குமிடங்கள்"\n\nஅல்லது கீழே உள்ள விரைவு கேள்விகளைத் தேர்வு செய்யுங்கள்! 👇'
      : '🤔 Sorry, I don\'t have information about that specific question.\n\n💡 You can ask me about:\n\n• "Karur history"\n• "Where is bus stand?"\n• "Tourist attractions"\n• "Who is the District Collector?"\n• "How to reach Karur"\n• "Food and restaurants"\n• "Educational institutions"\n• "Textile industry"\n• "Weather"\n• "Accommodation"\n\nOr choose from the quick questions below! 👇';
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length,
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate thinking time (makes it feel more natural)
    setTimeout(() => {
      const response = getSmartResponse(messageToSend);
      
      const botResponse: Message = {
        id: messages.length + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Increment unread count if chat is closed
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 800 + Math.random() * 400); // Random delay 800-1200ms for natural feel
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Parse message content and render with map buttons
  const renderMessageContent = (content: string) => {
    // Match pattern: 📌 View on Map: URL or 📌 வரைபடத்தில் காட்டு: URL
    const mapLinkPattern = /📌\s*(View on Map|வரைபடத்தில் காட்டு):\s*(https:\/\/maps\.google\.com\/[^\n]+)/g;
    
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let buttonIndex = 0;

    while ((match = mapLinkPattern.exec(content)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        const textBeforeMatch = content.substring(lastIndex, match.index);
        parts.push(
          <span key={`text-${match.index}`}>{textBeforeMatch}</span>
        );
      }

      const mapUrl = match[2].trim();
      const buttonText = language === 'ta' ? 'திசைகளைப் பெறு' : 'Get Directions';

      // Add the button with proper spacing
      parts.push(
        <div key={`btn-${buttonIndex++}`} className="mt-2 mb-1">
          <motion.a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md transition-all duration-200 text-sm font-medium"
          >
            <Navigation className="w-4 h-4" />
            <span>{buttonText}</span>
          </motion.a>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      const remainingText = content.substring(lastIndex);
      parts.push(
        <span key={`text-end`}>{remainingText}</span>
      );
    }

    return parts.length > 0 ? <>{parts}</> : content;
  };

  return (
    <>
      {/* Subtle Welcome Toast Notification */}
      <AnimatePresence>
        {!isOpen && showWelcomeToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-40 pointer-events-none"
          >
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 max-w-[250px]">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  {language === 'ta' ? 'என்னிடம் கேளுங்கள்!' : 'Ask me anything!'}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'ta' ? 'உதவியாளர்' : 'Assistant'}
                </p>
              </div>
              <Sparkles className="w-4 h-4 text-purple-500 animate-pulse flex-shrink-0" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >

        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center group hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              
              {/* Unread Badge */}
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg"
                >
                  {unreadCount}
                </motion.div>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 w-[400px] max-w-[calc(100vw-3rem)] z-50"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 flex items-center gap-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite]" 
                     style={{
                       backgroundSize: '200% 100%',
                       animation: 'shimmer 3s linear infinite'
                     }} />
                
                <div className="relative w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-white/40"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white">
                      {language === 'ta' ? 'கரூர் உதவியாளர்' : 'Karur Assistant'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-xs text-white/90">
                      {language === 'ta' ? 'உடனடி பதில்' : 'Instant Response'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:rotate-90 relative"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 scrollbar-hide">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg'
                            : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                        }`}
                        style={{
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word'
                        }}
                      >
                        {message.type === 'bot' ? renderMessageContent(message.content) : message.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -8, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.1
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              <div className="p-4 bg-gray-50/50 border-t border-gray-200/50">
                <p className="text-xs text-gray-600 mb-2">
                  {language === 'ta' ? '⚡ விரைவு கேள்விகள்' : '⚡ Quick Questions'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.map((q, idx) => {
                    const Icon = q.icon;
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleSendMessage(q.text)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 p-2 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-purple-300 rounded-lg transition-all duration-200 text-left text-xs group"
                      >
                        <Icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-purple-500 flex-shrink-0" />
                        <span className="text-gray-700 group-hover:text-purple-700 truncate">
                          {q.text}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-200/50">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <div className="flex-1 relative">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={language === 'ta' ? 'உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யவும்...' : 'Type your question here...'}
                      className="w-full bg-white border-gray-200 focus:border-purple-400 focus:ring-purple-400 text-sm pr-10 shadow-sm"
                    />
                    {inputValue && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                      </motion.div>
                    )}
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!inputValue.trim()}
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg h-9 w-9 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      {inputValue.trim() && (
                        <span className="absolute inset-0 bg-white/20 animate-pulse" />
                      )}
                    </Button>
                  </motion.div>
                </form>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  {language === 'ta' ? '💡 ஸ்மார்ட் பதில் அமைப்பு' : '💡 Smart Response System'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
