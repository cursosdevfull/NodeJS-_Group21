export class Certification {
    name: string;
    institution: string;
    date: Date;

    constructor(name: string, institution: string, date: Date) {
        if (!name || !institution || !date) {
            throw new Error("All fields are required");
        }

        this.name = name;
        this.institution = institution;
        this.date = date;
    }
}