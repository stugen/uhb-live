<template>
  <main class="container px-4">
    <h1 v-if="!error">{{ collection.name }}</h1>
    <div class="content my-4" v-html="descriptionHtml" v-if="!loading && !error"></div>
    <div class="columns" v-if="!loading && !error">
      <div class="column">
        <collection-item v-for="item in itemsFirstHalf" :key="item.uuid" :item="item"/>
      </div>
      <div class="column">
        <collection-item v-for="item in itemsSecondHalf" :key="item.uuid" :item="item"/>
      </div>
    </div>
    <div class="message is-info" v-if="loading">
      <div class="message-body">
        <b>{{ $t('common.loading') }}</b>
      </div>
    </div>
    <error-not-found v-if="error"/>
  </main>
</template>

<script>
import markdownIt from 'markdown-it'
import {getMetadata, MetadataType} from "../common/FetchApiData";
import ErrorNotFound from "../common/ErrorNotFound";
import CollectionItem from "./CollectionItem";
export default {
  name: "CollectionView",
  components: {CollectionItem, ErrorNotFound},
  data () {
    return {
      collection: {
        uuid: '',
        name: '',
        shortName: '',
        description: '',
        items: []
      },
      error: false,
      loading: true
    }
  },
  computed: {
    descriptionHtml () {
      const markdown = this.collection.description
      return markdownIt({
        linkify: true
      }).render(markdown)
    },
    itemsFirstHalf () {
      return this.collection.items.filter((_, idx) => idx % 2 === 0)
    },
    itemsSecondHalf () {
      return this.collection.items.filter((_, idx) => idx % 2 === 1)
    }
  },
  methods: {

  },
  created () {
    const name = this.$route.params.collection
    getMetadata(name, MetadataType.COLLECTION).then(collection => {
      this.collection = collection
      this.error = false
    }).catch(error => {
      console.error(error)
      this.error = true
    }).finally(() => {
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
