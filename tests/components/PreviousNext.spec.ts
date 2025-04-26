import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import PreviousNext from '@/components/PreviousNext.vue'
import { createTestingPinia } from '@pinia/testing'

describe.skip('PreviousNext.vue', () => {


  it('calls the correct store method on button click', async () => {
    const mockGetPokemonResults = vi.fn()
    const wrapper = mount(PreviousNext, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            pokemonStore: {
              prevPage: 'prev-url',
              nextPage: 'next-url',
            },
          },
          actions: {
            getPokemonResults: mockGetPokemonResults,
          },    getPokemonResults: mockGetPokemonResults,
          createSpy: vi.fn,
        })],
      },
    })

    await wrapper.find('.previous-button').trigger('click')
    expect(mockGetPokemonResults).toHaveBeenCalledWith('prev-url')

    await wrapper.find('.next-button').trigger('click')
    expect(mockGetPokemonResults).toHaveBeenCalledWith('next-url')
  })

  it('disables buttons when no previous or next page is available', () => {
    const wrapper = mount(PreviousNext, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            pokemonStore: {
              prevPage: null,
              nextPage: null,
            },

          },createSpy: vi.fn,
        })],
      },
    })

    const prevButton = wrapper.find('.previous-button')
    const nextButton = wrapper.find('.next-button')

    expect(prevButton.attributes('disabled')).toBeDefined()
    expect(nextButton.attributes('disabled')).toBeDefined()
  })
})
