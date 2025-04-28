import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import PokemonsWorld from '@/components/PokemonsWorld.vue';
import { createTestingPinia } from '@pinia/testing';
import { usePokemonStore } from '@/stores/pokemonStore';

// Mock useRoute
vi.mock('vue-router', () => ({
  useRoute: () => ({
    query: {
      searchStr: 'shoes',
      sortedBy: 'price_asc',
    }
  }),
  useRouter: () => ({ push: vi.fn() }) // if you also use useRouter
}))

describe('PokemonsWorld.vue', () => {
  it('renders correctly when data is loaded', async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
    });
    const pokemonStore = usePokemonStore();
    pokemonStore.data = [
      {
        name: 'Pikachu',
        height: 4,
        weight: 60,
        abilities: [
          { ability: { name: 'static' } },
          { ability: { name: 'lightning-rod' } },
        ],
        sprites: {
          other: {
            'official-artwork': {
              front_default: 'pikachu.png',
            },
          },
        },
      },
    ];
    pokemonStore.loading = false;

    const wrapper = mount(PokemonsWorld, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.find('.header').text()).toBe('Pokémons World');
    expect(pokemonStore.getPokemonResults).toHaveBeenCalled();
  });

});
