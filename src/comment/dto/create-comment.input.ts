import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCommentInput {
  
  @Field(()=>String)
  @IsNotEmpty()
  content : string ; 
}
