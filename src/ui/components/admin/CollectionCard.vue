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
  </div>
</template>

<script>
export default {
  name: "CollectionCard",
  props: ['item'],
  methods: {
    editThis () {

    },
    deleteThis () {
      const question = window.confirm(this.$t(''))
    }
  }
}
</script>
