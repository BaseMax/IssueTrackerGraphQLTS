import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueResolver } from './issue.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Issue])] ,
  providers: [IssueResolver, IssueService] , 
  exports : [IssueService]
})
export class IssueModule {}
