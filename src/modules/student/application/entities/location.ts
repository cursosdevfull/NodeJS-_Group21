export class Location {
    address: string
    city: string;
    state: string;
    country: string;

    constructor(address: string, city: string, state: string, country: string) {
        if(!address || !city || !state || !country) {
            throw new Error("All fields are required");
        }


        this.address = address;
        this.city = city;
        this.state = state;
        this.country = country;

    }

}