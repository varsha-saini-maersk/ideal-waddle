<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'
import { useRoute, useRouter } from 'vue-router'
const pokemonStore = usePokemonStore()
const route = useRoute()
const router = useRouter()

const searchStr = ref(route.query.searchStr || '')
const sortedBy = ref(route.query.sortedBy || 'Name')
const debounceFn = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
// Update URL query without reloading page
const updateQuery = () => {
  const query = {
    searchStr: searchStr.value || '',
    sortedBy: sortedBy.value || '',
  }
  pokemonStore.setFilterApplied(query)
  router.push({ query: { searchStr: searchStr.value, sortedBy: sortedBy.value } })
}

const debouncedUpdateQuery = debounceFn(updateQuery, 300)
</script>

<template>
  <div class="filter-options">
    <div>
      <label>Sort by category:</label>
      <select v-model="sortedBy" @change="updateQuery">
        <option value="name">Name</option>
        <option value="height">Height</option>
        <option value="weight">Weight</option>
      </select>
    </div>
    <div>
      <label>Search By</label>
      <input type="text" v-model="searchStr" @input="debouncedUpdateQuery" placeholder="Search" />
    </div>
  </div>
</template>

<style scoped>
.filter-options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  gap: 10px;
}
label {
  font-size: 18px;
  font-weight: 600;
  color: #4a4848;
  margin-right: 10px;
}
select,
input {
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid cadetblue;
  background-color: #f0f0f0;
  color: #333;
  font-size: 16px;
}

@media (max-width: 768px) {
  .filter-options {
    flex-direction: column;
    align-items: start;
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
