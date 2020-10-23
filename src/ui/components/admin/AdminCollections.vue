<template>
  <main class="container px-4">
    <h1 class="is-size-3">{{ $t('admin.collections') }}</h1>
    <button class="button" @click="showEditor">
      <span class="icon"><font-awesome-icon icon="plus" class="fa"/></span>
      {{ $t('admin.actions.add') }}
    </button>
    <button class="button" @click="updateCollections">
      <span class="icon"><font-awesome-icon icon="sync-alt" class="fa"/></span>
      {{ $t('admin.actions.refresh') }}
    </button>
    <hr>
    <section class="streams columns">
      <div class="column">
        <collection-card v-for="collection in collectionsFirstHalf" :key="collection.uuid" :item="collection" @update="updateCollections"/>
      </div>
      <div class="column">
        <collection-card v-for="collection in collectionsSecondHalf" :key="collection.uuid" :item="collection" @update="updateCollections"/>
      </div>
    </section>
    <edit-collection-modal :show="editorVisible" @hide="hideEditor" :edit-collection="newCollection" ref="editor"/>
  </main>
</template>

<script>
import CollectionCard from "./CollectionCard";
import EditCollectionModal from "./EditCollectionModal";
export default {
  name: "AdminCollections",
  components: {CollectionCard, EditCollectionModal},
  data () {
    return {
      editorVisible: false,
      collections: [],
      newCollection: {
        name: '',
        shortName: '',
        description: ''
      }
    }
  },
  methods: {
    showEditor () {
      this.newCollection = {
        name: '',
        shortName: '',
        description: ''
      }
      this.editorVisible = true
    },
    hideEditor () {
      this.editorVisible = false
      this.updateCollections()
    },
    updateCollections () {
      window.fetch('/api/v1/collection', {
        mode: 'cors',
        headers: {
          'authorization': 'Bearer ' + this.$store.state.loginUser.token
        },
        cache: 'no-cache'
      }).then(response => response.json())
        .then(response => {
          this.collections = response
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  computed: {
    collectionsFirstHalf () {
      return this.collections.filter((_, idx) => idx % 2 === 0)
    },
    collectionsSecondHalf () {
      return this.collections.filter((_, idx) => idx % 2 === 1)
    }
  },
  created () {
    this.updateCollections()
  }
}
</script>
