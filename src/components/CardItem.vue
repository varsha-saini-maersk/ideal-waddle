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
})
</script>
<template>
  <div class="card">
    <img :src="imageUrl" alt="Icon" class="card-img" />
    <div class="card-details">
      <h3>{{ `${name} - ${height}cm / ${weight} pounds` }}</h3>
      <p>List of abilities</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 250px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.card-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-details {
  padding: 10px;
}

@media (min-width: 1024px) {
}
</style>
