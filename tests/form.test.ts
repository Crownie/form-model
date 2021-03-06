import {FieldBuilder, Form} from '../src';
import * as Yup from 'yup';

it('form', () => {
  const form = new Form();
  form.addField('title', new FieldBuilder('text', 'Title', 'string'));
  expect(form.fields).toEqual({
    title: {
      label: 'Title',
      noWrap: false,
      schemaConfig: {
        defaultVal: '',
        type: 'string',
      },
      type: 'text',
      width: {
        xs: 12,
      },
      meta: {},
    },
  });
  expect(form.defaultValues).toEqual({
    title: '',
  });
  expect(Yup.isSchema(form.schema)).toBeTruthy();
});
