import { fetchWithFallback } from './api.js';
import { getDashboardPayload } from '../data/appDataset.js';

export async function getDashboardData() {
  const fallback = getDashboardPayload();
  return fetchWithFallback('/dashboard', fallback);
}
