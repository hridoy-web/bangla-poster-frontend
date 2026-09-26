"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2 } from "lucide-react";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        console.log("Subscribed email:", email);

        setIsSubmitted(true);
        setEmail("");
    };

    return (
        <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Stay Updated</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
                Subscribe to get notified about new templates and exclusive features.
            </p>

            {isSubmitted ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 text-primary text-sm font-medium animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Thank you for subscribing!</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                        required
                    />
                    <Button type="submit" size="sm" className="w-full bg-gradient-btn rounded-xl font-medium gap-2">
                        Subscribe <Send className="w-3.5 h-3.5" />
                    </Button>
                </form>
            )}
        </div>
    );
}