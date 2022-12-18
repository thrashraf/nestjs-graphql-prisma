import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput, UpdateUserInput } from 'src/types/graphql';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create({ name }: CreateUserInput) {
    return this.prisma.users.create({
      data: { name },
    })
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
      select: { name: true, id: true }
    })
  }

  update(id: number, { name }: UpdateUserInput) {
    return this.prisma.users.update({
      where: { id },
      data: {
        name
      }
    })
  }

  remove(id: number) {
    return this.prisma.users.delete({
      where: { id }
    })
  }
}
