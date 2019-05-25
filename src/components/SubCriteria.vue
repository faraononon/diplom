<template>
  <div class="pa-4">  
  <h2 class="display-2 mb-4 text-xs-center">Субкритерии</h2>
    <v-data-table
      :headers="headers"
      :items="dataFromDB"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.idSubcriterion }}</td>
        <td>{{ props.item.SubcriterionName }}</td>
        <td>{{ props.item.Criterion }}</td>
        <td>{{ props.item.MaxVal }}</td>
        <td>{{ props.item.MinVal }}</td>
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
              <v-select v-model="form.Criterion" 
                            :items="criterion"
                            label="Критерий"
                            v-validate="'required'"
                            :error-messages="errors.collect('criterionSelect')"
                            data-vv-name="criterionSelect"
                            ></v-select>
              <v-text-field v-model="form.idSubcriterion" 
                            label="Идентификатор"
                            v-validate="'required|alpha_num|max:10'"
                            :error-messages="errors.collect('id')"
                            data-vv-name="id"
                            ></v-text-field>
              <v-text-field v-model="form.SubcriterionName" 
                            label="Название субкритерия"
                            v-validate="'required'"
                            :error-messages="errors.collect('name')"
                            data-vv-name="name"
                            ></v-text-field>
              <v-text-field v-model="form.MaxVal" 
                            label="Максимальная оценка"
                            v-validate="'required|decimal:1|max:4'"
                            :error-messages="errors.collect('maxVal')"
                            data-vv-name="maxVal"
                            ></v-text-field>
              <v-text-field v-model="form.MinVal" 
                            label="Минимальная оценка"
                            v-validate="'required|decimal:1|max:4'"
                            :error-messages="errors.collect('minVal')"
                            data-vv-name="minVal"
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
        this.$store.dispatch("getData", {type: 'Subcriteria', data: 'dataFromDB'});
        this.$store.dispatch("getData", {type: 'Criteria', data: 'criterionInfo'});
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
              idSubcriterion: '',
              SubcriterionName: '',
              Criterion: '',
              MaxVal: '',
              MinVal: ''
            },
            headers: [
                {
                    text: 'Идентификатор',
                    value: 'idSubcriterion'
                },
                {
                    text: 'Название субкритерия',
                    value: 'SubcriterionName'
                },
                {
                    text: 'Критерий',
                    value: 'Criterion'
                },
                {
                    text: 'Максимальная оценка',
                    value: 'MaxVal'
                },
                {
                    text: 'Минимальная оценка',
                    value: 'MinVal'
                }
            ],
        };
    },
    computed: {
        ...mapGetters ([
            'dataFromDB',
            'criterionInfo',
            'rowData',
            'dict'
        ]),
        formTitle () {
            return this.editedIndex === -1 ? 'Новая запись:' : 'Редактирование записи:'
        },
        criterion() {
            let obj = this.criterionInfo;
            let array = [];
            for(let prop in obj) {
                array.push(obj[prop].idCriterion);
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
                  this.$store.dispatch('updateRow', {name: 'Subcriteria', val: this.rowData.idSubcriterion});
                } else {
                  this.$store.dispatch('createNewRow', 'Subcriteria');
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
            this.$store.dispatch('deleteRow', {name: 'Subcriteria', val: item.idSubcriterion});
        }

    }
}
</script>
