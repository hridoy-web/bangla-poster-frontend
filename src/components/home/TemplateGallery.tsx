"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const templates = [
  {
    id: '6ab80c752e8368811d168924',
    title: 'Modern Emerald Gold Poster',
    occasionType: 'সামাজিক আন্দোলন',
    imageUrl: 'https://res.cloudinary.com/sib00hcm/image/upload/v1790446738/generated_posters/oercjzcq74z5iazuibms.png',
  },
  {
    id: '6ab80c752e8368811d168923',
    title: 'Modern Crimson Gold Poster',
    occasionType: 'জাতীয় দিবস',
    imageUrl: 'https://res.cloudinary.com/sib00hcm/image/upload/v1790447073/generated_posters/uyeqlj22ibyhijlwagmg.png',
  },
  {
    id: '6ab80c752e8368811d168925',
    title: 'Modern Navy Gold Poster',
    occasionType: 'নির্বাচনী ও রাজনৈতিক প্রচার',
    imageUrl: 'https://res.cloudinary.com/sib00hcm/image/upload/v1790447508/generated_posters/hvjgfzxynz2fslv2udxf.png',
  },
  {
    id: '6ab80c752e8368811d168926',
    title: 'Modern Welfare Purple Poster',
    occasionType: 'জনকল্যাণ',
    imageUrl: 'https://res.cloudinary.com/sib00hcm/image/upload/v1790447768/generated_posters/tqokvwdpynppvhnqrskp.png',
  },
];

export default function TemplateGallery() {
  const router = useRouter();

  const handleTemplateClick = (templateId: string) => {
    router.push(`/create-poster?templateId=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            পোস্টার টেমপ্লেট গ্যালারি
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            আপনার পছন্দের টেমপ্লেটে ক্লিক করে খুব সহজেই প্রফেশনাল পোস্টার তৈরি করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateClick(template.id)}
              className="bg-card border border-border/80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-3/4 overflow-hidden bg-muted w-full">
                <Image
                  src={template.imageUrl}
                  alt={template.title}  
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                  {template.occasionType}
                </div>
              </div>

              <div className="p-5 flex flex-col grow justify-between space-y-4">
                <h3 className="text-base font-bold group-hover:text-primary transition-colors">
                  {template.title}
                </h3>
                <button className="w-full bg-gradient-btn text-white font-extrabold py-2.5 px-4 rounded-xl shadow-lg hover:opacity-95 transition-opacity cursor-pointer border-0">
                  এই টেমপ্লেট ব্যবহার করুন
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}