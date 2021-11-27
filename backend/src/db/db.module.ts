import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControlModule } from 'src/control/control.module';
import { ConnectionService } from './connection.service';
import { DatabaseService } from './database.service';

@Module({
    imports: [ConfigModule, ControlModule],
    exports: [DatabaseService],
    providers: [ConnectionService, DatabaseService],
})
export class DbModule {}
