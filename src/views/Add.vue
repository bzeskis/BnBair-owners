<template>
  <div class="add">
    <div class="wrapper">
      <section class="hero">
        <div class="hero-body">
          <h1 class="title">
            Add new property
          </h1>
        </div>
      </section>
      <Notification
        :display="success"
        type="is-success"
        message="Successfully added a new listing"
      />
      <Notification :display="error" type="is-warning" :message="errMessage" />
      <div id="changeProp" class="add-property">
        <form action="" @submit.prevent="add()">
          <div class="notification is-hidden" id="add-notification">
            <!-- <button class="delete" id="register-notification-remove"></button> -->
          </div>

          <div class="field">
            <label class="label" for="img">Property name:</label>
            <div class="control">
              <input
                v-model="name"
                class="input"
                type="text"
                name="name"
                placeholder="Property Name"
                required
              />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <label class="label" for="city">City</label>
              <div class="select">
                <select v-model="city" name="city">
                  <option>Vilnius</option>
                  <option>Kaunas</option>
                  <option>Klaipėda</option>
                </select>
              </div>
            </div>
            <div class="control is-expanded">
              <label class="label" for="price">Price per night, EUR</label>
              <input
                v-model="price"
                class="input"
                type="number"
                name="price"
                placeholder="50000€"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label" for="description">Description</label>
            <div class="control">
              <textarea
                v-model="description"
                class="textarea"
                name="description"
                placeholder="anything you would like to say?"
                required
                maxlength="600"
              ></textarea>
            </div>
          </div>

          <label class="label" for="img">Images (one minimum):</label>
          <div class="field" v-for="index in imgCounter" :key="index">
            <div class="control">
              <input
                v-model="images[index - 1]"
                class="input"
                type="text"
                name="name"
                placeholder="URL"
                required
              />
            </div>
          </div>

          <button @click="imgCounter++" type="button" class="button is-rounded">
            + Add more images
          </button>

          <div class="field is-grouped">
            <div class="control">
              <button
                id="add"
                class="button is-primary"
                :class="{ 'is-loading': loading }"
              >
                Add property
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Notification from "@/components/Notification";

export default {
  name: "Add",
  components: {
    Notification
  },
  data() {
    return {
      loading: false,
      name: "",
      city: "",
      price: 0,
      description: "",
      images: [],
      success: false,
      error: false,
      errMessage: "",
      imgCounter: 1
    };
  },
  methods: {
    updateFileList(files) {
      this.files = files;
    },
    async add() {
      this.loading = true;
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("properties")
        .add({
          name: this.name,
          city: this.city,
          price: this.price,
          description: this.description,
          images: this.images
        })
        .then(() => {
          this.success = true;
          this.loading = false;
        })
        .catch((err) => {
          this.errMessage = err.message;
          this.error = true;
        });
    }
  }
};
</script>

<style scoped>
select {
  width: 100%;
}

#add {
  margin-top: 1rem;
}
button {
  margin-bottom: 1rem;
}
</style>
