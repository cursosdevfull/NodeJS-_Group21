// Adapters

class GMail implements RegisterUserPort {
    subject!: string
    content!: string
    name!: string
    lastname!: string
    isHtml!: boolean

    sendEmailUser(subject: string, content: string, name: string, lastname: string, email: string, isHtml: boolean) {
        this.subject = subject
        this.content = content
        this.name = name
        this.lastname = lastname
        this.isHtml = isHtml

        this.send()
    }

    send() {
        console.log("Email send by GMail")
    }
}


class Office365 implements RegisterUserPort {
    config(subject: string, content: string, payload: { email: string, html: boolean }) {
        console.log("Configuration Office365")
    }

    sendEmailUser(subject: string, content: string, name: string, lastname: string, email: string, isHtml: boolean) {
        this.config(subject, content, { email, html: isHtml })
        this.sendEmail()
    }


    sendEmail() {
        console.log("Email send by Office365")
    }
}

// Application

// Ports
interface RegisterUserPort {
    sendEmailUser(subject: string, content: string, name: string, lastname: string, email: string, isHtml: boolean): void
}

class RegisterUser {
    subject = "Welcome to CursosDev"
    provider: RegisterUserPort

    constructor(provider: RegisterUserPort) {
        this.provider = provider
    }


    register(name: string, lastname: string, email: string) {
        this.provider.sendEmailUser(this.subject, `Welcome ${name} ${lastname}`, name, lastname, email, false)

        /*const gmail = new GMail(this.subject,email, `Welcome ${name} ${lastname}`, false )
        gmail.send()
        const office365 = new Office365()
        office365.config(this.subject, `Welcome ${name} ${lastname}`, {email, html: false} )
        office365.sendEmail()*/
    }
}


type Provider = "GMAIL" | "OFFICE365"

const providers: Record<Provider, string> = {
    GMAIL: "GMAIL",
    OFFICE365: "OFFICE365"
} as const

function getFactoryAdapter(provider: Provider): RegisterUserPort {
    if (provider === "GMAIL") {
        return new GMail()
    } else if (provider === "OFFICE365") {
        return new Office365()
    } else {
        throw new Error("Provider not found")
    }
}

//const provider: RegisterUserPort = new Office365()
const provider: RegisterUserPort = getFactoryAdapter(providers.OFFICE365 as Provider)
const registerUser = new RegisterUser(provider)
registerUser.register("Luis", "Zapata", "luis.zapata@email.com")