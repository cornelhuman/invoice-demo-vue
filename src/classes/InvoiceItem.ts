export default class InvoiceItem {

    public category: string;
    public description: string;
    public quantity: number;
    public price: number;
    public total: number;


    constructor(category: string, description: string, quantity: number, price: number) {
        this.category = "";
        this.description = "";
        this.quantity = 1;
        this.price = 0;
        this.total = quantity * price;
    }
}
