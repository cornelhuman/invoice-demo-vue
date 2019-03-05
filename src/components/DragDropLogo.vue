<template>
  <div id="file-drag-drop">
    <div ref="fileform">
      <template v-if="currentImage">
        <img style="height:125px" :src="currentImage">
      </template>
      <template v-else>
        <div class="dragdropstyle">
          <div class="drop-files pt-4">{{getMsg}}</div>
          <div class="pt-4">
            <progress max="100" :value.prop="uploadPercentage"></progress>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class DragDropLogo extends Vue {
  @Prop(String) public src!: string;
  @Prop(String) public msg!: string;

  public percentage: number = 0;
  public progress: number = 0;

  public $refs!: {
    fileform: HTMLFormElement;
  };

  get getMsg() {
    return this.msg;
  }

  get currentImage() {
    return this.src;
  }

  get uploadPercentage() {
    return this.percentage;
  }

  public mounted() {
    const refObj = this;
    const eventList = [
      "drag",
      "dragstart",
      "dragend",
      "dragover",
      "dragenter",
      "dragleave",
      "drop"
    ];
    if (this.isDragDropCapable()) {
      // Stop default handling
      eventList.forEach(item => {
        refObj.$refs.fileform.addEventListener(item, event => {
          event.preventDefault();
          event.stopPropagation();
        });
      });
      // Add custom file handling
      refObj.$refs.fileform.addEventListener("drop", event => {
        if (event.dataTransfer && event.dataTransfer.files) {
          this.UploadFileToFirebase(event.dataTransfer.files[0]);
        }
      });
    }
  }

  private UploadFileToFirebase(file: File) {
    const storageRef = firebase.storage().ref(file.name);
    const refObj = this;
    const uploadTask = storageRef.put(file);
    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        refObj.percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case firebase.storage.TaskState.RUNNING: // or 'running'
            const msg = "Uploading (" + refObj.uploadPercentage + ")";
            this.$emit("progress", msg);
            break;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          refObj.$emit("change", url);
        });
      }
    );
  }

  private isDragDropCapable() {
    const div = document.createElement("div");
    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  }
}
</script>

<style scoped>
.dragdropstyle {
  height: 125px;
  width: 450px;
  background: #ccc;
  text-align: center;
  border-radius: 6px;
  font-size: large;
  font-weight: bold;
}

progress {
  width: 400px;
  margin: auto;
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
