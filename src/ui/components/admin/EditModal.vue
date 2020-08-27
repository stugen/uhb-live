<template>
  <div class="modal" :class="{'is-active': this.show}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ this.stream.uuid === '' ? $t('admin.editor.titleNew') : $t('admin.editor.titleEdit') }}</p>
      </header>
      <div class="modal-card-body">
        <div class="field">
          <label class="label" for="em-title">{{ $t('admin.details.name') }}</label>
          <div class="control">
            <input class="input" type="text" :placeholder="this.$t('admin.placeholder.name')" v-model="stream.name" id="em-title"/>
          </div>
        </div>
        <div class="field">
          <label class="label" for="em-slug">{{ $t('admin.details.link') }}</label>
          <div class="control">
            <input class="input" type="text" :placeholder="this.$t('admin.placeholder.link')" pattern="[a-zA-Z0-9-]" id="em-slug" v-model="stream.shortName"/>
          </div>
        </div>
        <div class="field" :title="this.$t('admin.editor.supportedMedia')">
          <label class="label" for="em-src">{{ $t('admin.details.source') }}</label>
          <div class="control">
            <input class="input" type="url" placeholder="https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov" id="em-src" v-model="stream.source"/>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox" for="em-chat">
              <b>{{ $t('admin.details.chatEnabled') }}</b>
              <input type="checkbox" id="em-chat" v-model="stream.chat"/>
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox" for="em-scheduled-toggle">
              <b>{{ $t('admin.details.scheduled') }}</b>
              <input type="checkbox" id="em-scheduled-toggle" v-model="scheduled"/>
            </label>
          </div>
        </div>
        <div class="field" v-if="scheduled">
          <label class="label" for="em-scheduled">{{ $t('admin.details.scheduled') }}</label>
          <div class="control">
            <datetime v-model="startDateTimeInput" input-class="input" input-id="em-scheduled" id="em-scheduled" type="datetime" :min-datetime="new Date().toISOString()"/>
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
  name: "EditModal",
  props: ['editStream', 'show'],
  data () {
    return {
      stream: {
        uuid: '',
        name: '',
        shortName: '',
        chat: true,
        source: '',
        startTime: 0
      },
      startDateTimeInput: '',
      scheduled: false,
      names: [],
      failure: false
    }
  },
  computed: {
    saveAllowed () {
      let link = true
      if (this.stream.uuid === '' || this.stream.shortName !== this.editStream.shortName) {
        link = !this.names.includes(this.stream.shortName)
      }
      return (
          !!this.stream.name &&
          !!this.stream.shortName &&
          !!this.stream.source &&
          link
      )
    }
  },
  methods: {
    hide () {
      this.$emit('hide')
    },
    update () {
      this.stream = this.editStream
      this.failure = false
      if (this.stream.startTime > 0) {
        this.scheduled = true
        this.startDateTimeInput = new Date(this.stream.startTime * 1000).toISOString()
      }
      window.fetch('/data/streams', {
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          authorization: this.$store.state.loginUser.token
        }
      })
          .then(response => response.json())
          .then(json => {
            this.names = json.map(str => str.shortName)
          })
          .catch(error => {
            console.error(error)
          })
    },
    save () {
      const url = this.stream.uuid === '' ? '/data/streams' : `/data/stream/${this.stream.uuid}`
      if (this.scheduled) {
        this.stream.startTime = Date.parse(this.startDateTimeInput) / 1000
      } else {
        this.stream.startTime = 0
      }
      window.fetch(url, {
        mode: 'cors',
        method: this.stream.uuid === '' ? 'POST' : 'PUT',
        headers: {
          authorization: 'Bearer ' + this.$store.state.loginUser.token,
          'content-type': 'application/json'
        },
        body: JSON.stringify(this.stream)
      }).then(() => {
        this.hide()
      }).catch((error) => {
        console.error(error)
        this.failure = true
      })
    }
  }
}
</script>

<style scoped>
.field {
  margin-block-end: 2rem;
}
</style>