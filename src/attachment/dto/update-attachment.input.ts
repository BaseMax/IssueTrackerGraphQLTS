import { CreateAttachmentInput } from './create-attachment.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateAttachmentInput extends PartialType(CreateAttachmentInput) {
  @Field(() => ID)
  @IsNotEmpty()
  id : string ; 
}
