<script setup lang="ts">
import { onMounted } from 'vue'
import CardItem from './CardItem.vue'
import { usePokemonStore } from '../stores/pokemonStore'

const pokemonStore = usePokemonStore()

onMounted(async () => {
  await pokemonStore.getPokemonResults()
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">Pokémons World</h1>
    <div class="card-container" v-if="!pokemonStore.loading">
      <CardItem
        v-for="(pokemon, index) in pokemonStore.data || []"
        :key="index"
        :image-url="pokemon.sprites.other['official-artwork']['front_default']"
        :name="pokemon.name"
        :height="pokemon.height"
        :weight="pokemon.weight"
        :abilities="pokemon.abilities"
      />
    </div>
  </div>
</template>

<style scoped>
card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

@media (min-width: 1024px) {
}
</style>
