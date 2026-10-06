/**
 * API client: local demonstration data first; optional live backend when enabled.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const BACKEND_ENABLED = import.meta.env.VITE_ENABLE_BACKEND === 'true';

export async function fetchWithFallback(endpoint, fallbackData) {
  if (!BACKEND_ENABLED) {
    return { data: fallbackData, isLive: false, source: 'local' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return { data, isLive: true, source: 'api' };
    }
    return { data: fallbackData, isLive: false, source: 'local', fallbackReason: `HTTP ${response.status}` };
  } catch {
    return { data: fallbackData, isLive: false, source: 'local', fallbackReason: 'Backend unavailable' };
  }
}
