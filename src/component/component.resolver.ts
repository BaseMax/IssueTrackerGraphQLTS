import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ComponentService } from './component.service';
import { Component } from './entities/component.entity';
import { CreateComponentInput } from './dto/create-component.input';
import { UpdateComponentInput } from './dto/update-component.input';
import { StatusResult } from 'src/common/entities/status-result';

@Resolver(() => Component)
export class ComponentResolver {
  constructor(private readonly componentService: ComponentService) {}

  @Mutation(() => StatusResult)
  createComponent(@Args('createComponentInput') createComponentInput: CreateComponentInput) {
    return this.componentService.create(createComponentInput);
  }

  @Query(() => [Component], { name: 'findAllComponent' })
  findAll() {
    return this.componentService.findAll();
  }

  @Query(() => Component, { name: 'findOneComponent' })
  findOne(@Args('id', { type: () => ID}) id: string) {
    return this.componentService.findOne(id);
  }

  @Mutation(() => StatusResult , {name : 'updateComponent'})
  updateComponent(@Args('updateComponentInput') updateComponentInput: UpdateComponentInput) {
    return this.componentService.update(updateComponentInput.id, updateComponentInput);
  }

  @Mutation(() => StatusResult , {name : 'removeComponent'})
  removeComponent(@Args('id', { type: () => ID }) id: string) {
    return this.componentService.remove(id);
  }
}
