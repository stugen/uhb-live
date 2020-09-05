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
            <external-link to="https://inf.stugen.de/stuga/kontakt-impressum" translation-key="common.footer.imprint"/>
          </p>
          <p>
            <external-link to="https://q-web.admin.stugen.de/datenschutz.html" translation-key="common.footer.privacy"/>
          </p>
          <p>
            <external-link to="https://www.uni-bremen.de/notfall/" translation-key="common.footer.emergency"/>
          </p>
        </div>
        <div class="column">
          <b>{{ this.$t('common.footer.usefulLinks') }}</b>
          <p>
            <external-link to="https://inf.stugen.de">StugA Informatik</external-link>
          </p>
          <p>
            <external-link to="https://math.stugen.de/wordpress/">StugA Mathematik</external-link>
          </p>
          <p>
            <external-link to="https://www.szi.uni-bremen.de">Studienzentrum Informatik</external-link>
          </p>
          <p>
            <external-link to="https://www.szmathe.uni-bremen.de">Studienzentrum Mathematik</external-link>
          </p>
        </div>
        <div class="column">
          <b>{{ this.$t('common.footer.socialMedia') }}</b>
          <p>
            <font-awesome-icon :icon="['fab', 'instagram']" fixed-width/>
            <external-link to="https://instagram.com/stugen_fb3">Instagram</external-link>
          </p>
        </div>
      </div>
      <p>
        <external-link to="https://fb3.stugen.de">&copy; {{year}} Stugen des FB3</external-link>
        <br>
        <external-link to="https://www.uni-bremen.de">&copy; {{year}} {{ this.$t('common.university') }}</external-link>
      </p>
    </div>
  </footer>
</template>

<script>
import ExternalLink from "../common/ExternalLink";
export default {
  name: "Footer",
  components: {ExternalLink},
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
    svg.fa-fw {
      margin-right: 0.25rem;
    }
  }

  a {
    color: #ffffff;
    &:hover, &:focus, &:active {
      color: #ffffff;
      text-decoration: underline;
    }
  }
}
</style>
