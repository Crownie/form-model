import {ListFieldBuilder, TextFieldBuilder} from '../../src/field-builders';

it('ListFieldBuilder', () => {
  const fieldBuilder = new ListFieldBuilder('Address').addField(
    new TextFieldBuilder('Street'),
  );

  expect(fieldBuilder.build()).toMatchSnapshot();

  fieldBuilder.addField(new TextFieldBuilder('Postcode').build());

  expect(fieldBuilder.build()).toMatchSnapshot();
});
