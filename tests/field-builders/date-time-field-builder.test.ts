import {DateTimeFieldBuilder} from '../../src/field-builders';

it('DateTimeFieldBuilder', async () => {
  const field = new DateTimeFieldBuilder('Date').build();

  const field2 = new DateTimeFieldBuilder('Date').dateOnly('MM/YYYY').build();

  const field3 = new DateTimeFieldBuilder('Time').timeOnly('hh:mm').build();

  // test null value for date
  const schema = field.getSchema();
  await expect(schema.validate(null)).resolves.toEqual(null);

  expect(field).toMatchSnapshot();
  expect(field2).toMatchSnapshot();
  expect(field3).toMatchSnapshot();
});
