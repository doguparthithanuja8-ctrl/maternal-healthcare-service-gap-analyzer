import { fetchWithFallback } from './api.js';
import { getAllServiceGaps } from '../data/appDataset.js';

export async function getServiceGaps(priorityFilter = 'ALL') {
  const allGaps = getAllServiceGaps();
  const filtered =
    priorityFilter === 'ALL'
      ? allGaps
      : allGaps.filter((g) => g.priority.toLowerCase().includes(priorityFilter.toLowerCase()));

  return fetchWithFallback(`/gaps?priority=${priorityFilter}`, filtered);
}
