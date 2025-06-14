import { Student, StudentProps } from "../../application";
import { CertificationModel, EducationModel, ExperienceModel, StudentModel } from "../models";

export class StudentDto {
    static fromDomainToData(domain: Student | Student[]): StudentModel | StudentModel[] {
        if(Array.isArray(domain)) {
            return domain.map(student => this.fromDomainToData(student)) as StudentModel[];
        }

        const props = domain.properties();
        const model = new StudentModel();
        model.studentId = props.studentId;
        model.name = props.name;
        model.lastname = props.lastname;
        model.age = props.age;
        model.email = props.email;
        model.phone = props.phone;
        model.gender = props.gender;
        model.skills = props.skills;
        model.createdAt = props.createdAt;
        model.updatedAt = props.updatedAt;
        model.deletedAt = props.deletedAt;
        model.education = props.education?.map(education => {
            const model = new EducationModel();
            model.degree = education.degree;
            model.institution = education.institution;
            model.yearOfGraduation = education.yearOfGraduation;
            return model;
        });
        model.experience = props.experience?.map(experience => {
            const model = new ExperienceModel();
            model.company = experience.company;
            model.endDate = experience.endDate;
            model.role = experience.role;
            model.startDate = experience.startDate;
            return model;
        });
        model.certifications = props.certifications?.map(certification => {
            const model = new CertificationModel();
            model.name = certification.name;
            model.date = certification.date;
            model.institution = certification.institution;
            return model
        })

        return model;
    }

    static fromDataToDomain(data: StudentModel | StudentModel[]): Student | Student[] {
        if(Array.isArray(data)) {
            return data.map(student => this.fromDataToDomain(student)) as Student[];
        }

        const props: StudentProps = {
            studentId: data.studentId,
            name: data.name,
            lastname: data.lastname,
            age: data.age,
            email: data.email,
            phone: data.phone,
            gender: data.gender,
            skills: data.skills,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            deletedAt: data.deletedAt,
            education: data.education?.map(education => ({
                degree: education.degree,
                institution: education.institution,
                yearOfGraduation: education.yearOfGraduation
            })),
            experience: data.experience?.map(experience => ({
                company: experience.company,
                endDate: experience.endDate,
                role: experience.role,
                startDate: experience.startDate
            })),
            certifications: data.certifications?.map(certification => ({
                name: certification.name,
                date: certification.date,
                institution: certification.institution
            }))
        }

        return new Student(props)
    }
}