import { NgModule } from "@angular/core";
import { TypeHeadInputComponent } from "./type-head-input.component";
import {
  NgTypeHeadInputFilterTemplateDirective,
  NgTypeHeadInputItemTemplateDirective,
} from "./directive/form-template.directive";
import { DropdownModule } from "primeng/dropdown";
import { SkeletonModule } from "primeng/skeleton";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormControlPipe } from "./pipe/form-Control.pipe";
import { NumbersOnlyDirective } from "./directive/numbers-only.directive";
@NgModule({
  declarations: [
    TypeHeadInputComponent,
    NgTypeHeadInputItemTemplateDirective,
    NgTypeHeadInputFilterTemplateDirective,
    NumbersOnlyDirective,
    FormControlPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    SkeletonModule,
    ReactiveFormsModule,
  ],
  exports: [
    TypeHeadInputComponent,
    NgTypeHeadInputItemTemplateDirective,
    NgTypeHeadInputFilterTemplateDirective,
    NumbersOnlyDirective,
    DropdownModule,
    SkeletonModule,
    FormControlPipe,
  ],
})
export class TypeHeadInputModule {}
