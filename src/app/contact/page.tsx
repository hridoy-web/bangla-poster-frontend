"use client";

import React, { useState } from 'react';
import { Mail, Clock, Send, MessageSquare, HelpCircle, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_CONTACT_API_KEY || "f4af5842-789f-4c36-ae81-46f888b02928",
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Message from BanglaPoster Contact Page",
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! We will get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || "Failed to send message.");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Get in Touch
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Got Questions, Feedback, or New Template Requests?
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Have issues with template designs, custom poster requirements, or found a bug? Drop us a message anytime and we will look into it.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Box: Direct Support Info */}
          <div className="lg:col-span-4 bg-card border border-border/60 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 backdrop-blur-sm">
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold tracking-tight">Direct Support</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/40 border border-border/40">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</p>
                    <p className="text-xs sm:text-sm font-semibold mt-0.5 text-foreground truncate">t.okay383@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/40 border border-border/40">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Response Time</p>
                    <p className="text-sm font-semibold mt-0.5 text-foreground">Within 24 Hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Helper Points */}
            <div className="space-y-3 pt-4 border-t border-border/40 text-xs text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                <span>Ask doubts regarding custom poster templates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-primary shrink-0" />
                <span>Report technical bugs or rendering errors</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <span>Suggest new occasions or political themes</span>
              </div>
            </div>
          </div>

          {/* Right Box: Contact Form */}
          <div className="lg:col-span-8 bg-card border border-border/60 p-6 sm:p-8 rounded-3xl shadow-xl backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-input border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Your Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full bg-input border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Subject / Occasion Type
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Template Request / Bug Report"
                  className="w-full bg-input border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Your Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  rows={5}
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message, feedback, or bug report here..."
                  className="w-full bg-input border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all text-sm resize-none"
                ></textarea>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-btn font-extrabold py-3.5 h-12 rounded-xl shadow-lg hover:opacity-95 transition-opacity text-center cursor-pointer border-0 text-white flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}