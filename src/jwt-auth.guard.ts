import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  
    handleRequest(err: any, user: any) {
        if (err || !user) {
        throw err || new UnauthorizedException();
        }
        return user;
    }

}




// UnauthorizedException	NestJS এর বিল্ট-ইন এক্সসেপশন, যেটা 401 রেসপন্স দেয়