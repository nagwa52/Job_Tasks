import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, res: any, body: any, param: any): Promise<void>;
    signup(req: any, res: any, body: any): Promise<void>;
}
