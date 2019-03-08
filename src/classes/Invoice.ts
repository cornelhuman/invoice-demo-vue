import InvoiceItem from "@/classes/InvoiceItem.ts";
export default class Invoice {
    public invoicenumber: number = -1;
    public invoicedate: string = new Date().toLocaleDateString();
    public invoicetitle: string = "";
    public subtotal: number = 0;
    public addtax: boolean = false;
    public tax: number = 0;
    public taxpercentage: number = 0;
    public taxname: string = "";
    public total: number = 0;
    public items: InvoiceItem[] = new Array<InvoiceItem>();
}
