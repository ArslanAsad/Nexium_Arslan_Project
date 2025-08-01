"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Copy, Trash2, ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type GeneratedPitch = {
  idea: string;
  tone: string;
  pitch: string;
};

type SavedPitch = {
  _id: string;
  userId: string;
  idea: string;
  tone: string;
  pitch: string;
  createdAt: string;
};

export default function DashboardPage() {
  const [businessIdea, setBusinessIdea] = useState("");
  const [pitchTone, setPitchTone] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState<GeneratedPitch | null>(
    null
  );
  const [recentPitches, setRecentPitches] = useState<SavedPitch[]>([]);
  const [isLoadingPitches, setIsLoadingPitches] = useState(true);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const supabase = createClient();

  // Fetch recent pitches on component mount
  useEffect(() => {
    fetchRecentPitches();
  }, []);

  const fetchRecentPitches = async () => {
    try {
      const response = await fetch("/api/pitches");
      if (response.ok) {
        const data = await response.json();
        setRecentPitches(data.pitches.slice(0, 3)); // Show only 3 most recent
      }
    } catch (error) {
      console.error("Error fetching pitches:", error);
    } finally {
      setIsLoadingPitches(false);
    }
  };

  const handleGeneratePitch = async () => {
    if (!businessIdea.trim()) {
      toast.error("Please describe your business idea first.");
      return;
    }

    if (!pitchTone) {
      toast.error("Please select a pitch tone.");
      return;
    }

    setIsGenerating(true);
    setGeneratedPitch(null);

    try {
      const response = await fetch("/api/pitches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea_description: businessIdea,
          tone: pitchTone,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate pitch");
      }

      const data = await response.json();
      setGeneratedPitch(data);

      // Refresh recent pitches
      fetchRecentPitches();

      toast.success("Pitch generated successfully!");
    } catch (error) {
      console.error("Error generating pitch:", error);
      toast.error("Failed to generate pitch. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setBusinessIdea("");
    setPitchTone("");
    setGeneratedPitch(null);
  };

  const deletePitch = async (pitchId: string) => {
    setDeletingIds((prev) => new Set(prev).add(pitchId));

    try {
      const response = await fetch(`/api/pitches/${pitchId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRecentPitches((prev) =>
          prev.filter((pitch) => pitch._id !== pitchId)
        );
        toast.success("Pitch deleted successfully");
      } else {
        toast.error("Failed to delete pitch");
      }
    } catch (error) {
      console.error("Error deleting pitch:", error);
      toast.error("Failed to delete pitch");
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(pitchId);
        return newSet;
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Pitch copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy to clipboard.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col flex-1 p-4 md:p-6">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      {/* Generate Pitch Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create Your AI-Powered Pitch</CardTitle>
          <CardDescription>
            Describe your idea and let AI craft the perfect pitch for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="business-idea">Your Business Idea</Label>
            <Textarea
              id="business-idea"
              placeholder="Describe your business idea, target market, problem you're solving, and unique value proposition..."
              rows={6}
              value={businessIdea}
              onChange={(e) => setBusinessIdea(e.target.value)}
              disabled={isGenerating}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pitch-tone">Pitch Tone</Label>
            <Select
              value={pitchTone}
              onValueChange={setPitchTone}
              disabled={isGenerating}
            >
              <SelectTrigger id="pitch-tone">
                <SelectValue placeholder="Select a tone..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional tone</SelectItem>
                <SelectItem value="investor-focused">
                  Investor-focused tone
                </SelectItem>
                <SelectItem value="technical">Technical tone</SelectItem>
                <SelectItem value="casual">Casual tone</SelectItem>
                <SelectItem value="friendly">Friendly tone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={isGenerating}
            >
              Clear
            </Button>
            <Button onClick={handleGeneratePitch} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Pitch"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Pitch Display */}
      {(isGenerating || generatedPitch) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generated Pitch</CardTitle>
            <CardDescription>Your AI-generated pitch is ready!</CardDescription>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Generating your perfect pitch...
                  </p>
                </div>
              </div>
            ) : generatedPitch ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {generatedPitch.idea}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {generatedPitch.tone} tone
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(generatedPitch.pitch)}
                    className="w-8 h-8"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="sr-only">Copy pitch</span>
                  </Button>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {generatedPitch.pitch}
                  </p>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* Recent Pitches Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Pitches</CardTitle>
          <CardDescription>Your previously generated pitches</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {isLoadingPitches ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : recentPitches.length > 0 ? (
            recentPitches.map((pitch) => (
              <div
                key={pitch._id}
                className="border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{pitch.idea}</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => copyToClipboard(pitch.pitch)}
                    >
                      <Copy className="w-4 h-4" />
                      <span className="sr-only">Copy pitch</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deletePitch(pitch._id)}
                      disabled={deletingIds.has(pitch._id)}
                      className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      {deletingIds.has(pitch._id) ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      <span className="sr-only">Delete pitch</span>
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground capitalize">
                  {pitch.tone} tone &bull; Generated on{" "}
                  {formatDate(pitch.createdAt)}
                </p>
                <p className="mt-2 text-sm line-clamp-2">
                  {pitch.pitch.substring(0, 150)}...
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No pitches generated yet.
            </p>
          )}

          {recentPitches.length > 0 && (
            <div className="flex justify-end">
              <Link
                href="/dashboard/history"
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View All History
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
