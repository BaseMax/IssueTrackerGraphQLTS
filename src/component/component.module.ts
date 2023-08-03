import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentResolver } from './component.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Component])
  ] , 
  providers: [ComponentResolver, ComponentService]
})
export class ComponentModule {}
