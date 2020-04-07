import {TextFieldBuilder} from '../../src/field-builders';
import {Form} from '../../src';

it('TextFieldBuilder', () => {
  const field = new TextFieldBuilder('Password', 'password').build();

  expect(field).toMatchSnapshot();
});
