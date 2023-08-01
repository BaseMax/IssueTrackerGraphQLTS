import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAttachmentInput {
  @Field()
  @IsNotEmpty()
  fileUrl : string ; 

  @Field()
  @IsNotEmpty()
  description : string ; 
}
