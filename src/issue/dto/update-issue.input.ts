import { CreateIssueInput } from './create-issue.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateIssueInput extends PartialType(CreateIssueInput) {
  @Field(() => Int)
  id: number;
}
