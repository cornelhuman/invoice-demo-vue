export default class Business {
    public logo: string;
    public name: string;
    public showNameAsText: boolean;
    public address1: string;
    public address2: string;
    public city: string;
    public country: string;
    public zip: string;
    public email: string;
    public tel: string;
    public invoicenumber: number;
    public addtax: boolean;
    public taxname: string;
    public taxpercentage: number;
    public bankdetails: string;


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
        this.addtax = true;
        this.taxname = "VAT";
        this.taxpercentage = 15;
        this.bankdetails = "";
        this.showNameAsText = false;
    }
}
