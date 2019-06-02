<template>
  <v-content fluid class="pa-5">
    <v-card class="pa-3">
      <v-card-title class="display-1">Все курсы</v-card-title>
      <v-data-table
      :headers="headers"
      :items="list"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.CourseName }}</td>
        <td>{{ props.item.Teacher }}</td>
        <td>{{ props.item.NumberOfZE }}</td>
        <td>{{ props.item.ExpertOne }}</td>
        <td>{{ props.item.ExpertTwo }}</td>
        <td>{{ props.item.Value }}</td>
        <td>{{ props.item.date }}</td>
      </template>s
    </v-data-table>
    <v-layout row fill-height class="pt-5">
      <v-flex md3 lg3 xs12>
        <v-btn color="light-green darken-1" @click="coursesInPeriod" large outline>Отчёт за период</v-btn>
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
              <v-date-picker locale="ru" v-model="date" @input="menu = false"></v-date-picker>
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
              <v-date-picker locale="ru" v-model="date2" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md4 lg4 xs12>
        <v-btn color="light-green darken-1" @click="notExpertisedCourses" large outline>Список курсов не прошедших экспертизу</v-btn>
      </v-flex>
      <v-flex md4 lg4 xs12>
        <v-btn color="light-green darken-1" @click="waitingExpertiseCourses" large outline>Список курсов ожидающих экспертизу</v-btn>
      </v-flex>
    </v-layout>
    </v-card>
    
  </v-content>
</template>
<script>
import {mapGetters} from 'vuex';

export default { 
    created() {
      this.$store.dispatch("getReportsData");
      this.$store.dispatch("getData", {type: 'ECourse', data: 'courseInfo'});
      this.$store.dispatch("getData", {type: 'ExpertOpinion', data: 'expertInfo'});
    },
    computed: {
      ...mapGetters ([
          'dataFromDB',
          'courseInfo',
          'expertInfo'
      ]),

      list() {
        if(this.dataFromDB.length > 0 && this.expertInfo.length) {
          this.dataFromDB.forEach(item => {
            this.expertInfo.forEach(expertItem => {
              if(expertItem.CourseName === item.CourseName) {
                 let pastArray = expertItem.DateProtocol.split("-");
                  pastArray[2] = +(pastArray[2].slice(0,2)).toString();
                  expertItem.DateProtocol = pastArray.join("-");
                  item.date = expertItem.DateProtocol;
              }
            });
          });
          return this.dataFromDB;
        }
      }
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
          { text: 'Количество ЗЕ', value: 'NumberOfZE' },
          { text: 'Эксперт 1', value: 'ExpertOne' },
          { text: 'Эксперт 2', value: 'ExpertTwo' },
          { text: 'Оценка', value: 'Value' },
          { text: 'Дата экспертной оценки', value: 'date' }
        ]
      }
    },
    methods: {
      notExpertisedCourses() {
        this.$store.commit('selectNotPassedExamItems');
      },
      waitingExpertiseCourses() {
        this.$store.commit('waitingExpertiseItems');
      },
      coursesInPeriod() {
        // console.log(this.list); НАДО ЧЕКНУТЬ
        this.$store.commit('computeExpertiseDates', {dateFrom: this.date, dateTo: this.date2});
      }
    }
}
</script>
