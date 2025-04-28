"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code, ExternalLink, Newspaper, TrendingUp, Users, Zap, User, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase"; // Import Firebase auth
import { signOut } from "firebase/auth"; // Import signOut function
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Home() {
  const router = useRouter();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Stay on homepage after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Professional sloping gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900 -z-10"></div>
      
      {/* Subtle diagonal accent */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] right-0 w-[80%] h-[50%] bg-gradient-to-b from-blue-500/10 to-transparent transform rotate-12 blur-3xl"></div>
        <div className="absolute top-[40%] -left-[10%] w-[60%] h-[30%] bg-gradient-to-tr from-cyan-500/10 to-transparent transform -rotate-12 blur-3xl"></div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/70 border-b border-white/5 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white hover:text-blue-300 transition">
              TechSphere
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link href="/articles" className="text-sm text-gray-300 hover:text-white">Articles</Link>
              <Link href="/topics" className="text-sm text-gray-300 hover:text-white">Topics</Link>
              <Link href="/about" className="text-sm text-gray-300 hover:text-white">About</Link>
            </div>
          </div>
          
          {/* User Icon/Profile Area */}
          <div>
            {loading ? (
              // Loading state
              <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse"></div>
            ) : user ? (
              // User is logged in - Show profile dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-full px-4 py-2">
                    {user.photoURL ? (
                      <Image 
                        src={user.photoURL}
                        alt="Profile"
                        width={20} 
                        height={20} 
                        className="rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <span>{user.displayName || 'User'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-800 border border-white/10">
                  <DropdownMenuLabel className="text-gray-200">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    className="cursor-pointer text-gray-200 hover:bg-slate-700 focus:bg-slate-700"
                    onClick={() => router.push('/profile')}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer text-gray-200 hover:bg-slate-700 focus:bg-slate-700"
                    onClick={() => router.push('/dashboard')}
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer text-gray-200 hover:bg-slate-700 focus:bg-slate-700"
                    onClick={() => router.push('/blog')}
                  >
                    Create Article
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-300 hover:bg-red-900/30 focus:bg-red-900/30" 
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // User is not logged in - Show login button
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-full px-4 py-2"
                onClick={() => router.push('/login')}
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - Simplified and professional */}
      <header className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8">
          <div className="flex items-center justify-center mb-6">
            <span className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-900/30 rounded-full">
              Developer Community
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-white leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">TechSphere</span>
          </h1>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Your gateway to the future of technology. Share your insights, discover breakthrough innovations, and join a community of tech enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={() => user ? router.push('/blog') : router.push('/login')}
            >
              Start Writing <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
              onClick={() => router.push('/articles')}
            >
              Explore Articles
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section - More professional */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Why Choose TechSphere</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our platform is designed to inspire and connect tech enthusiasts through quality content and community engagement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4 bg-slate-800/50 border-slate-700 text-white">
              <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Cutting-edge Topics</h3>
              <p className="text-gray-300">
                Explore the latest in AI, blockchain, quantum computing, and more.
              </p>
            </Card>
            <Card className="p-6 space-y-4 bg-slate-800/50 border-slate-700 text-white">
              <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <Newspaper className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Quality Content</h3>
              <p className="text-gray-300">
                Curated articles from tech experts and enthusiasts worldwide.
              </p>
            </Card>
            <Card className="p-6 space-y-4 bg-slate-800/50 border-slate-700 text-white">
              <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Growing Community</h3>
              <p className="text-gray-300">
                Join thousands of tech professionals and enthusiasts.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Popular Topics</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore articles across various technology domains
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Artificial Intelligence', 'Web Development', 'Cybersecurity', 'Cloud Computing', 
              'Mobile Development', 'DevOps', 'Data Science', 'Blockchain'].map((topic) => (
              <Card key={topic} className="flex items-center justify-center p-4 text-center bg-slate-800/50 hover:bg-slate-700/70 transition-colors cursor-pointer border-slate-700">
                <p className="font-medium text-white">{topic}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-gradient-to-r from-blue-900/40 to-slate-800/80 p-8 md:p-12 rounded-lg shadow-xl border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">Ready to contribute?</h2>
              <p className="mt-4 text-gray-300">
                Share your knowledge and insights with our growing tech community
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="/signup">Create an Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-500 text-gray-300 hover:bg-gray-800" asChild>
                <Link href="/articles">Browse Articles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">TechSphere</h3>
              <p className="text-gray-400">
                A modern platform for tech enthusiasts and professionals to share knowledge and ideas.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/articles" className="text-gray-400 hover:text-white">Articles</Link></li>
                <li><Link href="/topics" className="text-gray-400 hover:text-white">Topics</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <ExternalLink className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">GitHub</span>
                  <Code className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Discord</span>
                  <Users className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} TechSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Create Button - Only show if user is not logged in */}
      {!loading && !user && (
        <Button
          className="fixed bottom-8 right-8 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
          onClick={() => router.push('/login')}
        >
          <LogIn className="h-5 w-5 mr-2" />
          Sign In to Write
        </Button>
      )}
      
      {/* Floating Create Button - Only show if user is logged in */}
      {!loading && user && (
        <Button
          className="fixed bottom-8 right-8 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
          asChild
        >
          <Link href="/blog">
            <Zap className="h-5 w-5 mr-2" />
            Write Article
          </Link>
        </Button>
      )}
    </div>
  );
}