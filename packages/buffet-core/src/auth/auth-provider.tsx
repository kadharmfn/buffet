"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthContext {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContext | null>(null)

/**
 * Unified authentication provider for all micro-apps
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      // In production, this would check with your auth provider
      const storedUser = localStorage.getItem("buffet:user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Session check failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock login - replace with real auth
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      setUser(mockUser)
      localStorage.setItem("buffet:user", JSON.stringify(mockUser))

      // Broadcast to other micro-apps
      window.dispatchEvent(
        new CustomEvent("buffet:auth-change", {
          detail: { user: mockUser, type: "login" },
        }),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem("buffet:user")

    window.dispatchEvent(
      new CustomEvent("buffet:auth-change", {
        detail: { user: null, type: "logout" },
      }),
    )
  }

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // Mock signup - replace with real auth
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      setUser(mockUser)
      localStorage.setItem("buffet:user", JSON.stringify(mockUser))

      window.dispatchEvent(
        new CustomEvent("buffet:auth-change", {
          detail: { user: mockUser, type: "signup" },
        }),
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to access authentication state
 */
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}
