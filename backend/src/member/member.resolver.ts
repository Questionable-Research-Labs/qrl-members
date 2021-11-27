import { Query, Resolver } from '@nestjs/graphql';
import { Member } from './models/member.model';
import { MemberService } from './member.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthguard } from '../authz/graphql.authguard';

@Resolver(() => Member)
export class MemberResolver {
    constructor(private memberService: MemberService) {}
    @UseGuards(GraphqlAuthguard)
    @Query(() => String)
    hello(): string {
        return 'Fuck offffff';
    }
}
