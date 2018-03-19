<template lang="html">

<div>
  <footer class="footer">
    <p>
      Copyright &copy; 2017 Powered By <a :href="a_url">{{ a_title }}</a>
    </p>
  </footer>
</div>

</template>

<script>
export default {
  name: 'FooterBar',
  data () {
    return {
      a_title: 'vxhly',
      a_url: '//vxhly.github.io'
    }
  }
}
</script>
