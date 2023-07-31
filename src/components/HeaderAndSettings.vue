<template>
  <StandardHeader>
    <ul class="nav nav-pills padding-left" style="top: 0">
      <li class="w-75 mt-2">
        <router-link :to="{ name: 'Home'}"  class="d-inline-flex link-body-emphasis text-decoration-none">
          <h1 class="title" v-bind:style="{ fontSize: fontSize + 14 + 'px' }">Bürgerbeteiligung</h1>
        </router-link>
      </li>
      <li class="display-right mt-2 pe-5 w-25">
        <div>
          <a class="d-inline-flex link-body-emphasis text-decoration-none" id="open-settings" @:click="showModal(true); setStartFontSettings()">
            <img src="../../files/settings-icon.svg" alt="Open Settings Menu" class="settings-img">
          </a>
        </div>
      </li>
    </ul>

    <!-- Settings menu -->
    <div id="settings-menu" class="settings d-none">
      <!-- Settings content -->
      <div class="modal-content border border-black border-3">
        <h1 v-bind:style="{ fontSize: fontSize + 14 + 'px' }"><img src="../../files/settings-icon.svg" alt="Open Settings Menu" class="settings-img">    Einstellungen</h1>

        <div class="row mt-5">
          <div class="col-5">
            <h3 v-bind:style="{ fontSize: fontSize + 10 + 'px' }">Schriftgröße</h3>
          </div>
          <div class="col-5">
            <button @click="dropdownFontSize = !dropdownFontSize" class="btn btn-outline-dropdown align-items-center mb-2 mb-lg-0 text-decoration-none dropdown-toggle button-size-settings shadow" data-bs-toggle="dropdown" aria-expanded="false" id="filter-size" v-bind:style="{ fontSize: fontSize + 6 + 'px' }">Normal</button>
            <ul v-show="dropdownFontSize" @:mouseleave="dropdownFontSize = false" class="vue-dropdown-menu-settings list-style-none text-small gap-1 p-2 rounded-3 mx-0 shadow w-220px" v-bind:style="{ fontSize: fontSize + 4 + 'px' }" id="size-options">
              <li v-if="screenWidth > 600"><a class="dropdown-item rounded-2" @click="dropdownFontSize = !dropdownFontSize" @:click="filterSize('sehr-klein'); fontSize = 10; applyFontSize(false)" id="sehr-klein">Sehr Klein</a></li>
              <li v-if="screenWidth > 600"><a class="dropdown-item rounded-2" @click="dropdownFontSize = !dropdownFontSize" @:click="filterSize('klein'); fontSize = 14; applyFontSize(false)" id="klein">Klein</a></li>
              <li><a class="dropdown-item rounded-2 active" @click="dropdownFontSize = !dropdownFontSize" @:click="filterSize('normal'); fontSize = 18; applyFontSize(false)" id="normal">Normal</a></li>
              <li><a class="dropdown-item rounded-2" @click="dropdownFontSize = !dropdownFontSize" @:click="filterSize('groß'); fontSize = 20; applyFontSize(false)" id="groß">Groß</a></li>
              <li v-if="screenWidth > 600"><a class="dropdown-item rounded-2" @click="dropdownFontSize = !dropdownFontSize" @:click="filterSize('sehr-groß'); fontSize = 22; applyFontSize(false)" id="sehr-groß">Sehr Groß</a></li>
            </ul>
          </div>
        </div>
        <div class="row mt-3 mb-5">
          <div class="col-5">
            <h3 v-bind:style="{ fontSize: fontSize + 10 + 'px' }">Schriftart</h3>
          </div>
          <div class="col-5">
            <button @click="dropdownFontFamily = !dropdownFontFamily" class="btn btn-outline-dropdown align-items-center mb-2 mb-lg-0 text-decoration-none dropdown-toggle button-size-settings shadow" data-bs-toggle="dropdown" aria-expanded="false" id="filter-font" v-bind:style="{ fontSize: fontSize + 6 + 'px' }">Arial</button>
            <ul v-show="dropdownFontFamily" @:mouseleave="dropdownFontFamily = false" class="vue-dropdown-menu-settings list-style-none text-small gap-1 p-2 rounded-3 mx-0 shadow w-220px" id="font-options" v-bind:style="{ fontSize: fontSize + 4 + 'px' }">
              <li><a class="dropdown-item rounded-2" @click="dropdownFontFamily = !dropdownFontFamily" @:click="filterFont('times')" id="times">Times New Roman</a></li>
              <li><a class="dropdown-item rounded-2" @click="dropdownFontFamily = !dropdownFontFamily" @:click="filterFont('open-dyslexic')" id="open-dyslexic">Open Dyslexic</a></li>
              <li><a class="dropdown-item rounded-2" @click="dropdownFontFamily = !dropdownFontFamily" @:click="filterFont('hel')" id="hel">Helvetica</a></li>
              <li><a class="dropdown-item rounded-2" @click="dropdownFontFamily = !dropdownFontFamily" @:click="filterFont('mon')" id="mon">Monaco</a></li>
              <li><a class="dropdown-item rounded-2 active" @click="dropdownFontFamily = !dropdownFontFamily" @:click="filterFont('arial')" id="arial">Arial</a></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col text-start mt-3">
            <button @click="dropdownFontFamily = false; dropdownFontSize = false; showModal(false); filterSize(font); filterFont(family); applyFontSize(true);" class="btn btn-outline-confirmation link-body-emphasis text-decoration-none shadow-lg cancel" v-bind:style="{ fontSize: fontSize + 14 + 'px' }">Abbrechen</button>
          </div>
          <div class="col text-end mt-3">
            <button @click="dropdownFontFamily = false; dropdownFontSize = false; showModal(false);" class="accept btn btn-outline-confirmation link-body-emphasis text-decoration-none shadow-lg" v-bind:style="{ fontSize: fontSize + 14 + 'px' }">OK</button>
          </div>
        </div>
      </div>
    </div>
  </StandardHeader>
