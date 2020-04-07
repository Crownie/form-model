import {
  Condition,
  Field,
  FieldBuilder,
  SchemaConfig,
  TextFieldBuilder,
} from '../src';

describe('buildSchema', () => {
  const schemaConfig: SchemaConfig = {
    type: 'object',
    objectShape: {
      name: {
        type: 'string',
        min: {val: 2, errorMessage: 'too short'},
        max: {val: 4, errorMessage: 'too long'},
        required: {val: true, errorMessage: 'required'},
      },
      age: {
        type: 'number',
        min: {val: 18, errorMessage: 'too young'},
        max: {val: 20, errorMessage: 'too old'},
        required: {val: true, errorMessage: 'required'},
      },
      newsletter: {
        type: 'boolean',
        required: {val: true, errorMessage: 'required'},
      },
      tags: {
        type: 'array',
        arrayType: {
          type: 'string',
        },
        min: {val: 1, errorMessage: 'too short'},
        max: {val: 2, errorMessage: 'too long'},
      },
      address: {
        type: 'object',
        objectShape: {
          street: {
            type: 'string',
          },
        },
        required: {val: true, errorMessage: 'required'},
      },
      security: {
        type: 'object',
        objectShape: {
          password: {
            type: 'string',
          },
          confirmPassword: {
            type: 'string',
            equalToField: {
              val: 'password',
              errorMessage: 'must match password',
            },
          },
        },
      },
    },
  };

  it.each([
    ['', 'required'],
    ['H', 'too short'],
    ['Hello', 'too long'],
  ])('string "%s" should return %s', async (input, expected) => {
    const yupSchema = Field.buildSchema(schemaConfig.objectShape!.name);
    await expect(yupSchema.validate(input)).rejects.toThrowError(expected);
  });

  it.each([
    [undefined, 'required'],
    [null, 'this must be a `number` type, but the final value was: `NaN`.'],
    [17, 'too young'],
    [21, 'too old'],
  ])('number "%s" should return %s', async (input, expected) => {
    const yupSchema = Field.buildSchema(schemaConfig.objectShape!.age);
    await expect(yupSchema.validate(input)).rejects.toThrowError(expected);
  });

  it.each([
    [undefined, 'required'],
    [null, 'this must be a `number` type, but the final value was: `NaN`.'],
    [17, 'too young'],
    [21, 'too old'],
  ])('number "%s" should return %s', async (input, expected) => {
    const yupSchema = Field.buildSchema(schemaConfig.objectShape!.age);
    await expect(yupSchema.validate(input)).rejects.toThrowError(expected);
  });

  it.each([
    [undefined, 'required'],
    [21, 'this must be a `boolean` type, but the final value was: `21`'],
  ])('boolean "%s" should return %s', async (input, expected) => {
    const yupSchema = Field.buildSchema(schemaConfig.objectShape!.newsletter);
    await expect(yupSchema.validate(input)).rejects.toThrowError(expected);
  });

  it.each([
    [[], 'too short'],
    [['swimming', 'tennis', 'football'], 'too long'],
  ])('array "%s" should return %s', async (input, expected) => {
    const yupSchema = Field.buildSchema(schemaConfig.objectShape!.tags);
    await expect(yupSchema.validate(input)).rejects.toThrowError(expected);
  });

  it.each([[undefined, 'required']])(
    'object "%s" should return %s',
    async (input, expected) => {
      const yupSchema = Field.buildSchema(schemaConfig.objectShape!.address);
      await expect(yupSchema.validate(input)).rejects.toThrowError(expected);
    },
  );

  it.each([['password789', 'must match password']])(
    'string "%s" should return %s',
    async (input, expected) => {
      const yupSchema = Field.buildSchema(schemaConfig.objectShape!.security);
      const correctData = {
        password: 'password123',
        confirmPassword: 'password123',
      };
      await expect(yupSchema.validate(correctData)).resolves.toEqual(
        correctData,
      );
      await expect(
        yupSchema.validate({
          password: 'password123',
          confirmPassword: input,
        }),
      ).rejects.toThrowError(expected);
    },
  );
});

it('runs renderer', () => {
  const mockFn = (...args) => args;
  Field.registerRenderer(mockFn);
  const resp = new FieldBuilder('text', '', 'string').build().render('name');

  expect(resp[0]).toEqual('name');
  expect(resp[1]).toBeInstanceOf(Field);
});

it('conditionally hides', () => {
  const formData = {
    address: {
      street: 'Downing street',
    },
  };

  const condition = new Condition({
    operator: '$eq',
    left: 'address.street',
    right: 'Downing street',
  });

  const fieldBuilder = new FieldBuilder('text', '', 'string');

  expect(fieldBuilder.build().shouldBeHidden(formData)).toBeFalsy();
  const field = fieldBuilder.hideWhen(condition).build();
  expect(field.shouldBeHidden(formData)).toBeTruthy();
  formData.address.street = 'Chelsea';
  expect(field.shouldBeHidden(formData)).toBeFalsy();
});

it('conditionally disable', () => {
  const formData = {
    address: {
      street: 'Downing street',
    },
  };

  const condition = new Condition({
    operator: '$eq',
    left: 'address.street',
    right: 'Downing street',
  });

  const fieldBuilder = new FieldBuilder('text', '', 'string');

  expect(fieldBuilder.build().shouldBeDisabled(formData)).toBeFalsy();
  const field = fieldBuilder.disableWhen(condition).build();
  expect(field.shouldBeDisabled(formData)).toBeTruthy();
  formData.address.street = 'Chelsea';
  expect(field.shouldBeDisabled(formData)).toBeFalsy();
});
