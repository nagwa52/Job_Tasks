import {
  IsEmail,
  IsLatitude,
  isLatitude,
  IsLongitude,
  isString,
  IsString,
} from "class-validator";

export class UsersDTO {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  // @IsString()
  // state: string;
  @IsLongitude()
  longitude: number;
  @IsLatitude()
  latitude: number;
  // @IsString()
  // city: string;
}
