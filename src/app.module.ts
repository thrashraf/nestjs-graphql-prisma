import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { DateTimeResolver } from 'graphql-scalars';

import { get, set } from 'lodash';
import {decodeJwt} from './utils/jwt.utils';
@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: true,
    typePaths: ['./**/*.graphql'],
    definitions: {
      path: join(process.cwd(), 'src/types/graphql.ts'),
      outputAs: 'class'
    },
    resolvers: {
      DateTime: DateTimeResolver
    },
    context: ({ req, res }) => {
      //? get user cookie from request
      const token = get(req, 'cookies.token');
      //? verify token
      const user = token ? decodeJwt(token) : null;
      //? attach the user to request
      if (user) set(req, 'user', user);

      return { req, res }
    }
  }),
  PrismaModule,
  UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
