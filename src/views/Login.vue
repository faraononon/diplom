<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="cyan lighten-1">
                <v-toolbar-title>Форма регистрации</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="formData.email" prepend-icon="person" name="login" label="Логин" type="text"></v-text-field>
                  <v-text-field v-model="formData.password" prepend-icon="lock" name="password" label="Пароль" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="cyan lighten-1" @click="login">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Ошибка авторизации</span>
          </v-card-title>
          <v-card-text>Данного пользователя не существует. Пожалуйста проверьте корректность данных.</v-card-text>
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
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import axios from "axios";

  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      formData: {
        email: '',
        password: ''
      }
    }),
    methods: {
      close: function() {
        this.dialog = false;
      },
      login: function() {
        debugger;
        axios.post("http://localhost:8081/api/login", this.formData, { withCredentials: true })    
            .then((response) => {
                let name = response.data.Name;
                this.$cookies.set('name', response.data.Name, 60 * 60 * 24 * 1000);
                this.$store.commit('toggleFlag', 'flagForAuth');
                this.$router.push("/");   
            })    
            .catch((errors) => {    
                // alert("Данного пользователя не существует. Проверьте корректность данных");  
                this.dialog = true;  
            });    
        }       
    }
  }
</script>