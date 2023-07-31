<script setup>
import '../assets/main.css'
</script>

<template>
  <header class="bg-body-tertiary">
    <nav id="top-nav" style="top: 56px">
      <!-- add search and Leichte Sprache button -->
      <div class="row mt-2 padding-left border-bottom border-black" id="project-nav">
        <div class="col-5 ps-0 d-inline">
          <router-link to="/" class="text-decoration-none btn btn-outline-dropdown align-items-center mb-lg-0 text-decoration-none shadow small w-75 text-start" v-bind:style="{ fontSize: fontSize + 'px' }">Suche neues Projekt</router-link>
          <div class="mt-1 h-50">
            <form class="w-75 shadow medium-width project-search d-inline-block" role="search" v-on:keydown.enter.prevent>
              <input type="search" class="form-control small" id="search-in-project" v-on:keyup="applySearch()" v-on:focusout="applySearch()" placeholder="Suche Informationen..." aria-label="Search" v-bind:style="{ fontSize: fontSize + 4 + 'px' }">
            </form>
            <div class="btn btn-outline-dropdown align-items-center text-decoration-none shadow p-0 m-0 mb-1 search-btn-size">
              <img src="../../files/magnifying-glass-solid.svg" alt="suche" class="search-img p-1 search">
            </div>
          </div>
        </div>
        <div class="col-1 text-end">
          <label class="toggle" id="leichte-sprache">
            <input class="toggle-checkbox" type="checkbox">
            <div v-if="!simple" class="btn btn-outline-dropdown align-items-center link-body-emphasis text-decoration-none shadow" @:mouseup="simple = true;" v-on:mouseleave="applySearch()" v-bind:style="{ fontSize: fontSize + 4 + 'px' }"><img src="../../files/xmark-solid.svg" alt="zeige deaktivierte leichte sprache" class="s-img"> Leichte Sprache</div>
            <div v-if="simple" class="btn btn-outline-dropdown align-items-center link-body-emphasis text-decoration-none shadow green" @:mouseup="simple = false;" v-on:mouseleave="applySearch();" v-bind:style="{ fontSize: fontSize + 4 + 'px' }"><img src="../../files/check-solid.svg" alt="zeige aktivierte leichte sprache" class="s-img"> Leichte Sprache</div>
          </label>
        </div>
      </div>
    </nav>
  </header>

  <main class="flex-shrink-0">
    <p class="top-nav-bar-margin invisible">padding</p>

    <div class="mb-1 p-0 container" v-if="project"><h4 v-bind:style="{ fontSize: fontSize + 6 + 'px' }"><router-link :to="{ name: 'Home'}" class="link-hover ms-3">Startseite</router-link> / {{ project.projectName }}</h4></div>

    <div v-if="project">
      <div class="container">
        <div class="p-5 rounded-3 shadow-lg project-background border border-3" id="project">
          <div class="row p-0 m-0">
            <div class="col-8 ps-0">
              <h1 v-bind:style="{ fontSize: fontSize + 14 + 'px' }">{{ project.projectName }}</h1>
            </div>
            <div class="col-4 text-end p-0" v-if="filters">
              <div class="small"><span>Themen des Projekts: </span><span v-for="(theme, index) in project.themes" :key="index" class="small my-2 d-inline" :id="'filter-' + project.id + '-theme-' + theme.id">{{ filters.at(theme.id).name }}<span v-if="index + 1 < project.themes.length">, </span></span></div>
            </div>
          </div>

          <div class="small">
            {{ project.projectDescription }}
          </div>

          <!-- Add information of project -->
          <div v-for="(inf, index) in info" :key="index">
            <h2 v-text="inf.name" class="mt-4 title-search" v-bind:style="{ fontSize: fontSize + 12 + 'px' }"></h2>
            <div class="row" v-if="inf.contentRight.length > index -1">
              <div class="my-col" >
                <div v-for="(text, ind) in inf.contentLeft" :key="ind" v-bind:style="{ fontSize: fontSize + 2 + 'px' }">
                  <p class="normal" v-if="!simple" v-html="text.normal"></p>
                  <p class="simple" v-if="simple" v-html="text.simple"></p>
                </div>
              </div>
              <div class="my-col">
                <div v-for="(img, ind) in inf.contentRight" :key="ind" v-bind:style="{ fontSize: fontSize + 'px' }">
                  <img v-if="img.src || img.alt" :src="'../files/' + img.src" class="w-100 h-100" :alt="img.alt">
                  <p class="normal" v-if="!simple" v-html="img.normal"></p>
                  <p class="simple" v-if="simple" v-html="img.simple"></p>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="col" >
                <div v-for="(text, ind) in inf.contentLeft" :key="ind" v-bind:style="{ fontSize: fontSize + 2 + 'px' }">
                  <p class="normal" v-if="!simple" v-html="text.normal"></p>
                  <p class="simple" v-if="simple" v-html="text.simple"></p>
                </div>
              </div>
            </div>
            <!-- Add related files for download -->
            <div v-if="inf.files">
              <div v-for="(file, ind) in inf.files" :key="ind" class="p-1 shadow download m-2" v-bind:style="{ fontSize: fontSize + 2 + 'px' }">
                <a class="mt-1 text-decoration-none" :href="'../files/' + file.location" download><img :src="'../files/download-solid.svg'" class="s-img" alt="dokument herunterladen" v-bind:style="{ fontSize: fontSize + 6 + 'px' }">{{ file.name }}</a>
              </div>
            </div>
          </div>

          <!-- Add related projects -->
          <div v-if="project.relatedProjects.projects">
            <h3 class="mb-3 mt-5" v-bind:style="{ fontSize: fontSize + 10 + 'px' }">{{ project.relatedProjects.name }}</h3>
            <div class="in-project-width mb-4 ms-auto me-auto" v-for="(pro, idx) in project.relatedProjects.projects" :key="idx">
              <!-- link to related Project -->
              <router-link :to="{name: 'ProjectView', params: {id: pro.id}}"  class="text-decoration-none">
                <div class="p-5 rounded-3 shadow project-background border border-3" :id="'project-' + projects[pro.id].id">
                  <ul class="list-style-none d-flex p-0">
                    <li class="w-75">
                      <h1 class="text-body-emphasis text-start" :id="'title-' + projects[pro.id].id" v-bind:style="{ fontSize: fontSize + 14 + 'px' }">{{ projects[pro.id].projectName }}</h1>
                    </li>
                    <li class="w-25">
                      <div v-if="projects[pro.id].active === 'Mögliche Beteiligung'" class="d-inline">
                        <p class="filter-item mt-3 float-end text-end" v-bind:style="{ fontSize: fontSize + 'px' }"><fa :icon="['fas', 'lock-open']" style="--fa-primary-color: #000000; --fa-secondary-color: #000000;" />&nbsp;
                          <span :id="'filter-' + projects[pro.id].id + '-actuality'" class="">{{ projects[pro.id].active }}</span><br>
                          <span class=" " v-if="projects[pro.id].endDate">bis zum {{ projects[pro.id].endDate }}</span>
                        </p>
                      </div>
                      <div v-if="projects[pro.id].active !== 'Mögliche Beteiligung'" class="d-inline">
                        <p class="filter-item mt-3 float-end text-end" v-bind:style="{ fontSize: fontSize + 'px' }"><fa :icon="['fas', 'lock']" style="--fa-primary-color: #000000; --fa-secondary-color: #000000;" />&nbsp;
                          <span :id="'filter-' + projects[pro.id].id + '-actuality'">{{ projects[pro.id].active }}</span><br>
                          <span v-if="projects[pro.id].endDate">seit dem {{ projects[pro.id].endDate }}</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                  <ul class="nav">
                    <li class="w-75">
                      <p :id="'descText-' + project.id" v-bind:style="{ fontSize: fontSize + 2 + 'px' }">
                        {{ project.projectDescription }}
                      </p>
                    </li>
                    <li class="w-25 display-right"><p class="bottom-0 px-2 btn btn-outline-dropdown shadow small" v-bind:style="{ fontSize: fontSize + 2 + 'px' }">Projekt öffnen</p></li>
                  </ul>
                  <div :id="'filter-' + projects[pro.id].id" style="background-color: inherit" v-if="projects[pro.id]">
                    <p v-for="(theme, index) in projects[pro.id].themes" :key="index" class="filter-item my-2 d-inline" :id="'filter-' + projects[pro.id].id + '-theme-' + (index + 1)" v-bind:style="{ fontSize: fontSize + 'px' }">{{ filters.at(theme.id).name }}<span v-if="index + 1 < project.themes.length">, </span></p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div v-else>
      <div class="container my-5">
        <div class="p-5 rounded-3 shadow-lg project-background border border-3" id="project">
          <h1 v-bind:style="{ fontSize: fontSize + 14 + 'px' }">Lade Projekt ...</h1>
        </div>
      </div>
    </div>


    <p class="my-1 invisible">padding</p>
  </main>
