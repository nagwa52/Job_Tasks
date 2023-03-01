import { Injectable, Body } from "@nestjs/common";
import { UsersDTO } from "./dto/users.dto";
import { validate } from "class-validator";
import { JwtService } from "@nestjs/jwt";
import { LoggerService } from "../logger/logger.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../database/entities/users.entity";
import { Repository } from "typeorm";
import fetch from "node-fetch";

@Injectable()
export class AuthService {
  constructor(
    private logger: LoggerService,
    private jwtService: JwtService,
    @InjectRepository(Users) private usersRepository: Repository<Users>
  ) {}

  // async login(user: any): Promise<Record<string, any>> {
  //   // Validation Flag
  //   let isOk = false;

  //   // Transform body into DTO
  //   const userDTO = new UsersDTO();
  //   userDTO.email = user.email;
  //   userDTO.password = user.password;

  //   // Validate DTO against validate function from class-validator
  //   await validate(userDTO).then((errors) => {
  //     if (errors.length > 0) {
  //       this.logger.debug(`${errors}`, AuthService.name);
  //     } else {
  //       isOk = true;
  //     }
  //   });

  //   if (isOk) {
  //     // Get user information
  //     const userDetails = await this.usersRepository.findOne({
  //       email: user.email,
  //     });
  //     if (userDetails == null) {
  //       return { status: 401, msg: { msg: 'Invalid credentials' } };
  //     }

  //     // Check if the given password match with saved password
  //     const isValid = bcrypt.compareSync(user.password, userDetails.password);
  //     if (isValid) {
  //       return {
  //         status: 200,
  //         msg: {
  //           email: user.email,
  //           access_token: this.jwtService.sign({ email: user.email }),
  //         },
  //       };
  //     } else {
  //       return { status: 401, msg: { msg: 'Invalid credentials' } };
  //     }
  //   } else {
  //     return { status: 400, msg: { msg: 'Invalid fields.' } };
  //   }
  // }

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
  // async getLoc(lat:any,lng:any)  {
  //   // const fetchLocationName = async (lat,lng) => {
  //     await fetch(
  //       'https://www.mapquestapi.com/geocoding/v1/reverse?key=API-Key&location='+lat+'%2C'+lng+'&outFormat=json&thumbMaps=false',
  //     )
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //         console.log(
  //           'ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson),
  //         );
  //       });
  //   };

  async createUser(body: any): Promise<Record<string, any>> {
    // Validation Flag
    let isOk = false;

    // Transform body into DTO
    const userDTO = new UsersDTO();
    userDTO.name = body.name;
    userDTO.email = body.email;
    userDTO.latitude = body.latitude;
    userDTO.longitude = body.longitude;
    // Validate DTO against validate function from class-validator
    // const address = await this.getLoc(userDTO.latitude, userDTO.longitude)
    // console.log(address);
    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`, AuthService.name);
      } else {
        isOk = true;
      }
    });
    if (isOk) {
      await this.usersRepository.save(userDTO).catch((error) => {
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
  }
}
