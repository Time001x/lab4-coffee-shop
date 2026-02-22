<template>
  <div>
    <h2>Get all blogs</h2>
    <h4>จำนวน blog {{ blogs.length }}</h4>
    <p><button @click="navigateTo('/blog/create')">สร้าง blog</button></p>

    <div v-for="blog in blogs" :key="blog.id">
      <p>id: {{ blog.id }}</p>
      <p>title: {{ blog.title }}</p>
      <p>content: {{ blog.content }}</p>
      <p>category: {{ blog.category }}</p>
      <p>status: {{ blog.status }}</p>
      <p>
        <button @click="navigateTo('/blog/' + blog.id)">ดู blog</button>
        <button @click="navigateTo('/blog/edit/' + blog.id)">แก้ไข blog</button>
        <button @click="deleteBlog(blog)">ลบข้อมูล</button>
      </p>
      <hr>
    </div>
  </div>
</template>

<script>
import BlogsService from '@/services/BlogsService'
import { useAuthenStore } from '@/stores/authen'

export default {
  data () {
    return {
      blogs: []
    }
  },

  async created () {
    await this.refreshData()
  },

  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },

    async deleteBlog (blog) {
      if (!confirm('Want to delete?')) return
      try {
        await BlogsService.delete(blog)
        await this.refreshData()
      } catch (err) {
        console.error(err)
      }
    },

    async refreshData () {
      this.blogs = (await BlogsService.index()).data
    },

    logout () {
      const authenStore = useAuthenStore()
      authenStore.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
