import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Dayjs } from 'dayjs';
import DayJSGraphQL from '../../util/DayJSGraphQL';

enum DietaryRequirement {
    GlutenFree,
    LactoseIntolerant,
    Vegetarian,
    Vegan,
}

enum MedicalIssueType {
    Alergy,
    Disability,
    Other,
}

interface MedicalIssue {
    type: MedicalIssueType;
    details?: string;
    action?: string;
}

type DietaryRequirementType = DietaryRequirement | string;

@ObjectType()
export class Member {
    @Field((type) => Int)
    id: number;

    @Field((type) => DayJSGraphQL)
    signUpDate: Dayjs;

    @Field((type) => String)
    firstName: string;

    @Field((type) => String)
    lastName: string;

    @Field((type) => String)
    preferredName: string;

    @Field((type) => Boolean)
    covidVaccine: boolean;

    @Field((type) => Boolean)
    patron: boolean;

    @Field((type) => Boolean)
    youth: boolean;

    @Field((type) => Boolean)
    parent: boolean;

    @Field((type) => DayJSGraphQL)
    dateOfBirth: Dayjs;

    @Field((type) => String)
    email: string;

    @Field((type) => Int, { nullable: true })
    sms?: number;

    @Field((type) => [Member], { nullable: true })
    children?: Member[];

    @Field((type) => [String, DietaryRequirement], { nullable: true })
    dietaryRequirements?: (string | DietaryRequirement)[];

    @Field((type) => [String, DietaryRequirement], { nullable: true })
    medicalIssues?: MedicalIssue[];
}
