import InvoiceItem from "@/classes/InvoiceItem.ts";
export default class Invoice {
    public invoicenumber: number;
    public invoicedate: string;
    public items: InvoiceItem[];
    public invoicetitle: string;


    constructor(invoicenumber: number, invoicetitle: string) {
        this.items = new Array();
        this.invoicenumber = invoicenumber;
        this.invoicedate = new Date().toLocaleDateString();
        this.invoicetitle = invoicetitle;
    }

    public addItem(category: string, description: string, quantity: number, price: number) {
        const item = new InvoiceItem(category, description, quantity, price);
        this.items.push(item);
    }
}
