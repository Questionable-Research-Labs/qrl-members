import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { MemberModule } from './member/member.module';
import { ConfigModule } from '@nestjs/config';
import { AuthzModule } from './authz/authz.module';
import config from './config';

@Module({
    imports: [
        MemberModule,
        ConfigModule.forRoot({ load: [config] }),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/gql-auto-schema.gql'),
            playground: false,
            context: ({ req }) => ({ req }),
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        AuthzModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
