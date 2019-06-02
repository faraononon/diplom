import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataFromDB: [],
    extraData: [],
    rowData: {},
    intermediateData: {},
    expertInfo: [],
    courseInfo: [],
    teachersInfo: [],
    criterionInfo: [],
    subCriterionInfo: [],
    aspectsInfo: [],
    instituteInfo: [],
    departmentInfo: [],
    positionInfo: [],
    directionInfo: [],
    courseExaminationInfo: [],
    flagForAuth: false,
    directoryShowKey: false,
    dict: {
      custom: {
        id: {
          required: "Заполните поле",
          max: "Введено слишком много символов",
          numeric: "Данное поле должно содержать только цифры",
          alpha_num: "Данное поле может содержать только буквы и цифры"
        },
        surname: {
          required: "Заполните поле",
          alpha: "Данное поле должно содержать только буквы"
        },
        name: {
          required: "Заполните поле",
          alpha_spaces: "Данное поле должно содержать только буквы и пробелы",
          alpha: "Данное поле должно содержать только буквы"
        },
        partonymic: {
          required: "Заполните поле",
          alpha: "Данное поле должно содержать только буквы"
        },
        maxVal: {
          required: "Заполните поле",
          max: "Введено слишком много символов",
          decimal: "Поле должно сдержать только 1 цифру после точки"
        },
        minVal: {
          required: "Заполните поле",
          max: "Введено слишком много символов",
          decimal: "Поле должно сдержать только 1 цифру после точки"
        },
        certificate: {
          required: "Заполните поле",
          max: "Введено слишком много символов"
        },
        expert: {
          required: "Заполните поле"
        },
        expert2: {
          required: "Заполните поле"
        },
        criterionSelect: {
          required: "Заполните поле"
        },
        instituteSelect: {
          required: "Заполните поле"
        },
        departmentSelect: {
          required: "Заполните поле"
        },
        positionSelect: {
          required: "Заполните поле"
        },
        directionSelect: {
          required: "Заполните поле",
          alpha: "Данное поле должно содержать только буквы"
        },
        developer: {
          required: "Заполните поле"
        },
        discipline: {
          required: "Заполните поле"
        },
        numberOfHours: {
          required: "Заполните поле",
          max: "Введено слишком много символов",
          numeric: "Данное поле должно содержать только цифры"
        },
        numberOfLectures: {
          required: "Заполните поле",
          max: "Введено слишком много символов",
          numeric: "Данное поле должно содержать только цифры"
        },
        numberOfPractice: {
          required: "Заполните поле",
          max: "Введено слишком много символов",
          numeric: "Данное поле должно содержать только цифры"
        },
        numberOfZE: {
          required: "Заполните поле",
          max: "Введено слишком много символов",
          numeric: "Данное поле должно содержать только цифры"
        },
        url: {
          required: "Заполните поле",
          url: "Пример заполнения https://site.ru"
        },
        curriculumName: {
          required: "Заполните поле"
        },
        NumberOfDepMeeting: {
          required: "Заполните поле"
        },
        dischargeDate: {
          required: "Заполните поле"
        },
        numberOfExtractAcadCouncil: {
          required: "Заполните поле"
        },
        dischargeDateCouncil: {
          required: "Заполните поле"
        }
      }
    }
  },
  getters: {
    directoryShowKey(state) {
      return state.directoryShowKey;
    },
    flagForAuth(state) {
      if (Vue.cookies.get("mysession")) {
        return (state.flagForAuth = true);
      } else {
        return (state.flagForAuth = false);
      }
    },
    dataFromDB(state) {
      return state.dataFromDB;
    },
    extraData(state) {
      return state.extraData;
    },
    rowData(state) {
      return state.rowData;
    },
    expertInfo(state) {
      return state.expertInfo;
    },
    courseInfo(state) {
      return state.courseInfo;
    },
    teachersInfo(state) {
      return state.teachersInfo;
    },
    courseExaminationInfo(state) {
      return state.courseExaminationInfo;
    },
    criterionInfo(state) {
      return state.criterionInfo;
    },
    subCriterionInfo(state) {
      return state.subCriterionInfo;
    },
    aspectsInfo(state) {
      return state.aspectsInfo;
    },
    instituteInfo(state) {
      return state.instituteInfo;
    },
    departmentInfo(state) {
      return state.departmentInfo;
    },
    positionInfo(state) {
      return state.positionInfo;
    },
    dict(state) {
      return state.dict;
    },
    directionInfo(state) {
      return state.directionInfo;
    },
    intermediateData(state) {
      return state.intermediateData;
    }
  },
  mutations: {
    computeExpertiseDates(state, obj) {
      state.dataFromDB = state.extraData.filter(item => {
        if (item.date > obj.dateFrom && item.date < obj.dateTo) {
          return item;
        }
      });
    },
    selectNotPassedExamItems(state) {
      state.dataFromDB = state.extraData.filter(item => {
        return item.Value < 60;
      });
    },
    waitingExpertiseItems(state) {
      let array = [];
      let course = state.courseInfo;
      state.extraData.forEach(item => {
        course = course.filter(item2 => {
          return item2.CourseName !== item.CourseName;
        });
      });
      course.forEach(courseItem => {
        array.push({
          CourseName: courseItem.CourseName,
          Teacher: courseItem.Developer,
          NumberOfZE: courseItem.NumberOfZE
        });
      });
      state.dataFromDB = array;
    },
    getData(state, obj) {
      if (obj.data[0].URL_addressOfAuthorship) {
        obj.data.forEach(item => {
          let array = [item.DischargeDate, item.DischargeDateCouncil];
          let transformedArray = array.map(item => {
            let string = item.substring(0, item.indexOf("T"));
            let dateArray = string.split("-").reverse();
            return dateArray.join(".");
          });
          [item.DischargeDate, item.DischargeDateCouncil] = transformedArray;
        });
      }
      state[obj.bd] = obj.data;
    },
    newRow(state) {
      return state.rowData;
    },
    cleanData(state) {
      for (let prop in state.rowData) {
        delete state.rowData[prop];
      }
    },
    toggleFlag(state, flag) {
      state[flag] = !state[flag];
    }
  },
  actions: {
    getData(context, obj) {
      Vue.http
        .get(`http://db.flexio.beget.tech/api/${obj.type}`)
        .then(response => response.json())
        .then(data => {
          context.commit("getData", {
            data: data,
            bd: obj.data
          });
        });
    },
    createNewRow(rowData, type) {
      if (type === "CourseExamination") {
        Vue.http
          .post(
            `http://db.flexio.beget.tech/api/${type}`,
            JSON.stringify(rowData.state.rowData)
          )
          .then(response => response.json())
          .then(data => {
            rowData.commit("getData", {
              data: data,
              bd: "courseExaminationInfo"
            });
          });
      } else {
        Vue.http
          .post(
            `http://db.flexio.beget.tech/api/${type}`,
            JSON.stringify(rowData.state.rowData)
          )
          .then(response => response.json())
          .then(data => {
            rowData.commit("getData", { data: data, bd: "dataFromDB" });
          });
      }
      rowData.commit("cleanData");
    },
    updateRow(context, obj) {
      if (obj.name === "CourseExamination") {
        Vue.http
          .put(
            `http://db.flexio.beget.tech/api/${obj.name}/${obj.val}`,
            context.state.rowData
          )
          .then(response => response.json())
          .then(data => {
            context.commit("getData", {
              data: data,
              bd: "courseExaminationInfo"
            });
          });
        context.commit("cleanData");
      } else {
        Vue.http
          .put(
            `http://db.flexio.beget.tech/api/${obj.name}/${obj.val}`,
            context.state.rowData
          )
          .then(response => response.json())
          .then(data => {
            context.commit("getData", { data: data, bd: "dataFromDB" });
          });
        context.commit("cleanData");
      }
    },
    deleteRow(context, obj) {
      Vue.http
        .delete(`http://db.flexio.beget.tech/api/${obj.name}/${obj.val}`)
        .then(response => {
          context.commit("getData", { data: response.body, bd: "dataFromDB" });
        });
    },

    getFile(context, courseName) {
      debugger;
      Vue.http
        .post(`http://localhost:8081/insertFile`, JSON.stringify(courseName))
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
    },

    getReportsData(context) {
      Vue.http
        .get(`http://localhost:8081/getForReports`)
        .then(response => response.json())
        .then(data => {
          data.forEach(item => {
            item.Value = item.Value.toFixed(1);
          });
          context.commit("getData", { data: data, bd: "dataFromDB" });
          context.commit("getData", { data: data, bd: "extraData" });
        });
    }
  }
});
