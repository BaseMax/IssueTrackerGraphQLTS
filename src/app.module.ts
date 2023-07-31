import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DatabaseModule } from './config/database.module';
import { IssueModule } from './issue/issue.module';
import { CommentModule } from './comment/comment.module';
import { AttachmentModule } from './attachment/attachment.module';


@Module({
  imports: [
    ConfigModule.forRoot() , 
    DatabaseModule, 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context : ({req}) => ({req}) ,
      driver : ApolloDriver , 
      autoSchemaFile : join(process.cwd() , "src/schema.gql") , 
      playground : false , 
      plugins : [ApolloServerPluginLandingPageGraphQLPlayground()]
    }),
    CommentModule,
    AttachmentModule 
  ],
})
export class AppModule {}
