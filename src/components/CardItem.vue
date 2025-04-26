<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  abilities: {
    type: Array,
    required: false,
  },
})
</script>
<template>
  <div class="card">
    <img :src="imageUrl" alt="Icon" class="card-img" />
    <div class="card-details">
      <h3>{{ `${name} - ${height}cm / ${weight} pounds` }}</h3>
      <ul>
        <li v-for="(ability, index) in abilities" :key="index">
          {{ ability.ability.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 8px;
  overflow: hidden;
  width: 250px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 10px;
}
.card-img {
  width: 100%;
  object-fit: cover;
}
h3 {
  font-size: 1.2rem;
}

.card-details {
  padding: 10px;
}

@media (max-width: 560px) {
  .card {
    width: 100%;
  }
}
</style>
