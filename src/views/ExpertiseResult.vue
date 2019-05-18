<template>
    <v-content class="pa-5">
        <template>
        <div>
            <v-data-table
            :headers="headers"
            :items="desserts"
            hide-actions
            :pagination.sync="pagination"
            class="elevation-1"
            >
            <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.aspect }}</td>
                <td>{{ props.item.transcript }}</td>
                <td>{{ props.item.max }}</td>
                <td>{{ props.item.min }}</td>
                <td>
                    <v-text-field style="width: 50px" v-model=props.item.expert1></v-text-field>
                </td>
                <td>
                    <v-text-field style="width: 50px" v-model=props.item.expert2></v-text-field>
                </td>
            </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
            <v-btn color="light-green darken-2" outline absolute large right="0">Завершить экспертизу</v-btn>
        </div>
        </template>
    </v-content>
    <!-- <section class="expertise-result">
        <table class="expertise-result__table">
            <thead>
                <tr>
                    <th>Наименование критерия/субкритерия</th>
                    <th>Аспекты</th>
                    <th>Расшифровка аспекта</th>
                    <th class="expertise-result__table-small-column">Max балл</th>
                    <th class="expertise-result__table-small-column">Min балл</th>
                    <th class="expertise-result__table-expert">Эксперт 1</th>
                    <th class="expertise-result__table-expert">Эксперт 2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>А - Полнота описания курса для пользователя и эксперта</td>
                    <td></td>
                    <td class="expertise-result__table-small-column">6,5</td>
                    <td class="expertise-result__table-small-column">4,0</td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td>Информация о дисциплине в описании</td>
                    <td></td>
                    <td></td>
                    <td class="expertise-result__table-small-column">4,0</td>
                    <td class="expertise-result__table-small-column">3,0</td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Информация о дисциплине в окне "Описание курса"</td>
                    <td></td>
                    <td class="expertise-result__table-small-column">3,0</td>
                    <td class="expertise-result__table-small-column">3,0</td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>название дисциплины, которую покрывает курс</td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>направление подготовки</td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>цель курса</td>
                    <td class="expertise-result__table-small-column">1,0</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>общая трудоемкость курса (в часах и ЗЕ)</td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>данные о разработчиках курса</td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Файлы описания курса (изображение-превью курса)</td>
                    <td></td>
                    <td class="expertise-result__table-small-column">1,0</td>
                    <td class="expertise-result__table-small-column">0,0</td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>наличие изображения, отображающего описание курса</td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>изображение не размыто</td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td>Информация о дисциплине для экспертов в разделе "Общее" курса</td>
                    <td></td>
                    <td></td>
                    <td class="expertise-result__table-small-column">2,0</td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Учебно-тематический план курса</td>
                    <td></td>
                    <td class="expertise-result__table-small-column">1,0</td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>подготовлен согласно шаблону - 1 балл</td>
                    <td class="expertise-result__table-small-column">1,0</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>частично соответствует шаблону - 0,5 балла</td>
                    <td class="expertise-result__table-small-column">1,0</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>не соответствуе шаблону - 0 баллов</td>
                    <td class="expertise-result__table-small-column">1,0</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Рабочая программа дисциплины</td>
                    <td></td>
                    <td class="expertise-result__table-small-column">1,0</td>
                    <td class="expertise-result__table-small-column">0,0</td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>присутствует в курсе - 1 балл</td>
                    <td class="expertise-result__table-small-column">1,0</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>отсутствует в курсе - 0 баллов</td>
                    <td class="expertise-result__table-small-column">1,0</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td>Соответствие материала курса нормативной и законодательной базе отрасли, направления науки</td>
                    <td></td>
                    <td></td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Наличие гиперссылок на законы РФ, нормативные акты, ГОСТ, ФГОС, профстандарты по направлению курса и т.д.</td>
                    <td></td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>представлены в материалах практических  заданий</td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>представлены в методических рекомендациях</td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>представлены в списке литературы</td>
                    <td class="expertise-result__table-small-column">0,5</td>
                    <td class="expertise-result__table-small-column"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                    <td class="expertise-result__table-expert"><input type="text"></td>
                </tr>
            </tbody>
        </table>
        <div class="database-manipulations__button-wrapper">
            <button class="btn" >Назад</button>
            <button class="btn">Вперёд</button>
        </div>
        <button class="btn btn--stop btn--red">Завершить экспертизу</button>
    </section> -->
