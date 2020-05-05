<template>
  <div class="img">
    <input type="file" @change="uploadFile($event.target.files)" accept="image/*" />
    <br />
    <img width="200px" :src="source" />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";
export default {
  data() {
    return {
      source: ""
    };
  },
  methods: {
    async uploadFile(files) {
      const file = files.item(0);
      const metadata = {
        contentType: "image/png"
      };
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${files.name}`);
      await imageRef.put(file, metadata);
      const downloadURL = await imageRef.getDownloadURL();
      this.source = downloadURL;
    }
  }
};
</script>

<style></style>
