import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AttachmentService } from './attachment.service';
import { Attachment } from './entities/attachment.entity';
import { CreateAttachmentInput } from './dto/create-attachment.input';
import { UpdateAttachmentInput } from './dto/update-attachment.input';
import { StatusResult } from 'src/common/entities/status-result';

@Resolver(() => Attachment)
export class AttachmentResolver {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Mutation(() => StatusResult)
  addAttachmentToIssue(@Args('createAttachmentInput') createAttachmentInput: CreateAttachmentInput) {
    return this.attachmentService.addAttachmentToIssue(createAttachmentInput);
  }

  @Query(() => [Attachment], { name: 'attachment' })
  findAll() {
    return this.attachmentService.findAll();
  }

  @Query(() => Attachment, { name: 'attachment' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.attachmentService.findOne(id);
  }

  @Mutation(() => StatusResult)
  updateAttachment(@Args('updateAttachmentInput') updateAttachmentInput: UpdateAttachmentInput) {
    return this.attachmentService.update(updateAttachmentInput.id, updateAttachmentInput);
  }

  @Mutation(() => StatusResult)
  removeAttachment(@Args('id', { type: () => String }) id: string) {
    return this.attachmentService.remove(id);
  }
}
