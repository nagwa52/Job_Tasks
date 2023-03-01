import { JwtService } from "@nestjs/jwt";
import { LoggerService } from "../logger/logger.service";
import { Users } from "../database/entities/users.entity";
import { Repository } from "typeorm";
export declare class AuthService {
    private logger;
    private jwtService;
    private usersRepository;
    constructor(logger: LoggerService, jwtService: JwtService, usersRepository: Repository<Users>);
    getOneUser(userId: any): Promise<Record<string, any>>;
    createUser(body: any): Promise<Record<string, any>>;
}
