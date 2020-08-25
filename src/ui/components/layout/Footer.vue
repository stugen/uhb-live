<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="column">
          <b>{{ this.$t('common.footer.contact') }}</b>
          <p>
            Stugen des FB3<br>
            MZH 1196<br>
            Bibliothekstr. 5<br>
            28359 Bremen
          </p>
          <p>
            <font-awesome-icon icon="phone" fixed-width/>{{ this.$t('common.footer.telephone') }}: <a href="tel:004942121863535">+49 421 218-63535</a><br>
            <font-awesome-icon icon="envelope" fixed-width/>{{ this.$t('common.footer.email') }}: <a href="mailto:fb3@stugen.de">fb3@stugen.de</a>
          </p>
        </div>
        <div class="column">
          <b>{{ this.$t('common.footer.legal') }}</b>
          <p>
            <a href="https://inf.stugen.de/stuga/kontakt-impressum" target="_blank">{{ this.$t('common.footer.imprint') }}</a>
          </p>
          <p>
            <a href="https://q-web.admin.stugen.de/datenschutz.html" target="_blank">{{ this.$t('common.footer.privacy') }}</a>
          </p>
          <p>
            <a href="https://www.uni-bremen.de/notfall/" target="_blank">{{ this.$t('common.footer.emergency') }}</a>
          </p>
        </div>
        <div class="column">
          <b>{{ this.$t('common.footer.usefulLinks') }}</b>
        </div>
        <div class="column">
          <b>{{ this.$t('common.footer.socialMedia') }}</b>
          <p>
            <font-awesome-icon :icon="['fab', 'instagram']" fixed-width/><a href="https://instagram.com/stugen_fb3" target="_blank">Instagram</a>
          </p>
        </div>
      </div>
      <p>
        &copy; {{year}} Stugen des FB3
        <br>
        &copy; {{year}} {{ this.$t('common.university') }}
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped lang="scss">
.footer {
  background-color: #21467a;
  color: #ffffff;
  margin-top: 1.5rem;

  .column {
    b {
      font-size: 1.125rem;
      font-weight: normal;
      margin-block-end: 1.5rem;
      display: inline-block;
    }
    p {
      margin-block-end: 1rem;
    }
    a {
      color: #ffffff;
      &:hover, &:focus, &:active {
        color: #ffffff;
        text-decoration: underline;
      }
    }
    svg.fa-fw {
      margin-right: 0.25rem;
    }
  }
}
</style>
