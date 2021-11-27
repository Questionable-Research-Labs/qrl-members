import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const NODE_ENV = process.env.NODE_ENV || 'development';

const YAML_CONFIG_FILENAME = join(
    process.cwd(),
    'config.' + (NODE_ENV === 'development' ? 'dev' : 'prod') + '.yaml',
);

export default () => {
    return yaml.load(readFileSync(YAML_CONFIG_FILENAME, 'utf8')) as Record<
        string,
        any
    >;
};
