import { useState, useRef, useEffect } from 'react';
import { ai } from '../lib/gemini';
import { MessageSquare, X, Send, Bot, Calendar } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { Type, FunctionDeclaration } from '@google/genai';

const bookAppointmentDeclaration: FunctionDeclaration = {
  name: "book_appointment",
  description: "Books a discovery call for the user after collecting their details.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "The user's full name" },
      email: { type: Type.STRING, description: "The user's email address" },
      phone: { type: Type.STRING, description: "The user's phone number" },
      requested_slot: { type: Type.STRING, description: "The date and time the user wants to book (e.g., 'Tuesday at 2pm')" }
    },
    required: ["name", "email", "phone", "requested_slot"]
  }
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Hi! I am the AV Decoded AI Receptionist. How can I help you automate your business today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userText }] }
        ],
        config: {
          systemInstruction: `You are the AV Decoded AI Sales Specialist. Your primary goal is to convert visitors into leads and book discovery calls. 

Key Directives:
1. Be extremely proactive and sales-oriented. Every interaction should move towards booking a call.
2. IMMEDIATELY ask for their Name, Email, and Phone Number as soon as they show any interest.
3. Once you have their details AND they specify a time they'd like to talk, use the 'book_appointment' tool to actually book the slot for them.
4. Do not just send a link. Tell them: "I can book that for you right now. What's your name, email, and phone number, and when would you like to speak?"
5. After calling 'book_appointment', confirm to the user that their slot has been reserved and our founder will reach out.
6. Emphasize that every missed call is lost revenue.
7. Keep responses short, punchy, and focused on THE CALL.

Focus on:
- AI Receptionist (Voice & Chat) - 24/7 coverage.
- Website Refresh + AI Integration - High conversion.
- ROI: Saving time and capturing missed revenue.`,
          tools: [{ functionDeclarations: [bookAppointmentDeclaration] }]
        }
      });

      const functionCalls = response.functionCalls;
      if (functionCalls && functionCalls.length > 0) {
        for (const call of functionCalls) {
          if (call.name === 'book_appointment') {
            const args = call.args as any;
            // Send to FormSubmit to notify owner
            try {
              await fetch("https://formsubmit.co/ajax/theavdecoded@gmail.com", {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                  ...args,
                  _subject: `New Appointment Booked via Chat: ${args.name}`
                })
              });
            } catch (e) {
              console.error("Booking notification failed", e);
            }

            setMessages(prev => [...prev, { 
              role: 'model', 
              text: `✅ **Booking Confirmed!**\n\nI've reserved a slot for you on **${args.requested_slot}**. \n\n**Details:**\n- Name: ${args.name}\n- Email: ${args.email}\n- Phone: ${args.phone}\n\nOur founder will reach out to you shortly to confirm the final details. Is there anything else I can help you with?` 
            }]);
          }
        }
      } else {
        setMessages(prev => [...prev, { role: 'model', text: response.text || 'Sorry, I encountered an error.' }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I am having trouble connecting right now.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-[#0F0F1A] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-[#2563EB] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">AI Receptionist</h3>
                  <p className="text-white/70 text-xs">Always online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === 'user' ? 'bg-[#2563EB] text-white rounded-tr-sm' : 'bg-white/5 text-gray-200 rounded-tl-sm border border-white/5'}`}>
                    <div className="prose prose-invert prose-sm max-w-none">
                      <Markdown
                        components={{
                          a: ({ node, ...props }) => (
                            <a {...props} target="_blank" rel="noopener noreferrer" className="text-[#60A5FA] underline hover:text-white transition-colors" />
                          )
                        }}
                      >
                        {msg.text}
                      </Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-[#0A0A12]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 text-[#2563EB] hover:text-[#3B82F6] disabled:text-gray-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#2563EB] text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center z-50 hover:bg-[#3B82F6] transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
