import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, username: payload.username, admin: payload.admin, suport: payload.suport, overviewOnly: payload.overviewOnly };
    }
}