"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Trash2, Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type SavedPitch = {
  _id: string;
  userId: string;
  idea: string;
  tone: string;
  pitch: string;
  createdAt: string;
};

export default function HistoryPage() {
  const [pitches, setPitches] = useState<SavedPitch[]>([]);
  const [filteredPitches, setFilteredPitches] = useState<SavedPitch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [toneFilter, setToneFilter] = useState("all");
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPitches();
  }, []);

  useEffect(() => {
    filterPitches();
  }, [pitches, searchTerm, toneFilter]);

  const fetchPitches = async () => {
    try {
      const response = await fetch("/api/pitches");
      if (response.ok) {
        const data = await response.json();
        setPitches(data.pitches);
      } else {
        toast.error("Failed to fetch pitches");
      }
    } catch (error) {
      console.error("Error fetching pitches:", error);
      toast.error("Failed to fetch pitches");
    } finally {
      setIsLoading(false);
    }
  };

  const filterPitches = () => {
    let filtered = pitches;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (pitch) =>
          pitch.idea.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pitch.pitch.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tone
    if (toneFilter !== "all") {
      filtered = filtered.filter((pitch) => pitch.tone === toneFilter);
    }

    setFilteredPitches(filtered);
  };

  const deletePitch = async (pitchId: string) => {
    setDeletingIds((prev) => new Set(prev).add(pitchId));

    try {
      const response = await fetch(`/api/pitches/${pitchId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPitches((prev) => prev.filter((pitch) => pitch._id !== pitchId));
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getToneOptions = () => {
    const tones = Array.from(new Set(pitches.map((pitch) => pitch.tone)));
    return tones.map((tone) => ({
      value: tone,
      label: `${tone.charAt(0).toUpperCase()}${tone.slice(1)} tone`,
    }));
  };

  return (
    <div className="flex flex-col flex-1 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Pitch History</h1>
        <p className="text-muted-foreground">
          View and manage all your generated pitches
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Search and filter your pitches</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search pitches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <Select value={toneFilter} onValueChange={setToneFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tones</SelectItem>
                {getToneOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredPitches.length}{" "}
            {filteredPitches.length === 1 ? "Pitch" : "Pitches"}
          </CardTitle>
          <CardDescription>
            {searchTerm || toneFilter !== "all"
              ? `Filtered results from ${pitches.length} total pitches`
              : "All your generated pitches"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  Loading your pitches...
                </p>
              </div>
            </div>
          ) : filteredPitches.length > 0 ? (
            <div className="space-y-6">
              {filteredPitches.map((pitch) => (
                <div key={pitch._id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">
                        {pitch.idea}
                      </h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {pitch.tone} tone &bull; Generated on{" "}
                        {formatDate(pitch.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(pitch.pitch)}
                        className="w-8 h-8"
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
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {pitch.pitch}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {searchTerm || toneFilter !== "all"
                  ? "No pitches match your filters."
                  : "No pitches found."}
              </p>
              {(searchTerm || toneFilter !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setToneFilter("all");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
