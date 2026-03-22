"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Instagram, Send } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
)

// Animated Lotus Success Component
function LotusSuccess() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2
      }}
      className="text-center"
    >
      <motion.svg
        viewBox="0 0 120 120"
        className="w-32 h-32 mx-auto mb-8"
        initial="hidden"
        animate="visible"
      >
        {/* Outer petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
          <motion.ellipse
            key={rotation}
            cx="60"
            cy="60"
            rx="8"
            ry="25"
            fill="none"
            stroke="#c8973a"
            strokeWidth="1.5"
            transform={`rotate(${rotation} 60 60) translate(0 -20)`}
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { 
                pathLength: 1, 
                opacity: 1, 
                transition: { 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: "easeOut"
                } 
              }
            }}
          />
        ))}
        {/* Center circle */}
        <motion.circle
          cx="60"
          cy="60"
          r="12"
          fill="#c8973a"
          variants={{
            hidden: { scale: 0 },
            visible: { 
              scale: 1, 
              transition: { 
                duration: 0.5, 
                delay: 0.8,
                type: "spring",
                stiffness: 300
              } 
            }
          }}
        />
      </motion.svg>
      
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="font-serif text-3xl text-[#f0e8d5] mb-4"
      >
        Message Sent
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="text-[#7a6e5c] max-w-sm mx-auto"
      >
        Thank you for reaching out. We'll bloom back to you within 24 hours.
      </motion.p>
    </motion.div>
  )
}

export default function ContactPage() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <main className="pt-32 pb-24" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-4 block">
            Get In Touch
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#f0e8d5] mb-6">
            Let's <span className="text-[#c8973a] italic">Connect</span>
          </h1>
          <p className="text-[#7a6e5c] text-lg">
            Have a question, collaboration idea, or just want to say hello? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-serif text-2xl text-[#f0e8d5] mb-8">Contact Information</h2>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#131110] border border-[#c8973a]/20">
                  <MapPin className="w-5 h-5 text-[#c8973a]" />
                </div>
                <div>
                  <h3 className="text-[#f0e8d5] font-medium mb-1">Visit Us</h3>
                  <p className="text-[#7a6e5c]">Bole Road, Addis Ababa<br />Ethiopia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#131110] border border-[#c8973a]/20">
                  <Phone className="w-5 h-5 text-[#c8973a]" />
                </div>
                <div>
                  <h3 className="text-[#f0e8d5] font-medium mb-1">Call Us</h3>
                  <a href="tel:+251974656112" className="text-[#7a6e5c] hover:text-[#c8973a] transition-colors">
                    +251 974 656 112
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#131110] border border-[#c8973a]/20">
                  <Mail className="w-5 h-5 text-[#c8973a]" />
                </div>
                <div>
                  <h3 className="text-[#f0e8d5] font-medium mb-1">Email Us</h3>
                  <a href="mailto:bereketworana@gmail.com" className="text-[#7a6e5c] hover:text-[#c8973a] transition-colors">
                    bereketworana@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-[#f0e8d5] font-medium mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/we_are_lotus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-[#131110] border border-[#c8973a]/20 text-[#f0e8d5] hover:border-[#c8973a] hover:text-[#c8973a] transition-all"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="text-sm">@we_are_lotus</span>
                </a>
                <a
                  href="https://tiktok.com/@we_are_lotus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-[#131110] border border-[#c8973a]/20 text-[#f0e8d5] hover:border-[#c8973a] hover:text-[#c8973a] transition-all"
                >
                  <TikTokIcon />
                  <span className="text-sm">@we_are_lotus</span>
                </a>
              </div>
            </div>

            {/* Decorative Quote */}
            <div className="mt-12 p-8 bg-[#131110] border border-[#c8973a]/20">
              <p className="font-serif text-xl text-[#f0e8d5] italic mb-4">
                "Rise. Bloom. Become."
              </p>
              <p className="text-[#7a6e5c] text-sm">
                We respond to all inquiries within 24 hours. For urgent matters, please call us directly.
              </p>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#131110] border border-[#c8973a]/20 p-8 md:p-12"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center min-h-[500px]"
                >
                  <LotusSuccess />
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h2 className="font-serif text-2xl text-[#f0e8d5] mb-8">Send a Message</h2>

                  <div>
                    <label htmlFor="name" className="block text-sm text-[#7a6e5c] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-3 bg-[#0a0908] border text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:outline-none transition-colors ${
                        focusedField === 'name' ? 'border-[#c8973a]' : 'border-[#c8973a]/20'
                      }`}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-[#7a6e5c] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-3 bg-[#0a0908] border text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:outline-none transition-colors ${
                        focusedField === 'email' ? 'border-[#c8973a]' : 'border-[#c8973a]/20'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm text-[#7a6e5c] mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-3 bg-[#0a0908] border text-[#f0e8d5] focus:outline-none transition-colors ${
                        focusedField === 'subject' ? 'border-[#c8973a]' : 'border-[#c8973a]/20'
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="press">Press & Media</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-[#7a6e5c] mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 bg-[#0a0908] border text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:outline-none transition-colors resize-none ${
                        focusedField === 'message' ? 'border-[#c8973a]' : 'border-[#c8973a]/20'
                      }`}
                      placeholder="Write your message here..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-[#080706]/30 border-t-[#080706] rounded-full"
                        />
                        SENDING...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        SEND MESSAGE
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
