import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueResolver } from './issue.resolver';

@Module({
  providers: [IssueResolver, IssueService]
})
export class IssueModule {}
