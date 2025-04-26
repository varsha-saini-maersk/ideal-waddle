<script setup lang="ts">
import { usePokemonStore } from '../stores/pokemonStore'

const pokemonStore = usePokemonStore()

const handlePreviousPage = () => {
  if (pokemonStore.prevPage) {
    pokemonStore.getPokemonResults(pokemonStore.prevPage)
  }
}
const handleNextPage = () => {
  if (pokemonStore.nextPage) {
    pokemonStore.getPokemonResults(pokemonStore.nextPage)
  }
}
</script>

<template>
  <div class="button-container">
    <button class="previous-button" @click="handlePreviousPage" :disabled="!pokemonStore.prevPage">
      Previous
    </button>
    <button class="next-button" @click="handleNextPage" :disabled="!pokemonStore.nextPage">
      Next
    </button>
  </div>
</template>

<style scoped>
.button-container button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  width: 100px;
}

.previous-button:disabled,
.next-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.previous-button:hover:not(:disabled),
.next-button:hover:not(:disabled) {
  background-color: #0056b3;
}

@media (min-width: 1024px) {
}
</style>
