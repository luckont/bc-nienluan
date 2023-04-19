<script>
import AppHeader from "@/components/Header.vue";
import AppFooter from "@/components/Footer.vue"

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>
<template>
  <div id="app">
    <AppHeader/>
    <div>
      <router-view></router-view>
    </div>
    <AppFooter/>
  </div>
</template>

<style scoped>
#app{
  padding: 20px 40px;
}
</style>
