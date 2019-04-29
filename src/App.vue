<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="slidebar"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/views/Header";
import PostList from '@/views/PostList.vue'

export default {
  name: "App",
  components: {
    Header,
    PostList
  }
};
</script>
<style lang="scss">
html {
  overflow-y: scroll;
}

body {
  background-color: #e1e1e1;
  margin: 0
}
.main {
  width: 80%;
  margin: 0 auto;
}
</style>