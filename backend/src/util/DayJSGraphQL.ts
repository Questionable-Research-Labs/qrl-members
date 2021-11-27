import { GraphQLScalarType } from 'graphql';
import { Dayjs } from 'dayjs';

const dayJSGraphQL = new GraphQLScalarType({
    name: 'DayJS',
    description: 'A DayJS Date',
    parseValue: (input) => new Dayjs(input),
    serialize: (dayjs: Dayjs) => dayjs.toISOString(),
});

export default dayJSGraphQL;
