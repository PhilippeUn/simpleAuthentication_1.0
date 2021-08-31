<template>
  <div class="page">
    <form class="signup__form" @submit.prevent="signUp">
      <div class="card__header">
        <h1>Sign Up</h1>
        <p>Create an account to get started</p>
      </div>
      <div class="errors">
        <p class="err__message">{{ completeFields }}</p>
        <p class="err__message">{{ alreadyTaken }}</p>
      </div>
      <div class="input__container">
        <input
          v-model="signUpData.username"
          type="text"
          placeholder="Username"
          autocomplete="off"
        />
        <input
          v-model="signUpData.email"
          type="email"
          aria-describedby="emailHelp"
          placeholder="Email"
        />

        <div class="password__container">
          <input
            id="password"
            v-model="signUpData.password"
            class="input__field"
            :type="passwordType"
            placeholder="Password"
            @input=";passwordRules() & matchPassword() & openPasswordRules()"
          />
        </div>

        <div class="password__container">
          <input
            id="confirmPassword"
            v-model="signUpData.confirmPassword"
            class="input__field"
            :type="passwordType"
            placeholder="Confirm password"
            @input=";passwordRules() & matchPassword() & openPasswordRules()"
          />
          <i :class="passwordClass" @click="showPassword"></i>
        </div>
      </div>

      <div v-if="openRules" class="password__rules__container">
        <div class="password__rules">
          <span :class="upperCaseBadgeClass">1 uppercase letter</span>
          <span :class="lowerCaseBadgeClass">1 lowercase letter</span>
        </div>
        <div class="password__rules">
          <span :class="numberBadgeClass">1 number</span>
          <span :class="mustMatchBadgeClass">Must match</span>
        </div>
      </div>

      <p class="terms__info">
        By clicking "Sign Up" you agree to our
        <span class="accent">Terms</span> and
        <span class="accent">Privacy Policy</span>
      </p>

      <button class="btn__accent" type="submit">Sign Up</button>
    </form>
    <p class="have__acc">
      Already have an account?
      <nuxt-link to="/login" class="accent">Sign In</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signUpData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      passwordType: 'password',
      passwordClass: 'far fa-eye-slash password__icon',
      numberBadgeClass: 'ruleFalse',
      upperCaseBadgeClass: 'ruleFalse',
      lowerCaseBadgeClass: 'ruleFalse',
      mustMatchBadgeClass: 'ruleFalse',
      allRules: false,
      matchPw: false,
      openRules: false,
      completeFields: '',
      alreadyTaken: '',
    }
  },

  methods: {
    async signUp() {
      if (
        (this.signUpData.username !== '') &
        (this.signUpData.email !== '') &
        this.allRules &
        this.matchPw
      ) {
        try {
          const user = await this.$axios.$post('/api/signup', {
            data: this.signUpData,
          })

          if (!user.success) {
            this.alreadyTaken = user.message
          } else {
            this.$auth.loginWith('local', {
              data: {
                email: this.signUpData.email,
                password: this.signUpData.password,
              },
            })
          }
        } catch (err) {}
      } else {
        this.completeFields = 'Please complete all fields to sign up'
      }
    },

    passwordRules() {
      const password = this.signUpData.password
      const number = /^(?=.*\d)/
      const upperCase = /(?=.*[A-Z])/
      const lowerCase = /(?=.*[a-z])/
      const allRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/

      if (password.match(allRules)) {
        this.allRules = true
      } else {
        this.allRules = false
      }

      if (password.match(number)) {
        this.numberBadgeClass = 'ruleTrue'
      } else {
        this.numberBadgeClass = 'ruleFalse'
      }

      if (password.match(upperCase)) {
        this.upperCaseBadgeClass = 'ruleTrue'
      } else {
        this.upperCaseBadgeClass = 'ruleFalse'
      }

      if (password.match(lowerCase)) {
        this.lowerCaseBadgeClass = 'ruleTrue'
      } else {
        this.lowerCaseBadgeClass = 'ruleFalse'
      }
    },

    matchPassword() {
      const password = this.signUpData.password
      const confirmPassword = this.signUpData.confirmPassword
      if (password === confirmPassword) {
        this.mustMatchBadgeClass = 'ruleTrue'
        this.matchPw = true
      } else {
        this.mustMatchBadgeClass = 'ruleFalse'
        this.matchPw = false
      }

      if (!password) {
        this.mustMatchBadgeClass = 'ruleFalse'
        this.matchPw = false
      }
    },

    openPasswordRules() {
      this.openRules = true
    },

    showPassword() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
        this.passwordClass = 'far fa-eye password__icon'
      } else {
        this.passwordType = 'password'
        this.passwordClass = 'far fa-eye-slash password__icon'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  display: grid;
  align-content: center;
  justify-content: center;
  color: $primary;

  .signup__form {
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
      grid-template-rows: repeat(4, 1fr);
      grid-gap: 10px;

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

      .password__container {
        position: relative;

        .password__icon {
          position: absolute;
          transform: translate(0, -50%);
          right: 10px;
          top: 50%;
          cursor: pointer;
        }
      }
    }

    .password__rules__container {
      margin-top: 15px;

      .password__rules {
        color: $primary;
        display: inline-grid;
        grid-template-columns: repeat(2, auto);
        grid-gap: 5px;

        .ruleTrue {
          background-color: #dcf6e2;
          border-radius: 30px;
          padding: 5px 10px;
          font-size: 14px;
        }

        .ruleFalse {
          background-color: #f9aaaa;
          border-radius: 30px;
          padding: 5px 10px;
          font-size: 14px;
        }
      }

      .password__rules:last-child {
        margin-top: 5px;
      }
    }

    .terms__info {
      margin-top: 25px;
      margin-bottom: 20px;
      font-size: 15px;
      line-height: 22px;
    }
  }

  .have__acc {
    margin-top: 10px;
    font-size: 15px;
    line-height: 22px;
    text-align: center;
  }

  .accent {
    color: $accent;
  }
}
</style>