<template>
  <v-col-auto>
    <v-card class="ml-5 mb-5" width="250">
      <v-img
        :src="image.url"
        :on-error="
          (image.url =
            'https://media.istockphoto.com/id/1183329518/tr/foto%C4%9Fraf/kozmik-bulutsu-ve-parlayan-y%C4%B1ld%C4%B1zlar.jpg?b=1&s=612x612&w=0&k=20&c=NyTPV7uYmkWmYypQB9NDwLumi3Rpr2Qj1VdFJpPpdpQ=')
        "
        height="200px"
        cover
      ></v-img>

      <v-card-title>
        {{ this.image.name }}
      </v-card-title>

      <v-card-actions>
        <v-btn
          v-if="image.isLiked"
          size="small"
          color="red"
          variant="text"
          icon="mdi-heart"
          @click="isLikedFunc()"
        ></v-btn>
        <v-btn
          v-else
          size="small"
          color="surface-variant"
          variant="text"
          icon="mdi-heart"
          @click="isLikedFunc()"
        ></v-btn>

        <v-btn
          size="small"
          color="surface-variant"
          variant="text"
          icon="mdi-delete"
          @click="deleteImage()"
        ></v-btn>
      </v-card-actions>
      <v-sheet class="mx-auto">
        <v-slide-group show-arrows>
          <v-slide-group-item v-for="tag in image.tags" :key="tag">
            <v-chip class="ml-2 mb-2">
              {{ tag }}
            </v-chip>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </v-card>
  </v-col-auto>
</template>

<script>
export default {
  props: ["imageProp"],
  data: (props) => ({
    image: props.imageProp,
  }),
  methods: {
    isLikedFunc() {
      this.image.isLiked = !this.image.isLiked;
    },
    deleteImage() {
      this.$emit("onDelete", this.image);
    },
  },
};
</script>

<style>
</style>