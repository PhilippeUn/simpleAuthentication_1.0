<template>
  <div class="page">
    <form class="login__form" @submit.prevent="login">
      <div class="card__header">
        <h1>Login</h1>
        <p>Sign in to your account below</p>
      </div>
      <div class="errors">
        <p class="err__message">{{ errorMessage }}</p>
      </div>
      <div class="input__container">
        <input
          id="email"
          v-model="loginData.email"
          type="email"
          aria-describedby="emailHelp"
          placeholder="Email"
        />

        <input
          id="password"
          v-model="loginData.password"
          type="password"
          placeholder="Password"
        />
      </div>

      <button class="btn__accent" type="submit">Sign In</button>
    </form>
    <p class="no__acc">
      Don't have an account?
      <nuxt-link to="/" class="accent">Sign Up</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        email: '',
        password: '',
      },
      errorMessage: '',
    }
  },

  methods: {
    async login() {
      try {
        const res = await this.$auth.loginWith('local', {
          data: this.loginData,
        })

        if (!res.data.success) {
          this.errorMessage = res.data.message
        }
      } catch (err) {}
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  display: grid;
  height: 100vh;
  justify-content: center;
  align-content: center;

  .login__form {
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    padding: 30px;
    width: 425px;
    margin: auto;

    .card__header {
      margin-bottom: 25px;

      h1 {
        color: $primary;
      }

      p {
        margin-top: 5px;
      }
    }

    .errors {
      .err__message {
        color: red;
        font-size: 15px;
        line-height: 22px;
        margin-bottom: 15px;
      }
    }

    .input__container {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      grid-gap: 10px;
      margin-bottom: 25px;

      input {
        width: 100%;
        box-sizing: border-box;
        font-size: 15px;
        border-radius: $smallBorderRadius;
        padding: 15px;
        border: 1px solid rgba($primary, 0.4);
      }

      input:focus {
        outline: none;
        border-color: $accent;
      }
    }
  }

  .accent {
    color: $accent;
  }

  .no__acc {
    text-align: center;
    margin-top: 10px;
    font-size: 15px;
  }
}
</style>