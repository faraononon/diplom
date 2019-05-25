<template>
  <div class="pa-4">  
  <h2 class="display-2 mb-4 text-xs-center">Курсы</h2>
    <v-data-table
      :headers="headers"
      :items="dataFromDB"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.CourseName }}</td>
        <td>{{ props.item.Discipline }}</td>
        <td>{{ props.item.Direction }}</td>
        <td>{{ props.item.NumberOfHours }}</td>
        <td>{{ props.item.NumberOfLectures }}</td>
        <td>{{ props.item.NumberOfPractice }}</td>
        <td>{{ props.item.NumberOfZE }}</td>
        <td>{{ props.item.Developer }}</td>
        <td>{{ props.item.URL_addressOfAuthorship }}</td>
        <td>{{ props.item.CurriculumName }}</td>
        <td>{{ props.item.NumberOfDepMeeting }}</td>
        <td>{{ props.item.DischargeDate }}</td>
        <td>{{ props.item.NumberOfExtractAcadCouncil }}</td>
        <td>{{ props.item.DischargeDateCouncil }}</td>
        <td v-if="flag">
          <v-icon
            small
            class="mr-2"
            @click="updateRow(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteRow(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <v-toolbar flat color="white" class="elevation-1" v-if="flag">
      <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:activator="{ on }">
          <v-btn color="green darken-1" large dark class="mb-2" v-on="on">Новая запись</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-text-field v-model="form.CourseName" 
                            label="Название"
                            v-validate="'required'"
                            :error-messages="errors.collect('name')"
                            data-vv-name="name"
                            ></v-text-field>
              <v-text-field v-model="form.Discipline" 
                            label="Дисциплина"
                            v-validate="'required'"
                            :error-messages="errors.collect('discipline')"
                            data-vv-name="discipline"
                            ></v-text-field>
            <v-select v-model="form.Direction"
                            label="Направление подготовки"
                            :items="direction"
                            v-validate="'required'"
                            :error-messages="errors.collect('directionSelect')"
                            data-vv-name="directionSelect"
                            ></v-select>
              <v-text-field v-model="form.NumberOfHours" 
                            label="Количество часов"
                            v-validate="'required|numeric|max:5'"
                            :error-messages="errors.collect('numberOfHours')"
                            data-vv-name="numberOfHours"
                            ></v-text-field>
              <v-text-field v-model="form.NumberOfLectures" 
                            label="Количество часов лекций"
                            v-validate="'required|numeric|max:5'"
                            :error-messages="errors.collect('numberOfLectures')"
                            data-vv-name="numberOfLectures"
                            ></v-text-field>
            <v-text-field v-model="form.NumberOfPractice" 
                            label="Количество часов практик"
                            v-validate="'required|numeric|max:5'"
                            :error-messages="errors.collect('numberOfPractice')"
                            data-vv-name="numberOfPractice"
                            ></v-text-field>
            <v-text-field v-model="form.NumberOfZE" 
                            label="Количество ЗЕ"
                            v-validate="'required|numeric|max:5'"
                            :error-messages="errors.collect('numberOfZE')"
                            data-vv-name="numberOfZE"
                            ></v-text-field>
            <v-select v-model="form.Developer" 
                            label="Разработчик"
                            :items="developer"
                            v-validate="'required'"
                            :error-messages="errors.collect('developer')"
                            data-vv-name="developer"
                            ></v-select>
            <v-text-field v-model="form.URL_addressOfAuthorship"
                            label="URL адрес авторства"
                            v-validate="'required|url'"
                            :error-messages="errors.collect('url')"
                            data-vv-name="url"
                            ></v-text-field>
            <v-text-field v-model="form.CurriculumName"
                            label="Название учебного плана"
                            v-validate="'required'"
                            :error-messages="errors.collect('curriculumName')"
                            data-vv-name="curriculumName"
                            ></v-text-field>
            <v-text-field v-model="form.NumberOfDepMeeting"
                            label="Номер выписки заседания кафедры"
                            v-validate="'required'"
                            :error-messages="errors.collect('NumberOfDepMeeting')"
                            data-vv-name="NumberOfDepMeeting"
                            ></v-text-field>
            <v-text-field v-model="form.DischargeDate"
                            mask="##.##.####"
                            return-masked-value
                            label="Дата выписки"
                            v-validate="'required'"
                            :error-messages="errors.collect('dischargeDate')"
                            data-vv-name="dischargeDate"
                            ></v-text-field>
            <v-text-field v-model="form.NumberOfExtractAcadCouncil"
                            label="Номер выписки учёного совета"
                            v-validate="'required'"
                            :error-messages="errors.collect('numberOfExtractAcadCouncil')"
                            data-vv-name="numberOfExtractAcadCouncil"
                            ></v-text-field>
            <v-text-field v-model="form.DischargeDateCouncil"
                            mask="##.##.####"
                            return-masked-value
                            label="Дата выписки учёного совета"
                            v-validate="'required'"
                            :error-messages="errors.collect('dischargeDateCouncil')"
                            data-vv-name="dischargeDateCouncil"
                            ></v-text-field>
            </v-container>
          </v-card-text>
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

          <v-btn
            color="green darken-1"
            flat="flat"
            large
            @click="save"
          >
            Сохранить
          </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';

