<template>
  <main class="flex-shrink-0">
    <p class="my-4 invisible">padding</p>

    <div class="mb-1 p-0 pages container"  v-bind:style="{ fontSize: fontSize + 6 + 'px' }"><router-link :to="{ name: 'Home'}" class="link-hover ms-3">Startseite</router-link> / Impressum</div>

    <div class="container">
      <div class="p-5 rounded-3 shadow-lg project-background border border-3">
        <div class="text-center">
          <h1 class="text-body-emphasis" v-bind:style="{ fontSize: fontSize + 14 + 'px' }">Impressum</h1>
        </div>

        <div  v-bind:style="{ fontSize: fontSize + 4 + 'px' }">
          Diese Website ist im Rahmen der Bachelorarbeit von Jan Ole Petersen im Studiengangs Medieninformatik an der Universität zu Lübeck entstanden. <br>
          <br>
          Die Webseite wird vom Joint Innovation Lab der Universität zu Lübeck gehostet. Das JIL Impressum finden Sie <a href="https://jil.sh/?page_id=401" target="_blank" class="text-decoration-underline">hier</a>.<br>
          <br>
          Kontakt<br>
          E-Mail: jan.petersen@student.uni-luebeck.de<br>
          <br>
        </div>
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