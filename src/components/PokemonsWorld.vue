<script setup lang="ts">
import { onMounted } from 'vue'
import CardItem from './CardItem.vue'
import { usePokemonStore } from '../stores/pokemonStore'
import RecordsPerPageSelector from './RecordsPerPageSelector.vue'
import PreviousNext from './PreviousNext.vue'
import FilterOptions from './FilterOptions.vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const pokemonStore = usePokemonStore()

onMounted(async () => {
  await pokemonStore.getPokemonResults()
})
function openSelectedPokemon(pokemon: any) {
  router.push({
    name: 'detail',
    params: { id: pokemon.id },
  })
  pokemonStore.setSelectedPokemon(pokemon)
}
</script>

<template>
  <div class="greetings">
    <h1 class="header">Pokémons World</h1>
    <div class="loading" v-if="pokemonStore.loading">
      <img src="../assets/loading.gif" alt="Loading..." />
    </div>

    <template v-if="!pokemonStore.loading">
      <div class="filter-section"><FilterOptions /> <RecordsPerPageSelector /></div>
      <template v-if="pokemonStore.filteredData.length === 0">
        <h2>No Pokémon found</h2>
      </template>
      <template v-else-if="pokemonStore.filteredData.length > 0">
        <PreviousNext />
        <div class="card-container">
          <CardItem
            v-for="(pokemon, index) in pokemonStore.filteredData || []"
            :key="index"
            :image-url="pokemon.sprites.other['official-artwork']['front_default']"
            :name="pokemon.name"
            :height="pokemon.height"
            :weight="pokemon.weight"
            :abilities="pokemon.abilities"
            @click="openSelectedPokemon(pokemon)"
          />
        </div>
        <PreviousNext />
      </template>
    </template>
  </div>
</template>

<style scoped>
.header {
  font-size: 2.5rem;
  font-weight: 600;
  color: #eedfdf;
  text-align: center;
  margin-top: 20px;
  background-color: #518aa7;
}
.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.loading img {
  width: 200px;
}
.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  background: antiquewhite;
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    align-items: start;
  }
}
</style>
