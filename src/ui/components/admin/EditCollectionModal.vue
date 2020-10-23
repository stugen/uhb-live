<template>
  <div class="modal" :class="{'is-active': this.show}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ this.collection.uuid === '' ? $t('admin.editor.titleNew') : $t('admin.editor.titleEdit') }}</p>
      </header>
      <div class="modal-card-body">
        <div class="field">
          <label class="label" for="em-title">{{ $t('admin.details.name') }}</label>
          <div class="control">
            <input class="input" type="text" :placeholder="this.$t('admin.placeholder.name')" v-model="collection.name" id="em-title"/>
          </div>
        </div>
        <div class="field">
          <label class="label" for="em-slug">{{ $t('admin.details.link') }}</label>
          <div class="control">
            <input class="input" type="text" :placeholder="this.$t('admin.placeholder.link')" pattern="[a-zA-Z0-9-]" id="em-slug" v-model="collection.shortName"/>
          </div>
        </div>
        <div class="field">
          <label class="label" for="em-desc">{{ $t('admin.details.description') }}</label>
          <div class="control">
            <textarea class="textarea" :placeholder="this.$t('admin.placeholder.description')" id="em-desc" v-model="collection.description"/>
          </div>
        </div>
      </div>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save" :disabled="!saveAllowed">{{ $t('admin.actions.save') }}</button>
        <button class="button" @click="hide">{{ $t('admin.actions.cancel') }}</button>
        <button disabled class="button is-danger" v-if="failure">{{ $t('admin.editor.failure') }}</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditCollectionModal",
  props: ['show', 'edit-collection'],
  data () {
    return {
      failure: false,
      collection: {
        uuid: '',
        name: '',
        shortName: '',
        description: ''
      }
    }
  },
  methods: {
    hide () {
      this.$emit('hide')
    },
    save () {
      window.fetch(`/api/v1/collection${this.uuid !== '' ? '/' + this.uuid : ''}`, {
        mode: 'cors',
        headers: {
          authorization: 'Bearer ' + this.$store.state.loginUser.token
        },
        method: this.uuid === '' ? 'POST' : 'PUT'
      })
    }
  },
  computed: {
    saveAllowed () {
      return
    }
  }
}
</script>
