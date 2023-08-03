import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateComponentInput {
  
  @Field()
  @IsNotEmpty()
  title : string ; 

  @Field()
  @IsNotEmpty()
  description : string ; 
}