<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'
import { useRoute, useRouter } from 'vue-router'
const pokemonStore = usePokemonStore()
const route = useRoute()
const router = useRouter()

const searchStr = ref(route.query.searchStr || '')
const sortedBy = ref(route.query.sortedBy || '')
// Update URL query without reloading page
const updateQuery = () => {
  router.push({ query: { searchStr: searchStr.value, sortedBy: sortedBy.value } })
}
// Watch for changes in the route query
watch(
  () => route.query,
  () => {
    const query = {
      sortedBy: route.query.sortedBy || '',
      searchStr: route.query.searchStr || '',
    }
    pokemonStore.setFilterApplied(query)
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <label>Sort by category:</label>
    <select v-model="sortedBy" @change="updateQuery">
      <option value="name">Name</option>
      <option value="height">Height</option>
      <option value="weight">Weight</option>
    </select>

    <label>Search By</label>
    <input type="text" v-model="searchStr" @input="updateQuery" placeholder="Search" />
  </div>
</template>

<style scoped>
.main-container {
}
card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

@media (min-width: 1024px) {
}
</style>
