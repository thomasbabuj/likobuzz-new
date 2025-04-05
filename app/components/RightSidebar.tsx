"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare } from "lucide-react";

interface TrendingPost {
  id: string;
  title: string;
  imageUrl: string;
  commentCount: number;
  views: number;
  timestamp: string;
}

export function RightSidebar() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement subscription logic
    console.log("Subscribe:", email);
  };

  // Mock data - replace with real data
  const trendingPosts: TrendingPost[] = [
    {
      id: "1",
      title:
        "BLACKPINK Jennie's shy and polite greeting to aespa at 'Billboard Women in Music' draws attention",
      imageUrl:
        "https://www.allkpop.com/upload/2025/03/content/302030/1743381057-2025-03-31-9.png",
      commentCount: 134,
      views: 22665,
      timestamp: "4 hours ago",
    },
    {
      id: "2",
      title:
        "Late f(x) Sulli's brother calls out Kim Soo Hyun's press conference and claims their mother was threatened",
      imageUrl:
        "https://www.allkpop.com/upload/2025/03/content/301719/1743369560-kimsoohyun-sulli.jpg",
      commentCount: 332,
      views: 63446,
      timestamp: "12 hours ago",
    },
    {
      id: "3",
      title: "Singer Younha marries science YouTuber Science Cookie",
      imageUrl:
        "https://www.allkpop.com/upload/2025/03/content/301021/1743344460-kimsoohyun.jpg",
      commentCount: 0,
      views: 3806,
      timestamp: "2 hours ago",
    },
    {
      id: "4",
      title:
        "NiziU shares excitement over Korean comeback with 'Love Line' after 1 year and 5 months",
      imageUrl:
        "https://www.allkpop.com/upload/2025/03/content/301719/1743369560-kimsoohyun-sulli.jpg",
      commentCount: 1,
      views: 1143,
      timestamp: "2 hours ago",
    },
    {
      id: "5",
      title:
        "Kim Soo Hyun to finally speak, will be holding an emergency press conference",
      imageUrl:
        "https://www.allkpop.com/upload/2025/03/content/302030/1743381057-2025-03-31-9.png",
      commentCount: 332,
      views: 63446,
      timestamp: "12 hours ago",
    },
  ];

  return (
    <div className="hidden lg:block w-[300px] space-y-6">
      {/* About Section */}
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold mb-2">About Likobuzz</h3>
        <p className="text-sm text-muted-foreground">
          A fun, public discussion, Q&A, and gossip platform for the Filipino
          community worldwide.
        </p>
      </div>

      {/* Rules Section */}
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold mb-2">Community Rules</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>1. Be respectful to others</li>
          <li>2. No hate speech or bullying</li>
          <li>3. No spam or self-promotion</li>
          <li>4. Keep discussions civil</li>
          <li>5. Follow Filipino community guidelines</li>
        </ul>
      </div>

      {/* Stats Section */}
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold mb-2">Community Stats</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>👥 1.2k Members</p>
          <p>📝 150 Posts today</p>
          <p>🎉 Created Jan 2024</p>
        </div>
      </div>

      {/* Inbox Section */}
      <div className="bg-card border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">LIKOBUZZ IN YOUR INBOX</h2>
        <p className="text-sm text-muted-foreground mb-4">
          THE TOP 10 STORIES DELIVERED DAILY
        </p>
        <form onSubmit={handleSubscribe} className="space-y-2">
          <Input
            type="email"
            placeholder="YOUR EMAIL ADDRESS"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <Button
            type="submit"
            className="w-full bg-[#c91c1c] hover:bg-[#a51717]"
          >
            SUBSCRIBE
          </Button>
        </form>
      </div>

      {/* Trending Posts Section */}
      <div className="bg-card border rounded-lg p-4">
        <Tabs defaultValue="best" className="w-full">
          <TabsList className="w-full bg-muted/50">
            <TabsTrigger
              value="best"
              className="flex-1 data-[state=active]:bg-[#c91c1c] data-[state=active]:text-white"
            >
              BEST
            </TabsTrigger>
            <TabsTrigger
              value="new"
              className="flex-1 data-[state=active]:bg-[#c91c1c] data-[state=active]:text-white"
            >
              NEW
            </TabsTrigger>
            <TabsTrigger
              value="hot"
              className="flex-1 data-[state=active]:bg-[#c91c1c] data-[state=active]:text-white"
            >
              HOT
            </TabsTrigger>
          </TabsList>

          {["best", "new", "hot"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <div className="space-y-4">
                {trendingPosts.map((post) => (
                  <div key={post.id} className="flex gap-3 group">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/post/${post.id}`}>
                        <h3 className="text-sm font-medium leading-tight group-hover:text-[#c91c1c] line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-0.5" />
                          {post.commentCount}
                        </span>
                        <span>•</span>
                        <span>{post.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full hover:bg-[#c91c1c] hover:text-white"
                >
                  Load More
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
