<template>
  <div>
    <button class="btn btn-primary btn-side" type="button" @click="CreatePDF">PDF</button>
    <div id="invoicedocument" ref="pdfdocument">
      <div v-if="layoutType === 'Standard'">
        <InvoiceStandard></InvoiceStandard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import InvoiceStandard from "@/components/InvoiceStandard.vue"; // @ is an alias to /src
import axios from "axios";
import filedownload from "js-file-download";

@Component({
  components: {
    InvoiceStandard
  }
})
export default class Invoice extends Vue {
  @Prop(String) public msg!: string;

  public layoutType: string = "Standard";

  public $refs!: {
    pdfdocument: HTMLFormElement;
  };

  public getDocumentHTML() {
    // get the document html
    const pdfhtml = this.$refs.pdfdocument.outerHTML;
    // wrap the document html in a html document
    // this gives us access to our bootstrap css that we uploaded to firebase and other resources we may need
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
    html += "<div>&nbsp;</div>" + pdfhtml;
    html += "</body>";
    html += "</html>";
    return html;
  }

  public CreatePDF() {
    const refObj = this;
    const html = JSON.stringify(this.getDocumentHTML());
    const url =
      "https://us-central1-skillsdemo-2e3d6.cloudfunctions.net/html2pdf";
    axios
      .post(url, { html }, { responseType: "arraybuffer" })
      .then(response => {
        /* eslint-disable no-console */
        console.log(response);
        filedownload(response.data, "invoice.pdf");
        // refObj.showEditElements = true;
        // refObj.downloadPDF = false;
      });
  }

  public mounted() {
    const refObj = this;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-side {
  position: fixed;
  right: 10px;
}
</style>
