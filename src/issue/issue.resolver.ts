import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IssueService } from './issue.service';
import { Issue } from './entities/issue.entity';
import { CreateIssueInput } from './dto/create-issue.input';
import { UpdateIssueInput } from './dto/update-issue.input';
import { StatusResult } from 'src/common/entities/status-result';
import { ChangeIssueStatusInput } from './dto/change-issue-status.input';

@Resolver(() => Issue)
export class IssueResolver {
  constructor(private readonly issueService: IssueService) {}

  @Mutation(() => StatusResult)
  createIssue(@Args('createIssueInput') createIssueInput: CreateIssueInput) {
    return this.issueService.create(createIssueInput);
  }

  @Query(() => [Issue], { name: 'findAllIssue' })
  findAll() {
    return this.issueService.findAll();
  }

  @Query(() => Issue, { name: 'findOneIssue' })
  findOne(@Args('id', { type: () => String}) id: string) {
    return this.issueService.findOne({id});
  }

  @Mutation(() => StatusResult)
  changeIssueStatus(@Args('changeIssueStatusInput') changeIssueStatusInput: ChangeIssueStatusInput) {
    return this.issueService.changeStatus(changeIssueStatusInput) ;
  }

  @Mutation(() => StatusResult)
  updateIssue(@Args('updateIssueInput') updateIssueInput: UpdateIssueInput) {
    return this.issueService.update(updateIssueInput.id, updateIssueInput);
  }

  @Mutation(() => StatusResult)
  removeIssue(@Args('id', { type: () => String }) id: string) {
    return this.issueService.remove(id);
  }
}
