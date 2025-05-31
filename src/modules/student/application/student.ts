import { Location } from "./entities/location";
import { ArrayVO, NumberVO, StringVO } from "../../../core/value-objects";
import { Certification, Education, Experience } from "./entities";

export type StudentEssentialProps = {
    name: string;
    lastname: string;
    age: number
    email: string;
}

export type StudentOptionalProps = {
    studentId: number;
    gender: string;
    phone: string;
    location: Location
    skills: string[];
    education: Education[];
    experience: Experience[];
    certifications: Certification[];
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export type StudentProps = StudentEssentialProps & Partial<StudentOptionalProps>;

export type StudentUpdateProps = Partial<Omit<StudentEssentialProps, "email"> & Omit<StudentOptionalProps, "studentId" | "createdAt" | "deletedAt" | "updatedAt">>

export class Student {
    private readonly studentId!: number;
    private name!: string;
    private lastname!: string;
    private age!: number;
    private gender: string | undefined;
    private readonly email!: string;
    private phone: string | undefined;
    private location: Location | undefined;
    private skills: string[] | undefined;
    private education: Education[] | undefined;
    private experience: Experience[] | undefined;
    private certifications: Certification[] | undefined;
    private createdAt!: Date;
    private updatedAt: Date | undefined;
    private deletedAt: Date | undefined;

    constructor(props: StudentProps) {
        const name = new StringVO(props.name, "name", 3);
        this.name = name.value;

        const lastname = new StringVO(props.lastname, "lastname", 3);
        this.lastname = lastname.value;

        const age = new NumberVO("age", props.age, 18);
        this.age = age.value;

        if (props.studentId) {
            if (props.studentId < 1) {
                throw new Error("Student ID must be a positive number");
            }
        } else {
            this.studentId = Math.floor(Math.random() * 1000000);
        }

        if (props.skills) {
            const skills = new ArrayVO("skills", props.skills, 1);
            this.skills = skills.value;
        }

        if (!props.createdAt) this.createdAt = new Date();

        Object.assign(this, props);
    }

    delete() {
        this.deletedAt = new Date();
    }

    update(props: StudentUpdateProps) {
        if (props.name) {
            const name = new StringVO(props.name, "name", 3);
            this.name = name.value;
        }

        if (props.lastname) {
            const lastname = new StringVO(props.lastname, "lastname", 3);
            this.lastname = lastname.value;
        }

        if (props.age) {
            const age = new NumberVO("age", props.age, 18);
            this.age = age.value;
        }

        if (props.skills) {
            const skills = new ArrayVO("skills", props.skills, 1);
            this.skills = skills.value;
        }

        Object.assign(this, props);
        this.updatedAt = new Date();
    }

    properties() {
        return {
            studentId: this.studentId,
            name: this.name,
            lastname: this.lastname,
            age: this.age,
            gender: this.gender,
            email: this.email,
            phone: this.phone,
            location: this.location,
            skills: this.skills,
            education: this.education,
            experience: this.experience,
            certifications: this.certifications,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        }
    }
}