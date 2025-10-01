/**
 * @buffet/shared-types
 * Shared TypeScript types for all micro-apps
 */

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "admin" | "user"
  createdAt: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: User
  publishedAt: Date
  tags: string[]
  coverImage: string
}

export interface DashboardStats {
  totalUsers: number
  totalRevenue: number
  totalOrders: number
  activeUsers: number
}

export interface ApiResponse<T = any> {
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T = any> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
