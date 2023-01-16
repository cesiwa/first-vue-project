<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
        >
          <v-list-item
            prepend-avatar="https://thispersondoesnotexist.com/image"
            title="Sıla"
            nav
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
              >
              </v-btn>
            </template>
          </v-list-item>
          <v-divider></v-divider>
          <v-list density="compact" nav>
            <v-list-item
              v-for="item in items"
              :key="item.value"
              :prepend-icon="item.icon"
              :title="item.title"
              :value="item.value"
              @click="goRoute(item)"
            >
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main style="height: 100vh">
          <v-toolbar border :title="title"> </v-toolbar>
          <v-container fluid class="fill-height">
            <router-view />
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    replaceRoute(item) {
      this.title = item.title;
      this.$router.replace({ name: item.value });
    },
    goRoute(item) {
      this.title = item.title;
      this.$router.push({ name: item.value });
    },
    goForward() {
      this.$router.go(1);
    },
  },
  data: () => ({
    drawer: true,
    rail: true,
    title: "Home",
    items: [
      { title: "Home", icon: "mdi-home-city", value: "HomePage" },
      { title: "About", icon: "mdi-account", value: "AboutPage" },
      {
        title: "Resim Ekleyici",
        icon: "mdi-image-multiple",
        value: "AddImages",
      },
    ],
  }),
};
</script>
