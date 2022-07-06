# NG Zorro wrapper for jsonforms.io plugin

## Documentation

Please see the official JSON Forms website, [jsonforms.io](https://jsonforms.io), for documentation, examples and API references.
For UI docs, see the documentation on [ngzorro website](https://ng.ant.design/docs/introduce/en).


## Requirements

This pluigin requires the following dependencies:

```
"@jsonforms/angular": "^3.0.0-beta.3",
"@jsonforms/core": "^3.0.0-beta.3",
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
