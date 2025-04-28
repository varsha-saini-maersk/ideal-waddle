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
      <div class="card-header">
        <h3>Name :</h3>
        <h3>{{ name }}</h3>
      </div>
      <div class="card-header spacing">
        <h4>Height : {{ height }}cm</h4>
        <h4>Weight : {{ weight }}kg</h4>
      </div>
      <h4>Abilities :<span v-for="(ability, index) in abilities" :key="index">
          {{ ability.ability.name }}&nbsp;{{ index < abilities.length - 1 ? ',' : '' }}</span>
       </h4>

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
  background: aliceblue;
}
.card-header {
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 10px;
}
.spacing {
  justify-content: space-between;
  margin: 5px 0;
}
.card-img {
  width: 100%;
  object-fit: cover;
}
h3 {
  font-size: 1.2rem;
  font-weight: 600;
}
h4,span {
  font-size: 1rem;
  font-weight: 500;
  color: #675d55;
}

.card-details {
  padding: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
}


@media (max-width: 560px) {
  .card {
    width: 100%;
  }
}
</style>
