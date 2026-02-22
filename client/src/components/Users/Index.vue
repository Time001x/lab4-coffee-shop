<template>
  <div>
    <h1>Get All Users</h1>
    <div>จำนวนผู้ใช้งาน {{ users.length }}</div>

    <div v-if="users.length > 0">
      <div
        v-for="user in users"
        :key="user.id"
        style="margin-bottom: 15px;"
      >
        <div>id: {{ user.id }}</div>
        <div>ชื่อ-นามสกุล: {{ user.name }} {{ user.lastname }}</div>
        <div>email: {{ user.email }}</div>
        <div>status: {{ user.status }}</div>

        <p>
          <button @click="navigateTo('/user/' + user.id)">ดูข้อมูลผู้ใช้</button>
          <button @click="navigateTo('/user/edit/' + user.id)">แก้ไขข้อมูล</button>
          <button @click="deleteUser(user.id)">ลบข้อมูล</button>
        </p>
        <hr />
      </div>
    </div>

    <div v-else>ยังไม่มีข้อมูลผู้ใช้งาน</div>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService'
import { useAuthenStore } from '../../stores/authen'

export default {
  data () {
    return {
      users: []
    }
  },

  async created () {
    await this.refreshData()
  },

  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },

    async deleteUser (userId) {
      if (!confirm('Want to delete?')) return
      try {
        await UsersService.delete(userId)
        await this.refreshData()
      } catch (err) {
        console.error(err)
      }
    },

    async refreshData () {
      this.users = (await UsersService.index()).data
    },

    logout () {
      const authenStore = useAuthenStore()
      authenStore.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
