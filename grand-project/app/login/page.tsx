"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { Loader } from "@/components/loader";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      {loading ? (
        <Loader />
      ) : (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <Lightbulb className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to generate amazing pitches
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <Button type="submit" className="w-full">
              Send Magic Link
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link
                href="#"
                className="font-medium underline hover:text-primary"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
