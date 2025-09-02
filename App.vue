<template>
  <div class="game">
    <input v-model="guess" type="text" placeholder="Введите 4 цифры">
    <button @click="checkGuess">Проверить</button>
    <p>Попытки: {{ attempts }}</p>
    <ul>
      <li v-for="result in results">{{ result }}</li>
    </ul>
    <p v-if="won">Вы выиграли!</p>
    <p v-if="lost">Вы проиграли</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      secretNumber: '',
      guess: '',
      attempts: 0,
      maxAttempts: 100,
      results: [],
      won: false,
      lost: false
    }
  },
  methods: {
    generateSecretNumber() {
      this.secretNumber = '';
      for (let i = 0; i < 4; i++) {
        this.secretNumber += Math.floor(Math.random() * 10);
      }
    },
    checkGuess() {
      if (this.won || this.lost) return;

      if (this.guess.length !== 4) {
        alert('Введите ровно 4 цифры');
        return;
      }

      this.attempts++;
      const { bulls, cows } = this.countBullsAndCows(this.guess, this.secretNumber);
      
      this.results.push(`Попытка ${this.attempts}: ${this.guess} - ${bulls} быков, ${cows} коров`);

      if (bulls === 4) {
        this.won = true;
        return;
      }

      if (this.attempts >= this.maxAttempts) {
        this.lost = true;
      }

      this.guess = '';
    },
    countBullsAndCows(guess, secret) {
      let bulls = 0;
      let cows = 0;
      const used = new Array(4).fill(false);
      const guessArray = guess.split('');
      const secretArray = secret.split('');

      for (let i = 0; i < 4; i++) {
        if (guessArray[i] === secretArray[i]) {
          bulls++;
          used[i] = true;
        }
      }
      
      for (let i = 0; i < 4; i++) {
        if (!used[i]) {
          for (let j = 0; j < 4; j++) {
            if (!used[j] && guessArray[i] === secretArray[j]) {
              cows++;
              used[j] = true;
              break;
            }
          }
        }
      }

      return { bulls, cows };
    }
  },
  created() {
    this.generateSecretNumber();
  }
}
</script>

<style scoped>
.game {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}


input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
}
</style>
