import { JwtService } from "@nestjs/jwt";
import { LoggerService } from "../logger/logger.service";
import { Users } from "../database/entities/users.entity";
import { Repository } from "typeorm";
import { HttpService } from "@nestjs/axios";
export declare class AuthService {
    private logger;
    private httpService;
    private jwtService;
    private usersRepository;
    constructor(logger: LoggerService, httpService: HttpService, jwtService: JwtService, usersRepository: Repository<Users>);
    getOneUser(userId: any): Promise<Record<string, any>>;
    getAddress(latitude: any, longitude: any): Promise<{
        status: number;
        msg: {
            Data: any;
        };
    }>;
    createUser(body: any): Promise<Record<string, any>>;
}
