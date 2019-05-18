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
    </v-toolbar-items>
  </v-toolbar>
</template>