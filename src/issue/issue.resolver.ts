import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IssueService } from './issue.service';
import { Issue } from './entities/issue.entity';
import { CreateIssueInput } from './dto/create-issue.input';
import { UpdateIssueInput } from './dto/update-issue.input';
import { StatusResult } from 'src/common/entities/status-result';
import { ChangeIssueStatusInput } from './dto/change-issue-status.input';
import { Priority } from './enums/priority.enum';

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
  
  @Query(() => [Issue], { name: 'findCloseIssues' })
  findCloseIssues() {
    return this.issueService.findCloseIssues();
  }

  @Query(() => [Issue], { name: 'findOpenIssues' })
  findOpenIssues() {
    return this.issueService.findOpenIssues();
  }

  @Query(() => [Issue], { name: 'findLowPriorityIssues' })
  findLowPriorityIssues() {
    return this.issueService.findLowPriorityIssues();
  }


  @Query(() => [Issue], { name: 'findHighPriorityIssues' })
  findHighPriorityIssues() {
    return this.issueService.findHighPriorityIssues();
  }


  @Query(() => [Issue], { name: 'findMediumPriorityIssues' })
  findMediumPriorityIssues() {
    return this.issueService.findMediumPriorityIssues();
  }

  @Query(() => [Issue], { name: 'findIssuesByComponent' })
  findIssuesByComponent(@Args('componentId') componentId : string) {
    return this.issueService.findIssuesByComponent(componentId);
  }

  @Query(() => [Issue], { name: 'findIssuesByProject' })
  findIssuesByProject(@Args('projectId') projectId : string) {
    return this.issueService.findIssuesByProject(projectId);
  }

  @Query(() => [Issue], { name: 'findIssuesByAssignee' })
  findIssuesByAssignee(@Args('assigne') assigne : string) {
    return this.issueService.findIssuesByAssignee(assigne);
  }

  @Mutation(() => StatusResult , {name : "changeIssueStatus"})
  changeIssueStatus(@Args('changeIssueStatusInput') changeIssueStatusInput: ChangeIssueStatusInput) {
    return this.issueService.changeIssueStatus(changeIssueStatusInput) ;
  }


  @Mutation(() => StatusResult , {name : "changeIssuePriority"})
  changeIssuePriority(@Args('id') id :string , @Args('priority') priority:Priority) {
    return this.issueService.changeIssuePriority(id , priority) ;
  }


  @Mutation(() => StatusResult , {name : 'updateIssue'})
  updateIssue(@Args('updateIssueInput') updateIssueInput: UpdateIssueInput) {
    return this.issueService.update(updateIssueInput.id, updateIssueInput);
  }

  @Mutation(() => StatusResult , {name : 'assignIssue'})
  assignIssue(@Args('issueId') issueId : string , @Args('assigne') assigne : string ) {
    return this.issueService.assignIssue(issueId , assigne);
  }

  @Mutation(() => StatusResult , {name: 'removeTagFromIssue'})
  removeTagFromIssue(@Args('issueId') issueId : string , @Args('issueId') tag : string) {
    return this.issueService.removeTagFromIssue(issueId , tag);
  }

  @Mutation(() => StatusResult , {name: 'removeCloseIssue'})
  removeCloseIssue() {
    return this.issueService.removeCloseIssue();
  }

  @Mutation(() => StatusResult , {name: 'removeIssue'})
  removeIssue(@Args('id', { type: () => String  , name : 'removeIssue'}) id: string) {
    return this.issueService.remove(id);
  }

  @Mutation(() => StatusResult , {name: 'removeAllIssue'})
  removeAllIssue() {
    return this.issueService.removeAll();
  }

}
