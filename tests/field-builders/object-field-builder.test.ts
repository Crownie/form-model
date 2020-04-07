import {ObjectFieldBuilder, TextFieldBuilder} from '../../src/field-builders';

it('ObjectFieldBuilder', () => {
  const fieldBuilder = new ObjectFieldBuilder('Address')
    .addField('street', new TextFieldBuilder('Street'))
    .addField('postcode', new TextFieldBuilder('Postcode').build());

  expect(fieldBuilder.build()).toMatchSnapshot();
});
