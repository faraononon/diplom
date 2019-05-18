<template>
  <div class="pa-4">  
  <h2 class="display-2 mb-4 text-xs-center">Преподаватели</h2>
    <v-data-table
      :headers="headers"
      :items="dataFromDB"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.idTeacher }}</td>
        <td>{{ props.item.Surname }}</td>
        <td>{{ props.item.Name }}</td>
        <td>{{ props.item.Partonymic }}</td>
        <td>{{ props.item.Institute }}</td>
        <td>{{ props.item.Department }}</td>
        <td>{{ props.item.Position }}</td>
        <td>{{ props.item.CertificateOfProfDevelop }}</td>
        <td v-if="props.item.Expert"><v-icon>
            done
          </v-icon></td>
        <td v-else=""><v-icon>clear</v-icon></td>
        <td>
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
    <v-toolbar flat color="white" class="elevation-1">
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
              <v-text-field v-model="form.idTeacher" 
                            label="Идентификатор"
                            v-validate="'required|numeric|max:5'"
                            :error-messages="errors.collect('id')"
                            data-vv-name="id"
                            ></v-text-field>
              <v-text-field v-model="form.Surname" 
                            label="Фамилия"
                            v-validate="'required|alpha'"
                            :error-messages="errors.collect('surname')"
                            data-vv-name="surname"
                            ></v-text-field>
            <v-text-field v-model="form.Name"
                            label="Имя"
                            v-validate="'required|alpha'"
                            :error-messages="errors.collect('name')"
                            data-vv-name="name"
                            ></v-text-field>
              <v-text-field v-model="form.Partonymic" 
                            label="Отчество"
                            v-validate="'required|alpha'"
                            :error-messages="errors.collect('partonymic')"
                            data-vv-name="partonymic"
                            ></v-text-field>
              <v-select v-model="form.Institute" 
                            label="Институт"
                            :items="institutes"
                            v-validate="'required'"
                            :error-messages="errors.collect('instituteSelect')"
                            data-vv-name="instituteSelect"
                            ></v-select>
            <v-select v-model="form.Department" 
                            label="Кафедра"
                            :items="departments"
                            v-validate="'required'"
                            :error-messages="errors.collect('departmentSelect')"
                            data-vv-name="departmentSelect"
                            ></v-select>
            <v-select v-model="form.Position" 
                            label="Должность"
                            :items="positions"
                            v-validate="'required'"
                            :error-messages="errors.collect('positionSelect')"
                            data-vv-name="positionSelect"
                            ></v-select>
            <v-text-field v-model="form.CertificateOfProfDevelop" 
                            label="Св-во о повышении квалификации"
                            v-validate="'required|max:50'"
                            :error-messages="errors.collect('certificate')"
                            data-vv-name="certificate"
                            ></v-text-field>
            <v-checkbox v-model="form.Expert"
                            label="Эксперт"
                            v-validate="'required'"
                            :error-messages="errors.collect('expert')"
                            data-vv-name="expert"
                            ></v-checkbox>
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
        this.$store.dispatch("getData", {type: 'Teachers', data: 'dataFromDB'});
        this.$store.dispatch("getData", {type: 'Institutions', data: 'instituteInfo'});
        this.$store.dispatch("getData", {type: 'Departments', data: 'departmentInfo'});
        this.$store.dispatch("getData", {type: 'Positions', data: 'positionInfo'});
    },
    mounted() {
      this.$validator.localize('ru', this.dict);
    },
    data() {
        return {
            editedIndex: -1,
            dialog: false,
            form: {
              idTeacher: '',
              Surname: '',
              Name: '',
              Partonymic: '',
              Institute: '',
              Department: '',
              Position: '',
              CertificateOfProfDevelop: '',
              Expert: false
            },
            headers: [
                {
                    text: 'Идентификатор',
                    value: 'idTeacher'
                },
                {
                    text: 'Фамилия',
                    value: 'Surname'
                },
                {
                    text: 'Имя',
                    value: 'Name'
                },
                {
                    text: 'Отчество',
                    value: 'Partonymic'
                },
                {
                    text: 'Институт',
                    value: 'Institute'
                },
                {
                    text: 'Кафедра',
                    value: 'Department'
                },
                {
                    text: 'Должность',
                    value: 'Position'
                },
                {
                    text: 'Св-во о повышении квалификации',
                    value: 'CertificateOfProfDevelop'
                },
                {
                    text: 'Эксперт',
                    value: 'Expert'
                }
            ],
        };
    },
    computed: {
        ...mapGetters ([
            'dataFromDB',
            'instituteInfo',
            'departmentInfo',
            'positionInfo',
            'rowData',
            'dict'
        ]),
        formTitle () {
            return this.editedIndex === -1 ? 'Новая запись:' : 'Редактирование записи:'
        },
        institutes() {
            let obj = this.instituteInfo;
            let array = [];
            for(let prop in obj) {
                array.push(obj[prop].idInstitute);
            }
            return array;
        },
        departments() {
            let obj = this.departmentInfo;
            let array = [];
            for(let prop in obj) {
                array.push(obj[prop].idDepartment);
            }
            return array;
        },
        positions() {
            let obj = this.positionInfo;
            let array = [];
            for(let prop in obj) {
                array.push(obj[prop].idPosition);
            }
            return array;
        },
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
                Object.assign(this.rowData, this.form);
                if (this.editedIndex > -1) {
                  this.$store.dispatch('updateRow', {name: 'Teachers', val: this.rowData.idTeacher});
                } else {
                  this.$store.dispatch('createNewRow', 'Teachers');
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
            this.$store.dispatch('deleteRow', {name: 'Teachers', val: item.idTeacher});
        }

    }
}
</script>
