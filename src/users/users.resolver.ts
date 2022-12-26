import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { ConfirmUserInput, CreateUserInput, LoginInput, UpdateUserInput } from 'src/types/graphql';
import Ctx from 'src/types/context.type';
@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation('confirmUserInput')
  confirmUser(@Args('confirmUserInput') confirmUserInput: ConfirmUserInput) {
    return this.usersService.confirmUser(confirmUserInput);
  }

  @Query('loginInput')
  loginInput(@Args('loginInput') loginInput: LoginInput, @Context() context: Ctx) {
    return this.usersService.login(loginInput, context);
  }

  @Query('getSelfUser')
  getSelfUser(@Context() context: Ctx) {
    return context.req.user
  }

  @Query('logout')
  logout(@Context() context: Ctx) {
    return this.usersService.logout(context);
  }

  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  findOne(@Args('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.usersService.remove(id);
  }
}
