<template>
  <div class="card">
    <router-link :to="'/v/' + item.shortName">
      <div class="card-content">
        <p class="title">{{ item.name }}</p>
        <p v-html="descriptionHtml"></p>
      </div>
    </router-link>
  </div>
</template>

<script>
import markdownIt from 'markdown-it'
export default {
  name: "CollectionItem",
  props: ['item'],
  computed: {
    descriptionHtml () {
      return markdownIt({
        linkify: true
      }).render(this.item.description)
    }
  }
}
</script>
