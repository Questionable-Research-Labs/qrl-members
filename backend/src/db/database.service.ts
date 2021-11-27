import { Injectable } from '@nestjs/common';
import { ConnectionService } from './connection.service';

@Injectable()
export class DatabaseService {
    constructor(private dbConnection: ConnectionService) {}
}
