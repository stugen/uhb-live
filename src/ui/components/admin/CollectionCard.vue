<template>
  <div class="card">
    <div class="card-content">
      <h2 class="is-size-4">{{ item.name }}</h2>
      <br />
      <span>
        <b>{{ $t('admin.details.link') }}: </b>
        <router-link :to="`/c/${item.shortName}`">/c/{{ item.shortName }}</router-link>
      </span>
      <span>
        <b>{{ $t('admin.details.description') }}: </b>
        <span>{{ item.description.substr(0, 100) }}&hellip;</span>
      </span>
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
    <edit-collection-modal :show="editorVisible" :edit-collection="editItem" @hide="hideEditor" ref="editor"/>
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
      editorVisible: false,
      editItem: {}
    }
  },
  created () {
    this.editItem = this.item
  },
  methods: {
    editThis () {
      this.$refs.editor.update()
      this.editorVisible = true
    },
    hideEditor () {
      this.editorVisible = false
      this.$emit('update')
    },
    deleteThis () {
      const question = window.confirm(this.$t('admin.hints.deleteCollection', { name: this.item.name }))
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

<style>
.card-content > span {
  display: block;
  margin-block-end: 0.25rem;
  word-break: break-all;
}
.card {
  background-color: #f7f7f7;
  margin-block-end: 1.5rem;
}
</style>
