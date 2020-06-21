# Form Model

[![NPM Version][npm-image]][npm-url]
[![Linux Build][travis-image]][travis-url]
[![Github License][license-image]][license-url]

Form model is a framework agnostic and deserializable form model.
It can be used to construct form structure regardless of how you want
to render the UI. This allows reusability of form structure across
different presentation layer.

This consists of various classes that are extendable, should you
need to add more functionality.

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

[npm-image]: https://img.shields.io/npm/v/%40crownie/form-model.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@crownie/form-model
[travis-image]: https://travis-ci.org/Crownie/form-model.svg?branch=master
[travis-url]: https://travis-ci.org/github/Crownie/form-model
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://raw.githubusercontent.com/Crownie/form-model/master/LICENSE.md
