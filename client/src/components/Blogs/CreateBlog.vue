<template>
  <div class="container">
    <h1>Create Blog</h1>

    <form @submit.prevent="createBlog">
      <p>
        Title:
        <input type="text" v-model="blog.title" class="form-control">
      </p>

      <upload-image @uploaded="onUploaded"></upload-image>

      <div class="editor-container">
        <label>Content:</label>
        <ckeditor
          :editor="editor"
          v-model="blog.content"
          :config="editorConfig"
        />
      </div>

      <p>
        category:
        <input type="text" v-model="blog.category" class="form-control">
      </p>

      <p>
        status:
        <input type="text" v-model="blog.status" class="form-control">
      </p>

      <p>
        <button type="submit" class="btn btn-success">Create Blog</button>
      </p>
    </form>
  </div>
</template>

<script>
import BlogsService from '@/services/BlogsService'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadImage from '../Utils/Upload.vue'

export default {
  components: { UploadImage },

  data () {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [
          'heading', '|',
          'bold', 'italic', 'link',
          'bulletedList', 'numberedList',
          'blockQuote'
        ]
      },
      blog: {
        title: '',
        thumbnail: null,
        pictures: null,
        content: '',
        category: '',
        status: 'saved'
      }
    }
  },

  methods: {
    onUploaded (filename) {
      this.blog.thumbnail = filename
    },

    async createBlog () {
      try {
        await BlogsService.post(this.blog)
        this.$router.push({ name: 'blogs' })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
