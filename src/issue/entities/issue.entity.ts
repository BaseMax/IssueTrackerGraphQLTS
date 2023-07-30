import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Issue {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

