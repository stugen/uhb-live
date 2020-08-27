<template>
  <main class="container px-4">
    <h1 class="is-size-3">{{ $t('admin.title') }}</h1>
    <button class="button" @click="showEditorNew">
      <span class="icon"><font-awesome-icon icon="plus" class="fa"/></span>
      {{ $t('admin.actions.add') }}
    </button>
    <button class="button" @click="updateStreams">
      <span class="icon"><font-awesome-icon icon="sync-alt" class="fa"/></span>
      {{ $t('admin.actions.refresh') }}
    </button>
    <hr>
    <section class="streams columns">
      <div class="column">
        <stream-details v-for="stream in streamsFirstHalf" :key="stream.uuid" :stream="stream" @update="updateStreams"/>
      </div>
      <div class="column">
        <stream-details v-for="stream in streamsSecondHalf" :key="stream.uuid" :stream="stream" @update="updateStreams"/>
      </div>
    </section>
    <edit-modal :show="showEditor" @hide="hideEditor" :edit-stream="streamEditor" ref="editor"/>
  </main>
</template>

<script>
import StreamDetails from "./StreamDetails";
import EditModal from "./EditModal";
export default {
  name: "Admin",
  components: {EditModal, StreamDetails},
  data () {
    return {
      streams: [],
      showEditor: false,
      streamEditor: {
        uuid: '',
        name: '',
        shortName: '',
        chat: true,
        source: '',
        startTime: 0
      }
    }
  },
  mounted () {
    this.updateStreams()
  },
  computed: {
    streamsFirstHalf () {
      return this.streams.filter((str, idx) => idx % 2 === 0)
    },
    streamsSecondHalf () {
      return this.streams.filter((str, idx) => idx % 2 === 1)
    }
  },
  methods: {
    updateStreams () {
      window.fetch('/data/streams', {
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          authorization: this.$store.state.loginUser.token
        }
      })
        .then(response => response.json())
        .then(json => {
          this.streams = json
        })
        .catch(error => {
          console.error(error)
        })
    },
    hideEditor () {
      this.showEditor = false
      this.updateStreams()
    },
    showEditorNew () {
      this.streamEditor = {
        uuid: '',
        name: '',
        shortName: '',
        chat: true,
        source: '',
        startTime: 0
      }
      this.$refs.editor.update()
      this.showEditor = true
    }
  }
}
</script>

<style scoped>
h1 {
  margin-block-end: 1rem;
}

@media screen and (max-width: 910px) {
  .columns {
    flex-flow: column;
  }
}
</style>
