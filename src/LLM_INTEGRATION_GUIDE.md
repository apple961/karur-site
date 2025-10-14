# 🤖 LLM Integration Guide for Karur Chatbot

This guide explains how to integrate various free LLM APIs to make the chatbot more intelligent and conversational.

## 🎯 Current Implementation

The chatbot now supports:
- **Async LLM API calls** with automatic fallback to rule-based responses
- **System context** with all Karur district information
- **Error handling** for reliable operation
- **Natural conversations** when API is configured

## 🆓 Free LLM API Options

### 1. **Groq** (RECOMMENDED - Fast & Free) ⚡

**Why Groq?**
- ✅ Extremely fast inference (up to 10x faster than others)
- ✅ Generous free tier
- ✅ High-quality LLaMA models
- ✅ Simple API compatible with OpenAI format
- ✅ No credit card required

**Setup:**
1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up for free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key

**Configuration:**
```typescript
// In components/CityInfo.tsx, replace:
const GROQ_API_KEY = "YOUR_GROQ_API_KEY_HERE";
// With your actual key:
const GROQ_API_KEY = "gsk_...";
```

**Models Available:**
- `llama-3.1-8b-instant` - Fast, good quality (RECOMMENDED)
- `llama-3.1-70b-versatile` - More powerful, slower
- `mixtral-8x7b-32768` - Large context window

---

### 2. **Hugging Face Inference API** 🤗