</template>

<script type="module">
import { ref } from 'vue'
import useFontSize from "@/store";
export default {
  StandardHeader: Object,
  data(){
    return{
      dropdownFontFamily: false,
      dropdownFontSize: false,
      open: false,
      font: null,
      family: null,
      screenWidth: ref(screen.width),
      screenHeight: ref(screen.height),
      fontSize: 18,
      oldFontSize: null
    }
  },
  mounted() {
    this.applyFontSize(false)
  },
  methods: {
    /**
     * Save settings when opening settings for cancel button
     */
    setStartFontSettings() {
      document.querySelectorAll('ul#font-options li a').forEach((element) => {
        if (element.classList.contains('active')) {
          this.family = element.id;
        }
      })
      document.querySelectorAll('ul#size-options li a').forEach((element) => {
        if (element.classList.contains('active')) {
          this.font = element.id;
        }
      })
      this.oldFontSize = this.fontSize;
    },
    /**
     * Change visibility
     * @param show : boolean
     */
    showModal (show) {
      const modal = document.getElementById('settings-menu');
      if (show) {
        modal.classList.add('display')
        modal.classList.remove('d-none')
      } else {
        modal.classList.remove('display')
        modal.classList.add('d-none')
      }
    },
    /**
     * change chosen font size
     * @param ident : string id of Size Option
     */
    filterSize(ident) {
      const size = document.getElementById('filter-size');
      const children = document.querySelectorAll('ul#size-options li a');

      size.innerText = document.getElementById(ident).innerText;

      children.forEach((element) => element.classList.remove('active'))
      document.getElementById(ident).classList.add('active');

      useFontSize().setFontSize(this.fontSize)
    },
    /**
     * change chosen font
     * ident: var id of Font Option
     * @param ident : string id of font family
     */
    filterFont(ident) {
      const fonts = document.getElementById('filter-font');
      const children = document.querySelectorAll('ul#font-options li a');

      if (ident === 'arial') {
        fonts.innerHTML = 'Arial';
      } else if (ident === 'open-dyslexic') {
        fonts.innerHTML = 'Open Dyslexic';
      } else if (ident === 'hel') {
        fonts.innerHTML = 'Helvetica';
      } else if (ident === 'mon') {
        fonts.innerHTML = 'Monaco';
      } else {
        fonts.innerHTML = 'Times New Roman';
        ident = 'times';
      }
      children.forEach((element) => element.classList.remove('active'))
      document.getElementById(ident).classList.add('active');

      document.body.style.fontFamily = document.getElementById('filter-font').innerText;
    },
    /**
     * change font sizes according to selection from settings and screen sizes
     * @param res : boolean if font size should be reset
     */
    applyFontSize(res) {
      this.fontSize = useFontSize().fontSize
      if (res) {
        this.fontSize = this.oldFontSize
      }

      if (!(screen.orientation.type === 'landscape-primary' || screen.orientation.type === 'landscape-secondary') && screen.width > '550px') {
        this.fontSize = this.fontSize - 6
      } else if (!(screen.orientation.type === 'landscape-primary' || screen.orientation.type === 'landscape-secondary')) {
        this.fontSize = this.fontSize - 10
      }
      useFontSize().setFontSize(this.fontSize)
    },
  }
}
</script>
