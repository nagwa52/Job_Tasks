import {
  IsString,
} from "class-validator";

export class LocationDTO {
  @IsString()
  city: string;
  @IsString()
  state: string;
}
