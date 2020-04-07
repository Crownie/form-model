import {SelectFieldBuilder} from '../../src/field-builders';

it('SelectFieldBuilder', () => {
  const fieldBuilder = new SelectFieldBuilder('Address')
    .setOptions([{id: 'option-1', label: 'Option1'}])
    .enableAutocomplete();

  expect(fieldBuilder.build()).toMatchSnapshot();
});
