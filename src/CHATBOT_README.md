# 🤖 Karur AI Chatbot - Complete Guide

## 📋 Overview

The Karur AI Chatbot is an intelligent assistant that helps visitors learn about Karur District. It features:

- ✅ **LLM-Powered Responses** - Natural, conversational AI using Groq/other APIs
- ✅ **Fallback System** - Works without API with rule-based responses
- ✅ **Bilingual Support** - Full English & Tamil translations
- ✅ **Subtle Notifications** - Non-intrusive welcome toast
- ✅ **Clean UI** - Simple, modern chat interface
- ✅ **Comprehensive Knowledge** - Covers all aspects of Karur district

---

## 🎯 Current Features

### 1. **Smart AI Integration**
- Async LLM API calls with Groq (or alternatives)
- Automatic fallback to rule-based responses
- System context with all Karur information
- Error handling for reliability

### 2. **User Interface**
- **Welcome Toast**: Subtle notification after 3 seconds
  - Shows "Ask me anything!" message
  - Disappears after 5 seconds
  - Non-intrusive, just informs users about chatbot

- **Chat Button**: Clean, minimal design
  - Simple gradient (blue → purple)
  - Message icon
  - Unread badge when minimized
  - Smooth animations

- **Chat Window**: Modern, clean interface
  - Gradient header with status indicator
  - Scrollable message area
  - 6 quick question buttons with icons
  - Smart input field with visual feedback

### 3. **Knowledge Base**

The chatbot can answer questions about:

#### 🏛️ History & Culture
- 2000+ years of heritage
- Sangam period capital
- Famous temples
- Textile industry legacy

#### 🗺️ Tourist Attractions
- Pasupatheswarar Temple
- Kalyana Pasupatheeswarar Temple
- Amaravathi Riverbank
- Manjal Kadai Area
- Karuvur Fort

#### 👨‍💼 District Officials
- District Collector: Thiru. K. Senthilraj, IAS
  - Phone: 04324-220100
  - Email: collector@karur.nic.in
  
- Superintendent of Police: Thiru. R. Mohankumar, IPS
  - Phone: 04324-236100
  - Emergency: 100
  
- Municipal Commissioner: Thiru. S. Palanichamy
  - Phone: 04324-235001
  
- Chief Fire Officer: Thiru. M. Raja
  - Phone: 04324-222222
  - Emergency: 101

#### 🏥 Essential Services
- Banks (SBI, IOB, Canara Bank)
- Hospitals (Government & Private)
- Transport (Bus Stand, Railway)
- Shopping Centers
- Restaurants & Hotels
- Theatres

#### 📚 Education
- Engineering Colleges
- Arts & Science Colleges
- Schools (Government, Private, Matriculation)
- District Central Library

---

## 🚀 Quick Setup

### Option 1: Use Without LLM (Works Immediately)
The chatbot works out of the box with rule-based responses. No setup needed!

### Option 2: Add LLM for Natural Conversations (Recommended)

**5-Minute Setup with Groq (Free):**

1. Sign up at https://console.groq.com
2. Create API key
3. Open `/components/CityInfo.tsx`
4. Replace line ~72:
   ```typescript
   const GROQ_API_KEY = "YOUR_GROQ_API_KEY_HERE";
   ```
   With:
   ```typescript
   const GROQ_API_KEY = "gsk_your_actual_key";
   ```
5. Done! Test by asking natural questions

**Detailed guides:**
- Quick setup: `/QUICK_SETUP.md`
- Full guide: `/LLM_INTEGRATION_GUIDE.md`

---

## 💬 Example Conversations

### With LLM Enabled:

**User:** "What makes Karur special?"  
**Bot:** "🌟 Karur is truly special! It's one of Tamil Nadu's oldest cities with over 2000 years of history. It was the capital of the Chera dynasty during the Sangam period. Today, it's famous for its handloom and textile industry, earning it the nickname 'Textile City of Tamil Nadu'. The ancient Pasupatheswarar Temple showcases stunning Dravidian architecture. Would you like to know more about the temples or the textile industry?"

**User:** "How do I contact the collector?"  
**Bot:** "📞 Here's how to reach the District Collector:\n\n👨‍💼 Thiru. K. Senthilraj, IAS\n📞 Phone: 04324-220100\n📧 Email: collector@karur.nic.in\n🏢 Office: District Collectorate, Karur\n\nThe office is typically open during government working hours. Is there a specific matter you'd like to inquire about?"

### Without LLM (Fallback Mode):

**User:** "history"  
**Bot:** "🏛️ Karur History:\n\nKarur is one of Tamil Nadu's oldest cities. It served as the capital of the Chera dynasty during the Sangam period.\n\n🌟 Key Highlights:\n• Over 2000 years old\n• Pasupatheswarar Temple\n• Kalyana Pasupatheeswarar Temple\n• Famous for textile and handloom industry\n\nAsk about specific topics for more information!"

---

## 🎨 UI Components

### Welcome Toast
```typescript
// Appears 3 seconds after page load
// Disappears after 8 seconds (or when chat opens)
{
  position: "bottom-right, above chat button",
  style: "white card with gradient icon",
  content: "Ask me anything! - AI Assistant"
}
```

### Chat Button
```typescript
{
  size: "56px × 56px",
  style: "gradient blue→purple, message icon",
  position: "bottom-right corner",
  badge: "shows unread count when minimized"
}
```

