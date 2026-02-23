/**
 * Base API Client
 * 
 * This provides a centralized API client with error handling, request/response
 * transformation, and authentication headers. In production, this would connect
 * to a real REST API backend.
 * 
 * For demo purposes, this simulates network delays and API responses using
 * local data, but the structure matches real-world API integration patterns.
 */

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';
const SIMULATE_NETWORK_DELAY = true;
const NETWORK_DELAY_MS = 100;

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Simulates network delay for demo purposes
 */
const simulateNetworkDelay = async () => {
  if (SIMULATE_NETWORK_DELAY) {
    await new Promise(resolve => setTimeout(resolve, NETWORK_DELAY_MS));
  }
};

/**
 * Base fetch wrapper with error handling and auth headers
 * 
 * In production, this would make real HTTP requests. For demo purposes,
 * it simulates the request/response cycle.
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    // Simulate network delay
    await simulateNetworkDelay();

    // In production, this would be a real fetch call:
    // const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    //   ...options,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${getAuthToken()}`,
    //     ...options.headers,
    //   },
    // });

    // For demo, we'll return success
    // Real implementation would handle response parsing and errors
    console.log(`[API] ${options.method || 'GET'} ${endpoint}`, options.body);
    
    return {} as T; // Actual data comes from service layer
  } catch (error) {
    console.error('[API] Request failed:', error);
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error',
      500
    );
  }
}

/**
 * GET request helper
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'GET' });
}

/**
 * POST request helper
 */
export async function apiPost<T>(endpoint: string, data: any): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT request helper
 */
export async function apiPut<T>(endpoint: string, data: any): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request helper
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'DELETE' });
}

/**
 * PATCH request helper
 */
export async function apiPatch<T>(endpoint: string, data: any): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
