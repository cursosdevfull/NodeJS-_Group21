export class Education {
    degree: string;
    institution: string;
    yearOfGraduation: number;

    constructor(degree: string, institution: string, yearOfGraduation: number) {
        if (!degree || degree.trim().length < 3) {
            throw new Error("Degree must be at least 3 characters long");
        }
        if (!institution || institution.trim().length < 3) {
            throw new Error("Institution must be at least 3 characters long");
        }
        if (yearOfGraduation < 1900 || yearOfGraduation > new Date().getFullYear()) {
            throw new Error("Year of graduation must be a valid year");
        }
        this.degree = degree;
        this.institution = institution;
        this.yearOfGraduation = yearOfGraduation;
    }
}
