import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[appTypeheadInputItemTmp]' })
export class NgTypeHeadInputItemTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({ selector: '[appTypeheadInputFilterTmp]' })
export class NgTypeHeadInputFilterTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}