<template>
  <div id="app">
    <div style="text-align: center">
      <h3 style="margin: 0; padding: 0">Components development page</h3>
      |<span v-for="(component, id) in components" :key="id" style="margin: 0; padding: 0">
          <a style="margin: 5px" href="javascript:void(0)" @click="choosedComponent = component">{{component.name}}</a> |
      </span>

      <div style="margin: 0; padding: 0; font-weight: bold; color: darkgreen" v-if="choosedComponent !== null">{{choosedComponent.name}}</div>
      <hr >
    </div>
      <div style="width: 100%; height: 100%">
          <component :is="choosedComponent.component" v-if="choosedComponent !== null"></component>
          <div v-else><h1>Choose component(click on header link)</h1></div>
      </div >
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      choosedComponent: null,
      components: [
        {name: "Diagnostic component", component:  () => import('./components/Diagnostic/Main')},
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
