<script setup lang="ts">
import { ref } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'

const pokemonStore = usePokemonStore()
const options = [10, 20, 50]

const handleChange = (event: Event) => {
  pokemonStore.updateRecordsPerPage(event.target?.value)
}
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
  font-size: 18px;
  font-weight: 600;
  color: #4a4848;
  margin-right: 10px;
}
select {
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid cadetblue;
  background-color: #f0f0f0;
  color: #333;
  font-size: 16px;
}

@media (max-width: 768px) {
  .records-selector {
    gap: unset;
    margin: 0;
  }
  label {
    font-size: 15px;
  }
  select,
  input {
    font-size: 15px;
  }
}
</style>
