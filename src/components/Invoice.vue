<template>
  <div>
    <div v-if="!showicons" class="loader mx-auto"></div>
    <button class="btn btn-primary btn-side" @click="StartDownloadPDF">
      <font-awesome-icon icon="file-download" size="2x"/>
    </button>
    <div id="invoicedocument" ref="invoice">
      <div v-if="layoutType === 'Standard'">
        <InvoiceStandard :showicons="showicons"></InvoiceStandard>
      </div>
    </div>
    <Settings></Settings>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import InvoiceStandard from "@/components/InvoiceStandard.vue"; // @ is an alias to /src
import Settings from "@/components/Settings.vue"; // @ is an alias to /src
import axios from "axios";
import FileDownload from "js-file-download";

@Component({
  components: {
    InvoiceStandard,
    Settings
  }
})
export default class Invoice extends Vue {
  @Prop(String) public msg!: string;
  public showicons: boolean = true;
  public layoutType: string = "Standard";

  public $refs!: {
    invoice: HTMLFormElement;
  };

  public StartDownloadPDF() {
    this.showicons = !this.showicons;
  }

  public getInvoiceHTML() {
    const pdfhtml = this.$refs.invoice.outerHTML;
    let html = "<!doctype html>";
    html = '<html lang="en">';
    html += "<head>";
    html +=
      '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
    html += '<meta charset="utf-8">';
    html +=
      '<link rel="stylesheet" type="text/css" href="https://firebasestorage.googleapis.com/v0/b/skillsdemo-2e3d6.appspot.com/o/bootstrap.min.css?alt=media&token=3573221d-1b59-4a95-b773-90091ad3885e">';
    html += '<style type="text/css">';
    html += ".quantity::after{";
    html += "content: ' x'";
    html += "}";
    html += ".price::before {";
    html += "content : '$ '";
    html += "}";
    html += "</style>";
    html += "</head>";
    html += '<body class="container">';
    // There are some funny issues with for some reason there is an image bug where the first image opacity is 50%
    // By adding a &nbsp; it goes away
    html += "<div>&nbsp;</div>";
    html += pdfhtml;
    html += "</body>";
    html += "</html>";
    return html;
  }

  public CreatePDF() {
    const refObj = this;
    const html = JSON.stringify(this.getInvoiceHTML());
    const url =
      "https://us-central1-skillsdemo-2e3d6.cloudfunctions.net/html2pdf";
    axios
      .post(url, { html }, { responseType: "arraybuffer" })
      .then(response => {
        this.showicons = true;
        FileDownload(response.data, "invoice.pdf");
      });
  }

  public updated() {
    console.log("updated");
    if (!this.showicons) {
      console.log("Creating PDF");
      this.CreatePDF();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-side {
  position: absolute;
  right: 10px;
}
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
