import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';

@Module({
    imports: [DbModule],
    providers: [MemberResolver, MemberService],
})
export class MemberModule {}
