import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/input/create-user-input.dto';
import { GetUserArgs } from './dto/args/get-user-args.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async getUser(@Args() getUsersArgs: GetUserArgs) {
    return this.userService.getUser(getUsersArgs);
  }
}
