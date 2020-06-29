<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <main-tab-bar class="main-bar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from './components/content/maintabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "./assets/css/base.css";
    .main-bar{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
    }
</style>
