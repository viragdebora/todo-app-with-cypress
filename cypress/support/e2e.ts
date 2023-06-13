// Import commands.js using ES2015 syntax:
import './commands';
import './commands/command-register';
import './commands/login';
import './commands/logout';
import './commands/todo';

import chaiJsonSchema from 'chai-json-schema';
chai.use(chaiJsonSchema);
