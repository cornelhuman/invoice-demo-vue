import InvoiceItem from "@/classes/InvoiceItem.ts";
export default class Invoice {
    public invoicenumber: number = -1;
    public invoicedate: string = new Date().toLocaleDateString();
    public invoicetitle: string = "";
    public subtotal: number = 0;
    public tax: number = 0;
    public total: number = 0;
    public items: InvoiceItem[] = new Array<InvoiceItem>();
}