</template>
<script>
export default {
    data () {
      return {
        search: '',
        pagination: {},
        selected: [],
        headers: [
          {
            text: 'Наименование критерия/субкритерия',
            sortable: false,
            value: 'name'
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
        ],
        desserts: [
          {
            name: 'Наименование 1',
            aspect: 'Аспект 1',
            transcript: 'Расшифровка аспекта 1',
            max: 6.5,
            min: 4.0,
            expert1: '',
            expert2: ''
          },
          {
            name: 'Наименование 2',
            aspect: 'Аспект 2',
            transcript: 'Расшифровка аспекта 2',
            max: 6.5,
            min: 4.0,
            expert1: '',
            expert2: ''
          },
          {
            name: 'Наименование 3',
            aspect: 'Аспект 3',
            transcript: 'Расшифровка аспекта 3',
            max: 6.5,
            min: 4.0,
            expert1: '',
            expert2: ''
          },
          {
            name: 'Наименование 4',
            aspect: 'Аспект 4',
            transcript: 'Расшифровка аспекта 4',
            max: 6.5,
            min: 4.0,
            expert1: '',
            expert2: ''
          },
          {
            name: 'Наименование 5',
            aspect: 'Аспект 5',
            transcript: 'Расшифровка аспекта 5',
            max: 6.5,
            min: 4.0,
            expert1: '',
            expert2: ''
          },
          {
            name: 'Наименование 6',
            aspect: 'Аспект 6',
            transcript: 'Расшифровка аспекта 6',
            max: 6.5,
            min: 4.0,
            expert1: '',
            expert2: ''
          },
          {
            name: 'Наименование 7',
            aspect: 'Аспект 7',
            transcript: 'Расшифровка аспекта 7',
            max: 6.5,
            min: 4.0,
            expert1: '',
            expert2: ''
          },
          {
            name: 'Наименование 8',
            aspect: 'Аспект 8',
            transcript: 'Расшифровка аспекта 8',
            max: 6.5,
            min: 4.0,
            expert1: '',
            expert2: ''
          },
          {
            name: 'Наименование 9',
            aspect: 'Аспект 9',
            transcript: 'Расшифровка аспекта 9',
            max: 6.5,
            min: 4.0,
            expert1: '',
            expert2: ''
          },
          {
            name: 'Наименование 10',
            aspect: 'Аспект 10',
            transcript: 'Расшифровка аспекта 10',
            max: 6.5,
            min: 4.0,
            expert1: '',
            expert2: ''
          },
          {
            name: 'Наименование 11',
            aspect: 'Аспект 11',
            transcript: 'Расшифровка аспекта 11',
            max: 6.5,
            min: 4.0,
            expert1: '',
            expert2: ''
          },
          {
            name: 'Наименование 12',
            aspect: 'Аспект 12',
            transcript: 'Расшифровка аспекта 12',
            max: 6.5,
            min: 4.0,
            expert1: '',
            expert2: ''
          },
          {
            name: 'Наименование 13',
            aspect: 'Аспект 13',
            transcript: 'Расшифровка аспекта 13',
            max: 6.5,
            min: 4.0,
            expert1: '',
            expert2: ''
          },
        ]
      }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }
}
</script>
<style scoped>
    .expertise-result {
        display: block;
        background-color: white;
        max-width: 1400px;
        border-radius: 10px;
        -webkit-box-shadow: 10px 10px 28px rgba(0, 0, 0, 0.4);
        box-shadow: 10px 10px 28px rgba(0, 0, 0, 0.4);
        font-family: Arial, Helvetica, sans-serif;
        padding: 20px;
        margin: 0 auto;
        position: relative;
    }

    .expertise-result__table {
        max-width: 1300px;
        margin: 0 auto;
        display: block;
        box-sizing: border-box;
    }

    .expertise-result__table tr {
        width: 1300px;
        padding: 0;
    }

    .expertise-result__table tr th, .expertise-result__table tr td {
        width: 300px;
        text-align: center;
        border-style: solid;
        border-width: 0 1px 1px 0;
        border-color: white;
    }

    .expertise-result__table tr td {
        background: #D8E6F3;
        padding: 10px 10px;
    }

    .expertise-result__table tr th {
        background: #AFCDE7;
        color: white;
        padding: 10px 20px;
    }

    .expertise-result__table tr .expertise-result__table-small-column{
        width: 50px;
    }

    .expertise-result__table tr .expertise-result__table-expert {
        width: 133px;
    }

    .expertise-result__table-expert input {
        width: 50px;
        border: 1px solid gainsboro;
        border-radius: 5px;
        font-size: 15px;
        text-align: center;
    }

    .database-manipulations__button-wrapper {
        margin: 50px auto;
        display: flex;
        justify-content: space-between;
        max-width: 500px;
    }

    .btn {
        display: inline-block;
        background-color: skyblue;
        border: 1px solid skyblue;
        border-radius: 15px;
        padding: 13px;
        min-width: 230px;
        color: white;
        font-size: 20px;
        cursor: pointer;
    }

    .btn--stop {
        position: absolute;
        bottom: 75px;
        right: 70px;
    }

    .btn--red {
        background-color: #DC143C;
        border: 1px solid #DC143C;
    }
    
</style>

