<template>
  <div>
    <h1>Show User</h1>

    <div v-if="user">
      <p>id: {{ user.id }}</p>
      <p>ชื่อ-นามสกุล: {{ user.name }} {{ user.lastname }}</p>
      <p>email: {{ user.email }}</p>
    </div>

    <div v-else>Loading...</div>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService'

export default {
  data () {
    return {
      user: null
    }
  },

  async created () {
    try {
      const userId = this.$route.params.userId
      this.user = (await UsersService.show(userId)).data
    } catch (err) {
      console.error(err)
    }
  },

  watch: {
    '$route.params.userId' (newId) {
      this.fetchUser(newId)
    }
  },

  methods: {
    async fetchUser (userId) {
      try {
        this.user = (await UsersService.show(userId)).data
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
