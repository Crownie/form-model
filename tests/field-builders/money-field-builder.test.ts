import {MoneyFieldBuilder} from '../../src/field-builders';

it('MoneyFieldBuilder', () => {
  const fieldBuilder = new MoneyFieldBuilder('price')
    .required()
    .min(1)
    .max(100);

  expect(fieldBuilder.build()).toMatchSnapshot();
});
