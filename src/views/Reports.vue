<template>
  <v-content fluid class="pa-5">
    <v-card class="pa-3">
      <v-card-title class="display-1">Все курсы</v-card-title>
      <v-data-table
      :headers="headers"
      :items="dataFromDB"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.CourseName }}</td>
        <td>{{ props.item.Teacher }}</td>
        <td>{{ props.item.Expert }}</td>
        <td>{{ props.item.ExpertTwo }}</td>
        <td>{{ props.item.NunberOfZE }}</td>
        <td>{{ props.item.Criterion }}</td>
        <td>{{ props.item.Subcriterion }}</td>
        <td>{{ props.item.Aspect }}</td>
        <td>{{ props.item.Value }}</td>
      </template>
    </v-data-table>
    <v-layout row fill-height class="pt-5">
      <v-flex md3 lg3 xs12>
        <v-btn color="light-green darken-1" large outline>Отчёт за период</v-btn>
        <v-layout>
          <v-flex xs12 sm6 md4 class="pr-4">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date2"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date2" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md4 lg4 xs12>
        <v-btn color="light-green darken-1" large outline>Список курсов не прошедших экспертизу</v-btn>
      </v-flex>
      <v-flex md4 lg4 xs12>
        <v-btn color="light-green darken-1" large outline>Список курсов ожидающих экспертизу</v-btn>
      </v-flex>
    </v-layout>
    </v-card>
    
  </v-content>
</template>
<script>
import {mapGetters} from 'vuex';

export default { 
    created() {
      this.$store.dispatch("getData", {type: 'CourseExamination', data: 'dataFromDB'});
    },
    computed: {
      ...mapGetters ([
          'dataFromDB'
      ])
    },
    data () {
      return {
        date: new Date().toISOString().substr(0, 10),
        date2: new Date().toISOString().substr(0, 10),
        menu: false,
        menu2: false,
        headers: [
          { text: 'Название курса', value: 'CourseName' },
          { text: 'Преподаватель', value: 'Teacher' },
          { text: 'Эксперт 1', value: 'Expert' },
          { text: 'Эксперт 2', value: 'ExpertTwo' },
          { text: 'Количество ЗЕ', value: 'NunberOfZE' },
          { text: 'Критерий', value: 'Criterion' },
          { text: 'Субкритерий', value: 'Subcriterion' },
          { text: 'Аспект', value: 'Aspect' },
          { text: 'Оценка', value: 'Value' }
        ]
      }
    }
}
</script>
