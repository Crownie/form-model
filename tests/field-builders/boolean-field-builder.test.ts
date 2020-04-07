import {BooleanFieldBuilder} from '../../src/field-builders';

it('BooleanFieldBuilder', () => {
  const field = new BooleanFieldBuilder('Password', 'switch').build();

  expect(field).toMatchSnapshot();
});
