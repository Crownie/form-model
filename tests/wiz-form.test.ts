import {FieldBuilder, Form, WizForm} from '../src';
import * as Yup from 'yup';

it('wizForm', () => {
  const wizForm = new WizForm().addStep(
    'step-1',
    'Step 1',
    new Form().addField('title', new FieldBuilder('text', 'Title', 'string')),
  );

  expect(wizForm.steps).toEqual([
    {
      form: {
        fields: {
          title: {
            defaults: {
              array: [],
              boolean: false,
              number: '',
              object: {},
              string: '',
            },
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
          },
        },
      },
      id: 'step-1',
      title: 'Step 1',
    },
  ]);
  expect(wizForm.defaultValues).toEqual({
    title: '',
  });
});
