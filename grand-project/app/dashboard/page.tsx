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
import { Copy, Trash2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
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
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pitch-tone">Pitch Tone</Label>
            <Select>
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
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Clear</Button>
            <Button>Generate Pitch</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Pitches Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Pitches</CardTitle>
          <CardDescription>Your previously generated pitches</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {/* Pitch Item 1 */}
          <div className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">EcoClean Solutions</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Copy className="w-4 h-4" />
                  <span className="sr-only">Copy pitch</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Delete pitch</span>
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional tone &bull; Generated on Jan 15, 2025
            </p>
            <p className="mt-2 text-sm">
              Introducing EcoClean Solutions, a revolutionary cleaning service
              that combines cutting-edge technology...
            </p>
          </div>

          {/* Pitch Item 2 */}
          <div className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">FitTrack App</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Copy className="w-4 h-4" />
                  <span className="sr-only">Copy pitch</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Delete pitch</span>
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Investor-focused tone &bull; Generated on Jan 14, 2025
            </p>
            <p className="mt-2 text-sm">
              FitTrack represents a $50M opportunity in the rapidly growing
              fitness technology market...
            </p>
          </div>

          {/* Pitch Item 3 */}
          <div className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Smart Garden System</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Copy className="w-4 h-4" />
                  <span className="sr-only">Copy pitch</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Delete pitch</span>
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Technical tone &bull; Generated on Jan 12, 2025
            </p>
            <p className="mt-2 text-sm">
              Our IoT-enabled smart garden system leverages machine learning
              algorithms to optimize plant growth...
            </p>
          </div>

          <div className="flex justify-end">
            <Link
              href="/dashboard/history"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View All History
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
