import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService:ConfigService):TypeOrmModuleOptions => ({
                    type: 'postgres',
                    host: configService.get<string>('POSTGRES_HOST','127.0.0.1'),
                    port: process.env.NODE_ENV === "test" 
                        ? configService.get<number>('POSTGRES_PORT_TEST',5432) 
                        : configService.get<number>('POSTGRES_PORT',5432),
                    username: configService.get<string>('POSTGRES_USER','postgres'),
                    password: configService.get<string>('POSTGRES_PASSWORD','postgres'),
                    database: process.env.NODE_ENV === "test" 
                        ? configService.get<string>('POSTGRES_DATABASE_TEST','postgres_test') 
                        : configService.get<string>('POSTGRES_DATABASE','postgres'),
                    entities: ["dist/**/*.entity{.ts,.js}"],
                    synchronize: configService.get<string>('MODE','DEV') == 'DEV',
                    autoLoadEntities: true,
            })
        }),
    ] 
})
export class DatabaseModule {}