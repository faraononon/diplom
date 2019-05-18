<template>
    <v-content>
        <v-layout align-center justify-center fill-height>
            <v-flex lg8 md8 xs12>
                <v-card>
                    <v-card-title class="display-2 d-block text-lg-center">Экспертиза курса</v-card-title>
                    <v-card-actions>
                        <v-layout column fill-height> 
                            <v-flex>
                                <v-select :rules="[v => !!v || 'Поле обязательное к заполнению']" required :items="courses" @change="giveOtherParameters($event)" label="Название курса"></v-select>
                            </v-flex>
                            <v-flex>
                                <v-text-field disabled v-model="author" label="Автор"></v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-text-field disabled v-model="numOfZE" label="Количество ЗЕ"></v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-select :rules="[v => !!v || 'Поле обязательное к заполнению']" required :items="Expert" label="Эксперт 1"></v-select>
                            </v-flex>
                            <v-flex>
                                <v-select :rules="[v => !!v || 'Поле обязательное к заполнению']" required :items="Expert" label="Эксперт 2"></v-select>
                            </v-flex>
                            <v-flex lg8 md8>
                                <v-btn color="light-green darken-1" block large outline round to="/expertise-result">Провести экспертизу</v-btn>
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

export default { 
    created() {
        this.$store.dispatch("getData", {type: 'ECourse', data: 'dataFromDB'});
        this.$store.dispatch("getData", {type: 'Teachers', data: 'teachersInfo'});
    },
    computed: {
        ...mapGetters ([
            'dataFromDB',
            'teachersInfo'
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
            author: '',
            numOfZE: '',
        }
    },
    methods: {
        giveOtherParameters(e) {
            let bla = this.dataFromDB.filter(obj => {
                return obj.CourseName === e;
            });

            this.teachersInfo.forEach((item, i, arr) => {
                if(item.idTeacher === bla[0].Developer) {
                    this.author = `${item.Surename} ${item.Name} ${item.Partonymic}`;
                }
            });

            this.numOfZE = bla[0].NumberOfZE;
        }
    }
}
</script>
