<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form @submit.stop.prevent="login" ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="username"
                    :rules="nameRules"
                    label="Username"
                    name="username"
                    prepend-icon="person"
                    type="text"
                    required
                  />
                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn @click="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import * as types from "../store/types";
import api from "../api/index";

export default {
  name: "Login",

  data: () => {
    return {
      username: "",
      password: "",
      valid: true,
      nameRules: [v => !!v || "Name is required"]
    };
  },

  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        let params = {
          username: this.username,
          password: this.password
        };

        // params = qs.stringify(params)
        // axios.post(this.$route.path, params)
        // .then(res => {
        //   console.log(res)
        //   this.$store.commit(types.LOGIN, res.token)
        // })
        // .catch(err => {
        //   console.error(err);
        // })
        // console.log(axios);
        // console.log(params);
        // console.log(api, api.api_login)

        try {
          let res = await api.login(params);
          console.log(typeof res);
          console.log(res);
          this.$store.commit(types.LOGIN, res.token);
          localStorage.setItem("token", res.token);
          this.$router.push({
            name: "dashboard"
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>