</template>

<script>
import useFontSize from "@/store";
import markText from "@/assets/markText.js";
export default {
  props: ['id'],
  mounted() {
    fetch('../data/db.json')
        .then((response) => response.json())
        .then(data => {
          this.project = data.projects[this.id];
          this.filters = data.filters;
          this.info = this.project.information;
          this.projects = data.projects;
          this.adresse = this.project.onlineAddress;
        })
        .catch(err => console.log(err));
    this.fontSize = useFontSize().fontSize
  },
  data() {
    return {
      project: null,
      projects: null,
      filters: null,
      info: null,
      simple: false,
      search: false,
      adresse: null,
      fontSize: null
    }
  },
  methods: {
    /**
     * remove span and a for marking searched text
     * @param item : var of element that is searched
     * @param search : string searched words and letters
     */
    getText (item, search) {
      if (item.length > 0) {
        for (let i = 0; i < item.length; i++) {
          if (item[i].innerHTML.includes('<a href="')) {
            item.item(i).innerHTML = markText(item[i].innerHTML
                // remove link from search
                .replace('<a href="' + this.adresse + '" target="_blank" class="text-decoration-underline link-hover">', '').replace('</a>', ''), search).split('_').at(0)
                // add link back !important link must be around "hier" and no other "hier" may be in the same segment
                .replace('hier', '<a href="' + this.adresse + '" target="_blank" class="text-decoration-underline link-hover">hier</a>');
          } else {
            item.item(i).innerHTML = markText(item[i].innerHTML, search).split('_').at(0);
          }
        }
      }
    },
    /**
     * filter through projects with input from searchbar
     */
    applySearch () {
      const search = document.getElementById('search-in-project').value.split(' ');
      const simple = document.getElementsByClassName('simple');
      const normal = document.getElementsByClassName('normal');
      const title = document.getElementsByClassName('title-search');

      this.getText(simple, search);
      this.getText(normal, search);
      this.getText(title, search);
    }
  }
}
</script>

<style>

</style>
