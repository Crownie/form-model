import {FieldBuilder} from '../../src/field-builders';
import {Condition} from '../../src/condition';

it('FieldBuilder', () => {
  const field = new FieldBuilder('ts', '', 'string')
    .setWidth({xs: 12, sm: 2}, true)
    .required()
    .min(1)
    .max(2)
    .equalToField('other-field', 'must match other field')
    .email()
    .hideWhen(
      new Condition({operator: '$eq', left: 'some-field', right: 'some-value'}),
    )
    .disableWhen(
      new Condition({operator: '$eq', left: 'some-field', right: 'some-value'}),
    )
    .matches(/.*/, 'must match pattern')
    .build();

  expect(field.min).toEqual(field.getSchemaConfig().min!.val);
  expect(field.max).toEqual(field.getSchemaConfig().max!.val);
  expect(field).toMatchSnapshot();
});
