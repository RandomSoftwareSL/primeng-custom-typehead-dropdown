import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TypeHeadInputModule } from "typeHeadInput";
// import { MyPreset } from "projects/type-head-input/src/lib/aura-theme";
import { providePrimeNG } from "primeng/config";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TypeHeadInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    // note: add the aura token theme file to enable this
    // providePrimeNG({
    //   theme: {
    //     preset: MyPreset,
    //     options: {
    //       prefix: "p",
    //       darkModeSelector: false || "none",
    //       cssLayer: {
    //         name: "primeng",
    //         order: "primeng",
    //       },
    //     },
    //   },
    // }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
