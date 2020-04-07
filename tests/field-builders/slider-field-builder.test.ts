import {SliderFieldBuilder} from '../../src/field-builders';

it('SliderFieldBuilder', () => {
  const field = new SliderFieldBuilder('Age').build();

  expect(field.type).toEqual('slider');
  expect(field.label).toEqual('Age');
  expect(field.getSchemaConfig().type).toEqual('number');
});
