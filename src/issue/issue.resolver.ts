import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IssueService } from './issue.service';
import { Issue } from './entities/issue.entity';
import { CreateIssueInput } from './dto/create-issue.input';
import { UpdateIssueInput } from './dto/update-issue.input';

@Resolver(() => Issue)
export class IssueResolver {
  constructor(private readonly issueService: IssueService) {}

  @Mutation(() => Issue)
  createIssue(@Args('createIssueInput') createIssueInput: CreateIssueInput) {
    return this.issueService.create(createIssueInput);
  }

  @Query(() => [Issue], { name: 'issue' })
  findAll() {
    return this.issueService.findAll();
  }

  @Query(() => Issue, { name: 'issue' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.issueService.findOne(id);
  }

  @Mutation(() => Issue)
  updateIssue(@Args('updateIssueInput') updateIssueInput: UpdateIssueInput) {
    return this.issueService.update(updateIssueInput.id, updateIssueInput);
  }

  @Mutation(() => Issue)
  removeIssue(@Args('id', { type: () => Int }) id: number) {
    return this.issueService.remove(id);
  }
}
