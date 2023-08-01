import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { IssueModule } from 'src/issue/issue.module';

@Module({
  imports : [ 
    TypeOrmModule.forFeature([Comment])  , 
    IssueModule ,
  ] , 
  providers: [CommentResolver, CommentService]
})
export class CommentModule {}
