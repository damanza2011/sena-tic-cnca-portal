import Fuse from 'fuse.js';
import type { Program, FilterState } from '../types/program';

export function createProgramSearchIndex(programs: Program[]) {
  const options = {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'skills', weight: 0.3 },
      { name: 'category', weight: 0.2 },
      { name: 'summary', weight: 0.2 },
      { name: 'code', weight: 0.1 },
      { name: 'jobRoles', weight: 0.2 },
      { name: 'whatYouLearn', weight: 0.1 }
    ],
    threshold: 0.35,
    ignoreLocation: true,
  };

  return new Fuse(programs, options);
}

export function filterAndSortPrograms(
  programs: Program[],
  filters: FilterState,
  fuseIndex: Fuse<Program>
): Program[] {
  let result = programs;

  // 1. Fuzzy Search
  if (filters.searchQuery.trim().length > 0) {
    const searchResults = fuseIndex.search(filters.searchQuery.trim());
    result = searchResults.map(item => item.item);
  }

  // 2. Level filter
  if (filters.level && filters.level !== 'all') {
    result = result.filter(p => p.level === filters.level);
  }

  // 3. Category filter
  if (filters.category && filters.category !== 'all') {
    result = result.filter(p => p.category === filters.category);
  }

  // 4. Modality filter
  if (filters.modality && filters.modality !== 'all') {
    result = result.filter(p => p.modality === filters.modality);
  }

  // 5. Shift filter
  if (filters.shift && filters.shift !== 'all') {
    result = result.filter(p => p.shift === filters.shift);
  }

  // 6. Only available slots
  if (filters.onlyAvailableSlots) {
    result = result.filter(p => p.availableSlots > 0 && p.status !== 'closed');
  }

  // 7. Sort
  result = [...result].sort((a, b) => {
    if (filters.sortBy === 'featured') {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.availableSlots - a.availableSlots;
    }
    if (filters.sortBy === 'slots') {
      return b.availableSlots - a.availableSlots;
    }
    if (filters.sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return result;
}
