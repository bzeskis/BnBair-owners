<template>
  <div class="reg">
    <div class="wrapper">
      <form @submit.prevent="register">
        <div class="field is-grouped">
          <div class="control is-expanded">
            <label class="label">First Name</label>
            <input
              v-model="firstName"
              class="input"
              type="text"
              placeholder="Name"
            />
          </div>
          <div class="control is-expanded">
            <label class="label">Last Name</label>
            <input
              v-model="lastName"
              class="input"
              type="text"
              placeholder="Lastname"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              v-model="email"
              class="input"
              type="email"
              placeholder="Email@address.com"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              v-model="password"
              class="input"
              type="password"
              placeholder="Enter password"
            />
          </div>
        </div>

        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button
              type="submit"
              class="button is-dark"
              :class="{ 'is-loading': loading }"
            >
              Register
            </button>
          </div>
          <div class="control">
            <button class="button is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  name: "Register",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      loading: false
    };
  },
  methods: {
    register() {
      this.loading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              firstName: this.firstName,
              lastName: this.lastName
            });
        })
        .then(() => {
          this.$router.replace("/host/properties");
        })
        .catch((e) => {
          this.loading = false;
          console.log(e.message);
        });
    }
  }
};
</script>

<style></style>
