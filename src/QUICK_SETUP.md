# 🚀 Quick Setup: Get Your Free Groq API Key in 5 Minutes

## Step 1: Sign Up for Groq (2 minutes)

1. Go to **https://console.groq.com**
2. Click "Sign Up" or "Get Started"
3. Create account with:
   - Email + Password, OR
   - Google account, OR
   - GitHub account

## Step 2: Get Your API Key (1 minute)

1. After logging in, you'll see the dashboard
2. Click on **"API Keys"** in the left sidebar
3. Click **"Create API Key"** button
4. Give it a name (e.g., "Karur Chatbot")
5. Click **"Create"**
6. **COPY THE KEY** - it looks like: `gsk_xxxxxxxxxxxxxxxxxxxx`
   - ⚠️ Important: You can only see this key once!

## Step 3: Add to Your Code (2 minutes)

1. Open `/components/CityInfo.tsx`
2. Find this line (around line 65):
   ```typescript
   const GROQ_API_KEY = "YOUR_GROQ_API_KEY_HERE";
   ```
3. Replace with your actual key:
   ```typescript
   const GROQ_API_KEY = "gsk_xxxxxxxxxxxxxxxxxxxx";
   ```
4. Save the file

## Step 4: Test It! (30 seconds)

1. Refresh your website
2. Click the chat button 💬
3. Ask: **"Tell me about Karur's history"**
4. Watch the magic happen! ✨

---

## 🎉 That's It!

Your chatbot is now powered by AI and can:
- Understand natural questions
- Give detailed, conversational answers
- Remember context from earlier in the conversation
- Provide helpful suggestions

---

## ⚠️ For Production Deployment

**Important:** Don't expose your API key in frontend code when deploying!

### Quick Fix:
1. Create a simple backend endpoint
2. Store API key as environment variable
3. Frontend calls your backend, backend calls Groq

**Example with Vercel/Netlify Functions:**

```typescript
// /api/chat.ts
export default async function handler(req, res) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY; // Secure!
  
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.json(data);
}
```

Then update your frontend to call `/api/chat` instead of Groq directly.

---

## 🆘 Need Help?

### Groq API Key Issues:
- Make sure you copied the entire key (starts with `gsk_`)
- Check there are no extra spaces
- Verify your Groq account is active

### Not Getting Responses:
- Check browser console for errors
- Verify the API key is correctly added
- Make sure you have internet connection

### Want Better Responses:
- Read `/LLM_INTEGRATION_GUIDE.md` for advanced tips
- Adjust the `systemContext` prompt
- Try different models (llama-3.1-70b for better quality)

---

## 📚 Learn More

- Full integration guide: `/LLM_INTEGRATION_GUIDE.md`
- Groq documentation: https://console.groq.com/docs
- Alternative APIs: See LLM_INTEGRATION_GUIDE.md

---

**Estimated Free Usage:** 
- Groq free tier: ~7,500 requests/day
- Perfect for a city website!
- If you need more, paid tier is very affordable

**Pro Tip:** The fallback system means your chatbot works even without the API key - it just won't be as smart. Perfect for development!
