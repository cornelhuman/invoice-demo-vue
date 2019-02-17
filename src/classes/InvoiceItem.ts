export default class InvoiceItem {

    public id: number;
    public category: string;
    public description: string;
    public quantity: number;
    public price: number;
    public total: number;


    constructor(id: number, category: string, description: string, quantity: number, price: number) {
        this.id = id;
        this.category = category;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.total = quantity * price;


    }
}
