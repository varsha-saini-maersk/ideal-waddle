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
    <h1 class="green">Pokémons World</h1>
    <RecordsPerPageSelector v-if="!pokemonStore.loading" />
    <PreviousNext v-if="!pokemonStore.loading" />
    <div class="loading" v-if="pokemonStore.loading">
      <img src="../assets/loading.gif" alt="Loading..." />
    </div>
    <FilterOptions v-if="!pokemonStore.loading" />
    <div class="card-container" v-if="!pokemonStore.loading">
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
    <PreviousNext v-if="!pokemonStore.loading" />
  </div>
</template>

<style scoped>
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
  width: 30%;
  height: 70vh;
}

.loading img {
  width: 200px;
}

@media (min-width: 1024px) {
}
</style>
