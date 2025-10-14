import { Send, Bot, User, X, Sparkles, Brain, MessageCircle, Zap, Info, MapPin, Phone, Mail, Building2, Users, Calendar } from "lucide-react";
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
        ? '🙏 வணக்கம்! நான் கரூர் ஏஐ உதவியாளர். மாவட்ட தகவல்கள், அதிகாரிகள், சேவைகள், வரலாறு, சுற்றுலா இடங்கள் மற்றும் மேலும் பல தகவல்களுக்கு என்னிடம் கேளுங்கள்!'
        : '👋 Hello! I\'m Karur AI Assistant. Ask me about district information, officials, services, history, tourist attractions, and much more!',
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

  // System prompt for LLM with context
  const systemContext = `You are Karur AI Assistant, a helpful and friendly chatbot for Karur District in Tamil Nadu, India. 

KEY INFORMATION ABOUT KARUR:
- 2000+ year old city, capital of Chera dynasty during Sangam period
- Famous for textiles and handloom industry
- Located in central Tamil Nadu

DISTRICT OFFICIALS:
- District Collector: Thiru. K. Senthilraj, IAS | Phone: 04324-220100 | Email: collector@karur.nic.in
- Superintendent of Police: Thiru. R. Mohankumar, IPS | Phone: 04324-236100 | Emergency: 100
- Municipal Commissioner: Thiru. S. Palanichamy | Phone: 04324-235001
- Chief Fire Officer: Thiru. M. Raja | Phone: 04324-222222 | Emergency: 101

TOURIST ATTRACTIONS:
1. Pasupatheswarar Temple - Famous Shiva temple
2. Kalyana Pasupatheeswarar Temple - Architectural marvel
3. Amaravathi Riverbank - Peaceful location
4. Manjal Kadai Area - Natural beauty
5. Karuvur Fort - Historical site

ESSENTIAL SERVICES: Banks (SBI, IOB, Canara Bank), Government & Private Hospitals, Bus Stand, Railway Station, Shopping Centers, Restaurants, Hotels, Theatres

EDUCATION: Engineering colleges, Arts & Science colleges, Government/Private schools, District Central Library

Answer questions naturally and conversationally. Provide specific details when available. Be helpful, friendly, and informative. Keep responses concise but complete. If you don't know something specific about Karur, be honest but helpful.`;

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

  const knowledgeBase: { [key: string]: string } = {
    'district collector': language === 'ta'
      ? '👨‍💼 மாவட்ட ஆட்சியர்: திரு. K. செந்தில்ராஜ், IAS\n📞 தொலைபேசி: 04324-220100\n📧 மின்னஞ்சல்: collector@karur.nic.in\n🏢 அலுவலகம்: மாவட்ட நிர்வாக வளாகம், கரூர்'
      : '👨‍💼 District Collector: Thiru. K. Senthilraj, IAS\n📞 Phone: 04324-220100\n📧 Email: collector@karur.nic.in\n🏢 Office: District Collectorate, Karur',
    'police': language === 'ta'
      ? '👮 மாவட்ட காவல் கண்காணிப்பாளர்: திரு. R. மோகன்குமார், IPS\n📞 தொலைபேசி: 04324-236100\n🚨 அவசர எண்: 100\n📧 மின்னஞ்சல்: sp.karur@tnpolice.gov.in'
      : '👮 Superintendent of Police: Thiru. R. Mohankumar, IPS\n📞 Phone: 04324-236100\n🚨 Emergency: 100\n📧 Email: sp.karur@tnpolice.gov.in',
    'municipal': language === 'ta'
      ? '🏛️ நகராட்சி ஆணையர்: திரு. S. பழனிச்சாமி\n📞 தொலைபேசி: 04324-235001\n📧 மின்னஞ்சல்: commr.karur@tn.gov.in\n🏢 அலுவலகம்: கரூர் நகராட்சி'
      : '🏛️ Municipal Commissioner: Thiru. S. Palanichamy\n📞 Phone: 04324-235001\n📧 Email: commr.karur@tn.gov.in\n🏢 Office: Karur Municipality',
    'fire': language === 'ta'
      ? '🚒 தலைமை தீயணைப்பு அதிகாரி: திரு. M. ராஜா\n📞 தொலைபேசி: 04324-222222\n🚨 அவசர எண்: 101\n📧 மின்னஞ்சல்: fire.karur@tn.gov.in'
      : '🚒 Chief Fire Officer: Thiru. M. Raja\n📞 Phone: 04324-222222\n🚨 Emergency: 101\n📧 Email: fire.karur@tn.gov.in',
    'all': language === 'ta'
      ? '📋 கரூர் மாவட்டத்தின் முக்கிய அதிகாரிகள்:\n\n1. 👨‍💼 மாவட்ட ஆட்சியர்: திரு. K. செந்தில்ராஜ், IAS\n2. 👮 காவல் கண்காணிப்பாளர்: திரு. R. மோகன்குமார், IPS\n3. 🏛️ நகராட்சி ஆணையர்: திரு. S. பழனிச்சாமி\n4. 🚒 தீயணைப்பு அதிகாரி: திரு. M. ராஜா\n\nமேலும் விவரங்களுக்கு குறிப்பிட்ட அதிகாரியைப் பற்றி கேளுங்கள்!'
      : '📋 Key officials of Karur District:\n\n1. 👨‍💼 District Collector: Thiru. K. Senthilraj, IAS\n2. 👮 Superintendent of Police: Thiru. R. Mohankumar, IPS\n3. 🏛️ Municipal Commissioner: Thiru. S. Palanichamy\n4. 🚒 Chief Fire Officer: Thiru. M. Raja\n\nAsk about specific officials for more details!',
    'history': language === 'ta'
      ? '🏛️ கரூர் வரலாறு:\n\nகரூர் தமிழகத்தின் பழமையான நகரங்களில் ஒன்று. இது சங்க காலத்தில் சேர வம்சத்தின் தலைநகராக இருந்தது.\n\n🌟 முக்கிய அம்சங்கள்:\n• 2000 ஆண்டுகளுக்கு மேல் பழமை\n• பாசுபதீஸ்வரர் கோவில்\n• கல்யாண பசுபதீஸ்வரர் கோவில்\n• நூற்பாலை மற்றும் கைத்தறி துறைக்கு பிரபலம்\n\nமேலும் தகவல்களுக்கு குறிப்பிட்ட தலைப்பைப் பற்றி கேளுங்கள்!'
      : '🏛️ Karur History:\n\nKarur is one of Tamil Nadu\'s oldest cities. It served as the capital of the Chera dynasty during the Sangam period.\n\n🌟 Key Highlights:\n• Over 2000 years old\n• Pasupatheswarar Temple\n• Kalyana Pasupatheeswarar Temple\n• Famous for textile and handloom industry\n\nAsk about specific topics for more information!',
    'tourism': language === 'ta'
      ? '🗺️ கரூர் சுற்றுலா இடங்கள்:\n\n1. 🕉️ பாசுபதீஸ்வரர் கோவில் - பிரபலமான சிவன் கோவில்\n2. 🏛️ கல்யாண பசுபதீஸ்வரர் கோவில் - கட்டிடக்கலை அற்புதம்\n3. 🌊 அமராவதி ஆற்றங்கரை - அமைதியான இடம்\n4. 🌿 மஞ்சள் கடை பகுதி - இயற்கை வனப்பு\n5. 🏞️ கருவூர் கோட்டை - வரலாற்று இடம்\n\nஒவ்வொரு இடத்தைப் பற்றியும் மேலும் அறிய குறிப்பிட்ட பெயரைக் கேளுங்க���்!'
      : '🗺️ Karur Tourist Attractions:\n\n1. 🕉️ Pasupatheswarar Temple - Famous Shiva temple\n2. 🏛️ Kalyana Pasupatheeswarar Temple - Architectural marvel\n3. 🌊 Amaravathi Riverbank - Peaceful location\n4. 🌿 Manjal Kadai Area - Natural beauty\n5. 🏞️ Karuvur Fort - Historical site\n\nAsk about specific places to learn more!',
    'services': language === 'ta'
      ? '🏥 கரூர் அத்தியாவசிய சேவைகள்:\n\n🏦 வங்கிகள்: SBI, IOB, Canara Bank\n🏥 மருத்துவமனைகள்: அரசு மருத்துவமனை, தனியார் மருத்துவமனைகள்\n🚌 போக்குவரத்து: பேருந்து நிலையம், ரயில் நிலையம்\n🏪 வணிக வளாகங்கள்: நகர மையம், கைத்தறி கடைகள்\n🍽️ உணவகங்கள்: உள்ளூர் மற்றும் பல்வேறு வகை உணவகங்கள்\n🏨 ஹோட்டல்கள்: பல்வேறு விதமான தங்குமிடங்கள்\n🎬 திரையரங்குகள்: நவீன சினிமா அரங்குகள்\n\nகுறிப்பிட்ட சேவையைப் பற்றி மேலும் அறிய கேளுங்கள்!'
      : '🏥 Karur Essential Services:\n\n🏦 Banks: SBI, IOB, Canara Bank\n🏥 Hospitals: Government Hospital, Private Hospitals\n🚌 Transport: Bus Stand, Railway Station\n🏪 Shopping: City Center, Textile Shops\n🍽️ Restaurants: Local & Multi-cuisine\n🏨 Hotels: Various accommodation options\n🎬 Theatres: Modern cinema halls\n\nAsk about specific services for more details!',
    'education': language === 'ta'
      ? '📚 கரூர் கல்வி நிறுவனங்கள்:\n\n🎓 பொறியியல் கல்லூரிகள்:\n• மயூரா மற்றும் பிற கல்லூரிகள்\n\n🏫 கலை & அறிவியல் கல்லூரிகள்:\n• பல்வேறு அரசு மற்றும் தனியார் கல்லூரிகள்\n\n🏫 பள்ளிகள்:\n• அரசு, தனியார் மற்றும் மெட்ரிகுலேஷன் பள்ளிகள்\n\n📖 நூலகங்கள்:\n• மாவட்ட மத்திய நூலகம்\n\nமேலும் விவரங்களுக்கு குறிப்பிட்ட கல்வி நிறுவனத்தைப் பற்றி கேளுங்கள்!'
      : '📚 Karur Educational Institutions:\n\n🎓 Engineering Colleges:\n• Mayura and other colleges\n\n🏫 Arts & Science Colleges:\n• Various Government and Private colleges\n\n🏫 Schools:\n• Government, Private, and Matriculation schools\n\n📖 Libraries:\n• District Central Library\n\nAsk about specific institutions for more information!',
  };

  // Browser-based LLM using Transformers.js (runs locally, no API needed!)
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [llmPipeline, setLlmPipeline] = useState<any>(null);

  // Initialize Transformers.js model (optional, loads on first use)
  const initializeLocalLLM = async () => {
    if (llmPipeline || isModelLoading) return;

    setIsModelLoading(true);
    try {
      // Dynamic import to avoid loading unless needed
      const { pipeline } = await import('@xenova/transformers');
      
      // Load a small text generation model that runs in browser
      // Using Flan-T5 small - good balance of size and quality
      const pipe = await pipeline('text2text-generation', 'Xenova/flan-t5-small');
      
      setLlmPipeline(pipe);
      setIsModelReady(true);
      setIsModelLoading(false);
      
      console.log('✅ Local LLM model loaded successfully!');
    } catch (error) {
      console.error('Failed to load local LLM:', error);
      setIsModelLoading(false);
    }
  };

  // Generate response using local browser-based LLM
  const getLocalLLMResponse = async (userMessage: string): Promise<string> => {
    if (!llmPipeline) {
      return getSmartFallbackResponse(userMessage);
    }

    try {
      // Create a focused prompt for the model
      const prompt = `Answer this question about Karur District, Tamil Nadu: ${userMessage}\n\nContext: ${systemContext.slice(0, 500)}\n\nAnswer concisely:`;
      
      const result = await llmPipeline(prompt, {
        max_length: 200,
        temperature: 0.7,
        do_sample: true,
      });
      
      const response = result[0]?.generated_text || '';
      
      // If response is too short or generic, use smart fallback
      if (response.length < 20 || response.includes('I don\'t know')) {
        return getSmartFallbackResponse(userMessage);
      }
      
      return response;
    } catch (error) {
      console.error('Local LLM error:', error);
      return getSmartFallbackResponse(userMessage);
    }
  };

  // Smart rule-based responses with context awareness
  const getSmartFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|வணக்கம்|வாழ்த்துக்கள்)$/i)) {
      return language === 'ta'
        ? '👋 வணக்கம்! நான் உங்களுக்கு எப்படி உதவ முடியும்? கரூர் பற்றிய எந்த தகவலையும் கேளுங்கள்!'
        : '👋 Hello! How can I help you? Ask me anything about Karur!';
    }
    
    // Thank you
    if (lowerMessage.match(/(thank|thanks|நன்றி)/i)) {
      return language === 'ta'
        ? '😊 வரவேற்கிறேன்! வேறு ஏதாவது தெரிந்து கொள்ள விரும்புகிறீர்களா?'
        : '😊 You\'re welcome! Is there anything else you\'d like to know?';
    }
    
    // Officials
    if (lowerMessage.includes('collector') || lowerMessage.includes('ஆட்சியர்')) {
      return knowledgeBase['district collector'];
    } else if (lowerMessage.includes('police') || lowerMessage.includes('sp') || lowerMessage.includes('காவல்')) {
      return knowledgeBase['police'];
    } else if (lowerMessage.includes('municipal') || lowerMessage.includes('commissioner') || lowerMessage.includes('நகராட்சி') || lowerMessage.includes('ஆணையர்')) {
      return knowledgeBase['municipal'];
    } else if (lowerMessage.includes('fire') || lowerMessage.includes('தீயணைப்பு')) {
      return knowledgeBase['fire'];
    } else if (lowerMessage.includes('all') || lowerMessage.includes('list') || lowerMessage.includes('officials') || lowerMessage.includes('எல்லா') || lowerMessage.includes('அதிகாரிகள்')) {
      return knowledgeBase['all'];
    }
    
    // History
    else if (lowerMessage.includes('history') || lowerMessage.includes('historical') || lowerMessage.includes('வரலாறு') || lowerMessage.includes('பழமை')) {
      return knowledgeBase['history'];
    }
    
    // Tourism
    else if (lowerMessage.includes('tourist') || lowerMessage.includes('tourism') || lowerMessage.includes('places') || lowerMessage.includes('visit') || lowerMessage.includes('attraction') || lowerMessage.includes('சுற்றுலா') || lowerMessage.includes('இடங்கள்') || lowerMessage.includes('கோவில்')) {
      return knowledgeBase['tourism'];
    }
    
    // Services
    else if (lowerMessage.includes('service') || lowerMessage.includes('bank') || lowerMessage.includes('hospital') || lowerMessage.includes('transport') || lowerMessage.includes('shopping') || lowerMessage.includes('சேவைகள்') || lowerMessage.includes('வங்கி') || lowerMessage.includes('மருத்துவமனை')) {
      return knowledgeBase['services'];
    }
    
    // Education
    else if (lowerMessage.includes('education') || lowerMessage.includes('school') || lowerMessage.includes('college') || lowerMessage.includes('கல்வி') || lowerMessage.includes('பள்ளி') || lowerMessage.includes('கல்லூரி')) {
      return knowledgeBase['education'];
    }
    
    // Contact Info
    else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('தொடர்பு') || lowerMessage.includes('எண்')) {
      return language === 'ta'
        ? '📞 குறிப்பிட்ட அதிகாரி அல்லது சேவையைப் பற்றி கேளுங்கள். எடுத்துக்காட்டு:\n• "மாவட்ட ஆட்சியர் தொடர்பு"\n• "காவல் துறை எண்"\n• "அனைத்து அதிகாரிகள்"'
        : '📞 Please specify which official or service. Try:\n• "District Collector contact"\n• "Police contact"\n• "All officials"';
    }
    
    // Location/Where
    else if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('எங்கே') || lowerMessage.includes('முகவரி')) {
      return language === 'ta'
        ? '📍 கரூர் மாவட்டம் தமிழ்நாட்டின் மத்திய பகுதியில் அமைந்துள்ளது. நீங்கள் குறிப்பிட்ட இடம் அல்லது அலுவலகத்தைப் பற்றி கேளுங்கள், நான் விரிவான முகவரியை வழங்குகிறேன்!'
        : '📍 Karur district is located in central Tamil Nadu. Ask about a specific place or office, and I\'ll provide detailed address!';
    }
    
    // General help
    else if (lowerMessage.includes('help') || lowerMessage.includes('உதவி') || lowerMessage.includes('what can you do') || lowerMessage.includes('என்ன செய்ய')) {
      return language === 'ta'
        ? '💡 நான் உங்களுக்கு உதவக்கூடியவை:\n\n🏛️ வரலாறு மற்றும் பண்பாடு\n🗺️ சுற்றுலா இடங்கள்\n👨‍💼 அதிகாரிகள் தகவல்\n🏥 அத்தியாவசிய சேவைகள்\n📚 கல்வி நிறுவனங்கள்\n📞 தொடர்பு விவரங்கள்\n📅 நிகழ்வுகள் தகவல்\n\nஎந்த தலைப்பைப் பற்றியும் என்னிடம் கேளுங்கள்!'
        : '💡 I can help you with:\n\n🏛️ History & Culture\n🗺️ Tourist Attractions\n👨‍💼 Officials Information\n🏥 Essential Services\n📚 Educational Institutions\n📞 Contact Details\n📅 Events Information\n\nAsk me about any topic!';
    }
    
    // Default response
    else {
      return language === 'ta'
        ? '🤔 மன்னிக்கவும், நான் இன்னும் கற்றுக்கொண்டிருக்கிறேன்!\n\n💡 இவற்றை முயற்சிக்கவும்:\n• "வரலாறு"\n• "சுற்றுலா இடங்கள்"\n• "அதிகாரிகள் தகவல்"\n• "அத்தியாவசிய சேவைகள்"\n• "கல்வி நிறுவனங்கள்"\n\nஅல்லது கீழே உள்ள விரைவு கேள்விகளைத் தேர்வு செய்யுங்கள்! 👇'
        : '🤔 Sorry, I\'m still learning!\n\n💡 Try asking about:\n• "History"\n• "Tourist attractions"\n• "Officials information"\n• "Essential services"\n• "Educational institutions"\n\nOr choose from quick questions below! 👇';
    }
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

    try {
      // Try local browser-based LLM first, then fall back to smart rules
      let response: string;
      
      if (isModelReady && llmPipeline) {
        response = await getLocalLLMResponse(messageToSend);
      } else {
        response = getSmartFallbackResponse(messageToSend);
      }
      
      // Add realistic typing delay (1.5-2.5 seconds) to simulate AI thinking
      const typingDelay = 1500 + Math.random() * 1000; // Random delay between 1.5-2.5 seconds
      await new Promise(resolve => setTimeout(resolve, typingDelay));
      
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
    } catch (error) {
      console.error("Error getting bot response:", error);
      const errorResponse: Message = {
        id: messages.length + 1,
        type: 'bot',
        content: language === 'ta' 
          ? '😔 மன்னிக்கவும், ஏதோ தவறு ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்!'
          : '😔 Sorry, something went wrong. Please try again!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
      setIsTyping(false);
    }
  };

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
                  {language === 'ta' ? 'AI உதவியாளர்' : 'AI Assistant'}
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
                {/* Animated background */}
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
                      {language === 'ta' ? 'கரூர் AI உதவியாளர்' : 'Karur AI Assistant'}
                    </h3>
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-xs text-white/90">
                      {language === 'ta' ? 'ஆன்லைனில் • உடனடி பதில்' : 'Online • Instant Response'}
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
                      className={`flex items-start gap-2 ${
                        message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                          : 'bg-gradient-to-br from-emerald-500 to-teal-500'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Bot className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                      <div className={`flex-1 max-w-[75%] ${
                        message.type === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        <div className={`inline-block px-3 py-2 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                            : 'bg-white border border-gray-200 text-gray-800'
                        } shadow-md`}>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 px-3 py-2 rounded-2xl shadow-md">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              <div className="p-3 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200/50">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-3.5 h-3.5 text-purple-500" />
                  <p className="text-xs text-gray-600">
                    {language === 'ta' ? 'விரைவு கேள்விகள்' : 'Quick Questions'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.map((question, index) => {
                    const Icon = question.icon;
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSendMessage(question.text)}
                        className="text-xs px-3 py-2 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl transition-all duration-200 hover:shadow-md flex items-center gap-2 text-left"
                      >
                        <Icon className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                        <span className="line-clamp-2">{question.text}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200/50">
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
                  {language === 'ta' ? '⚡ AI மூலம் இயக்கப்படுகிறது' : '⚡ Powered by AI'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}