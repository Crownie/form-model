import {ConditionGroupBuilder} from '../../src/condition';

it('builds condition correctly', () => {
  const conditionGroupBuilder = ConditionGroupBuilder.all()
    .when('name')
    .equalTo('John')
    .when('address.postcode')
    .equalTo('B13 8AX')
    .nest(ConditionGroupBuilder.any().when('age').greaterThan(1));

  expect(conditionGroupBuilder.build()).toEqual({
    conditions: [
      {
        left: 'address.postcode',
        operator: '$eq',
        right: 'B13 8AX',
      },
      {
        conditions: [
          {
            left: 'age',
            operator: '$gt',
            right: 1,
          },
        ],
        operator: '$or',
      },
    ],
    operator: '$and',
  });
});
