import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { StatusResult } from 'src/common/entities/status-result';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => Project)
  createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
    return this.projectService.create(createProjectInput);
  }

  @Query(() => [Project], { name: 'findAllProject' })
  findAll() {
    return this.projectService.findAll();
  }

  @Query(() => Project, { name: 'findOneProject' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.projectService.findOne(id);
  }

  @Mutation(() => StatusResult)
  updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
    return this.projectService.update(updateProjectInput.id, updateProjectInput);
  }

  @Mutation(() => StatusResult , {name : 'removeProject'})
  removeProject(@Args('id', { type: () => String}) id:string) {
    return this.projectService.remove(id);
  }
}
