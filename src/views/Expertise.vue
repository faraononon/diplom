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
                                          v-model="dataAboutCourse.CourseName"
                                          @change="giveOtherParameters($event)"
                                          label="Название курса"
                                          v-validate="'required'"
                                          :error-messages="errors.collect('name')"
                                          data-vv-name="name"
                                          ></v-select>
                            </v-flex>
                            <v-flex>
                                <v-text-field disabled v-model="dataAboutCourse.Teacher" label="Автор"></v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-text-field disabled v-model="dataAboutCourse.NumberOfZE" label="Количество ЗЕ"></v-text-field>
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
                            <v-flex>
                                <v-text-field v-model="dataAboutCourse.protocolNum" 
                                                label="Номер протокола экспертной оценки"
                                                v-validate="'required'"
                                                :error-messages="errors.collect('discipline')"
                                                data-vv-name="discipline"></v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-text-field v-model="dataAboutCourse.protocolDate" 
                                                label="Дата протокола"
                                                mask="##.##.####"
                                                return-masked-value
                                                v-validate="'required'"
                                                :error-messages="errors.collect('dischargeDate')"
                                                data-vv-name="dischargeDate"
                                                ></v-text-field>
                            </v-flex>
                            <v-flex lg8 md8>
                                <v-btn @click="submit" color="light-green darken-1" block large outline round>Провести экспертизу</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" max-width="400px">
            <v-card>
                <v-card-title class="d-block text-lg-center">
                    <span class="headline">Внимание!</span>
                </v-card-title>
                <v-card-text class="subheading d-block text-lg-center">Эксперты должны быть разные.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    color="green darken-1"
                    flat="flat"
                    large
                    @click="close"
                >
                    Закрыть
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
            'rowData',
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
                CourseName: '',
                expertOne: '',
                expertTwo: '',
                Teacher: '',
                NumberOfZE: '',
                protocolNum: '',
                protocolDate: ''
            },
            dialog: false,
        }
    },
    methods: {
        close: function() {
            this.dialog = false;
        },
        submit() {
            this.$validator.validateAll().then(valid => {
                if (valid) {
                    if(this.dataAboutCourse.expertOne !== this.dataAboutCourse.expertTwo) {
                        this.teachersInfo.forEach((item, i, arr) => {
                            if(!Number(this.dataAboutCourse.Teacher) && this.dataAboutCourse.Teacher.indexOf(item.Surname) !== -1) {
                                this.dataAboutCourse.Teacher = item.idTeacher;
                            }
                        });
                        this.teachersInfo.forEach((item, i, arr) => {
                            if(!Number(this.dataAboutCourse.expertOne) && this.dataAboutCourse.expertOne.indexOf(item.Surname) !== -1) {
                                this.dataAboutCourse.expertOne = item.idTeacher;
                            } else if(!Number(this.dataAboutCourse.expertTwo) && this.dataAboutCourse.expertTwo.indexOf(item.Surname) !== -1) {
                                this.dataAboutCourse.expertTwo = item.idTeacher;
                            }
                        });
                        Object.assign(this.intermediateData, this.dataAboutCourse);
                        let objectForExpertOpinion = {
                            NumProtocol: this.dataAboutCourse.protocolNum,
                            DateProtocol: this.dataAboutCourse.protocolDate,
                            CourseName: this.dataAboutCourse.CourseName
                        }
                        debugger;
                        let pastArray = objectForExpertOpinion.DateProtocol.split(".");
                        objectForExpertOpinion.DateProtocol = pastArray.reverse().join("-");
                        console.log(objectForExpertOpinion);
                        console.log(this.intermediateData);
                        Object.assign(this.rowData, objectForExpertOpinion);
                        this.$store.dispatch('createNewRow', 'ExpertOpinion');
                        this.$router.push('/expertise-result');
                    } else {
                        this.dialog = true;
                    }
                }
            })
        },

        giveOtherParameters(e) {
            let dataFilter = this.dataFromDB.filter(obj => {
                return obj.CourseName === e;
            });

            this.teachersInfo.forEach((item, i, arr) => {
                if(item.idTeacher === dataFilter[0].Developer) {
                    this.dataAboutCourse.Teacher = `${item.Surname} ${item.Name} ${item.Partonymic}`;
                }
            });
            this.dataAboutCourse.NumberOfZE = dataFilter[0].NumberOfZE;
        }
    }
}
</script>
