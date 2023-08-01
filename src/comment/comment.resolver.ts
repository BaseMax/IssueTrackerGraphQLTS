import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { StatusResult } from 'src/common/entities/status-result';
import { AddCommentToIssueInput } from './dto/add-commnet-to-issue.input';


@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  // @Mutation(() => StatusResult)
  // createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput) {
  //   return this.commentService.create(createCommentInput);
  // }

  @Mutation(() => StatusResult)
  addCommentToIssue(@Args('addCommentToIssueInput') addCommentToIssueInput: AddCommentToIssueInput) {
    return this.commentService.addCommentToIssue(addCommentToIssueInput);
  }

  @Query(() => Comment, { name: 'findOneComment' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => StatusResult)
  updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
    return this.commentService.update(updateCommentInput.id, updateCommentInput);
  }

  @Mutation(() => StatusResult)
  removeComment(@Args('id', { type: () => String }) id: string) {
    return this.commentService.remove(id);
  }
}
