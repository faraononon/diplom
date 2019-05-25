<template>
<v-content>
  <h2 v-if="nameCookie" class="mt-2 mr-3 subheading text-xs-right d-block">Добро пожаловать, {{nameCookie}}</h2>
  <v-layout row align-center justify-space-around fill-height wrap> 
    <v-flex v-for="item of array" :key="item.text" xs12 md4 lg3>
      <v-card class="px-5 py-5">
        <v-card-title class="headline font-italic font-weight-light">{{item.title}}</v-card-title>
        <v-btn block dark color="blue lighten-2" large outline round router :to=item.route>
          <v-icon left>{{item.icon}}</v-icon>
          {{item.text}}
        </v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</v-content>
    
</template>
<script>

  import {mapState} from 'vuex';

  export default {
    name: 'home',
    data() {
      return {
        array: [
          {
            title: 'Справочники',
            text: 'Редактировать справочники',
            icon: 'assignment',
            route: '/directory'
          },
          {
            title: 'Экспертиза',
            text: 'Провести экспертизу',
            icon: 'search',
            route: '/expertise'
          },
          {
            title: 'Отчёты',
            text: 'Посмотреть отчёты',
            icon: 'description',
            route: '/reports'
          }
        ]
      }
    },
    computed: {
    ...mapState ([
        'flagForAuth'
    ]),
      nameCookie() {
        if(this.flagForAuth) {
          return this.$cookies.get('name');
        }
        }
      }
    }
</script>
