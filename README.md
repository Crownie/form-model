# Form Model

[![NPM Version][npm-image]][npm-url]
[![Linux Build][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

> Form model is a framework agnostic and deserializable form model.
> It can be used to construct form structure regardless of how you want
> to render the UI. This allows reusability of form structure across
> different presentation layer.
>
> This consists of various classes that are extendable, should you
> need to add more functionality.

## Install

```bash
// npm
npm install @crownie/form-model

// or yarn
yarn add @crownie/form-model
```

## Usage

```typescript
import {Form, TextFieldBuilder} from '@crownie/form-model';

const form = new Form();

form
  .addField('username', new TextFieldBuilder('Username'))
  .addField('password', new TextFieldBuilder('Password', 'password'));

console.log(JSON.stringify(form, null, 2));
```

Output

```json
{
  "fields": {
    "username": {
      "width": {
        "xs": 12
      },
      "defaults": {
        "string": "",
        "number": "",
        "boolean": false,
        "array": [],
        "object": {}
      },
      "type": "text",
      "label": "Username",
      "noWrap": false,
      "schemaConfig": {
        "type": "string",
        "defaultVal": ""
      }
    },
    "password": {
      "width": {
        "xs": 12
      },
      "defaults": {
        "string": "",
        "number": "",
        "boolean": false,
        "array": [],
        "object": {}
      },
      "type": "password",
      "label": "Password",
      "noWrap": false,
      "schemaConfig": {
        "type": "string",
        "defaultVal": ""
      }
    }
  }
}
```

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/live-xxx.svg
[npm-url]: https://npmjs.org/package/live-xxx
[travis-image]: https://img.shields.io/travis/live-js/live-xxx/master.svg
[travis-url]: https://travis-ci.org/live-js/live-xxx
[coveralls-image]: https://img.shields.io/coveralls/live-js/live-xxx/master.svg
[coveralls-url]: https://coveralls.io/r/live-js/live-xxx?branch=master
