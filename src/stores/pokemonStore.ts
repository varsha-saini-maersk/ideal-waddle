import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemonStore', () => {
  const data = ref({})
  const loading = ref(false)

  async function getPokemonResults() {
    loading.value = true
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
      const pokemonList = await res.json()
      const detailPromises = pokemonList.results.map((pokemon) => fetch(pokemon.url))
      const detailResponses = await Promise.all(detailPromises)
      data.value = await Promise.all(detailResponses.map((res) => res.json()))
      console.log('Pokemon data:', data.value)
    } catch (error) {
      console.error('Error fetching Pokemon data:', error)
    } finally {
      loading.value = false
    }
  }
  return { data, getPokemonResults, loading }
})
