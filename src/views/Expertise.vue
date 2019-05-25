<template>
    <v-content>
        <v-layout align-center justify-center fill-height>
            <v-flex lg8 md8 xs12>
                <v-card>
                    <v-card-title class="display-2 d-block text-lg-center">Экспертиза курса</v-card-title>
                    <v-card-actions>
                        <v-layout column fill-height> 
                            <v-flex>
                                <v-select :items="courses"
                                          v-model="dataAboutCourse.course"
                                          @change="giveOtherParameters($event)"
                                          label="Название курса"
                                          v-validate="'required'"
                                          :error-messages="errors.collect('name')"
                                          data-vv-name="name"
                                          ></v-select>
                            </v-flex>
                            <v-flex>
                                <v-text-field disabled v-model="dataAboutCourse.author" label="Автор"></v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-text-field disabled v-model="dataAboutCourse.numOfZE" label="Количество ЗЕ"></v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-select :items="Expert"
                                          v-model="dataAboutCourse.expertOne"
                                          label="Эксперт 1"
                                          v-validate="'required'"
                                          :error-messages="errors.collect('expert')"
                                          data-vv-name="expert"
                                          ></v-select>
                            </v-flex>
                            <v-flex>
                                <v-select :items="Expert"
                                          v-model="dataAboutCourse.expertTwo"
                                          label="Эксперт 2"
                                          v-validate="'required'"
                                          :error-messages="errors.collect('expert2')"
                                          data-vv-name="expert2"
                                          ></v-select>
                            </v-flex>
                            <v-flex lg8 md8>
                                <v-btn @click="submit" color="light-green darken-1" block large outline round>Провести экспертизу</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        
    </v-content>
</template>
<script>
import {mapGetters} from 'vuex';
import { debug } from 'util';

export default { 
    created() {
        this.$store.dispatch("getData", {type: 'ECourse', data: 'dataFromDB'});
        this.$store.dispatch("getData", {type: 'Teachers', data: 'teachersInfo'});
    },
    mounted() {
      this.$validator.localize('ru', this.dict);
    },
    computed: {
        ...mapGetters ([
            'dataFromDB',
            'teachersInfo',
            'dict',
            'intermediateData'
        ]),
        courses() {
            let obj = this.dataFromDB;
            let array = [];
            for(let prop in obj) {
                array.push(obj[prop].CourseName);
            }
            return array;
        },
        Expert() {
            let obj = this.teachersInfo;
            let array = [];
            for(let prop in obj) {
                if(obj[prop].Expert === 1) {
                    let fio = `${obj[prop].Surname} ${obj[prop].Name} ${obj[prop].Partonymic}`;
                    array.push(fio);
                } 
            }
            return array;
        }
    },
    data() {
        return {
            dataAboutCourse: {
                course: '',
                expertOne: '',
                expertTwo: '',
                author: '',
                numOfZE: '',
            }
        }
    },
    methods: {
        submit() {
            this.$validator.validateAll().then(valid => {
              if (valid) {
                Object.assign(this.intermediateData, this.dataAboutCourse);
                console.log(this.intermediateData);
                this.$router.push('/expertise-result');
              }
            })
        },

        giveOtherParameters(e) {
            let dataFilter = this.dataFromDB.filter(obj => {
                return obj.CourseName === e;
            });

            this.teachersInfo.forEach((item, i, arr) => {
                if(item.idTeacher === dataFilter[0].Developer) {
                    this.dataAboutCourse.author = `${item.Surname} ${item.Name} ${item.Partonymic}`;
                }
            });
            this.dataAboutCourse.numOfZE = dataFilter[0].NumberOfZE;
        }
    }
}
</script>
