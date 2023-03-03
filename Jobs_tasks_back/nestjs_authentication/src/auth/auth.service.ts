import { Injectable, ForbiddenException, Module } from "@nestjs/common";
import { UsersDTO } from "./dto/users.dto";
import { validate } from "class-validator";
import { JwtService } from "@nestjs/jwt";
import { LoggerService } from "../logger/logger.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../database/entities/users.entity";
import { Repository } from "typeorm";
import { HttpService } from "@nestjs/axios";
import { map, catchError } from "rxjs/operators";
import { LocationDTO } from "./dto/location.dto";

@Injectable()
export class AuthService {
  constructor(
    private logger: LoggerService,
    private httpService: HttpService,
    private jwtService: JwtService,
    @InjectRepository(Users) private usersRepository: Repository<Users>
  ) {}
  /** * Get the user Model with specific id

* 

* @param userId $where Where id of user is in the system


* @return Status and msg of data of the user

*/
  async getOneUser(userId: any): Promise<Record<string, any>> {
    // Get user information
    const userDetails = await this.usersRepository.findOne({
      id: userId,
    });
    if (userDetails == null) {
      return { status: 401, msg: { msg: "No user with This id" } };
    } else {
      return {
        status: 200,
        msg: {
          userDetails: userDetails,
        },
      };
    }
  }
  /** * get the location object

* 

* @param latitude $which is mandatory to get all object of location

* @param longitude $which is mandatory to get all object of location

* @return object called Data holding all location data

*/
  async getAddress(latitude: any, longitude: any) {
    const response = await this.httpService
      .get(
        "https://geocode.xyz/" +
          latitude +
          "," +
          longitude +
          "?geoit=json&auth=882984899060367383322x87749"
      )
      .toPromise();
    return {
      status: 200,
      msg: {
        Data: response.data,
      },
    };
  }
  /** * create new user

* 

* @param body $ which consists of email,name,latitude and longitude

* @return Status and msg for every case

*/
  async createUser(body: any): Promise<Record<string, any>> {
    console.log(body);
    // Validation Flag
    let isOk = false;

    // Transform body into DTO
    const userDTO = new UsersDTO();
    const locationDTO = new LocationDTO();
    userDTO.name = body.name;
    userDTO.email = body.email;
    userDTO.latitude = body.latitude;
    userDTO.longitude = body.longitude;

    // Validate DTO against validate function from class-validator
    const address = await this.getAddress(userDTO.latitude, userDTO.longitude);
    if (address.msg.Data.country === "United States of America") {
      isOk = true;
      locationDTO.city = address.msg.Data.city;
      locationDTO.state = address.msg.Data.state;
      await validate(userDTO).then((errors) => {
        if (errors.length > 0) {
          this.logger.debug(`${errors}`, AuthService.name);
        } else {
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
          this.logger.debug(error.message, AuthService.name);
          isOk = false;
        });
        if (isOk) {
          return { status: 201, content: { msg: `User created with success` } };
        } else {
          return { status: 400, content: { msg: "User already exists" } };
        }
      } else {
        return { status: 400, content: { msg: "Invalid content" } };
      }
    } else {
      isOk = false;
      return {
        status: 400,
        content: { msg: "you can't sign up , this is for USA residents only" },
      };
    }
  }
}
