<template>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ text }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>

  <v-container fluid class="fill-height">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent>
        <template v-slot:activator="{ props }">
          <v-btn color="grey darken-1" v-bind="props"> Resim Ekle </v-btn>

          <v-switch
            class="d-flex justify-end"
            @click="showOnlyFav = !showOnlyFav"
            label="Favoriler"
            color="error"
            value="error"
            hide-details
          ></v-switch>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h6">Resim Ekle</span>
          </v-card-title>
          <v-form @submit="addImage">
            <v-card-text>
              <v-container>
                <v-text-field
                  label="Url*"
                  type="text"
                  v-model="imageUrl"
                  :error="urlError.length > 0"
                  :error-messages="urlError"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="imageName"
                  label="Resim adı*"
                  type="text"
                  :error="nameError.length > 0"
                  :error-messages="nameError"
                  required
                ></v-text-field>
                <v-text-field
                  @keyup="addTag"
                  v-model="imageTag"
                  label="Tagler"
                  type="text"
                  required
                ></v-text-field>
                <v-chip
                  v-for="tag in tags"
                  :key="tag"
                  class="ma-2"
                  closable
                  @click:close="tags.delete(tag)"
                >
                  {{ tag }}
                </v-chip>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDialog">
                Kapat
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" type="submit"
                >Ekle
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row class="mt-5 pb-16 fill-height overflow-y-auto">
      <ImageCard
        v-for="img in filteredImages"
        :key="img.name"
        :imageProp="img"
        @onDelete="deleteImage"
      ></ImageCard>
    </v-row>
  </v-container>
</template>

<script>
import ImageCard from "../components/ImageCard.vue";

export default {
  data: () => ({
    dialog: false,
    chip: true,
    tags: new Set(),
    images: [],
    urlError: [],
    nameError: [],
    imageTag: "",
    imageUrl:
      "https://media.istockphoto.com/id/1183329518/tr/foto%C4%9Fraf/kozmik-bulutsu-ve-parlayan-y%C4%B1ld%C4%B1zlar.jpg?b=1&s=612x612&w=0&k=20&c=NyTPV7uYmkWmYypQB9NDwLumi3Rpr2Qj1VdFJpPpdpQ=",
    imageName: "",
    snackbar: false,
    showOnlyFav: false,
    timeout: 1000,
    text: `Resim silindi`,
  }),
  components: {
    ImageCard,
  },
  methods: {
    addImage(e) {
      e.preventDefault();
      if (this.imageUrl == "") {
        this.urlError.push("Lütfen resim url'si giriniz.");
      } else {
        this.urlError = [];
      }

      if (this.imageName == "") {
        this.nameError.push("Lütfen resim adı giriniz.");
      } else {
        this.nameError = [];
      }

      if (this.urlError.length > 0 || this.nameError.length > 0) {
        return false;
      }

      this.dialog = false;
      this.images.push({
        url: this.imageUrl,
        name: this.imageName,
        isLiked: false,
        tags: Array.from(this.tags),
      });
      this.imageUrl =
        "https://media.istockphoto.com/id/1183329518/tr/foto%C4%9Fraf/kozmik-bulutsu-ve-parlayan-y%C4%B1ld%C4%B1zlar.jpg?b=1&s=612x612&w=0&k=20&c=NyTPV7uYmkWmYypQB9NDwLumi3Rpr2Qj1VdFJpPpdpQ=";
      this.imageName = "";
      this.tags.clear();
      return true;
    },
    isLikedFunc(img) {
      img.isLiked = !img.isLiked;
    },
    deleteImage(img) {
      this.snackbar = true;
      this.images.splice(this.images.indexOf(img), 1);
    },
    addTag(e) {
      if ((e.key == "," || e.key == " ") && this.imageTag) {
        this.imageTag = this.imageTag.substring(0, this.imageTag.length - 1);
        this.tags.add(this.imageTag);
        this.imageTag = "";
      }
    },
    closeDialog() {
      this.dialog = false;
      this.imageUrl =
        "https://media.istockphoto.com/id/1183329518/tr/foto%C4%9Fraf/kozmik-bulutsu-ve-parlayan-y%C4%B1ld%C4%B1zlar.jpg?b=1&s=612x612&w=0&k=20&c=NyTPV7uYmkWmYypQB9NDwLumi3Rpr2Qj1VdFJpPpdpQ=";
      this.imageName = "";
      this.tags.clear();
    },
  },
  computed: {
    filteredImages() {
      return this.images.filter((image) => !this.showOnlyFav || image.isLiked);
    },
  },
};
</script>

<style>
</style>