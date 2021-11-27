import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/database.service';

@Injectable()
export class MemberService {
    constructor(private dbService: DatabaseService) {}
}
