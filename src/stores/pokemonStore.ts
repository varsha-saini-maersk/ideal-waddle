import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

interface Pokemon {
  name: string
  height: number
  weight: number
  abilities: Array<{ ability: { name: string } }>
  [key: string]: any // To handle additional properties
}

interface PokemonList {
  count: number
  next: string | null
  previous: string | null
  results: Array<{ name: string; url: string }>
}

export const usePokemonStore = defineStore('pokemonStore', () => {
  const route = useRoute()
  const filtersApplied = ref({
    sortedBy: route.query.sortedBy?.toString() || '',
    searchStr: route.query.searchStr?.toString() || '',
  })

  const data = ref<Pokemon[]>([])
  const filteredData = ref<Pokemon[]>([])
  const loading = ref(false)
  const totalCount = ref(0)
  const nextPage = ref<string | null>(null)
  const prevPage = ref<string | null>(null)
  const recordsPerPage = ref(20) // Default value

  async function getPokemonResults(url?: string): Promise<void> {
    url ??= `https://pokeapi.co/api/v2/pokemon?limit=${recordsPerPage.value}&offset=0`
    loading.value = true
    try {
      const res = await fetch(url)
      const pokemonList: PokemonList = await res.json()
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

  async function fetchDetailedPokemons(pokemonList: PokemonList): Promise<void> {
    const detailPromises = pokemonList.results.map((pokemon) => fetch(pokemon.url))
    const detailResponses = await Promise.all(detailPromises)
    data.value = await Promise.all(detailResponses.map((res) => res.json()))
    filteredData.value = data.value
    setFilterApplied(filtersApplied.value)
  }

  function updateRecordsPerPage(newValue: number): void {
    recordsPerPage.value = newValue
    getPokemonResults()
  }

  function setFilterApplied(params?: { sortedBy?: string; searchStr?: string }): void {
    filtersApplied.value = { ...filtersApplied.value, ...params }
    const { sortedBy, searchStr } = filtersApplied.value
    filteredData.value = data.value
    if (searchStr) {
      filteredData.value = data.value.filter(
        (pokemon: Pokemon) =>
          pokemon.name.includes(searchStr) ||
          pokemon.abilities.some((ability) => ability.ability.name.includes(searchStr)),
      )
    }
    if (sortedBy) {
      filteredData.value = filteredData.value.sort((a: Pokemon, b: Pokemon) => {
        if (sortedBy === 'name') {
          return a.name.localeCompare(b.name)
        }
        if (sortedBy === 'height') {
          return a.height - b.height
        }
        if (sortedBy === 'weight') {
          return a.weight - b.weight
        }
        return 0
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
