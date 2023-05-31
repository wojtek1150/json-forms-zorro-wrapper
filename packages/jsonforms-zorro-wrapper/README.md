# JsonForms based on ng-zorro

## Changelog

https://github.com/wojtek1150/json-forms-zorro-wrapper/releases

## Documentation

See documentation at [Plugion homepage](https://wojtek1150.github.io/json-forms-zorro-wrapper/docs)
For JsonSchema documentation check [jsonforms core package](https://jsonforms.io)
For UI docs, see the documentation on [ngzorro website](https://ng.ant.design/docs/introduce/en).

## Requirements

This plugin requires the following dependencies:

```
"ng-zorro-antd": "^13.1.1",
"lodash-es": "^4.17.21"
```

They should be installed automatically as they are peer dependencies. However, if for some reason you are using `legacy-peer-deps = true` you need to add them to the package.json manually

## Installation

```
npm install @wojtek1150/jsonforms-zorro-wrapper
```

## Usage

Simply import JsonFormsZorroModule into your project

```typescript
import { JsonFormsZorroModule } from '@wojtek1150/jsonforms-zorro-wrapper';

@NgModule({
  imports: [JsonFormsZorroModule],
})
```

If you are using DateField, remember to add your locale for ng-zorro as module providers, for example:

```
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';

@NgModule({
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  imports: [JsonFormsZorroModule],
})
```
