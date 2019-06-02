<template>
    <v-content class="pa-5">
        <template>
        <div>
            <v-data-table
            :headers="headers"
            :items="list"
            hide-actions
            :pagination.sync="pagination"
            class="elevation-1"
            >
            <template v-slot:items="props">
                <td>{{ props.item.criterion}}</td>
                <td>{{ props.item.subcriterion}}</td>
                <td>{{ props.item.aspect}}</td>
                <td>{{ props.item.transcriptAspect}}</td>
                <td>{{ props.item.maxVal }}</td>
                <td>{{ props.item.minVal }}</td>
                <td>
                    <v-text-field style="width: 50px" @change="addRating($event, props.item)" v-model=props.item.expert1></v-text-field>
                </td>
                <td>
                    <v-text-field style="width: 50px" @change="addRating($event, props.item)" v-model=props.item.expert2></v-text-field>
                </td>
            </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="35"></v-pagination>
            </div>
            <v-btn color="light-green darken-2" @click="printFile" outline absolute large right>Завершить экспертизу</v-btn>
        </div>
        </template>
    </v-content>
</template>
<script>

import {mapGetters} from 'vuex';

export default {
    created() {
      this.$store.dispatch("getData", {type: 'TranscriptAspect', data: 'dataFromDB'});
      this.$store.dispatch("getData", {type: 'Aspects', data: 'aspectsInfo'});
      this.$store.dispatch("getData", {type: 'Criteria', data: 'criterionInfo'});
      this.$store.dispatch("getData", {type: 'Subcriteria', data: 'subCriterionInfo'});
      this.$store.dispatch("getData", {type: 'CourseExamination', data: 'courseExaminationInfo'});
    },
    data () {
      return {
        search: '',
        pagination: {},
        selected: [],
        headers: [
          {
            text: 'Наименование критерия',
            sortable: false,
            value: 'CriterionName'
          },
          {
            text: 'Наименование субкритерия',
            sortable: false,
            value: 'subcriteria'
          },
          {
            text: 'Аспекты',
            sortable: false,
            value: 'aspect'
          },
          {
            text: 'Расшифровка аспекта',
            sortable: false,
            value: 'transcript'
          },
          {
            text: 'Max балл',
            sortable: false,
            value: 'max'
          },
          {
            text: 'Min балл',
            sortable: false,
            value: 'min'
          },
          {
            text: 'Эксперт 1',
            sortable: false,
            value: 'expert1'
          },
          {
            text: 'Эксперт 2',
            sortable: false,
            value: 'expert2'
          }
        ]
      }
    },
    computed: {
      ...mapGetters ([
        'dataFromDB',
        'aspectsInfo',
        'criterionInfo',
        'subCriterionInfo',
        'intermediateData',
        'courseExaminationInfo',
        'rowData'
      ]),
      list() {
        return this.generateList();
      },
      pages () {
          if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
    },
    methods: {
      printFile() {
        debugger;
        this.$store.dispatch('getFile', {prop: this.intermediateData.CourseName});
      },
      cleanIntermediateData() {
        delete this.intermediateData.Criterion;
        delete this.intermediateData.Subcriterion;
        delete this.intermediateData.Aspect;
        delete this.intermediateData.TA;
      },
      addRating(e, string) {
        if(Number(e) <= string.maxVal && Number(e) >= string.minVal) {
          let propName = '';
          let firstProp = {};
          switch(true) {
            case (string.criterion !== undefined):
              firstProp.Criterion = string.criterion.substring(0, string.criterion.indexOf(" "));
              propName = "Criterion";
              break;
            case (string.subcriterion !== undefined):
              firstProp.Subcriterion = string.subcriterion.substring(0, string.subcriterion.indexOf(" "));
              propName = "Subcriterion";
              break;
            case (string.aspect !== undefined):
              firstProp.Aspect = string.aspect.substring(0, string.aspect.indexOf(" "));
              propName = "Aspect";
              break;
            case (string.transcriptAspect !== undefined):
              firstProp.TA = string.transcriptAspect.substring(0, string.transcriptAspect.indexOf(" "));
              propName = "TA";
          }
          if(string.expert1 !== undefined && string.expert2 !== undefined) {
            this.intermediateData.Value = +(string.expert1) + +(string.expert2);
            Object.assign(firstProp, this.intermediateData);
            Object.assign(this.rowData, firstProp);
            this.$store.dispatch('updateRow', {name: 'CourseExamination', val: this.rowData[propName]});
            this.cleanIntermediateData();
          } else {
            this.intermediateData.Value = e;
            Object.assign(firstProp, this.intermediateData);
            Object.assign(this.rowData, firstProp);
            let updateKey = this.courseExaminationInfo.find((item) => {
              return item[propName] === this.rowData[propName];
            });
            if(updateKey) {
              this.$store.dispatch('updateRow', {name: 'CourseExamination', val: this.rowData[propName]});
              this.cleanIntermediateData();
            } else {
              this.$store.dispatch('createNewRow', 'CourseExamination');
              this.cleanIntermediateData();
            }
          }
        } else {
          alert("Введите корректное число!");
        }
      },
      generateList() {
        if(this.criterionInfo.length > 0 && 
           this.subCriterionInfo.length > 0 &&
           this.aspectsInfo.length > 0 &&
           this.dataFromDB.length > 0) {
          let array = [];
          let subcriterionStep;
          let aspectStep;
          let transcriptStep;
          this.criterionInfo.forEach(criterion => {
            let obj = this.addToArray({criterion, prop: 'criterion', id: 'idCriterion', name: 'CriterionName'});
            array.push(obj);
              // субкритерий
              for(let i = subcriterionStep === undefined ? 0 : subcriterionStep; i < this.subCriterionInfo.length; i++) {
                let subcriterion = this.subCriterionInfo[i];
                if(subcriterion.idSubcriterion.slice(0, 1) === criterion.idCriterion.slice(0, 1)) {
                  let obj = this.addToArray({subcriterion, prop: 'subcriterion', id: 'idSubcriterion', name: 'SubcriterionName'});
                  array.push(obj);
                  // аспект
                  for(let i = aspectStep === undefined ? 0 : aspectStep; i < this.aspectsInfo.length; i++) {
                   let aspect = this.aspectsInfo[i];
                    if(aspect.idAspect.slice(1, 2) === subcriterion.idSubcriterion.slice(1, 2)) {
                      let obj = this.addToArray({aspect, prop: 'aspect', id: 'idAspect', name: 'AspectName'});
                      array.push(obj);
                      //расшифровка
                      for(let i = transcriptStep === undefined ? 0 : transcriptStep; i < this.dataFromDB.length; i++) {
                        let transcriptAspect = this.dataFromDB[i];
                        if(transcriptAspect.idTA && transcriptAspect.idTA.slice(0, 4) === aspect.idAspect.slice(0, 4)) {
                          let obj = this.addToArray({transcriptAspect, prop: 'transcriptAspect', id: 'idTA', name: 'TAName'});
                          array.push(obj);
                        } else {
                          transcriptStep = i;
                          break;
                        }
                      }
                      } else {
                        aspectStep = i;
                        break;
                      }
                  }
                } else {
                  subcriterionStep = i;
                  break;
                }
              }
          });
          return array;
        }
      },
      addToArray(info) {
        let obj = {};
        obj[info.prop] = `${info[info.prop][info.id]} - ${info[info.prop][info.name]}`;
        obj.maxVal = info[info.prop].MaxVal;
        obj.minVal = info[info.prop].MinVal;
        return obj;
      },
      takingNameAndVals(array, id, name) {
        let namesArr = [];
        array.forEach(item => {
          namesArr.push({'name': `${item[id]} - ${item[name]}`, MaxVal: item.MaxVal, MinVal: item.MinVal});
        });
        return namesArr;
      }
    }
}
</script>

