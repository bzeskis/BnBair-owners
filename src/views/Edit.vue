<template>
  <div class="add">
    <div class="wrapper">
      <section class="hero">
        <div class="hero-body">
          <h1 class="title">Edit property: {{ property.name }}</h1>
        </div>
      </section>
      <div id="changeProp" class="add-property">
        <form @submit.prevent="update">
          <div class="notification is-hidden" id="add-notification">
            <!-- <button class="delete" id="register-notification-remove"></button> -->
          </div>

          <Notification
            :display="success"
            type="is-success"
            message="Successfully edited this listing"
          />
          <Notification :display="error" type="is-warning" :message="errMessage" />

          <div class="field">
            <div class="control">
              <label class="label" for="price">Price per night, EUR</label>
              <input
                v-model="property.price"
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
                v-model="property.description"
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
                v-model="property.images[index - 1]"
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
              <button id="add" class="button is-primary">Update property</button>
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
import Notification from "@/components/Notification";
export default {
  components: {
    Notification
  },
  data() {
    return {
      property: {
        id: "",
        name: "",
        price: "",
        description: "",
        images: []
      },
      imgCounter: 0,
      success: false,
      error: false,
      errMessage: ""
    };
  },
  methods: {
    update() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("properties")
        .doc(this.$route.params.id)
        .update({
          price: this.property.price,
          description: this.property.description,
          images: this.property.images
        })
        .then(() => {
          this.success = true;
        })
        .catch((err) => {
          this.errMessage = err.message;
          this.error = true;
        });
    }
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("properties")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.property.id = doc.id;
        this.property.name = doc.data().name;
        this.property.price = doc.data().price;
        this.property.description = doc.data().description;
        this.property.images = doc.data().images;
        this.imgCounter = this.property.images.length;
      });
  }
};
</script>

<style scoped>
#add {
  margin-bottom: 1rem;
}
</style>
