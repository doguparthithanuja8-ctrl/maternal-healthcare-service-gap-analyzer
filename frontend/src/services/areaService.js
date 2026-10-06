import { fetchWithFallback } from './api.js';
import {
  getAreaSummaries,
  getAreaById as getLocalAreaById,
  compareAreasPayload,
} from '../data/appDataset.js';

export async function getAreas() {
  return fetchWithFallback('/areas', getAreaSummaries());
}

export async function getAreaById(id) {
  return fetchWithFallback(`/areas/${id}`, getLocalAreaById(id));
}

export async function compareAreas(idA, idB) {
  return fetchWithFallback(`/compare?areaA=${idA}&areaB=${idB}`, compareAreasPayload(idA, idB));
}
