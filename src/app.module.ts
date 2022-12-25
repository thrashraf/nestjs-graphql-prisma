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
import { DateTimeResolver } from 'graphql-scalars'
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
