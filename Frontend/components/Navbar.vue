<template>
  <div class="navbar__container">
    <div class="navbar">
      <h1>Logo</h1>
      <div v-if="$auth.loggedIn">
        <button class="btn__accent" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters(['getUser']),
  },

  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar__container {
  padding-top: 15px;
  .navbar {
    max-width: 1600px;
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }
}
</style>