export default { 
    created() {
        this.$store.dispatch("getData", {type: 'ECourse', data: 'dataFromDB'});
        this.$store.dispatch("getData", {type: 'DirectionOfTraining', data: 'directionInfo'});
        this.$store.dispatch("getData", {type: 'Teachers', data: 'teachersInfo'});
    },
    mounted() {
      this.$validator.localize('ru', this.dict);
    },
    props: ['flag'],
    data() {
        return {
            editedIndex: -1,
            dialog: false,
            form: {
              CourseName: '',
              Discipline: '',
              Direction: '',
              NumberOfHours: '',
              NumberOfLectures: '',
              NumberOfPractice: '',
              NumberOfZE: '',
              Developer: '',
              URL_addressOfAuthorship: '',
              CurriculumName: '',
              NumberOfDepMeeting: '',
              DischargeDate: '',
              NumberOfExtractAcadCouncil: '',
              DischargeDateCouncil: '',
            },
            headers: [
                {
                    text: 'Название',
                    value: 'CourseName'
                },
                {
                    text: 'Дисциплина',
                    value: 'Discipline'
                },
                {
                    text: 'Направление подготовки',
                    value: 'Direction'
                },
                {
                    text: 'Количество часов',
                    value: 'NumberOfHours'
                },
                {
                    text: 'Количество часов лекций',
                    value: 'NumberOfLectures'
                },
                {
                    text: 'Количество часов практик',
                    value: 'NumberOfPractice'
                },
                {
                    text: 'Количество ЗЕ',
                    value: 'NumberOfZE'
                },
                {
                    text: 'Разработчик',
                    value: 'Developer'
                },
                {
                    text: 'URL-адрес авторства',
                    value: 'URL_addressOfAuthorship'
                },
                {
                    text: 'Название учебного плана',
                    value: 'CurriculumName'
                },
                {
                    text: 'Номер выписки заседания кафедры',
                    value: 'NumberOfDepMeeting'
                },
                {
                    text: 'Дата выписки',
                    value: 'DischargeDate'
                },
                {
                    text: 'Номер выписки учёного совета',
                    value: 'NumberOfExtractAcadCouncil'
                },
                {
                    text: 'Дата выписки учёного совета',
                    value: 'DischargeDateCouncil'
                },
            ],
        };
    },
    computed: {
        ...mapGetters ([
            'dataFromDB',
            'directionInfo',
            'teachersInfo',
            'rowData',
            'dict'
        ]),
        formTitle () {
            return this.editedIndex === -1 ? 'Новая запись:' : 'Редактирование записи:'
        },
        direction() {
            let obj = this.directionInfo;
            let array = [];
            for (let prop in obj) {
                array.push(obj[prop].idDirection);
            }
            return array;
        },
        developer() {
            let obj = this.teachersInfo;
            let array = [];
            for (let prop in obj) {
                // let fio = `${obj[prop].Surname} ${obj[prop].Name} ${obj[prop].Partonymic}`;
                // array.push(fio);
                array.push(obj[prop].idTeacher);
            }
            return array;
        }
    },
    methods: {
        close () {
            this.dialog = false;
            setTimeout(() => {
                this.cleanForm();
                this.editedIndex = -1
            }, 300)
        },

        save () {
          this.$validator.validateAll().then(valid => {
            if (valid) {
              let array = [this.form.DischargeDate, this.form.DischargeDateCouncil];
              let transformedArray = []
              array.forEach(item => {
                let pastArray = item.split(".");
                pastArray[0] = (+(pastArray[0]) + 1).toString();
                transformedArray.push(pastArray.reverse().join("-"));
              });
              [this.form.DischargeDate, this.form.DischargeDateCouncil] = transformedArray;
              Object.assign(this.rowData, this.form);
              if (this.editedIndex > -1) {
                this.$store.dispatch('updateRow', {name: 'ECourse', val: this.rowData.CourseName});
              } else {
                this.$store.dispatch('createNewRow', 'ECourse');
              }
              this.close();
            }
          })
        },

        updateRow(item) {
            Object.assign(this.form, item);
            this.editedIndex = this.dataFromDB.indexOf(item);
            this.dialog = true;
        },

        cleanForm() {
            let obj = this.form;
            for(let prop in obj) {
              obj[prop] = '';
            }
            this.$validator.reset();
        },
        
        deleteRow(item) {
            this.$store.dispatch('deleteRow', {name: 'ECourse', val: item.CourseName});
        }

    }
}
</script>
