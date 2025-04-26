import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemonStore', () => {
  const data = ref([])
  const filteredData = ref([])
  const loading = ref(false)
  const totalCount = ref(0)
  const nextPage = ref(null)
  const prevPage = ref(null)
  const recordsPerPage = ref(20) // Default value

  async function getPokemonResults(url?: string) {
    url ??= `https://pokeapi.co/api/v2/pokemon?limit=${recordsPerPage.value}&offset=0`
    loading.value = true
    try {
      const res = await fetch(url)
      const pokemonList = await res.json()
      totalCount.value = pokemonList.count
      nextPage.value = pokemonList.next
      prevPage.value = pokemonList.previous
      await fetchDetailedPokemons(pokemonList)
    } catch (error) {
      console.error('Error fetching Pokemon data:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchDetailedPokemons(pokemonList) {
    const detailPromises = pokemonList.results.map((pokemon) => fetch(pokemon.url))
    const detailResponses = await Promise.all(detailPromises)
    data.value = await Promise.all(detailResponses.map((res) => res.json()))
    filteredData.value = data.value
  }

  function updateRecordsPerPage(newValue: number) {
    recordsPerPage.value = newValue
    getPokemonResults()
  }

  function setFilterApplied(params: any) {
    const { sortedBy, searchStr } = params
    filteredData.value = data.value
    if (searchStr) {
      filteredData.value = data.value.filter(
        (pokemon: any) =>
          pokemon.name.includes(searchStr) ||
          pokemon.abilities.some((ability: any) => ability.ability.name.includes(searchStr)),
      )
    }
    if (sortedBy) {
      filteredData.value = filteredData.value.sort((a: any, b: any) => {
        if (sortedBy === 'name') {
          return a.name.localeCompare(b.name)
        }
        if (sortedBy === 'height') {
          return a.height - b.height
        }
        if (sortedBy === 'weight') {
          return a.weight - b.weight
        }
      })
    }
  }

  return {
    data,
    getPokemonResults,
    loading,
    totalCount,
    recordsPerPage,
    updateRecordsPerPage,
    nextPage,
    prevPage,
    setFilterApplied,
    filteredData,
  }
})
