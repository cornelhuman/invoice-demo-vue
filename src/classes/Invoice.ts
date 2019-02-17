import InvoiceItem from "@/classes/InvoiceItem.ts";
export default class Invoice {
    public invoicenumber: number;
    public invoicedate: string;
    public invoicetitle: string;
    public subtotal: number;
    public tax: number;
    public total: number;
    public items: InvoiceItem[];


    constructor(invoicenumber: number, invoicetitle: string) {
        this.items = new Array();
        this.invoicenumber = invoicenumber;
        this.invoicedate = new Date().toLocaleDateString();
        this.invoicetitle = invoicetitle;
        this.subtotal = 0;
        this.tax = 0;
        this.total = 0;
    }

    public addItem(id: number, category: string, description: string, quantity: number, price: number) {
        const item = new InvoiceItem(id, category, description, quantity, price);
        this.items.push(item);
    }
}
