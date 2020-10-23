<template>
  <div class="card">
    <div class="card-content">
      <h2 class="is-size-4">{{ stream.name }}</h2>
      <br />
      <span>
        <b>{{ $t('admin.details.link') }}: </b>
        <router-link :to="`/v/${stream.shortName}`">/v/{{ stream.shortName }}</router-link>
      </span>
      <span>
        <b>{{ $t('admin.details.source') }}: </b>
        <a :href="stream.sources[0].url" target="_blank">{{ stream.sources[0].url }}</a>
      </span>
      <span>
        <b>{{ $t('admin.details.description') }}: </b>
        <span>{{ stream.description.substr(0, 100) + '&hellip;' }}</span>
      </span>
      <span>
        <b>{{ $t('admin.details.chatEnabled') }}: </b>
        <font-awesome-icon v-if="stream.chat" icon="check"/>
        <font-awesome-icon v-if="!stream.chat" icon="times"/>
      </span>
      <span>
        <b>{{ $t('admin.details.scheduled') }}: </b>
        <span v-if="stream.startTime === 0">{{ $t('admin.details.no') }}</span>
        <span v-if="stream.startTime !== 0">{{ date.toLocaleDateString() }} {{ date.toLocaleTimeString() }}</span>
      </span>
    </div>
    <footer class="card-footer field is-grouped">
      <button class="card-footer-item button is-info" @click="editThis">
        <span class="icon"><font-awesome-icon icon="edit" class="fa"/></span>
        {{ $t('admin.actions.edit') }}
      </button>
      <button class="card-footer-item button is-warning" @click="this.clearChat" v-if="stream.chat">
        <span class="icon"><font-awesome-icon icon="eraser" class="fa"/></span>
        {{ $t('admin.actions.clearChat') }}
      </button>
      <button class="card-footer-item button is-danger" @click="this.deleteThis">
        <span class="icon"><font-awesome-icon icon="trash-alt" class="fa"/></span>
        {{ $t('admin.actions.delete') }}
      </button>
    </footer>
    <edit-modal :show="showEditor" @hide="hideEditor" :edit-stream="this.stream" ref="editor"/>
  </div>
</template>

<script>
import EditModal from "./EditModal";
export default {
  name: "StreamDetails",
  props: ['stream'],
  components: {EditModal},
  data () {
    return {
      showEditor: false
    }
  },
  computed: {
    date () {
      return new Date(this.stream.startTime * 1000)
    }
  },
  methods: {
    deleteThis () {
      const confirm = window.confirm(this.$t('admin.hints.deleteStream', { name: this.stream.name }))
      if (!confirm) {
        return
      }
      window.fetch(`/api/v1/stream/${this.stream.uuid}`, {
        method: 'DELETE',
        headers: {
          authorization: 'Bearer ' + this.$store.state.loginUser.token
        }
      })
        .then(() => {
          this.$emit('update')
        })
        .catch((error) => {
          console.error(error)
        })
    },
    clearChat () {
      const confirm = window.confirm(this.$t('admin.hints.clearChat', { name: this.stream.name }))
      if (!confirm) {
        return
      }
      window.fetch(`/api/v1/chat/${this.stream.uuid}`, {
        method: 'DELETE',
        headers: {
          authorization: 'Bearer ' + this.$store.state.loginUser.token
        }
      })
          .then(() => {
            this.$emit('update')
          })
          .catch((error) => {
            console.error(error)
          })
    },
    editThis () {
      this.showEditor = true
      this.$refs.editor.update()
    },
    hideEditor () {
      this.$emit('update')
      this.showEditor = false
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  margin-block-end: 1.5rem;
  background-color: #f7f7f7;

  .card-content > span {
    display: block;
    margin-block-end: 0.25rem;
    word-break: break-all;
  }
}

@media screen and (max-width: 396px){
  .card-footer.field.is-grouped {
    flex-flow: column;
  }
}
</style>
