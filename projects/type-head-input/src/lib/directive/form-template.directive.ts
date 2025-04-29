import { Directive, TemplateRef } from "@angular/core";

@Directive({ selector: "[appTypeheadInputItemTmp]", standalone: false })
export class NgTypeHeadInputItemTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({ selector: "[appTypeheadInputFilterTmp]", standalone: false })
export class NgTypeHeadInputFilterTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({ selector: "[appTypeheadInputLoaderTmp]", standalone: false })
export class NgTypeHeadInputLoaderTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}
