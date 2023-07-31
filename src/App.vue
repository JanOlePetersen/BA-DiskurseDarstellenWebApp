<script setup>
import { RouterView } from 'vue-router'
import StandardHeader from './components/HeaderAndSettings.vue'
</script>

<template>

  <header class="bg-body-tertiary">
    <nav class="fixed-top"> <!-- Top navigation bar -->
      <!-- add part of header for all html sites -->
      <StandardHeader />
    </nav>
  </header>

  <RouterView :key="$route.fullPath"/>

  <footer class="footer mt-auto bg-body-tertiary my-4">
    <nav id="bottom-nav">
      <ul class="nav justify-content-center border-top border-black pb-1 pt-1">
        <li><router-link :to="{ name: 'Home'}" class="btn btn-outline-dropdown px-2 fw-bold shadow footer-size">Startseite</router-link></li>
        <li><router-link :to="{ name: 'Impressum'}" class="btn btn-outline-dropdown px-2 fw-bold shadow ms-2 me-2 footer-size">Impressum</router-link></li>
        <li><router-link :to="{ name: 'Datenschutz'}" class="btn btn-outline-dropdown px-2 shadow fw-bold footer-size">Datenschutz</router-link></li>
      </ul>
    </nav>
  </footer>

</template>