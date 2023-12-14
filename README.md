# TypeHead Input Library

TypeHead Input is an Angular library that provides a customizable dropdown input component. It leverages the PrimeNG framework to create a user-friendly interface for managing a list of values with an intuitive typing experience.

## Features

- Dropdown input with a list of values
- Ability to type new values into the input field
- +Add button to add new typed values to the dropdown list
- Built on PrimeNG for a robust and customizable UI

## Dependencies

Make sure to install the following dependencies in your Angular project:

```bash
npm install primeflex@^3.3.1 primeicons@^6.0.1 primeng@^15.1.4
```

# Additionally,

import the required styles in your styles.scss file:

```scss
@import "primeng/resources/themes/tailwind-light/theme.css";
@import "primeflex/primeflex.scss";
@import "primeng/resources/primeng.min.css";
@import "primeicons/primeicons.css";
```

# Installation

To install the TypeHead Input library, run the following command:

```bash
npm install type-head-input
```

# Usage

1. Import the TypeHeadInputModule in your Angular module:

```typescript
import { TypeHeadInputModule } from "type-head-input";

@NgModule({
  declarations: [
    // your components
  ],
  imports: [
    TypeHeadInputModule,
    // other modules
  ],
})
export class YourModule {}
```

2. Use the <typeHeadInput> component in your template:

example : -

<form [formGroup]="consumerForm">
  <typeHeadInput
    [disabled]="consumerForm.get('year')?.disabled ?? false"
    [control]="getFormControl['year'] | formControl"
    [customClasses]="customSelectInputClass"
    [placeholder]="'Year'"
    [name]="'value'"
    [isNumberInput]="true"
    [serverSideSearchCallback]="yearCallBackFunction"
    [enableServerSideData]="true"
    [customFieldText]="'Year'"
    (newValue)="changeSelectedText($event)"
  ></typeHeadInput>
</form>

# Development

This project was generated with Angular CLI version 15.1.4.

# Development server

Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

# Code scaffolding

Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

# Build

Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

# Running unit tests

Run ng test to execute the unit tests via Karma.

# Running end-to-end tests

Run ng e2e to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

# Further help

To get more help on the Angular CLI use ng help or go check out the Angular CLI Overview and Command Reference page.

# Contributing

Feel free to contribute to the development of TypeHead Input. Check out the contribution guidelines for more information.

# License

This project is licensed under the MIT License - see the LICENSE.md file for details.

You can copy this entire block and paste it into your README.md file.
