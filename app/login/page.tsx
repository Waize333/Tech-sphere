"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { auth, sendVerificationEmail } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Chrome, Facebook, Linkedin } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleSocialLogin = async (provider: any) => {
    try {
      setIsLoading(true);
      setError(null);
      setVerificationSent(false);
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Store the current user in state (useful for resending verification)
      setCurrentUser(user);
      
      // If email is verified, redirect to homepage
      if (user.emailVerified) {
        router.push("/");
      } else {
        // Send verification email if not verified
        await sendVerificationEmail(user);
        setVerificationSent(true);
      }
    } catch (error: any) {
      setError(error.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!currentUser) return;
    
    try {
      setIsLoading(true);
      await sendVerificationEmail(currentUser);
      setVerificationSent(true);
    } catch (error: any) {
      setError(error.message || "Failed to send verification email.");
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
        
        {verificationSent && (
          <Alert className="bg-blue-500/10 border-blue-500/30">
            <AlertDescription>
              <p className="text-blue-200">
                A verification email has been sent to your email address.
                Please check your inbox and verify your email before continuing.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleResendVerification}
                disabled={isLoading}
              >
                Resend Verification Email
              </Button>
            </AlertDescription>
          </Alert>
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