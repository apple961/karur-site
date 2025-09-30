import { Send, Bot, User, X, Sparkles, Brain } from "lucide-react";
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
        ? 'வணக்கம்! நான் கரூர் மாவட்ட நிர்வாக உதவியாளர். மாவட்ட அதிகாரிகள் மற்றும் தொடர்பு தகவல்களைப் பற்றி கேளுங்கள்.'
        : 'Hello! I\'m Karur District Administration Assistant. Ask me about district officials and contact information.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = language === 'ta' ? [
    'மாவட்ட ஆட்சியர் யார்?',
    'காவல் கண்காணிப்பாளர் தொடர்பு எண்',
    'நகராட்சி ஆணையர் மின்னஞ்சல்',
    'தீயணைப்பு அலுவலகம்'
  ] : [
    'Who is the District Collector?',
    'SP contact number',
    'Municipal Commissioner email',
    'Fire Officer details'
  ];

  const knowledgeBase: { [key: string]: string } = {
    'district collector': language === 'ta'
      ? 'மாவட்ட ஆட்சியர்: திரு. K. செந்தில்ராஜ், IAS\n📞 தொலைபேசி: 04324-220100\n📧 மின்னஞ்சல்: collector@karur.nic.in'
      : 'District Collector: Thiru. K. Senthilraj, IAS\n📞 Phone: 04324-220100\n📧 Email: collector@karur.nic.in',
    'police': language === 'ta'
      ? 'மாவட்ட காவல் கண்காணிப்பாளர்: திரு. R. மோகன்குமார், IPS\n📞 தொலைபேசி: 04324-236100\n📧 மின்னஞ்சல்: sp.karur@tnpolice.gov.in'
      : 'Superintendent of Police: Thiru. R. Mohankumar, IPS\n📞 Phone: 04324-236100\n📧 Email: sp.karur@tnpolice.gov.in',
    'municipal': language === 'ta'
      ? 'நகராட்சி ஆணையர்: திரு. S. பழனிச்சாமி\n📞 தொலைபேசி: 04324-235001\n📧 மின்னஞ்சல்: commr.karur@tn.gov.in'
      : 'Municipal Commissioner: Thiru. S. Palanichamy\n📞 Phone: 04324-235001\n📧 Email: commr.karur@tn.gov.in',
    'fire': language === 'ta'
      ? 'தலைமை தீயணைப்பு அதிகாரி: திரு. M. ராஜா\n📞 தொலைபேசி: 04324-222222\n📧 மின்னஞ்சல்: fire.karur@tn.gov.in'
      : 'Chief Fire Officer: Thiru. M. Raja\n📞 Phone: 04324-222222\n📧 Email: fire.karur@tn.gov.in',
    'all': language === 'ta'
      ? 'கரூர் மாவட்டத்தின் முக்கிய அதிகாரிகள்:\n\n1. மாவட்ட ஆட்சியர்: திரு. K. செந்தில்ராஜ், IAS\n2. காவல் கண்காணிப்பாளர்: திரு. R. மோகன்குமார், IPS\n3. நகராட்சி ஆணையர்: திரு. S. பழனிச்சாமி\n4. தீயணைப்பு அதிகாரி: திரு. M. ராஜா\n\nமேலும் விவரங்களுக்கு குறிப்பிட்ட அதிகாரியின் பெயரைக் குறிப்பிடவும்.'
      : 'Key officials of Karur District:\n\n1. District Collector: Thiru. K. Senthilraj, IAS\n2. Superintendent of Police: Thiru. R. Mohankumar, IPS\n3. Municipal Commissioner: Thiru. S. Palanichamy\n4. Chief Fire Officer: Thiru. M. Raja\n\nAsk about specific officials for more details.',
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific keywords
    if (lowerMessage.includes('collector') || lowerMessage.includes('ஆட்சியர்')) {
      return knowledgeBase['district collector'];
    } else if (lowerMessage.includes('police') || lowerMessage.includes('sp') || lowerMessage.includes('காவல்')) {
      return knowledgeBase['police'];
    } else if (lowerMessage.includes('municipal') || lowerMessage.includes('commissioner') || lowerMessage.includes('நகராட்சி') || lowerMessage.includes('ஆணையர்')) {
      return knowledgeBase['municipal'];
    } else if (lowerMessage.includes('fire') || lowerMessage.includes('தீயணைப்பு')) {
      return knowledgeBase['fire'];
    } else if (lowerMessage.includes('all') || lowerMessage.includes('list') || lowerMessage.includes('எல்லா')) {
      return knowledgeBase['all'];
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('தொடர்பு') || lowerMessage.includes('எண்')) {
      return language === 'ta'
        ? 'தயவுசெய்து குறிப்பிட்ட அதிகாரியின் பெயரைக் குறிப்பிடவும். எடுத்துக்காட்டு: "மாவட்ட ஆட்சியர் தொடர்பு எண்" அல்லது "all officials" என்று கேளுங்கள்.'
        : 'Please specify which official you\'d like contact information for. Try "District Collector contact" or "all officials".';
    } else {
      return language === 'ta'
        ? 'மன்னிக்கவும், நான் அதை புரிந்துகொள்ளவில்லை. கீழே உள்ள பரிந்துரைகளை முயற்சிக்கவும் அல்லது குறிப்பிட்ட அதிகாரியின் பெயரைக் கேளுங்கள்.'
        : 'Sorry, I didn\'t understand that. Try the suggestions below or ask about specific officials.';
    }
  };

  const handleSendMessage = (message?: string) => {
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

    // Simulate bot thinking and respond
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 1,
        type: 'bot',
        content: getBotResponse(messageToSend),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Increment unread count if chat is closed
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 800);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  return (
    <>
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="relative w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center group hover:shadow-blue-500/50 transition-all duration-300 overflow-hidden"
            >
              {/* Animated Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" 
                   style={{
                     backgroundSize: '200% 100%',
                     animation: 'shimmer 2s linear infinite'
                   }} />
              
              {/* Icon Container with Glow */}
              <div className="relative z-10 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                <Brain className="w-4 h-4 text-white/80 absolute -bottom-1 -right-1 group-hover:rotate-12 transition-transform" />
              </div>
              
              {/* Unread Badge */}
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg z-20"
                >
                  {unreadCount}
                </motion.div>
              )}
              
              {/* Pulse Animation */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping opacity-30"></span>
              
              {/* Rotating Glow Ring */}
              <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-[spin_3s_linear_infinite]"></span>
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
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white">
                    {language === 'ta' ? 'நிர்வாக உதவியாளர்' : 'Admin Assistant'}
                  </h3>
                  <p className="text-xs text-white/80">
                    {language === 'ta' ? 'உடனடியாக பதிலளிக்கிறது' : 'Responding instantly'}
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50">
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
              <div className="p-3 bg-gray-50/50 border-t border-gray-200/50">
                <p className="text-xs text-gray-500 mb-2">
                  {language === 'ta' ? 'விரைவு கேள்விகள்:' : 'Quick questions:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      className="text-xs px-2.5 py-1 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-full transition-all duration-200 hover:shadow-md"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-gray-200/50">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={language === 'ta' ? 'உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யவும்...' : 'Type your question here...'}
                    className="flex-1 bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-blue-400 text-sm"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg h-9 w-9"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}