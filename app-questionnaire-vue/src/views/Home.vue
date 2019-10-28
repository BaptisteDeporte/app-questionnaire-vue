<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button v-on:click="insertOnPoutchDb">Test</button>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    insertOnPoutchDb() {
      db.put({
        _id: "kuqshjidsq",
        firstName: "Jean-Yves"
      })
      db.replicate.to('http://127.0.0.1:5984/epsi%27')
    }
  }
}
</script>
