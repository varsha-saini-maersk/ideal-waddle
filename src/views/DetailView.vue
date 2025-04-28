<template>
  <div class="pokemon-detail">
    <button @click="goBack" class="back-button">Back</button>
    <div class="content">
      <div class="image-container">
        <img :src="pokemon.image" :alt="pokemon.name" />
      </div>
      <div class="info-container">
        <h1>{{ pokemon.name }}</h1>
        <ul>
          <li v-for="(value, key) in pokemon.details" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemon: {
        name: '',
        image: '',
        details: {},
      },
    }
  },
  async created() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + this.$route.params.id) // Replace with dynamic ID if needed
      const data = await response.json()
      this.pokemon.name = data.name
      this.pokemon.image = data.sprites.other['official-artwork']['front_default']
      this.pokemon.details = {
        height: data.height,
        weight: data.weight,
        base_experience: data.base_experience,
        abilities: data.abilities.map((a) => a.ability.name).join(', '),
      }
    } catch (error) {
      console.error('Failed to fetch Pokémon data:', error)
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style>
.pokemon-detail {
  padding: 20px;
}

.content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.image-container {
  flex: 1;
  max-width: 300px;
  text-align: center;
}

.image-container img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.info-container {
  flex: 2;
  padding: 20px;
}

.info-container h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.info-container ul {
  list-style: none;
  padding: 0;
}

.info-container li {
  margin: 10px 0;
  font-size: 1.2rem;
}

.back-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  .info-container {
    padding: 10px;
  }

  .info-container h1 {
    font-size: 2rem;
  }

  .info-container li {
    font-size: 1rem;
  }
}
</style>
