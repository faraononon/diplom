import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataFromDB: [],
    rowData: {},
    teachersInfo: [],
    criterionInfo: [],
    subCriterionInfo: [],
    instituteInfo: [],
    departmentInfo: [],
    positionInfo: [],
    directionInfo: [],
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
    dataFromDB(state) {
      return state.dataFromDB;
    },
    rowData(state) {
      return state.rowData;
    },
    teachersInfo(state) {
      return state.teachersInfo;
    },
    criterionInfo(state) {
      return state.criterionInfo;
    },
    subCriterionInfo(state) {
      return state.subCriterionInfo;
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
    }
  },
  mutations: {
    getData(state, obj) {
      if (obj.data[0].CourseName) {
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
      Vue.http
        .post(
          `http://db.flexio.beget.tech/api/${type}`,
          JSON.stringify(rowData.state.rowData)
        )
        .then(response => response.json())
        .then(data => {
          rowData.commit("getData", { data: data, bd: "dataFromDB" });
        });
      rowData.commit("cleanData");
    },
    updateRow(context, obj) {
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
    },
    deleteRow(context, obj) {
      Vue.http
        .delete(`http://db.flexio.beget.tech/api/${obj.name}/${obj.val}`)
        .then(response => {
          context.commit("getData", { data: response.body, bd: "dataFromDB" });
        });
    }
  }
});
