<template>
  <div class="img">
    <input
      type="file"
      @change="uploadFile($event.target.files)"
      accept="image/*"
      multiple
    />
    <br />
    <img width="200px" :src="source" />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
export default {
  data() {
    return {
      source: []
    };
  },
  methods: {
    async uploadFile(files) {
      const uid = await firebase.auth().currentUser.uid;
      for (let file of files) {
        const metadata = {
          contentType: "image/jpg"
        };
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`images/${uid}/${file.name}`);
        await imageRef.put(file, metadata);
        // const downloadURL = await imageRef.getDownloadURL();
        // this.source = downloadURL;
      }
    }
  }
};
</script>

<style></style>
