import { Injectable, UnauthorizedException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfirmUserInput, CreateUserInput, LoginInput, UpdateUserInput } from 'src/types/graphql';
import * as bcrypt from 'bcrypt';
import Ctx from 'src/types/context.type';
import { signJwt } from 'src/utils/jwt.utils';
import { omit } from 'lodash';
import {CookieOptions} from 'express';
 
const cookieOptions: CookieOptions = {
  domain: process.env.DOMAIN,
  secure: false,
  sameSite: 'strict',
  httpOnly: true,
  path: '/'
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser({ name, password, email }: CreateUserInput) {

    const confirmationToken = nanoid(32);
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt)

    return this.prisma.users.create({
      data: { name, email, password: hashedPassword, confirmationToken }
    })
  }

  async confirmUser({ email, confirmationToken }: ConfirmUserInput) {

    const user = await this.getUserByEmail(email);

    if (!user || confirmationToken !== user.confirmationToken) {
      throw new UnauthorizedException()
    };

    return this.update(user.id, { id: user.id, active: true });
  }

  async login({ email, password }: LoginInput, context: Ctx) {
    const user = await this.getUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password) || !user.active) {
      throw new UnauthorizedException();
    }

    //? exclude password, active and confirmationToken
    const jwt = signJwt(omit(user, ['password', 'active', 'confirmationToken'])); 
    
    console.log(jwt)

    //? set the jwt in the cookie
    context.res.cookie('token', jwt, cookieOptions);
    return user;
  }

  logout(context: Ctx) {
    context.res.cookie('token', '', { ...cookieOptions, maxAge: 0});
    return null;
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(email: string) {
    return this.prisma.users.findUnique({
      where: { email }
    })
  }

  getUserByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email }
    })
  }

  update(id: number, { ...data }: UpdateUserInput) {
    return this.prisma.users.update({
      where: { id },
      data: {
        ...data
      }
    })
  }

  remove(id: number) {
    return this.prisma.users.delete({
      where: { id }
    })
  }
}
