"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const templates = [
  {
    id: '6ab8007623d16b5478fdf4e',
    title: 'Modern Emerald Gold Poster',
    occasionType: 'সাধারণ বা জাতীয় দিবস',
    imageUrl: 'https://res.cloudinary.com/sib00hcm/image/upload/v1790446738/generated_posters/oercjzcq74z5iazuibms.png',
  },
  {
    id: '6ab8007623d16b5478fdf4f',
    title: 'Modern Crimson Gold Poster',
    occasionType: 'ঐতিহাসিক বা সামাজিক অনুষ্ঠান',
    imageUrl: 'https://res.cloudinary.com/sib00hcm/image/upload/v1790447073/generated_posters/uyeqlj22ibyhijlwagmg.png',
  },
  {
    id: '6ab8007623d16b5478fdf50',
    title: 'Modern Navy Gold Poster',
    occasionType: 'নির্বাচনী ও রাজনৈতিক প্রচার',
    imageUrl: 'https://res.cloudinary.com/sib00hcm/image/upload/v1790447508/generated_posters/hvjgfzxynz2fslv2udxf.png',
  },
  {
    id: '6ab8007623d16b5478fdf51',
    title: 'Modern Welfare Purple Poster',
    occasionType: 'জনকল্যাণ ও সামাজিক আন্দোলন',
    imageUrl: 'https://res.cloudinary.com/sib00hcm/image/upload/v1790447768/generated_posters/tqokvwdpynppvhnqrskp.png',
  },
];

export default function TemplateGallery() {
  const router = useRouter();

  const handleTemplateClick = (templateId: string) => {
    router.push(`/create-poster/${templateId}`);
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
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={template.imageUrl}
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/20">
                  {template.occasionType}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <h3 className="text-lg font-bold group-hover:text-emerald-500 transition-colors">
                  {template.title}
                </h3>
                <button className="mt-4 w-full bg-gradient-btn text-white font-extrabold py-2.5 px-4 rounded-xl shadow-lg hover:opacity-95 transition-opacity">
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