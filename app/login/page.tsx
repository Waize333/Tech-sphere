"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Chrome, Facebook, Linkedin } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSocialLogin = async (provider: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome to TechSphere</h1>
          <p className="text-muted-foreground">
            Sign in to share your tech insights with the world
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => handleSocialLogin(new GoogleAuthProvider())}
            disabled={isLoading}
          >
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => handleSocialLogin(new FacebookAuthProvider())}
            disabled={isLoading}
          >
            <Facebook className="mr-2 h-4 w-4" />
            Continue with Facebook
          </Button>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => setError("LinkedIn authentication is coming soon!")}
            disabled={isLoading}
          >
            <Linkedin className="mr-2 h-4 w-4" />
            Continue with LinkedIn
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          By continuing, you agree to TechSphere's Terms of Service and Privacy
          Policy
        </div>
      </Card>
    </div>
  );
}