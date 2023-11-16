<template>
  <q-layout view="lHh Lpr lff" container style="min-height: 100vh" class="shadow-2 rounded-borders">
    



    <q-page-container>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>


<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginLayout',

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      // Qualquer dado que você deseja expor ao template
    }
  }
})
</script>
