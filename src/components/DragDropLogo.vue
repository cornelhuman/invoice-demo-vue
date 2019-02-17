<template>
  <div id="file-drag-drop">
    <div ref="fileform">
      <template v-if="uploadedImage">
        <img style="height:125px" :src="uploadedImage">
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

  public files: any = [];
  public percentage: number = 0;
  public progress: number = 0;
  public dragAndDropCapable: boolean = false;

  public $refs!: {
    fileform: HTMLFormElement;
  };

  get fileList() {
    return this.files;
  }

  get getMsg() {
    return this.msg;
  }

  get uploadedImage() {
    return this.src;
  }

  get uploadPercentage() {
    return this.percentage;
  }

  public mounted() {
    // this.$refs.fileform.addEventListener();
    const refObj = this;
    this.dragAndDropCapable = this.dragDropCapable();
    const eventList = [
      "drag",
      "dragstart",
      "dragend",
      "dragover",
      "dragenter",
      "dragleave",
      "drop"
    ];
    if (this.dragAndDropCapable) {
      eventList.forEach(item => {
        refObj.$refs.fileform.addEventListener(item, event => {
          // do not allow any event vanilla handling on this div
          event.preventDefault();
          event.stopPropagation();
        });
      });
      // Add custom eventlistner for the drop event
      refObj.$refs.fileform.addEventListener("drop", event => {
        if (event.dataTransfer) {
          if (event.dataTransfer.files) {
            const files = event.dataTransfer.files;
            for (let i = 0; i < files.length; i++) {
              refObj.files.push(files[i]);
            }
          }
        }
        // Run our custom file handler
        refObj.submitFiles();
      });
    }
  }

  private submitFiles() {
    const storageRef = firebase.storage().ref(this.files[0].name);
    const refObj = this;
    // Only upload the first file
    const uploadTask = storageRef.put(this.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        refObj.percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + refObj.uploadPercentage + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            const msg = "Uploading (" + refObj.uploadPercentage + ")";
            this.$emit("progress", msg);
            console.log("Upload is running");
            break;
        }
      },
      error => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          // refObj.uploadedImage = downloadURL;
          refObj.$emit("change", downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  }

  private dragDropCapable() {
    // Create test element and check availability of drag drop events
    const div = document.createElement("div");
    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