**Setup:**
1. Sign up at [https://huggingface.co](https://huggingface.co)
2. Go to Settings → Access Tokens
3. Create a new token with "Read" access

**Configuration:**
```typescript
const getHuggingFaceResponse = async (userMessage: string): Promise<string> => {
  const HF_TOKEN = "hf_YOUR_TOKEN_HERE";
  
  const response = await fetch(
    "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `${systemContext}\n\nUser: ${userMessage}\nAssistant:`,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
        }
      }),
    }
  );

  const data = await response.json();
  return data[0]?.generated_text || getFallbackResponse(userMessage);
};
```

---

### 3. **Together AI** 🚀

**Setup:**
1. Sign up at [https://together.ai](https://together.ai)
2. Get $25 free credits
3. Create API key

**Configuration:**
```typescript
const getTogetherResponse = async (userMessage: string): Promise<string> => {
  const TOGETHER_API_KEY = "YOUR_TOGETHER_KEY";
  
  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${TOGETHER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/Llama-3-8b-chat-hf",
      messages: [
        { role: "system", content: systemContext },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  const data = await response.json();
  return data.choices[0]?.message?.content || getFallbackResponse(userMessage);
};
```

---

### 4. **OpenRouter** (Multiple Models) 🔀

**Setup:**
1. Sign up at [https://openrouter.ai](https://openrouter.ai)
2. Get free credits
3. Access to many free models

**Configuration:**
```typescript
const getOpenRouterResponse = async (userMessage: string): Promise<string> => {
  const OPENROUTER_API_KEY = "YOUR_OPENROUTER_KEY";
  
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.href,
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3-8b-instruct:free", // Free model
      messages: [
        { role: "system", content: systemContext },
        { role: "user", content: userMessage }
      ],
    }),
  });

  const data = await response.json();
  return data.choices[0]?.message?.content || getFallbackResponse(userMessage);
};
```

---

## 🔐 Security Best Practices

### ⚠️ IMPORTANT: Never expose API keys in frontend code!

**For Development:**
- Use environment variables
- Add `.env` to `.gitignore`

**For Production:**
You MUST use a backend proxy to protect your API keys:

### Option A: Create a Backend API Route

```typescript
// /api/chat.ts (Backend)
export async function POST(request: Request) {
  const { message } = await request.json();
  const GROQ_API_KEY = process.env.GROQ_API_KEY; // Secure!
  
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemContext },
        { role: "user", content: message }
      ],
    }),
  });

  const data = await response.json();
  return Response.json(data);
}
```

```typescript
// Frontend - Call your backend instead
const getLLMResponse = async (userMessage: string): Promise<string> => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage }),
  });
  
  const data = await response.json();
  return data.choices[0]?.message?.content;
};
```

### Option B: Use Supabase Edge Functions

```typescript
// supabase/functions/chat/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { message } = await req.json()
  const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY')
  
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemContext },
        { role: "user", content: message }
      ],
    }),
  })

  const data = await response.json()
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  })
})
```

---

## 🎨 Advanced Features You Can Add

### 1. **Conversation History**
Keep track of previous messages for context:

```typescript
const [conversationHistory, setConversationHistory] = useState<Array<{role: string, content: string}>>([]);

const getLLMResponse = async (userMessage: string): Promise<string> => {
  const messages = [
    { role: "system", content: systemContext },
    ...conversationHistory,
    { role: "user", content: userMessage }
  ];
  
  // ... API call with messages array
  
  // Update history
  setConversationHistory(prev => [...prev, 
    { role: "user", content: userMessage },
    { role: "assistant", content: response }
  ]);
};
```

### 2. **Streaming Responses**
Show responses word-by-word as they're generated:

```typescript
const getLLMResponseStream = async (userMessage: string) => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { /* ... */ },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [/* ... */],
      stream: true, // Enable streaming
    }),
  });

  const reader = response.body?.getReader();
  let botMessageId = messages.length;
  let accumulatedText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = new TextDecoder().decode(value);
    // Parse and append to message
    accumulatedText += chunk;
    
    setMessages(prev => {
      const updated = [...prev];
      updated[botMessageId] = {
        id: botMessageId,
        type: 'bot',
        content: accumulatedText,
        timestamp: new Date()
      };
      return updated;
    });
  }
};
```

### 3. **RAG (Retrieval Augmented Generation)**
Add document search before LLM:

```typescript
// Create embeddings for your knowledge base
const karurDocuments = [
  { id: 1, content: "Pasupatheswarar Temple is...", embedding: [...] },
  { id: 2, content: "District Collector contact...", embedding: [...] },
  // ...
];

// Search relevant docs based on user query
const searchDocuments = (query: string) => {
  // Use simple keyword matching or embedding similarity
  return karurDocuments.filter(doc => 
    doc.content.toLowerCase().includes(query.toLowerCase())
  );
};

const getLLMResponseWithRAG = async (userMessage: string) => {
  // 1. Search relevant documents
  const relevantDocs = searchDocuments(userMessage);
  
  // 2. Add to context
  const enhancedContext = `${systemContext}\n\nRelevant Information:\n${
    relevantDocs.map(doc => doc.content).join('\n')
  }`;
  
  // 3. Call LLM with enhanced context
  const response = await fetch(/* ... */, {
    body: JSON.stringify({
      messages: [
        { role: "system", content: enhancedContext },
        { role: "user", content: userMessage }
      ]
    })
  });
};
```

### 4. **Function Calling**
Let LLM trigger specific actions:

```typescript
const functions = [
  {
    name: "get_weather",
    description: "Get current weather in Karur",
    parameters: {}
  },
  {
    name: "find_official",
    description: "Find contact info for a specific official",
    parameters: {
      type: "object",
      properties: {
        role: { type: "string", description: "Official role like 'collector', 'police'" }
      }
    }
  }
];

// LLM can now decide when to call these functions
```

---

## 📊 Cost Comparison

| Service | Free Tier | Speed | Quality | Best For |
|---------|-----------|-------|---------|----------|
| **Groq** | Very generous | ⚡⚡⚡⚡⚡ | ⭐⭐⭐⭐ | Production |
| **Hugging Face** | Unlimited (rate limited) | ⚡⚡⚡ | ⭐⭐⭐⭐ | Development |
| **Together AI** | $25 credits | ⚡⚡⚡⚡ | ⭐⭐⭐⭐⭐ | Production |
| **OpenRouter** | Limited | ⚡⚡⚡ | ⭐⭐⭐ | Testing |

---

## 🚀 Quick Start (Recommended Path)

1. **Sign up for Groq** (5 minutes)
   - Visit https://console.groq.com
   - Create account
   - Generate API key

2. **Update CityInfo.tsx**
   ```typescript
   const GROQ_API_KEY = "gsk_your_actual_key_here";
   ```

3. **Test it!**
   - Open your website
   - Click the chat button
   - Ask: "Tell me about Karur's history"
   - Get natural, intelligent responses!

4. **For Production:** Set up backend proxy (see security section above)

---

## 🆘 Troubleshooting

### "API request failed"
- Check your API key is correct
- Verify you have credits/quota remaining
- Check network console for specific error

### "Slow responses"
- Try Groq (fastest)
- Use smaller model (8B instead of 70B)
- Enable caching for common questions

### "Generic/poor responses"
- Improve system prompt with more context
- Increase temperature (0.7 → 0.9)
- Try different model
- Add conversation history

### "Rate limited"
- Implement request queuing
- Add delay between requests
- Upgrade to paid tier
- Use multiple API keys

---

## 📝 Example Enhanced System Prompt

```typescript
const systemContext = `You are Karur AI Assistant, a warm and knowledgeable guide to Karur District.

PERSONALITY:
- Friendly, helpful, and enthusiastic about Karur
- Use emojis appropriately (🕉️, 🏛️, 📞, etc.)
- Keep responses concise but informative
- Offer follow-up suggestions when relevant

KNOWLEDGE BASE:
[Include all current context from CityInfo.tsx]

RESPONSE GUIDELINES:
- Always greet users warmly
- Provide specific details (phone numbers, addresses)
- If asked about something outside Karur, politely redirect
- Suggest related topics the user might find interesting
- Use bullet points for lists
- Include relevant emojis for visual appeal

CONVERSATION STYLE:
User: "Tell me about temples"
Good: "🕉️ Karur has beautiful ancient temples! The most famous is Pasupatheswarar Temple, known for its stunning Dravidian architecture. Would you like to know about visiting hours or the history? 🏛️"

Bad: "There are temples in Karur."`;
```

---

## 🎉 Results

With LLM integration, your chatbot will:
- ✅ Understand natural language queries
- ✅ Provide conversational responses
- ✅ Handle unexpected questions gracefully
- ✅ Learn from context
- ✅ Feel like talking to a real assistant
- ✅ Still work offline (fallback mode)

**Before:** "I don't understand that. Try the suggestions below."  
**After:** "I'd be happy to help you with that! Karur is known for..."

---

**Last Updated:** October 2, 2025  
**Status:** Production Ready (with API key configuration)
