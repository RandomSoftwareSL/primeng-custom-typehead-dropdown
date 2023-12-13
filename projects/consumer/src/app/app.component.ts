import { Component } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from "@angular/forms";
import { SelectItem } from "primeng/api";
import { BehaviorSubject, map, of } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "consumer";
  consumerForm!: UntypedFormGroup;
  customSelectInputClass = "w-full text-sm h-3rem";
  typeHeadYearDataSet!: SelectItem[];

  yearSource = new BehaviorSubject<any>(null!);
  yearObs$ = this.yearSource.asObservable();

  constructor(private formBuilder: UntypedFormBuilder) {
    this.consumerForm = this.formBuilder.group({
      year: new UntypedFormControl(""),
    });

    const years = [
      "2024",
      "2023",
      "2022",
      "2021",
      "2020",
      "2019",
      "2018",
      "2017",
      "2016",
      "2015",
      "2014",
      "2013",
      "2012",
      "2011",
      "2010",
      "2009",
      "2008",
      "2007",
      "2006",
      "2005",
      "2004",
      "2003",
      "2002",
      "2001",
      "2000",
      "1999",
      "1998",
      "1997",
      "1996",
      "1995",
      "1994",
      "1993",
      "1992",
      "1991",
      "1990",
    ];

    this.yearSource.next(years);
  }

  get getFormControl() {
    return this.consumerForm.controls;
  }

  yearCallBackFunction = () => {
    if (!this.typeHeadYearDataSet) {
      return this.yearObs$.pipe(
        map((years) => {
          const yearsArray: any = [];
          years.forEach((yearValue: any) => {
            let year = { year: yearValue };
            yearsArray.push(year);
          });
          this.typeHeadYearDataSet = yearsArray.map((years: { year: any }) => {
            return {
              label: years.year,
              value: years.year,
            };
          });
          return this.typeHeadYearDataSet;
        })
      );
    }
    return of();
  };

  changeSelectedText(event: any) {
    this.consumerForm.patchValue({
      year: event?.addedValue,
    });
  }
}
