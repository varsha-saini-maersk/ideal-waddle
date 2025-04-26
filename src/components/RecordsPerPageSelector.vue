<script setup lang="ts">
import { ref } from 'vue';
import { usePokemonStore } from '../stores/pokemonStore';

const pokemonStore = usePokemonStore();
const options = [10, 20, 50];

const handleChange = (event: Event) => {
  //const selectedValue = parseInt((event.target as HTMLSelectElement).value, 10);
  pokemonStore.updateRecordsPerPage(event.target?.value);
};
</script>

<template>
  <div class="records-selector">
    <label for="records-per-page">Records per page:</label>
    <select id="records-per-page" @change="handleChange" :value="pokemonStore.recordsPerPage">
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<style scoped>
.records-selector {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

label {
  font-weight: bold;
}
</style>
