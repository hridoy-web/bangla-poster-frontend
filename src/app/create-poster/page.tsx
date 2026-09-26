"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { createPosterService } from "@/lib/services/posterService";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, LayoutTemplate, Loader2, Image as ImageIcon, UserCheck, User, Briefcase, Flag, MapPin } from "lucide-react";

function CreatePosterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const urlTemplateId = searchParams.get("templateId") || "6ab80c752e8368811d168924";

    const [loading, setLoading] = useState(false);
    const [templateId, setTemplateId] = useState(urlTemplateId);
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [party, setParty] = useState("");
    const [unionOrThanaOrDistrict, setUnionOrThanaOrDistrict] = useState("");
    const [headline, setHeadline] = useState("");
    const [situationImage1, setSituationImage1] = useState<File | null>(null);
    const [situationImage2, setSituationImage2] = useState<File | null>(null);
    const [authorImage, setAuthorImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!templateId) {
            toast.error("Please select a valid template.");
            return;
        }

        if (!situationImage1 || !situationImage2 || !authorImage) {
            toast.error("Please upload all 3 required images.");
            return;
        }

        setLoading(true);

        try {
            const formDataPayload = new FormData();
            formDataPayload.append("templateId", templateId);

            const formDataObj = {
                name,
                designation,
                party,
                unionOrThanaOrDistrict,
                headline,
            };

            formDataPayload.append("formData", JSON.stringify(formDataObj));

            formDataPayload.append("images", situationImage1);
            formDataPayload.append("images", situationImage2);
            formDataPayload.append("images", authorImage);

            const response = await createPosterService(formDataPayload);
            toast.success(response.message || "Poster generated successfully!");

            setTimeout(() => {
                router.push("/history");
            }, 1000);

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to generate poster.";

            if (errorMessage.toLowerCase().includes("token") || errorMessage.toLowerCase().includes("unauthorized") || errorMessage.toLowerCase().includes("auth")) {
                toast.error("Please log in first to create a poster.");
                const currentPath = window.location.pathname + window.location.search;
                router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative">

            {loading && (
                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <div className="text-center space-y-1">
                        <h2 className="text-xl font-bold">Generating Your Poster...</h2>
                        <p className="text-sm text-muted-foreground">Uploading images, rendering template, and generating poster. Please wait a moment.</p>
                    </div>
                </div>
            )}

            <div className="max-w-2xl mx-auto bg-card border border-border/60 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-sm">

                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center justify-center gap-2">
                        <Sparkles className="text-primary w-6 h-6 sm:w-7 sm:h-7" /> Create Your Poster
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        Fill in all required details and upload images to generate your poster instantly
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                                <LayoutTemplate className="w-4 h-4 text-primary" /> Select Template Category
                            </label>
                            <select
                                name="templateId"
                                required
                                value={templateId}
                                onChange={(e) => setTemplateId(e.target.value)}
                                className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all cursor-pointer text-sm"
                            >
                                <option value="6ab80c752e8368811d168924">সামাজিক আন্দোলন &lt; Modern Emerald Gold Poster</option>
                                <option value="6ab80c752e8368811d168923">জাতীয় দিবস &lt; Modern Crimson Gold Poster</option>
                                <option value="6ab80c752e8368811d168925">নির্বাচনী ও রাজনৈতিক প্রচার &lt; Modern Navy Gold Poster</option>
                                <option value="6ab80c752e8368811d168926">জনকল্যাণ &lt; Modern Welfare Purple Poster</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                                    <User className="w-4 h-4 text-primary" /> Author Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                                    <Briefcase className="w-4 h-4 text-primary" /> Designation (পদবী)
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter designation"
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                                    <Flag className="w-4 h-4 text-primary" /> Party / Organization
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter party or organization"
                                    value={party}
                                    onChange={(e) => setParty(e.target.value)}
                                    className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-primary" /> Union / Thana / District
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter location info"
                                    value={unionOrThanaOrDistrict}
                                    onChange={(e) => setUnionOrThanaOrDistrict(e.target.value)}
                                    className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1.5">Poster Headline / Message</label>
                            <input
                                type="text"
                                name="headline"
                                required
                                placeholder="Enter poster headline or greeting"
                                value={headline}
                                onChange={(e) => setHeadline(e.target.value)}
                                className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all text-sm"
                            />
                        </div>

                        <div className="space-y-4 pt-3 border-t border-border/40">
                            <div className="flex items-center gap-2">
                                <Upload className="w-4 h-4 text-primary" />
                                <h3 className="text-sm font-bold tracking-wide text-foreground">Image Placement Structure</h3>
                            </div>

                            <div className="bg-secondary/40 p-4 rounded-2xl border border-border/40 space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-primary mb-1 flex items-center gap-1.5">
                                        <ImageIcon className="w-3.5 h-3.5" /> Top Situation Image 1 (Event / Monument / Context)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={(e) => setSituationImage1(e.target.files?.[0] || null)}
                                        className="w-full bg-background border border-border/80 rounded-xl px-4 py-2 text-xs text-foreground file:mr-3 file:py-1 file:px-2.5 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 transition-all cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-primary mb-1 flex items-center gap-1.5">
                                        <ImageIcon className="w-3.5 h-3.5" /> Top Situation Image 2 (Event / Monument / Context)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={(e) => setSituationImage2(e.target.files?.[0] || null)}
                                        className="w-full bg-background border border-border/80 rounded-xl px-4 py-2 text-xs text-foreground file:mr-3 file:py-1 file:px-2.5 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 transition-all cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-primary mb-1 flex items-center gap-1.5">
                                        <UserCheck className="w-3.5 h-3.5" /> Author / Sender Photo (For Bottom White Card)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={(e) => setAuthorImage(e.target.files?.[0] || null)}
                                        className="w-full bg-background border border-border/80 rounded-xl px-4 py-2 text-xs text-foreground file:mr-3 file:py-1 file:px-2.5 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 transition-all cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-btn font-extrabold py-3.5 h-12 rounded-full shadow-lg hover:opacity-95 transition-opacity disabled:opacity-50 text-center cursor-pointer border-0"
                        >
                            {loading ? "Processing & Generating..." : "Generate Poster"}
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default function CreatePosterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CreatePosterForm />
        </Suspense>
    );
}