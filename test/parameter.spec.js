/*
 * Copyright 2017 resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const ava = require('ava');
const Parameter = require('../lib/parameter');

ava.test('constructor: should throw if options is empty', (test) => {
  test.throws(() => {
    new Parameter();
  }, 'Invalid parameter: undefined');
});

ava.test('constructor: should throw if options is null', (test) => {
  test.throws(() => {
    new Parameter(null);
  }, 'Invalid parameter: null');
});

ava.test('constructor: should throw if options is no a plain object', (test) => {
  test.throws(() => {
    new Parameter([ 1, 2, 3 ]);
  }, 'Invalid parameter: 1,2,3');
});

ava.test('constructor: should throw if name is missing', (test) => {
  test.throws(() => {
    new Parameter({
      type: [ 'string' ],
      description: 'hello world'
    });
  }, 'Invalid parameter name: undefined');
});

ava.test('constructor: should throw if name is not a string', (test) => {
  test.throws(() => {
    new Parameter({
      name: 1,
      type: [ 'string' ]
    });
  }, 'Invalid parameter name: 1');
});

ava.test('constructor: should throw if type is missing', (test) => {
  test.throws(() => {
    new Parameter({
      name: 'foo'
    });
  }, 'Invalid parameter type: undefined');
});

ava.test('constructor: should throw if type is not an array', (test) => {
  test.throws(() => {
    new Parameter({
      name: 'foo',
      type: 'string'
    });
  }, 'Invalid parameter type: string');
});

ava.test('constructor: should throw if type is empty', (test) => {
  test.throws(() => {
    new Parameter({
      name: 'foo',
      type: []
    });
  }, 'Invalid parameter type: ');
});

ava.test('constructor: should throw if type is invalid', (test) => {
  test.throws(() => {
    new Parameter({
      name: 'foo',
      type: [ 'foo' ]
    });
  }, 'Invalid parameter type: foo');
});

ava.test('constructor: should throw if type is boolean', (test) => {
  test.throws(() => {
    new Parameter({
      name: 'foo',
      type: [ 'boolean' ]
    });
  }, 'Invalid parameter type: boolean');
});

ava.test('constructor: should throw if type is a mixture of a valid and an invalid one', (test) => {
  test.throws(() => {
    new Parameter({
      name: 'foo',
      type: [ 'string', 'boolean' ]
    });
  }, 'Invalid parameter type: string,boolean');
});

ava.test('constructor: should throw if description is not a string', (test) => {
  test.throws(() => {
    new Parameter({
      name: 'foo',
      type: [ 'string' ],
      description: 1
    });
  }, 'Invalid parameter description: 1');
});

ava.test('constructor: should throw if optional is not boolean', (test) => {
  test.throws(() => {
    new Parameter({
      name: 'foo',
      type: [ 'string' ],
      optional: 1
    });
  }, 'Invalid parameter optional flag: 1');
});

ava.test('constructor: should throw if variadic is not boolean', (test) => {
  test.throws(() => {
    new Parameter({
      name: 'foo',
      type: [ 'string' ],
      variadic: 1
    });
  }, 'Invalid parameter variadic flag: 1');
});

ava.test('constructor: should store the parameter name', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'string' ]
  });

  test.deepEqual(parameter.name, 'foo');
});

ava.test('constructor: should store the parameter type', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'string' ]
  });

  test.deepEqual(parameter.type, [ 'string' ]);
});

ava.test('constructor: should store the parameter description', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'string' ],
    description: 'hello world'
  });

  test.deepEqual(parameter.description, 'hello world');
});

ava.test('constructor: should store default the parameter optional flag to false', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'string' ]
  });

  test.deepEqual(parameter.optional, false);
});

ava.test('constructor: should store the parameter optional flag', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'string' ],
    optional: true
  });

  test.deepEqual(parameter.optional, true);
});

ava.test('constructor: should store default the parameter variadic flag to false', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'string' ]
  });

  test.deepEqual(parameter.variadic, false);
});

ava.test('constructor: should store the parameter variadic flag', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'string' ],
    variadic: true
  });

  test.deepEqual(parameter.variadic, true);
});

ava.test('constructor: should accept a string type', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'string' ]
  });

  test.deepEqual(parameter.type, [ 'string' ]);
});

ava.test('constructor: should accept a number type', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'number' ]
  });

  test.deepEqual(parameter.type, [ 'number' ]);
});

ava.test('constructor: should accept a string, number type', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'string', 'number' ]
  });

  test.deepEqual(parameter.type, [ 'string', 'number' ]);
});

ava.test('toString: should stringify a required, non variadic option', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'string' ],
    optional: false,
    variadic: false
  });

  test.is(parameter.toString(), '<foo>');
});

ava.test('toString: should stringify an optional, non variadic option', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'string' ],
    optional: true,
    variadic: false
  });

  test.is(parameter.toString(), '[foo]');
});

ava.test('toString: should stringify a required, variadic option', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'string' ],
    optional: false,
    variadic: true
  });

  test.is(parameter.toString(), '<foo...>');
});

ava.test('toString: should stringify an optional, variadic option', (test) => {
  const parameter = new Parameter({
    name: 'foo',
    type: [ 'string' ],
    optional: true,
    variadic: true
  });

  test.is(parameter.toString(), '[foo...]');
});
