"use client"

import { Component, type ReactNode } from "react"
import { AlertCircle } from "lucide-react"

interface Props {
  name: string
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

/**
 * Error boundary for remote applications
 * Prevents one micro-app from crashing the entire host
 */
export class RemoteAppBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error(`Error in remote app ${this.props.name}:`, error, errorInfo)

    // Send to monitoring service
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("buffet:remote-error", {
          detail: { name: this.props.name, error, errorInfo },
        }),
      )
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] p-8">
          <div className="max-w-md w-full bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Application Error</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The {this.props.name} application encountered an error and couldn't load.
                </p>
                <button
                  onClick={() => this.setState({ hasError: false })}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
