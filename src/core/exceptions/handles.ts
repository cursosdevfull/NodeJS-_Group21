export class DatabaseException extends Error {
    readonly status: number;

    constructor(message: string, stack?: string) {
        super(message);
        this.status = 500;
        this.name = "DatabaseException";
        this.stack = stack || "";
        Object.setPrototypeOf(this, DatabaseException.prototype);
    }
}

export class NotFoundException extends Error {
    readonly status: number;

    constructor(message: string, stack?: string) {
        super(message);
        this.status = 404;
        this.name = "NotFoundException";
        this.stack = stack || "";
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }
}

export class ParametersException extends Error {
    readonly status: number;

    constructor(message: string, stack?: string) {
        super(message);
        this.status = 411;
        this.name = "ParametersException";
        this.stack = stack || "";
        Object.setPrototypeOf(this, ParametersException.prototype);
    }
}

export class UnauthorizedException extends Error {
    readonly status: number;

    constructor(message: string, stack?: string) {
        super(message);
        this.status = 401;
        this.name = "UnauthorizedException";
        this.stack = stack || "";
        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }
}

export class ForbiddenException extends Error {
    readonly status: number;

    constructor(message: string, stack?: string) {
        super(message);
        this.status = 403;
        this.name = "ForbiddenException";
        this.stack = stack || "";
        Object.setPrototypeOf(this, ForbiddenException.prototype);
    }
}