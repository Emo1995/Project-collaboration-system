<template lang="html">
  <div>
    <header flex="main:center" class="header">
      <h3>{{ title }}</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  data () {
    return {
      title: 'Vue.js and Express and MongoDB project'
    }
  }
}
</script>
