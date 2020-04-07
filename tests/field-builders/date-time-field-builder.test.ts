import {DateTimeFieldBuilder} from '../../src/field-builders';

it('DateTimeFieldBuilder', () => {
  const field = new DateTimeFieldBuilder('Date').build();

  const field2 = new DateTimeFieldBuilder('Date').dateOnly('MM/YYYY').build();

  const field3 = new DateTimeFieldBuilder('Time').timeOnly('hh:mm').build();

  expect(field).toMatchSnapshot();
  expect(field2).toMatchSnapshot();
  expect(field3).toMatchSnapshot();
});
