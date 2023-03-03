"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_dto_1 = require("./dto/users.dto");
const class_validator_1 = require("class-validator");
const jwt_1 = require("@nestjs/jwt");
const logger_service_1 = require("../logger/logger.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../database/entities/users.entity");
const typeorm_2 = require("typeorm");
const axios_1 = require("@nestjs/axios");
const location_dto_1 = require("./dto/location.dto");
let AuthService = AuthService_1 = class AuthService {
    constructor(logger, httpService, jwtService, usersRepository) {
        this.logger = logger;
        this.httpService = httpService;
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
    }
    async getOneUser(userId) {
        const userDetails = await this.usersRepository.findOne({
            id: userId,
        });
        if (userDetails == null) {
            return { status: 401, msg: { msg: "No user with This id" } };
        }
        else {
            return {
                status: 200,
                msg: {
                    userDetails: userDetails,
                },
            };
        }
    }
    async getAddress(latitude, longitude) {
        const response = await this.httpService
            .get("https://geocode.xyz/" +
            latitude +
            "," +
            longitude +
            "?geoit=json&auth=882984899060367383322x87749")
            .toPromise();
        return {
            status: 200,
            msg: {
                Data: response.data,
            },
        };
    }
    async createUser(body) {
        console.log(body);
        let isOk = false;
        const userDTO = new users_dto_1.UsersDTO();
        const locationDTO = new location_dto_1.LocationDTO();
        userDTO.name = body.name;
        userDTO.email = body.email;
        userDTO.latitude = body.latitude;
        userDTO.longitude = body.longitude;
        const address = await this.getAddress(userDTO.latitude, userDTO.longitude);
        if (address.msg.Data.country === "United States of America") {
            isOk = true;
            locationDTO.city = address.msg.Data.city;
            locationDTO.state = address.msg.Data.state;
            await (0, class_validator_1.validate)(userDTO).then((errors) => {
                if (errors.length > 0) {
                    this.logger.debug(`${errors}`, AuthService_1.name);
                }
                else {
                    isOk = true;
                }
            });
            if (isOk) {
                const user = this.usersRepository.create({
                    name: userDTO.name,
                    email: userDTO.email,
                    latitude: userDTO.latitude,
                    longitude: userDTO.longitude,
                    state: locationDTO.state,
                    city: locationDTO.city,
                });
                await this.usersRepository.save(user).catch((error) => {
                    this.logger.debug(error.message, AuthService_1.name);
                    isOk = false;
                });
                if (isOk) {
                    return { status: 201, content: { msg: `User created with success` } };
                }
                else {
                    return { status: 400, content: { msg: "User already exists" } };
                }
            }
            else {
                return { status: 400, content: { msg: "Invalid content" } };
            }
        }
        else {
            isOk = false;
            return {
                status: 400,
                content: { msg: "you can't sign up , this is for USA residents only" },
            };
        }
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        axios_1.HttpService,
        jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map