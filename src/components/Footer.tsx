import { Separator } from "./ui/separator";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Sparkles, ExternalLink, Copy, Check, MessageCircle } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";

export function Footer() {
  const { t } = useLanguage();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };
  
  return (
    <footer id="contact" className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Compact Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs uppercase tracking-wider text-blue-400">{t('footer.contact')}</span>
            </div>
            <h2 className="text-center mb-3">Get in Touch</h2>
            <p className="text-center text-sm text-gray-400 mb-8 max-w-2xl mx-auto">
              This website is maintained by Shree Guru. For any technical issues or data updates, please contact me using the details below.
            </p>
            
            {/* Compact Contact Cards */}
            <div className="grid grid-cols-2 gap-2.5 max-w-xl mx-auto">
              {/* WhatsApp Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.03, y: -2 }}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-3 hover:border-green-400/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <div className="text-xs">WhatsApp Us</div>
                  </div>
                  <p className="text-[11px] text-gray-400 mb-1.5">+91 9751977961</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard('+91 9751977961', 'phone')}
                    className="h-6 text-[10px] text-green-400 hover:text-green-300 hover:bg-green-500/20 px-1.5"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-2.5 h-2.5 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-2.5 h-2.5 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.03, y: -2 }}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-3 hover:border-blue-400/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div className="text-xs">Email Us</div>
                  </div>
                  <p className="text-[11px] text-gray-400 mb-1.5 break-all">shreeguruk@gmail.com</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard('shreeguruk@gmail.com', 'email')}
                    className="h-6 text-[10px] text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 px-1.5"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-2.5 h-2.5 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-2.5 h-2.5 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Follow us:</span>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-blue-500/20 border border-white/20 hover:border-blue-400/50 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-blue-500/20 border border-white/20 hover:border-blue-400/50 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-purple-500/20 border border-white/20 hover:border-purple-400/50 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Last updated: September 2025
          </p>
        </motion.div>
      </div>
    </footer>
  );
}