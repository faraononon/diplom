<template>
  <v-toolbar dark color="cyan lighten-1">
    <v-btn fab flat to="/">
        <v-icon>home</v-icon>
    </v-btn>
    <v-toolbar-title class="display-1">Система экспертного оценивания</v-toolbar-title>
    
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to="/directory">Справочники</v-btn>
      <v-btn flat to="/expertise">Экспертиза</v-btn>
      <v-btn flat to="/reports">Отчёты</v-btn>
      <v-btn v-if="nameCookie" flat @click="logout">Выйти</v-btn>
      <v-btn v-else flat to="/login">Войти</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>

import {mapState} from 'vuex';
import axios from "axios";

export default {
  computed: {
    ...mapState ([
            'flagForAuth',
        ]),
    nameCookie() {
      debugger;
      return this.flagForAuth;
    }
  },
  methods: {
      logout: function() { 
        axios.get("http://localhost:8081/api/logout", { withCredentials: true })    
          .then((response) => {
              this.$store.commit('toggleFlag', 'flagForAuth');
              this.$store.commit('toggleFlag', 'directoryShowKey');  
              this.$cookies.remove('name'); 
              this.$cookies.remove('mysession'); 
              this.$cookies.remove('mysession.sig'); 
          })    
          .catch((errors) => {    
              console.log(errors);
          })    
      } 
    } 
}
</script>