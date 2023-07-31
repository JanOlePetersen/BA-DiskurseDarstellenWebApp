<script setup>
import '../assets/main.css';
</script>

<template>
  <div class="bg-body-tertiary mt-5">
    <nav id="top-nav">
      <!-- add search and filter -->
      <div>
        <div class="row nav padding-left pe-5 mt-2 border-bottom border-black">
          <div class="col-5 ps-0 d-inline">
            <form class="shadow project-search d-inline-block" role="search" v-on:keydown.enter.prevent>
              <input v-on:keyup="getDataForFilter()" v-on:mouseup="getDataForFilter()" v-model="search" type="search" class="form-control" id="search-project" placeholder="Suche nach Projekt..." aria-label="Search" v-bind:style="{ fontSize: fontSize + 4 + 'px' }">
            </form>
            <div class="btn btn-outline-dropdown align-items-center text-decoration-none shadow p-0 h-100 m-0 mb-1">
              <img src="../../files/magnifying-glass-solid.svg" alt="suche" class="search-img p-1">
            </div>
          </div>
          <div class="col-1 mb-1">
            <div class=""> <!-- Filter project type "-->
              <button @click="dropdownThemes = !dropdownThemes" class="btn btn-outline-dropdown align-items-center mb-2 mb-lg-0 text-decoration-none dropdown-toggle button-size shadow" id="filter-themes" v-bind:style="{ fontSize: fontSize + 6 + 'px' }">Themen</button>
              <div v-if="screenWidth < screenHeight">
                <ul v-if="filters.length" v-show="dropdownThemes" class="vue-dropdown-menu list-style-none text-small gap-1 p-2 rounded-3 mx-0 shadow w-220px" id="theme-options" v-bind:style="{ fontSize: fontSize + 4 + 'px' }"><!-- TODO design of dropdowns-->
                  <li><a class="dropdown-item rounded-2 active" id="alle-themen" v-on:mousedown="filterTheme('alle-themen'); noneLoaded = false;" v-on:mouseup="getDataForFilter(); dropdownThemes = !dropdownThemes" aria-current="page">Alle Themen</a></li>
                  <li v-for="(filter, index) in filters" :key="index"><a class="dropdown-item rounded-2 noneLoaded = false" v-on:mousedown="filterTheme('filter-theme-' + filter.id);" v-on:mouseup="getDataForFilter(); dropdownThemes = !dropdownThemes" :id="'filter-theme-' + filter.id">{{ filter.name }}</a></li>
                </ul>
              </div>
              <div v-else>
                <ul v-if="filters.length" v-show="dropdownThemes" @:mouseleave="dropdownThemes = false" class="vue-dropdown-menu list-style-none text-small gap-1 p-2 rounded-3 mx-0 shadow w-220px" id="theme-options" v-bind:style="{ fontSize: fontSize + 4 + 'px' }"><!-- TODO design of dropdowns-->
                  <li><a class="dropdown-item rounded-2 active" id="alle-themen" v-on:mousedown="filterTheme('alle-themen'); noneLoaded = false" v-on:mouseup="getDataForFilter()" aria-current="page">Alle Themen</a></li>
                  <li v-for="(filter, index) in filters" :key="index"><a class="dropdown-item rounded-2 noneLoaded = false" v-on:mousedown="filterTheme('filter-theme-' + filter.id);" v-on:mouseup="getDataForFilter()" :id="'filter-theme-' + filter.id">{{ filter.name }}</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-1">
            <div class=""> <!-- Filter active / completed project partizipation -->
              <button @click="dropdownActuality = !dropdownActuality"  class="btn btn-outline-dropdown align-items-center mb-2 mb-lg-0 text-decoration-none dropdown-toggle button-size shadow" data-bs-toggle="dropdown" aria-expanded="false" id="filter-active" v-bind:style="{ fontSize: fontSize + 6 + 'px' }">Beteiligung</button>
              <ul v-show="dropdownActuality" @:mouseleave="dropdownActuality = false" class="vue-dropdown-menu list-style-none text-small gap-1 p-2 rounded-3 mx-0 shadow w-220px" id="active-options"  v-bind:style="{ fontSize: fontSize + 4 + 'px' }">
                <li><a class="dropdown-item rounded-2 active" @mousedown="filterRelevance('alle-projekte'); noneLoaded = false" id="alle-projekte" v-on:mouseup="getDataForFilter(); dropdownActuality = !dropdownActuality;" aria-current="page">Alle Projekte</a></li>
                <li><a class="dropdown-item rounded-2" @mousedown="filterRelevance('aktuelle'); noneLoaded = false" v-on:mouseup="getDataForFilter(); dropdownActuality = !dropdownActuality;" id="aktuelle">Möglich</a></li>
                <li><a class="dropdown-item rounded-2" @mousedown="filterRelevance('abgeschlossene'); noneLoaded = false" v-on:mouseup="getDataForFilter(); dropdownActuality = !dropdownActuality;" id="abgeschlossene">Beendet</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <main class="flex-shrink-0">
    <p class="top-nav-bar-margin-start invisible">padding</p>
    <div v-if="projects">

      <div v-if="projects.length">
        <div class="container mb-5" v-for="project in projects" :key="project.id"><!-- Project display in "Projektsuche" view --><!-- !TODO öffne Projekt in textform-->
          <router-link :to="{name: 'ProjectView', params: {id: project.id}}" class="text-decoration-none">
            <div class="p-5 rounded-3 shadow-lg project-background border border-3" :id="'project-' + project.id">
              <div class="text-center">
                <img v-if="project.projectSearchImage" :src="'../files/' + project.projectSearchImage" class="project-image mb-1" :alt="project.projectSearchImageAltText">
                <div>
                  <ul class="list-style-none d-flex p-0 mb-2">
                    <li class="w-75">
                      <h1 class="text-body-emphasis text-start m-0" :id="'title-' + project.id" v-bind:style="{ fontSize: fontSize + 14 + 'px' }">{{ project.projectName }}</h1>
                    </li>
                    <li class="w-25">
                      <div v-if="project.active === 'Mögliche Beteiligung'" class="d-inline">
                        <p class="filter-item mt-3 float-end text-end" v-bind:style="{ fontSize: fontSize + 'px' }"><fa :icon="['fas', 'lock-open']" style="--fa-primary-color: #000000; --fa-secondary-color: #000000;" />&nbsp;
                          <span :id="'filter-' + project.id + '-actuality'">{{ project.active }}</span><br>
                          <span v-if="project.endDate">bis zum {{ project.endDate }}</span>
                        </p>
                      </div>
                      <div v-if="project.active !== 'Mögliche Beteiligung'" class="d-inline">
                        <p class="filter-item mt-3 float-end text-end" v-bind:style="{ fontSize: fontSize + 'px' }"><fa :icon="['fas', 'lock']" style="--fa-primary-color: #000000; --fa-secondary-color: #000000;"/>&nbsp;
                          <span :id="'filter-' + project.id + '-actuality'">{{ project.active }}</span><br>
                          <span v-if="project.endDate">seit dem {{ project.endDate }}</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <ul class="nav">
                <li class="w-75">
                  <p :id="'descText-' + project.id" v-bind:style="{ fontSize: fontSize + 2 + 'px' }">
                    {{ project.projectDescription }}
                  </p>
                </li>
                <li class="w-25 display-right"><p class="bottom-0 px-2 btn btn-outline-dropdown shadow small" v-bind:style="{ fontSize: fontSize + 2 + 'px' }">Projekt öffnen</p></li>
              </ul>
              <div :id="'filter-' + project.id" style="background-color: inherit" v-if="project">
                <p v-for="(theme, index) in project.themes" :key="index" class="filter-item my-2 d-inline" :id="'filter-' + project.id + '-theme-' + (index + 1)" v-bind:style="{ fontSize: fontSize + 'px' }">{{ filters.at(theme.id).name }}<span v-if="index + 1 < project.themes.length">, </span></p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container my-5" >
        <div class="p-5 rounded-3 shadow-lg project-background project-hover border border-3">
          <div class="text-center">
            <div>
              <ul class="list-style-none">
                <li>
                  <h1 class="text-body-emphasis my-1" v-bind:style="{ fontSize: fontSize + 14 + 'px' }">Lade Projekte ...</h1>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- When no Project is related to filter(s) and searched text show filters and searched text -->
    <div v-if="noneLoaded">
      <div class="container my-5" >
        <div class="p-5 rounded-3 shadow-lg project-background border border-3">
          <div class="text-center">
            <div>
              <ul class="list-style-none text-start">
                <li>
                  <h2 class="text-body-emphasis my-1 text-start text-start" v-bind:style="{ fontSize: fontSize + 12 + 'px' }">Ihre Suche mit</h2>
                  <div v-if="selectedFilters.length > 0 || (actuality.length > 0 && actuality.at(0) !== 'Alle Projekte')">
                    <h2 class="d-inline me-5 text-start" v-bind:style="{ fontSize: fontSize + 12 + 'px' }">den Filtern: </h2><br>
                    <!-- Show Theme filter(s) -->
                    <span v-for="(selected, index) in selectedFilters" :key="index" class="text-decoration-none me-2 active"><span @click="removeFilterTheme('theme-options', selected, false); getDataForFilter()"><img src="../../files/xmark-solid.svg" alt="zeige deaktivierte leichte sprache" class="s-img project-hover fa-border border-black mb-1 marked p-0"></span>&ensp;&ensp;{{ filters.at(selected).name }}<br></span>
                    <!-- Show Actuality filter -->
                    <span class="text-decoration-none active" v-if="actuality.length > 0 && actuality.at(0) !== 'Alle Projekte'"><span @click="filterRelevance(''); getDataForFilter()"><img src="../../files/xmark-solid.svg" alt="zeige deaktivierte leichte sprache" class="s-img project-hover fa-border border-black mb-1 marked p-0"></span>&ensp;&ensp;{{ actuality.toString() }}<br></span>
                    <!-- Offer to delete all Filters -->
                    <span v-if="selectedFilters.length + actuality.length > 1"><br><span @click="filterRelevance('');removeFilterTheme('theme-options', null, true); getDataForFilter()"><img src="../../files/xmark-solid.svg" alt="zeige deaktivierte leichte sprache" class="s-img project-hover fa-border border-black mb-1 marked p-0"></span>&ensp;&ensp;Entferne alle Filter</span>
                  </div>
                  <div v-if="search.length > 0">
                    <!-- Show all searched terms -->
                    <h2 class="d-inline me-5" v-bind:style="{ fontSize: fontSize + 12 + 'px' }"><span v-if="selectedFilters.length > 0">und </span>de<span v-if="search.length > 5">n</span><span v-if="search.length <= 5">m</span> Suchbegriff<span v-if="search.length > 5">en</span>:</h2><br>
                    <a v-for="(item, index) in search" :key="index" class="text-decoration-none">{{ item }}<span> </span></a>
                  </div>
                  <h2 class="text-start" v-bind:style="{ fontSize: fontSize + 12 + 'px' }">stieß auf keine Ergebnisse.</h2>
                  <h4 class="text-start" v-bind:style="{ fontSize: fontSize + 6 + 'px' }"> Versuchen Sie es bitte mit weniger <span v-if="selectedFilters.length > 0">Filtern</span><span v-if="selectedFilters.length > 0 && search.length > 0"> oder</span><span v-if="search.length > 0"> Suchbegriffen</span> erneut.</h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="my-1 invisible">padding</p>
  </main>
