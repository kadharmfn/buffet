"use client"

import { AppShell } from "@buffet/shared-ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { formatDate } from "@buffet/shared-utils"
import Image from "next/image"

const posts = [
  {
    id: 1,
    title: "Getting Started with Microfront-ends",
    slug: "getting-started-microfront-ends",
    excerpt:
      "Learn the fundamentals of microfront-end architecture and how to build scalable applications with independent teams.",
    content: "",
    author: { name: "Sarah Johnson", avatar: "/avatar-woman.png" },
    publishedAt: new Date("2025-01-15"),
    readTime: 8,
    tags: ["Architecture", "Tutorial"],
    coverImage: "/microfront-end-architecture.jpg",
  },
  {
    id: 2,
    title: "Best Practices for Module Federation",
    slug: "module-federation-best-practices",
    excerpt:
      "Discover proven patterns and anti-patterns when implementing Module Federation in your Next.js applications.",
    content: "",
    author: { name: "Michael Chen", avatar: "/stylized-man-avatar.png" },
    publishedAt: new Date("2025-01-12"),
    readTime: 12,
    tags: ["Best Practices", "Module Federation"],
    coverImage: "/module-federation.jpg",
  },
  {
    id: 3,
    title: "Shared State Management Strategies",
    slug: "shared-state-management",
    excerpt: "Explore different approaches to managing shared state across micro-apps and when to use each pattern.",
    content: "",
    author: { name: "Emily Rodriguez", avatar: "/avatar-woman-2.png" },
    publishedAt: new Date("2025-01-10"),
    readTime: 10,
    tags: ["State Management", "Architecture"],
    coverImage: "/state-management-concept.png",
  },
  {
    id: 4,
    title: "Performance Optimization Tips",
    slug: "performance-optimization",
    excerpt: "Learn how to optimize your microfront-end applications for better load times and user experience.",
    content: "",
    author: { name: "David Kim", avatar: "/avatar-man-2.png" },
    publishedAt: new Date("2025-01-08"),
    readTime: 15,
    tags: ["Performance", "Optimization"],
    coverImage: "/performance-optimization.png",
  },
  {
    id: 5,
    title: "Testing Microfront-end Applications",
    slug: "testing-microfront-ends",
    excerpt: "A comprehensive guide to testing strategies for microfront-end architectures, from unit to E2E tests.",
    content: "",
    author: { name: "Lisa Anderson", avatar: "/avatar-woman-3.png" },
    publishedAt: new Date("2025-01-05"),
    readTime: 14,
    tags: ["Testing", "Quality Assurance"],
    coverImage: "/software-testing-concept.png",
  },
  {
    id: 6,
    title: "Deployment Strategies for Micro-apps",
    slug: "deployment-strategies",
    excerpt: "Master the art of deploying microfront-ends independently while maintaining a cohesive user experience.",
    content: "",
    author: { name: "James Wilson", avatar: "/avatar-man-3.jpg" },
    publishedAt: new Date("2025-01-03"),
    readTime: 11,
    tags: ["Deployment", "DevOps"],
    coverImage: "/deployment-pipeline.jpg",
  },
]

export default function BlogPage() {
  return (
    <AppShell>
      <div className="container py-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Blog</h1>
          <p className="text-xl text-muted-foreground text-balance">
            Insights, tutorials, and best practices for microfront-end architecture
          </p>
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video md:aspect-auto relative">
              <Image
                src={posts[0].coverImage || "/placeholder.svg"}
                alt={posts[0].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <div className="flex gap-2 mb-3">
                {posts[0].tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h2 className="text-3xl font-bold mb-3 text-balance">{posts[0].title}</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">{posts[0].excerpt}</p>
              <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {posts[0].author.name}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(posts[0].publishedAt)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {posts[0].readTime} min read
                </div>
              </div>
              <Button className="gap-2 w-fit">
                Read Article
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* All Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow flex flex-col">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="flex-1">
                <div className="flex gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="line-clamp-2 text-balance">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3 leading-relaxed">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.publishedAt, "short")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {post.readTime} min
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2 group-hover:gap-3 transition-all bg-transparent">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
