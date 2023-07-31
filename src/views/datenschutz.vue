<template>
  <main class="flex-shrink-0">
    <p class="my-4 invisible">padding</p>

    <div class="mb-1 p-0 pages container" v-bind:style="{ fontSize: fontSize + 6 + 'px' }"><router-link :to="{ name: 'Home'}" class="link-hover ms-3">Startseite</router-link> / Datenschutz</div>

    <div class="container ">
      <div class="p-5 rounded-3 shadow-lg project-background border border-3">
        <div class="text-center">
          <h1 class="text-body-emphasis" v-bind:style="{ fontSize: fontSize + 14 + 'px' }">Datenschutz</h1>
        </div>
        <p class="lead my-2"  v-bind:style="{ fontSize: fontSize + 4 + 'px' }">
          Es werden keine Nutzerdaten erhoben.
        </p>

        <div class="text-center mt-5">
          <h1 class="text-body-emphasis">Copyright</h1>
        </div>
        <h4 class="lead mb-2 mt-3" v-bind:style="{ fontSize: fontSize + 6 + 'px' }">
          Bilder
        </h4>
        <p  v-bind:style="{ fontSize: fontSize + 4 + 'px' }">
          Bilder der Projekte Renovierung der Burg, Parkanlage Burg und Museumsbau sind von <a href="https://www.pexels.com" target="_blank" class="text-decoration-underline">Pexels</a>.
        </p>
        <h4 class="lead mb-2 mt-3" v-bind:style="{ fontSize: fontSize + 6 + 'px' }">
          Karten
        </h4>
        <p v-bind:style="{ fontSize: fontSize + 4 + 'px' }">
          Karten der Projekte Renovierung der Burg, Parkanlage Burg und Museumsbau sind von <a href="https://www.openstreetmap.org/copyright" target="_blank" class="text-decoration-underline">OpenStreetMap</a>.
        </p>
      </div>
    </div>

    <p class="my-3 invisible">padding</p>
  </main>
</template>

<script>
import useFontSize from "@/store";
export default {
  mounted() {
    this.fontSize = useFontSize().fontSize
  },
  data() {
    return {
      fontSize: null
    }
  }
}
</script>