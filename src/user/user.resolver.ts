import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { User as UserModel } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserArgs } from './dto/get-user.dto';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(@Args('createUserDto') dto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(dto);
  }

  @Query(() => UserModel, { nullable: true })
  async getUser(@Args() dto: GetUserArgs): Promise<User> {
    return this.userService.getUser(dto.email);
  }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.remove(id);
  // }
}
