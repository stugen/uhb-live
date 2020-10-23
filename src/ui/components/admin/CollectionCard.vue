<template>
  <div class="card">
    <div class="card-content">
      <p class="title">{{ item.name }}</p>
      <router-link :to="'/c/' + item.shortName">
        <p class="subtitle">{{ item.shortName }}</p>
      </router-link>
      <p class="description">{{ item.description.substr(0, 100) }}&hellip;</p>
    </div>
    <div class="card-footer field is-grouped">
      <button class="card-footer-item button is-info" @click="editThis">
        <span class="icon"><font-awesome-icon icon="edit" class="fa"/></span>
        {{ $t('admin.actions.edit') }}
      </button>
      <button class="card-footer-item button is-danger" @click="deleteThis">
        <span class="icon"><font-awesome-icon icon="trash-alt" class="fa"/></span>
        {{ $t('admin.actions.delete') }}
      </button>
    </div>
    <edit-collection-modal :show="editorVisible" :edit-collection="item" @hide="hideEditor"/>
  </div>
</template>

<script>
import EditCollectionModal from "./EditCollectionModal";
export default {
  name: "CollectionCard",
  components: {EditCollectionModal},
  props: ['item'],
  data () {
    return {
      editorVisible: false
    }
  },
  methods: {
    editThis () {
      this.editorVisible = true
    },
    hideEditor () {
      this.editorVisible = false
      this.$emit('update')
    },
    deleteThis () {
      const question = window.confirm(`Really delete collection "${this.item.name}"?`)
      if (question) {
        window.fetch('/api/v1/collection/' + this.item.uuid, {
          mode: 'cors',
          method: 'DELETE',
          cache: 'no-cache',
          headers: {
            authorization: 'Bearer ' + this.$store.state.loginUser.token
          }
        }).then(() => {
          this.$emit('update')
        }).catch(error => {
          console.error(error)
        })
      }
    }

  }
}
</script>
