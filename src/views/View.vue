<template>
  <div class="edit">
    <div class="wrapper">
      <div class="box">
        <h3 class="title">{{ property.name }}</h3>
        <article class="media">
          <div class="media-left">
            <div class="columns">
              <div class="column" v-for="index in imgCounter" :key="index">
                <img :src="property.images[index - 1]" alt="Image" />
              </div>
            </div>
          </div>
          <div class="media-content">
            <div class="content">
              <p></p>
              <p>{{ property.description }}</p>
              <p><strong> Price: </strong> {{ property.price }}€</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  data() {
    return {
      property: {
        id: "",
        name: "",
        price: "",
        description: "",
        images: []
      },
      imgCounter: 0
    };
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
img {
  max-width: 100%;
}
article {
  display: flex;
  flex-direction: column;
}
.media-left {
  width: 100%;
}
.box {
  margin-bottom: 2rem;
}

@media screen and (min-width: 768px) {
}
</style>
