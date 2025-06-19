import { AuthApplication } from "../application/auth.application";
import { NextFunction, Request, Response } from 'express';
import { AuthLoginDto, AuthRefreshDto } from "./dtos";
import { Endpoint } from '../../../core/decorator';
import { AuthLoginProps, AuthRefreshProps } from "../application/auth";

export class AuthController {
    private application: AuthApplication;

    constructor(application: AuthApplication) {
        this.application = application
    }

    @Endpoint({
        schemaValidator: AuthLoginDto
    })
    async login(req: Request, res: Response, next: NextFunction) {
        const props: AuthLoginProps = req.body;

        try {
            const result = await this.application.login(props);
            res.status(200).json({
                message: 'Login successful',
                data: result
            });
        } catch (error: any) {
            return next(error)
        }
    }

    @Endpoint({
        schemaValidator: AuthRefreshDto
    })
    async refreshToken(req: Request, res: Response, next: NextFunction) {
        const props: AuthRefreshProps = req.body;

        try {
            const result = await this.application.refreshToken(props);
            res.status(200).json({
                message: 'Token refreshed successfully',
                data: result
            });
        } catch (error: any) {
            return next(error)
        }
    }
}
