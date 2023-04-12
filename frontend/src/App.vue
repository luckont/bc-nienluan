<script>
import AppHeader from "@/components/Header.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>
<template>
  <div id="app">
    <AppHeader/>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
#app{
  padding: 20px 40px;
}
</style>
