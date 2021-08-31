<template>
  <div class="page">
    <div v-if="getUser">
      <h1>Hello, {{ getUser.username }}!</h1>
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
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  display: grid;
  align-content: center;
  justify-content: center;
}
</style>