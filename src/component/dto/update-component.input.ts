import { CreateComponentInput } from './create-component.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateComponentInput extends PartialType(CreateComponentInput) {
  @Field(() => ID)
  id: string;
}
