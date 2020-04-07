import {Condition, ConditionBuilder} from '../../src/condition';

describe('builder operator functions', () => {
  it.each([
    [
      'John',
      'equalTo',
      {
        left: 'name',
        operator: '$eq',
        right: 'John',
      },
    ],
    [
      1,
      'greaterThan',
      {
        left: 'name',
        operator: '$gt',
        right: 1,
      },
    ],
    [
      1,
      'lessThan',
      {
        left: 'name',
        operator: '$lt',
        right: 1,
      },
    ],
    [
      1,
      'greaterThanOrEqualTo',
      {
        left: 'name',
        operator: '$gte',
        right: 1,
      },
    ],
    [
      1,
      'lessThanOrEqualTo',
      {
        left: 'name',
        operator: '$lte',
        right: 1,
      },
    ],
    [
      [1, 3],
      'isIn',
      {
        left: 'name',
        operator: '$in',
        right: [1, 3],
      },
    ],
  ])('%s %s()', (input, func, expected) => {
    const builder = new ConditionBuilder(null, 'name');
    builder[func](input);
    expect(new Condition(builder)).toEqual(expected);
  });

  it('logic', () => {
    const condition = new Condition({
      operator: '$eq',
      left: 'name',
      right: 'Joe',
    });
    const builder = new ConditionBuilder(null, 'name');
    builder.logic('$and', [condition]);
    expect(new Condition(builder)).toEqual({
      operator: '$and',
      conditions: [
        {
          left: 'name',
          operator: '$eq',
          right: 'Joe',
        },
      ],
    });
  });
});