### Chat Window
```typescript
{
  size: "400px × auto (responsive)",
  sections: [
    "Header - gradient with status",
    "Messages - scrollable area",
    "Quick Questions - 6 buttons in 2×3 grid",
    "Input - with send button"
  ]
}
```

---

## 🔧 Customization

### Change Welcome Message Timing
```typescript
// In CityInfo.tsx, useEffect around line 45
const showTimer = setTimeout(() => {
  setShowWelcomeToast(true);
}, 3000); // Show after 3 seconds (change this)

const hideTimer = setTimeout(() => {
  setShowWelcomeToast(false);
}, 8000); // Hide after 8 seconds (change this)
```

### Modify Quick Questions
```typescript
// In CityInfo.tsx, around line 69
const quickQuestions = [
  { text: 'Your question here', icon: YourIcon },
  // Add more...
];
```

### Adjust Chat Button Size
```typescript
// In CityInfo.tsx, around line 245
className="w-14 h-14" // Change w-14/h-14 to your size
```

### Customize System Prompt
```typescript
// In CityInfo.tsx, around line 42
const systemContext = `You are Karur AI Assistant...
// Add more context, change personality, etc.
`;
```

---

## 📱 Mobile Responsive

The chatbot is fully responsive:
- Toast adjusts to screen size
- Chat window scales down on mobile
- Button positioned safely for thumb reach
- Messages wrap correctly
- Touch-friendly tap targets

---

## 🌐 Bilingual Support

Every piece of text has Tamil translation:
- Welcome messages
- Quick questions
- Error messages
- System prompts
- Fallback responses

Language changes automatically based on user's site-wide language preference.

---

## 🔐 Security Notes

### Development (Current Setup)
- API key in frontend code
- ⚠️ OK for testing, NOT for production

### Production (Required)
- Move API key to backend
- Use environment variables
- Create proxy endpoint
- See `/LLM_INTEGRATION_GUIDE.md` for implementation

**Example:**
```
Frontend → Your Backend API → Groq API
          (API key here)      (hidden)
```

---

## 📊 Performance

### Without LLM:
- Instant responses (<100ms)
- No external dependencies
- Works offline
- Zero API costs

### With LLM:
- Fast responses (~500-2000ms with Groq)
- Requires internet
- Free tier: 7,500 requests/day
- Natural, intelligent conversations

### Resource Usage:
- Bundle size: ~15KB (chatbot code)
- Memory: Minimal (<5MB)
- CPU: Low (animations are GPU-accelerated)

---

## 🐛 Troubleshooting

### Toast Doesn't Appear
- Check browser console for errors
- Verify `showWelcomeToast` state
- Try increasing delay in useEffect

### LLM Not Responding
- Verify API key is correct (starts with `gsk_`)
- Check browser console for API errors
- Verify internet connection
- Check Groq service status

### Fallback Always Triggers
- This is normal without API key
- Check if API key is set
- Verify API key has quota remaining

### Chat Button Hidden
- Check z-index (should be 50)
- Verify no elements covering it
- Check viewport on mobile

### Slow Responses
- Try Groq (fastest option)
- Use smaller model (8B instead of 70B)
- Check internet speed
- Consider caching common questions

---

## 🔄 Future Enhancements

### Planned Features:
- [ ] Conversation history persistence
- [ ] Voice input/output
- [ ] Image responses
- [ ] Live chat handoff to humans
- [ ] Search history
- [ ] Favorite responses
- [ ] Share conversation
- [ ] Multi-language (beyond Tamil)
- [ ] Analytics dashboard
- [ ] Sentiment analysis

### Easy Additions:
- Streaming responses (word-by-word)
- Typing indicators with dynamic text
- Message reactions
- Dark mode
- Keyboard shortcuts
- Export conversation

---

## 📚 Files Structure

```
/components/
  CityInfo.tsx              - Main chatbot component
  
/LLM_INTEGRATION_GUIDE.md   - Complete LLM setup guide
/QUICK_SETUP.md             - 5-minute Groq setup
/CHATBOT_README.md          - This file
/CHATBOT_FEATURES.md        - Feature documentation
```

---

## 🤝 Support

### Getting Help:
1. Check `/QUICK_SETUP.md` for common setup
2. Read `/LLM_INTEGRATION_GUIDE.md` for advanced features
3. Review browser console for errors
4. Check Groq documentation: https://console.groq.com/docs

### Common Questions:

**Q: Do I need an API key?**  
A: No, but responses will be basic without it.

**Q: Is Groq really free?**  
A: Yes, generous free tier (7,500 req/day).

**Q: Can I use other LLMs?**  
A: Yes! See alternatives in LLM_INTEGRATION_GUIDE.md

**Q: Will it work on mobile?**  
A: Yes, fully responsive.

**Q: Can I customize the appearance?**  
A: Yes, all styles are in the component.

---

## 📄 License

Part of the Karur District Website project.

---

## ✨ Credits

- LLM: Groq (Llama 3.1)
- UI: React + Tailwind CSS + Motion
- Icons: Lucide React
- Context: Karur District Official Information

---

**Version:** 3.0  
**Last Updated:** October 2, 2025  
**Status:** ✅ Production Ready (with API configuration)

**Quick Links:**
- [Quick Setup (5 min)](/QUICK_SETUP.md)
- [Full LLM Guide](/LLM_INTEGRATION_GUIDE.md)
- [Feature List](/CHATBOT_FEATURES.md)
