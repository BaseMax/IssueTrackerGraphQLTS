import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentResolver } from './attachment.resolver';
import { IssueModule } from 'src/issue/issue.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Attachment]) ,
    IssueModule , 
  ] , 
  providers: [AttachmentResolver, AttachmentService]
})
export class AttachmentModule {}
