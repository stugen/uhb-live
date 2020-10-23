<template>
  <div class="card">
    <router-link :to="'/v/' + item.shortName">
      <div class="card-content">
        <p class="title">{{ item.name }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CollectionItem",
  props: ['item']
}
</script>
