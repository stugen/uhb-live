<template>
  <section class="player">
    <video-player :options="options" ref="playerRef"/>
    <div :class="{'message': true, 'is-info': true, 'v-hidden': !muted}">
      <div class="message-body">Der Player ist derzeit gemuted.</div>
    </div>
  </section>
</template>

<script>
import VideoPlayer from '../common/VideoPlayer'
export default {
  name: 'Player',
  components: {VideoPlayer},
  data () {
    return {
      options: {
        fluid: true,
        autoplay: 'any',
        controls: true,
        liveui: true,
        sources: [
          {
            src: ''
          }
        ]
      },
      muted: false
    }
  },
  props: ['src'],
  created () {
    if (this.src.length > 1) {
      const randWeights = this.src.map(w => (Math.random() * w.weight))
      const index = randWeights.indexOf(Math.max(...randWeights))
      this.options.sources[0].src = this.src[index].url
    } else {
      this.options.sources[0].src = this.src[0].url
    }
    if (/^https?:\/\/(?:www)\.youtu(?:\.be|be\.com)\//.test(this.src[0].url)) {
      this.options.sources[0].type = 'video/youtube'
    }
  },
  mounted () {
    const player = this.$refs.playerRef.player
    player.on('volumechange', () => {
      this.muted = player.muted() || player.volume() === 0.0
    })
  }
}
</script>
