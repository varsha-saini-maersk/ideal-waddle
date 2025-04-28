import { setActivePinia, createPinia } from 'pinia';
import { usePokemonStore } from '../src/stores/pokemonStore';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { useRoute } from 'vue-router';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

describe('pokemonStore', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.mocked(useRoute).mockReturnValue({
      query: {
        sortedBy: '',
        searchStr: '',
      },
    });
    store = usePokemonStore();
  });

  it('initializes with default values', () => {
    expect(store.data).toEqual([]);
    expect(store.filteredData).toEqual([]);
  });

  it('filters Pokémon by name and abilities', () => {
    store.data = [
      { name: 'bulbasaur', abilities: [{ ability: { name: 'overgrow' } }] },
      { name: 'ivysaur', abilities: [{ ability: { name: 'chlorophyll' } }] },
    ];

    store.setFilterApplied({ searchStr: 'bulb', sortedBy: 'name' });
    expect(store.filteredData.length).toBe(1);
    expect(store.filteredData[0].name).toBe('bulbasaur');

    store.setFilterApplied({ searchStr: 'chlorophyll', sortedBy: 'name' });
    expect(store.filteredData.length).toBe(1);
    expect(store.filteredData[0].name).toBe('ivysaur');
  });

  it('sorts Pokémon by name, height, and weight', () => {
    store.data = [
      { name: 'ivysaur', height: 10, weight: 130 },
      { name: 'bulbasaur', height: 7, weight: 69 },
    ];

    store.setFilterApplied({ searchStr: '', sortedBy: 'name' });
    expect(store.filteredData[0].name).toBe('bulbasaur');

    store.setFilterApplied({ searchStr: '', sortedBy: 'height' });
    expect(store.filteredData[0].height).toBe(7);

    store.setFilterApplied({ searchStr: '', sortedBy: 'weight' });
    expect(store.filteredData[0].weight).toBe(69);
  });
});
