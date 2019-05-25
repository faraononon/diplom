<template>
  <v-content fluid>
    <v-layout row fill-height> 
      <v-flex md2 lg2>
        <v-navigation-drawer
          stateless
          value="true"
        >
          <v-list class="pa-0">
            <v-list-group
              prepend-icon="library_books"
              value="true"
            >
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-title>Справочники</v-list-tile-title>
                </v-list-tile>
              </template>
              <v-list-group
                no-action
                sub-group
                value="true"
              >
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-title>Справочник систем</v-list-tile-title>
                  </v-list-tile>
                </template>

                <v-list-tile
                  v-for="(system, i) in systemArray"
                  :key="i"
                  router :to=system.route
                >
                  <v-list-tile-content>
                      <v-list-tile-title v-text="system.text"></v-list-tile-title>
                  </v-list-tile-content>
                  
                </v-list-tile>
              </v-list-group>

              <v-list-group
                sub-group
                no-action
              >
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-title>Справочник оценивания</v-list-tile-title>
                  </v-list-tile>
                </template>
                <v-list-tile
                  v-for="(item, i) in evaluationArray"
                  :key="i"
                  router :to=item.route
                >
                  <v-list-tile-content>
                      <v-list-tile-title v-text="item.text"></v-list-tile-title>
                  </v-list-tile-content>
                  
                </v-list-tile>
              </v-list-group>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex md10 lg10> 
        <router-view :flag=authenticated></router-view>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script>

import axios from "axios";
import {mapGetters} from "vuex";

export default { 
    mounted() {
      if(!this.directoryShowKey) {
        this.getUserData();
      }
    },
    data() {
        return {
            systemArray: [
                {
                    text: 'Курсы',
                    route: '/directory/course'
                },
                {
                    text: 'Преподаватели',
                    route: '/directory/teachers'
                }
            ],
            evaluationArray: [
                {
                    text: 'Критерии',
                    route: '/directory/criteria'
                },
                {
                    text: 'Субкритерии',
                    route: '/directory/subcriteria'
                },
                {
                    text: 'Аспекты',
                    route: '/directory/aspects'
                }
            ],   
            user: {    
                name: "Jude"   
            }  
        };
    },
    computed: {
      ...mapGetters ([
        'directoryShowKey'
      ]),
      authenticated() {
        return this.directoryShowKey;
      }
    },
    methods: {
      getUserData: function() { 
        debugger;
        let self = this    
        axios.get("http://localhost:8081/api/user", { withCredentials: true })    
          .then((response) => {      
              this.$store.commit('toggleFlag', 'directoryShowKey');  
          })    
          .catch((errors) => {    
          })    
      } 
    }
}
</script>
