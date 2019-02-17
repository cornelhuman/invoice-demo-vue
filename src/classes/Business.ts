export default class Business {
    public logo: string;
    public name: string;
    public address1: string;
    public address2: string;
    public city: string;
    public country: string;
    public zip: string;
    public email: string;
    public tel: string;
    public invoicenumber: number;
    public taxname: string;
    public taxpercentage: number;

    constructor() {
        this.logo = "";
        this.name = "";
        this.address1 = "";
        this.address2 = "";
        this.city = "";
        this.country = "";
        this.zip = "";
        this.email = "";
        this.tel = "";
        this.invoicenumber = 1000;
        this.taxname = "VAT";
        this.taxpercentage = 15;
    }
}
