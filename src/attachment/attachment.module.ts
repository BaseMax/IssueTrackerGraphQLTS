import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentResolver } from './attachment.resolver';
import { IssueModule } from 'src/issue/issue.module';

@Module({
  imports : [
    IssueModule , 
  ] , 
  providers: [AttachmentResolver, AttachmentService]
})
export class AttachmentModule {}
