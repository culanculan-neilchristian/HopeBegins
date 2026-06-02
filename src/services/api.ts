import { config } from '@/config';

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type AuthContext = 'admin' | 'carrier';

let refreshPromise: Promise<string | null> | null = null;

function getAuthContext(headers: Record<string, string>): AuthContext | null {
  const authorization = headers.Authorization || headers.authorization;
  if (!authorization?.startsWith('Bearer ')) return null;

  const token = authorization.replace('Bearer ', '');

  if (token === localStorage.getItem('adminToken')) return 'admin';
  if (token === localStorage.getItem('carrierToken')) return 'carrier';

  return null;
}

function clearStoredAuth(context: AuthContext) {
  if (context === 'admin') {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRefreshToken');
    localStorage.removeItem('adminUser');
    return;
  }

  localStorage.removeItem('carrierToken');
  localStorage.removeItem('carrierRefreshToken');
  localStorage.removeItem('carrierUser');
}

function getRefreshToken(context: AuthContext) {
  return localStorage.getItem(
    context === 'admin' ? 'adminRefreshToken' : 'carrierRefreshToken'
  );
}

function saveAccessToken(context: AuthContext, accessToken: string) {
  localStorage.setItem(
    context === 'admin' ? 'adminToken' : 'carrierToken',
    accessToken
  );
}

function redirectToLogin(context: AuthContext) {
  if (typeof window === 'undefined') return;

  const loginPath = context === 'admin' ? '/admin/login' : '/login/carrier';
  if (window.location.pathname !== loginPath) {
    window.location.assign(loginPath);
  }
}

async function refreshAccessToken(context: AuthContext) {
  const refreshToken = getRefreshToken(context);
  if (!refreshToken) return null;

  refreshPromise ??= fetch(`${config.API_URL}/users/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  })
    .then(async (response) => {
      if (!response.ok) return null;

      const data = await response.json();
      const accessToken = data?.access;

      if (!accessToken) return null;

      saveAccessToken(context, accessToken);
      return accessToken;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  const authContext =
    typeof window === 'undefined' ? null : getAuthContext(headers);

  // Only set Content-Type to JSON if it's not FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  let response = await fetch(url, {
    ...options,
    headers,
  });

  if (
    response.status === 401 &&
    authContext &&
    !url.includes('/token/refresh/')
  ) {
    const newAccessToken = await refreshAccessToken(authContext);

    if (newAccessToken) {
      headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, {
        ...options,
        headers,
      });
    } else {
      clearStoredAuth(authContext);
      redirectToLogin(authContext);
    }
  }

  // Handle empty responses (204 No Content, 205 Reset Content)
  if (response.status === 204 || response.status === 205) {
    if (!response.ok) {
      throw new Error('An error occurred');
    }
    return null;
  }

  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    // If not valid JSON, treat text as the message or return null
    data = text ? { message: text } : null;
  }

  if (!response.ok) {
    let errorMessage =
      data?.message ||
      data?.detail ||
      (typeof data?.data === 'string' ? data.data : null) ||
      'Something went wrong';

    // If message is generic and there are field-specific errors in data.data
    if (
      (errorMessage === 'error' || errorMessage === 'Bad Request') &&
      data?.data &&
      typeof data.data === 'object'
    ) {
      const firstField = Object.keys(data.data)[0];
      const fieldError = data.data[firstField];
      if (Array.isArray(fieldError)) {
        errorMessage = fieldError[0];
      } else if (typeof fieldError === 'string') {
        errorMessage = fieldError;
      }
    }

    throw new ApiError(errorMessage, response.status);
  }

  // If the response follows the standardized format, extract the data payload
  if (data && typeof data === 'object' && 'status' in data && 'data' in data) {
    return data.data;
  }

  return data;
}
