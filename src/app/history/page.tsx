"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserPostersService, deletePosterService, regeneratePosterService } from "@/lib/services/posterService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCw, History as HistoryIcon, Download, Loader2, Sparkles, Eye, X } from "lucide-react";
import Image from "next/image";

interface Poster {
  _id: string;
  templateId: string;
  formData: {
    name?: string;
    designation?: string;
    party?: string;
    unionOrThanaOrDistrict?: string;
    headline?: string;
  };
  generatedImageUrl?: string;
  status: 'generating' | 'completed' | 'failed';
  createdAt: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPosters = async () => {
      try {
        const data = await getUserPostersService();
        if (isMounted) {
          setPosters(data.data || data);
        }
      } catch (error: unknown) {
        if (isMounted) {
          const errorMessage = error instanceof Error ? error.message : "Failed to fetch poster history.";
          
          if (errorMessage.toLowerCase().includes("token") || errorMessage.toLowerCase().includes("unauthorized") || errorMessage.toLowerCase().includes("auth")) {
            toast.error("Please log in first to view your poster history.");
            const currentPath = window.location.pathname + window.location.search;
            router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
          } else {
            toast.error(errorMessage);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPosters();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const confirmDelete = async () => {
    if (!deleteId) return;

    setActionLoadingId(deleteId);
    try {
      await deletePosterService(deleteId);
      toast.success("Poster deleted successfully.");
      setPosters((prev) => prev.filter((p) => p._id !== deleteId));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete poster.";
      toast.error(errorMessage);
    } finally {
      setActionLoadingId(null);
      setDeleteId(null);
    }
  };

  const handleDownload = async (imageUrl: string) => {
    try {
      toast.info("Downloading poster...");
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `poster-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Poster downloaded successfully!");
    } catch {
      toast.error("Failed to download poster.");
    }
  };

  const handleRegenerate = async (id: string) => {
    setActionLoadingId(id);
    toast.info("Regenerating poster, please wait...");
    try {
      const response = await regeneratePosterService(id);
      toast.success("Poster regenerated successfully!");
      setPosters((prev) =>
        prev.map((p) => (p._id === id ? response.data || response : p))
      );
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to regenerate poster.";
      toast.error(errorMessage);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center justify-center gap-2">
            <HistoryIcon className="text-primary w-7 h-7 sm:w-8 sm:h-8" /> Your Poster History
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground px-4">
            View, download, or regenerate all your previously created professional posters
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : posters.length === 0 ? (
          <div className="text-center py-20 sm:py-24 bg-card border border-border/60 rounded-3xl shadow-xl space-y-4 mx-2">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-bold">No posters found</h3>
            <p className="text-sm text-muted-foreground">You haven&apos;t generated any posters yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posters.map((poster) => (
              <div 
                key={poster._id} 
                className="bg-card border border-border/60 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all hover:border-primary/50"
              >
                <div>
                  <div 
                    onClick={() => poster.generatedImageUrl && setPreviewImage(poster.generatedImageUrl)}
                    className="relative aspect-4/5 bg-secondary/40 w-full overflow-hidden flex items-center justify-center cursor-pointer group"
                  >
                    {poster.status === 'completed' && poster.generatedImageUrl ? (
                      <>
                        <Image 
                          src={poster.generatedImageUrl} 
                          alt="Generated Poster" 
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-background/90 text-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                            <Eye className="w-3.5 h-3.5" /> Fullscreen View
                          </span>
                        </div>
                      </>
                    ) : poster.status === 'generating' ? (
                      <div className="flex flex-col items-center space-y-2 text-muted-foreground">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <span className="text-xs font-semibold">Generating...</span>
                      </div>
                    ) : (
                      <div className="text-destructive text-sm font-semibold">Generation Failed</div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        {poster.formData?.name || "Poster Item"}
                      </span>
                      <h3 className="text-base font-bold line-clamp-1 mt-0.5">
                        {poster.formData?.headline || "No Headline Provided"}
                      </h3>
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                      {poster.formData?.designation && <p>Designation: {poster.formData.designation}</p>}
                      {poster.formData?.party && <p>Party: {poster.formData.party}</p>}
                      <p>Created: {new Date(poster.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0 flex items-center gap-2 sm:gap-3">
                  {poster.status === 'completed' && poster.generatedImageUrl && (
                    <Button 
                      variant="outline" 
                      onClick={() => handleDownload(poster.generatedImageUrl!)}
                      className="flex-1 rounded-xl gap-2 text-xs font-bold h-10 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    disabled={actionLoadingId === poster._id}
                    onClick={() => handleRegenerate(poster._id)}
                    className="rounded-xl px-3 h-10 cursor-pointer"
                    title="Regenerate Poster"
                  >
                    <RefreshCw className={`w-4 h-4 ${actionLoadingId === poster._id ? 'animate-spin' : ''}`} />
                  </Button>

                  <Button
                    variant="destructive"
                    disabled={actionLoadingId === poster._id}
                    onClick={() => setDeleteId(poster._id)}
                    className="rounded-xl px-3 h-10 cursor-pointer"
                    title="Delete Poster"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border/80 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-center">
            <h3 className="text-lg font-bold">Are you sure?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              This action cannot be undone. This will permanently delete your generated poster from history.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl h-10 cursor-pointer font-bold text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="flex-1 rounded-xl h-10 cursor-pointer font-bold text-xs"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-background/20 hover:bg-background/40 text-white p-3 rounded-full transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-3xl aspect-4/5 max-h-[85vh]">
            <Image
              src={previewImage}
              alt="Fullscreen Preview"
              fill
              className="object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}