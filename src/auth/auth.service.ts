import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any, keepLogin: boolean) {
        const payload = { username: user.dataValues.username, sub: user.dataValues.id, admin: user.dataValues.admin, suport: user.dataValues.suport, overviewOnly: user.dataValues.overviewOnly };
        return {
            acessToken: this.jwtService.sign(payload, { expiresIn: keepLogin ? '1y' : '1 day' })
        };
    }
}