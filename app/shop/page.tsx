"use client"

import { AppShell } from "@buffet/shared-ui"
import { useState } from "react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Star } from "lucide-react"
import { useSharedState } from "@buffet/core"
import { formatCurrency } from "@buffet/shared-utils"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    category: "Electronics",
    rating: 4.5,
    image: "/wireless-headphones.png",
    stock: 24,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    category: "Electronics",
    rating: 4.8,
    image: "/smartwatch-lifestyle.png",
    stock: 15,
  },
  {
    id: 3,
    name: "Laptop Backpack",
    price: 49.99,
    category: "Accessories",
    rating: 4.3,
    image: "/laptop-backpack.png",
    stock: 42,
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 159.99,
    category: "Electronics",
    rating: 4.7,
    image: "/mechanical-keyboard.png",
    stock: 18,
  },
  {
    id: 5,
    name: "Desk Lamp",
    price: 39.99,
    category: "Home",
    rating: 4.4,
    image: "/modern-desk-lamp.png",
    stock: 31,
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 59.99,
    category: "Electronics",
    rating: 4.6,
    image: "/wireless-mouse.png",
    stock: 27,
  },
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useSharedState<any[]>("cart")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(products.map((p) => p.category)))

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: (typeof products)[0]) => {
    const currentCart = cart || []
    const existingItem = currentCart.find((item) => item.id === product.id)

    if (existingItem) {
      setCart(currentCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...currentCart, { ...product, quantity: 1 }])
    }
  }

  const cartItemCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0)

  return (
    <AppShell>
      <div className="container py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Shop</h1>
              <p className="text-muted-foreground">Browse our collection of premium products</p>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <ShoppingCart className="w-4 h-4" />
              Cart ({cartItemCount})
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-muted relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3">{product.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span>{product.stock} in stock</span>
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <span className="text-2xl font-bold">{formatCurrency(product.price)}</span>
                <Button onClick={() => addToCart(product)} className="gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found matching your criteria</p>
          </div>
        )}
      </div>
    </AppShell>
  )
}
