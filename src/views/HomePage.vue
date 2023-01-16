<template>
  <v-card class="fill-height">
    <v-tabs
      bg-color="deep-purple-darken-4"
      center-active
      >
      <v-tab v-for="item in items" :key="item.id" :value="item.txt" @click="selected=item.id">
          {{ item.txt }}
      </v-tab>
    </v-tabs>

    <v-img class="fill-height" :src = "`https://picsum.photos/seed/${txt}/1920`" cover></v-img>

  </v-card>
</template>

<script>
import { computed, ref } from '@vue/runtime-core';
export default {
    name: "HomePage",
    components: {},
    setup(){
        const selected = ref(0);

        const items = Array(30).fill(0).map((_, i) => {
            return {
                id: i,
                txt: "ITEM : " + (i + 1).toString(),
            };
        });

        const txt = computed(() => items[selected.value].txt);

        return {selected, txt, items};

    },
}
</script>

<style>

</style>