</template>

<script>

import {ref} from "vue";
import useFontSize from "@/store";
import markText from "@/assets/markText.js";

export default {
  Projects: Object,
  mounted() {
    fetch('/data/db.json')
        .then((response) => response.json())
        .then(data => {
          this.filters = data.filters;
          this.projects = data.projects;
        })
        .catch(err => console.log(err));
    this.fontSize = useFontSize().fontSize
  },
  data() {
    return{
      filters: [],
      projects: [],
      selectedFilters: [],
      search: [],
      dropdownThemes: false,
      dropdownActuality: false,
      noneLoaded: false,
      actuality: [],
      screenWidth: ref(screen.width),
      screenHeight: ref(screen.height),
      fontSize: null,
    }
  },
  methods: {
    /**
     * functionality to remove all filters from none loaded screen
     * @param id : string html id of filter menu
     * @param item : id of item
     * @param all : boolean delete all filters?
     */
    removeFilterTheme(id, item, all) {
      const possibleThemeElements = document.querySelectorAll('ul#' + id + ' li a');
      const filterID = 'filter-theme-';

      // clear old selectedFilters
      while (this.selectedFilters.length > 0) {
        this.selectedFilters.pop();
      }

      let filters = [];
      possibleThemeElements.forEach((element) => {
        if (element.classList.toString().includes('active')) {
          if (!all) {
            if (element.id === filterID + item) {
              element.classList.remove('active')
            } else {
              filters.push(element.id.replace(filterID,''));
            }
          }
          // if filters are being reset
          else {
            if (element.classList.toString().includes('active')) {
              element.classList.remove('active')
              document.getElementById('alle-themen').classList.add('active')
            }
          }
        }
      })
    },
    /**
     * change visibility of project if filter or search are correct
     * @param project : number project id
     * @param vis : boolean if visible
     */
    changeVisibility (project, vis) {
      if (vis === true) {
        document.getElementById('project-' + project).classList.remove('d-none');
        document.getElementById('project-' + project).classList.add('display');
      } else {
        document.getElementById('project-' + project).classList.remove('display');
        document.getElementById('project-' + project).classList.add('d-none');
      }
    },
    /**
     * Apply filters and search
     * change visibility of Projects depending on filter and search input
     * @param projects : string all data from all projects
     */
    applyFilter(projects) {
      const amount = projects.length
      let projectsLoaded = 0;
      let overlap = 0;

      for(var project = 0; project < amount; project++) {
        let name = document.getElementById('title-' + project);
        let descText = document.getElementById('descText-' + project);

        // check if theme is included
        const rawProjectThemes = document.getElementById('filter-' + project).innerText
                                    .replaceAll('\n','').replaceAll(' ', '');
        let projectThemes = rawProjectThemes.split(',');

        // include all active themes in possibleThemeElements
        const possibleThemeElements = document.querySelectorAll('ul#theme-options li a');
        let possibleThemes = '';
        possibleThemeElements.forEach(function(element) {
          if (element.classList.toString().includes('active')) {
            possibleThemes += element.innerHTML + '_';
          }
        });

        // add all themes to a project that are overlapping with selected theme filter
        const themes = possibleThemes.split('_');
        let themesThatAreIncluded = 0;
        for (let i = 0; i < themes.length; i++) {
          for (let j = 0; j < projectThemes.length; j++) {
            if (themes.at(i).includes(projectThemes.at(j))) {
              themesThatAreIncluded++
            }
          }
        }

        // check if all selected themes are included in project theme list
        for (let i = 0; i < projectThemes.length; i++) {
          let filter = document.getElementById('filter-' + project + '-theme-' + (i + 1))
          if (themes.toString().indexOf(projectThemes.at(i)) > -1) {
            filter.classList.add('green');
          } else {
            filter.classList.remove('green');
          }
        }
        // check if actuality is correct
        const possibleActualityElements = document.querySelectorAll('ul#active-options li a')
        let possibleActuality = null;
        possibleActualityElements.forEach(function(element) {
          if (element.classList.toString().includes('active')) {
            possibleActuality = element.innerHTML;
          }
        });
        const actuality = possibleActuality;

        const projectActuality = document.getElementById('filter-' + project + '-actuality');
        // if themes aren't included in project, don't show project
        if (!(themesThatAreIncluded === themes.length - 1 || themes.at(0).includes('Alle Themen'))) {
          this.changeVisibility(project, false);
        } else if (!(projectActuality.innerHTML.includes(actuality) || actuality === 'Alle Projekte')) {
          this.changeVisibility(project, false);
        } else {
          // mark actuality green in project
          if (actuality !== 'Beteiligung' && actuality !== 'Alle Projekte') {
            projectActuality.classList.add('green')
          } else {
            projectActuality.classList.remove('green')
          }

          // check searched words overlap
          const search = document.getElementById('search-project').value.split(' ');
          const projectName = projects[project]["projectName"];
          const descriptionText = projects[project]["projectDescription"];
          const title = projectName;
          const text = descriptionText;

          overlap = 0;

          // filter Project description with searched text and highlight searched phrases
          let retVal = markText(text, search).split("_");
          descText.innerHTML = retVal.at(0)
          overlap += retVal.at(1)

          // filter Project title with searched text and highlight searched phrases
          retVal = markText(title, search).split("_");
          name.innerHTML = retVal.at(0)
          overlap += retVal.at(1)

          // add overlapping words from search in project description and title
          let check = 0;
          for (let i = 0; i < search.length; i++) {
            if (search[i] !== '') {
              check++;
            }
          }

          // if overlap is large enough show project
          if (overlap >= (check * 0.9)) {
            this.changeVisibility(project, true);
            projectsLoaded++;
          } else {
            this.changeVisibility(project, false);
          }
        }
      }
      return projectsLoaded;
    },
    /**
     * Apply Filter after getting Data fron db.json
     * @returns {Promise<any>}
     */
    getDataForFilter () {
      let projects;

      // get data for filter and apply filters to projects
      return fetch('/data/db.json')
          .then((response) => response.json())
          .then(data => {
            projects = data.projects;
            this.noneLoaded = 0 === this.applyFilter(projects)
          })
          .catch(err => console.log(err));
    },
    /**
     * change actuality filter of chosen element
     * @param ident : string id of html element
     */
    filterRelevance(ident) {
      const children = document.querySelectorAll('ul#active-options li a');
      const activeProjects = document.getElementById('filter-active')

      // change text of actuality filter
      if (ident === 'abgeschlossene') {
        activeProjects.innerHTML = 'Beendet';
      } else if (ident === 'aktuelle') {
        activeProjects.innerHTML = 'Möglich';
      } else {
        activeProjects.innerHTML = 'Beteiligung';
        ident = 'alle-projekte'
      }
      const clickedElement = document.getElementById(ident);
      let wasActive = false;
      if (clickedElement.classList.contains('active') && clickedElement.id !== 'alle-projekte') {
        wasActive = true;
      }
      // remove old actuality
      this.actuality.pop()

      children.forEach((element) => element.classList.remove('active'));

      // add new actuality
      if (wasActive) {
        document.getElementById('alle-projekte').classList.add('active');
        this.actuality.push('Beteiligung')
        activeProjects.innerHTML = 'Beteiligung';
      } else {
        clickedElement.classList.add('active');
        this.actuality.push(clickedElement.innerText)
      }
    },
    /**
     * change theme filter of chosen element
     * @param ident : string id of html element
     */
    filterTheme(ident) {
      if (ident == null) {
        ident = 'alle-themen';
      }

      // remove all active classes if alle-themen is selected
      const children = document.querySelectorAll('ul#theme-options li a');
      if (ident === 'alle-themen') {
        children.forEach((element) => element.classList.remove('active'))
      } else {
        document.getElementById('alle-themen').classList.remove('active')
      }

      // remove selected filters
      while (this.selectedFilters.length > 0) {
        this.selectedFilters.pop();
      }

      // set active or inactive dependant on state
      const element = document.getElementById(ident);
      if (element.classList.contains('active')) {
        element.classList.remove('active');
      } else if (!element.classList.contains('active')) {
        element.classList.add('active');
      }

      // add selected filters
      let hasActiveElement = false;
      for (let i = 0; i < children.length; i++) {
        if (children.item(i).classList.contains('active')) {
          hasActiveElement = true;
          let id = this.filters.at(i - 1).name
          if (id === children.item(i).innerText) {
            this.selectedFilters.push(i - 1)
          }
        }
      }
      // filter "all themes", if no other filter is selected
      if (!hasActiveElement) document.getElementById('alle-themen').classList.add('active')
    }
  }
}
</script>

<style>

</style>