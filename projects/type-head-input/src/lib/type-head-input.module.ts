import { NgModule } from "@angular/core";
import { TypeHeadInputComponent } from "./type-head-input.component";
import {
  NgTypeHeadInputFilterTemplateDirective,
  NgTypeHeadInputItemTemplateDirective,
  NgTypeHeadInputLoaderTemplateDirective,
} from "./directive/form-template.directive";
import { SelectModule } from "primeng/select";
import { SkeletonModule } from "primeng/skeleton";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormControlPipe } from "./pipe/form-Control.pipe";
import { NumbersOnlyDirective } from "./directive/numbers-only.directive";
import { ValueFilterPipe } from "./pipe/value-filter.pipe";
@NgModule({
  declarations: [
    TypeHeadInputComponent,
    NgTypeHeadInputItemTemplateDirective,
    NgTypeHeadInputFilterTemplateDirective,
    NgTypeHeadInputLoaderTemplateDirective,
    NumbersOnlyDirective,
    FormControlPipe,
    ValueFilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    SkeletonModule,
    ReactiveFormsModule,
  ],
  exports: [
    TypeHeadInputComponent,
    NgTypeHeadInputItemTemplateDirective,
    NgTypeHeadInputFilterTemplateDirective,
    NgTypeHeadInputLoaderTemplateDirective,
    NumbersOnlyDirective,
    SelectModule,
    SkeletonModule,
    FormControlPipe,
    ValueFilterPipe,
  ],
})
export class TypeHeadInputModule {}
