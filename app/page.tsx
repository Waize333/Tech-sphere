"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code, ExternalLink, Newspaper, TrendingUp, Users, Zap, User, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnimatedGlowDots } from "@/components/animated-background";
import { useState } from "react";
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
  // In a real app, you would use an auth context or similar
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginDialog(false);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#05103a] via-[#0a205c] to-[#04102e] text-white">
      {/* Simple gradient overlay for more depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/20 pointer-events-none"></div>

      {/* Diagonally slashed rectangles pattern */}
      <div
        className="absolute inset-0 bg-pattern pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Top Navigation Bar */}
      <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">TechSphere</span>
          </div>
          
          {/* User Icon/Profile Area */}
          <div>
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-blue-500/20">
                    <User className="h-5 w-5" />
                    <span>John Doe</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background/90 backdrop-blur-md border-white/10">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-blue-500/20"
                  onClick={() => setShowLoginDialog(true)}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </Button>
                
                <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
                  <DialogContent className="bg-gradient-to-br from-[#060d2e] via-[#091c4a] to-[#051028] border border-white/10 shadow-xl text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-blue-100">Sign In</DialogTitle>
                      <DialogDescription className="text-blue-200">
                        Enter your credentials to access your account
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleLogin} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-blue-100">Email</label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="example@email.com" 
                          className="bg-black/30 border-white/10 text-white placeholder:text-blue-300/50 focus:border-blue-400/50 focus:ring-blue-400/20" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-blue-100">Password</label>
                        <Input 
                          id="password" 
                          type="password" 
                          placeholder="••••••••" 
                          className="bg-black/30 border-white/10 text-white placeholder:text-blue-300/50 focus:border-blue-400/50 focus:ring-blue-400/20" 
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <a href="#" className="text-sm text-blue-300 hover:text-blue-200">Forgot password?</a>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
                      </div>
                    </form>
                    
                    <div className="mt-4 text-center">
                      <p className="text-sm text-blue-200">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-blue-300 hover:text-blue-200 font-medium">
                          Sign up
                        </a>
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden pt-10 pb-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-8">
          <div className="flex items-center justify-center mb-6">
            <span className="px-3 py-1 text-xs font-medium text-white bg-primary/20 rounded-full backdrop-blur-sm">
              Tech Blog Platform
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-200 leading-tight">
            Welcome to TechSphere
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Your gateway to the future of technology. Share your insights, discover breakthrough innovations, and join a community of tech enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Buttons */}
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="relative py-20 bg-black/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Why Choose TechSphere</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our platform is designed to inspire and connect tech enthusiasts through quality content and community engagement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4 bg-black/20 backdrop-blur border-primary/5 shadow-lg text-white">
              <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">Cutting-edge Topics</h3>
              <p className="text-blue-100">
                Explore the latest in AI, blockchain, quantum computing, and more.
              </p>
            </Card>
            <Card className="p-6 space-y-4 bg-black/20 backdrop-blur border-primary/5 shadow-lg text-white">
              <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Newspaper className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">Quality Content</h3>
              <p className="text-blue-100">
                Curated articles from tech experts and enthusiasts worldwide.
              </p>
            </Card>
            <Card className="p-6 space-y-4 bg-black/20 backdrop-blur border-primary/5 shadow-lg text-white">
              <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">Growing Community</h3>
              <p className="text-blue-100">
                Join thousands of tech professionals and enthusiasts.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Popular Topics</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Explore articles across various technology domains
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Artificial Intelligence', 'Web Development', 'Cybersecurity', 'Cloud Computing', 
              'Mobile Development', 'DevOps', 'Data Science', 'Blockchain'].map((topic) => (
              <Card key={topic} className="flex items-center justify-center p-4 text-center bg-background/40 backdrop-blur-sm hover:bg-blue-500/10 transition-colors cursor-pointer">
                <p className="font-medium text-white">{topic}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-white/5 z-0" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-background/40 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-xl border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">Ready to contribute?</h2>
              <p className="mt-4 text-gray-200">
                Share your knowledge and insights with our growing tech community
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white" asChild>
                <Link href="/signup">Create an Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/80 text-gray-600 border-white/40 hover:bg-white/10" asChild>
                <Link href="/articles">Browse Articles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background/10 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">TechSphere</h3>
              <p className="text-blue-100">
                A modern platform for tech enthusiasts and professionals to share knowledge and ideas.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/articles" className="text-blue-200 hover:text-white">Articles</Link></li>
                <li><Link href="/topics" className="text-blue-200 hover:text-white">Topics</Link></li>
                <li><Link href="/about" className="text-blue-200 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-blue-200 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-blue-200 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <ExternalLink className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-blue-200 hover:text-white">
                  <span className="sr-only">GitHub</span>
                  <Code className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-blue-200 hover:text-white">
                  <span className="sr-only">Discord</span>
                  <Users className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-blue-200">
            <p>© {new Date().getFullYear()} TechSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Create Button */}
      <Button
        className="fixed bottom-8 right-8 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 text-white border-white/10"
        size="lg"
        asChild
      >
        <Link href="/blog">
          <Zap className="h-5 w-5 mr-2" />
          Write Article
        </Link>
      </Button>
    </div>
  );
}