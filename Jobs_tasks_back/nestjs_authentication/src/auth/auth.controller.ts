import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./strategy/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("/user/:id")
  async getUser(@Req() req, @Res() res, @Body() body, @Param() param) {
    const auth = await this.authService.getOneUser(param.id);
    res.status(auth.status).json(auth.msg);
  }
  @Post("/location")
  async getLocation( @Res() res, @Body() body) {
    const auth = await this.authService.getAddress(body.latitude, body.longitude);
    res.status(auth.status).json(auth.msg);
  }

  // @UseGuards(JwtAuthGuard)
  @Post("/user/signup")
  async signup(@Req() req, @Res() res, @Body() body) {
    const auth = await this.authService.createUser(body);
    res.status(auth.status).json(auth.content);
  }
  // @Post('/user/ay')
  // async ay(@Req() req, @Res() res, @Body() body) {
  //   const auth = await this.authService.getLoc(body.latitude,body.longitude);

  // }
}
