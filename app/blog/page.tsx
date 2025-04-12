"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Editor } from "@/components/editor/rich-text-editor";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { X, ImagePlus, Save, Send } from "lucide-react";

const CATEGORIES = [
  "Artificial Intelligence",
  "Web Development",
  "Cybersecurity",
  "Cloud Computing",
  "Mobile Development",
  "DevOps",
  "Data Science",
  "Blockchain",
  "Other"
];

export default function CreateArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState("Not saved");
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        // Redirect to login if not authenticated
        router.push("/login?redirect=create");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Handle tag addition
  const addTag = () => {
    if (tagInput && !tags.includes(tagInput) && tags.length < 5) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle cover image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverImageUrl(URL.createObjectURL(file));
    }
  };

  // Save as draft
  const saveDraft = async () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please add a title to save your draft.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSaveStatus("Saving...");

    try {
      const articleData = {
        title,
        description,
        content,
        category,
        tags,
        coverImageUrl: "", // In a real app, upload image and get URL
        authorId: user.uid,
        authorName: user.displayName,
        authorPhoto: user.photoURL,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        published: false,
      };

      await addDoc(collection(db, "articles"), articleData);
      
      setSaveStatus("Draft saved");
      toast({
        title: "Draft saved",
        description: "Your article draft has been saved successfully.",
      });
    } catch (error) {
      setSaveStatus("Error saving");
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      });
      console.error("Error saving draft:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Publish article
  const publishArticle = async () => {
    if (!title || !content || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields: title, content, and category.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const articleData = {
        title,
        description,
        content,
        category,
        tags,
        coverImageUrl: "", // In a real app, upload image and get URL
        authorId: user.uid,
        authorName: user.displayName,
        authorPhoto: user.photoURL,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        published: true,
        publishedAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, "articles"), articleData);
      
      toast({
        title: "Published!",
        description: "Your article has been published successfully.",
      });
      
      // Redirect to the published article
      router.push(`/articles/${docRef.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish article. Please try again.",
        variant: "destructive",
      });
      console.error("Error publishing article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05103a] via-[#0a205c] to-[#04102e] text-white py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Create Article</h1>
              <p className="text-blue-200">Share your tech knowledge with the community</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-blue-200">{saveStatus}</span>
              <Button 
                variant="outline" 
                onClick={saveDraft} 
                disabled={isLoading}
                className="border-blue-400 text-blue-500"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button 
                onClick={publishArticle} 
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Send className="mr-2 h-4 w-4" />
                Publish
              </Button>
            </div>
          </div>

          {/* Article Form */}
          <Card className="bg-black/20 backdrop-blur border-white/10 p-6 text-white">
            <Tabs defaultValue="write" className="space-y-6">
              <TabsList className="bg-black/20 text-blue-200">
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="write" className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-blue-200">Title *</Label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter an engaging title"
                    className="bg-white/5 border-white/10 placeholder:text-gray-400 text-white"
                  />
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-blue-200">Description</Label>
                  <Textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Write a brief summary of your article (optional)"
                    className="bg-white/5 border-white/10 placeholder:text-gray-400 text-white"
                    rows={3}
                  />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <Label className="text-blue-200">Cover Image</Label>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('cover-image')?.click()}
                      className="border-blue-400 text-blue-500"
                    >
                      <ImagePlus className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                    <input
                      id="cover-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {coverImageUrl && (
                      <div className="relative">
                        <img 
                          src={coverImageUrl} 
                          alt="Cover preview" 
                          className="h-16 w-24 object-cover rounded"
                        />
                        <button 
                          onClick={() => {
                            setCoverImage(null);
                            setCoverImageUrl("");
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-blue-200">
                    Category *
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      if (value === "Other") {
                        setIsModalOpen(true); // Open the modal
                      } else {
                        setCategory(value); // Set the selected category
                      }
                    }}
                    value={category}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a205c] border-white/10 text-white">
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Modal for custom category */}
                  {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                      <div className="bg-[#0a205c] p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold text-white mb-4">Specify Category</h2>
                        <Input
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                          placeholder="Enter your category"
                          className="bg-white/5 border-white/10 placeholder:text-gray-400 text-white mb-4"
                        />
                        <div className="flex justify-end space-x-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsModalOpen(false); // Close the modal
                              setCustomCategory(""); // Reset the input
                            }}
                            className="border-white/10 text-blue-500"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              setCategory(customCategory); // Set the custom category
                              setIsModalOpen(false); // Close the modal
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-blue-200">Tags (max 5)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <Badge key={tag} className="bg-blue-500 hover:bg-blue-600 text-white">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input 
                      id="tags" 
                      value={tagInput} 
                      onChange={(e) => setTagInput(e.target.value)} 
                      placeholder="Add a tag"
                      className="bg-white/5 border-white/10 placeholder:text-gray-400 text-white"
                      onKeyDown={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button 
                      onClick={addTag} 
                      disabled={!tagInput || tags.length >= 5}
                      variant="secondary"
                      className="<text-blue-5></text-blue-500"
                    >
                      Add
                    </Button>
                  </div>
                </div>

                {/* Content Editor */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-blue-200">Content *</Label>
                  <div className="min-h-[400px] border border-white/10 rounded-md overflow-hidden">
                    <Editor 
                      initialContent="" 
                      onChange={setContent} 
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-6">
                {/* Article Preview */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 min-h-[400px] text-white">
                  {title ? (
                    <h1 className="text-3xl font-bold mb-4">{title}</h1>
                  ) : (
                    <p className="text-gray-400">Add a title to see preview</p>
                  )}
                  
                  {coverImageUrl && (
                    <div className="my-4">
                      <img 
                        src={coverImageUrl} 
                        alt="Cover" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  {description && (
                    <p className="text-lg text-blue-100 mb-4">{description}</p>
                  )}
                  
                  {content ? (
                    <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
                  ) : (
                    <p className="text-gray-400">Start writing in the editor to see preview</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}