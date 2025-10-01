/**
 * API utilities
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export async function fetchApi<T = any>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new ApiError(error.message || "API request failed", response.status, error)
    }

    return response.json()
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError("Network error", 0, error)
  }
}

export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value))
    }
  })

  const query = searchParams.toString()
  return query ? `?${query}` : ""
}
