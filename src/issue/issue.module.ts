import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueResolver } from './issue.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Attachment } from 'src/attachment/entities/attachment.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Issue , Comment , Attachment])] ,
  providers: [IssueResolver, IssueService] , 
  exports : [IssueService]
})
export class IssueModule {}
