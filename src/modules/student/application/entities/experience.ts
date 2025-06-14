export class Experience {
    company: string
    role: string;
    startDate: Date;
    endDate?: Date;

    constructor(company: string, role: string, startDate: Date, endDate?: Date) {
        if (!company || !role || !startDate) {
            throw new Error("All fields are required");
        }

        this.company = company;
        this.role = role;
        this.startDate = startDate;

        if (endDate) {
            this.endDate = endDate;
        }
    }
}