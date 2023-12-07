import { NgModule } from '@angular/core';
import { TypeHeadInputComponent } from './type-head-input.component';
import {
  NgTypeHeadInputFilterTemplateDirective,
  NgTypeHeadInputItemTemplateDirective,
} from './directive/form-template.directive';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlPipe } from './pipe/formControl.pipe';
@NgModule({
  declarations: [
    TypeHeadInputComponent,
    NgTypeHeadInputItemTemplateDirective,
    NgTypeHeadInputFilterTemplateDirective,
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
    DropdownModule,
    SkeletonModule,
    FormControlPipe,
  ],
})
export class TypeHeadInputModule {}
