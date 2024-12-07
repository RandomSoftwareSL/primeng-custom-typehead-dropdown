import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from "rxjs";
import {
  NgTypeHeadInputFilterTemplateDirective,
  NgTypeHeadInputItemTemplateDirective,
  NgTypeHeadInputLoaderTemplateDirective,
} from "./directive/form-template.directive";
import { ScrollerOptions, SelectItem } from "primeng/api";
import { UntypedFormControl } from "@angular/forms";
import { Dropdown, DropdownChangeEvent } from "primeng/dropdown";

@Component({
  selector: "typeHeadInput",
  templateUrl: "./type-head-input.component.html",
  styleUrls: ["./type-head-input.component.scss"],
})
export class TypeHeadInputComponent {
  @ViewChild("select") select!: Dropdown;
  @Input() items!: SelectItem[];
  @Input() control!: UntypedFormControl;
  @Input() placeholder!: string;
  @Input() optionLabel: string = "label";
  @Input() autoDisplayFirst: boolean = false;
  @Input() showClear: boolean = false;
  @Input() dropDownStyleClass!: string;
  @Input() panelStyleClass!: string;
  @Input() customFieldText!: string;
  @Input() name!: string;
  @Input() disabled: boolean = false;
  @Input() isNumberInput: boolean = false;
  @Input() list$!: Observable<SelectItem[]>;
  @Input() enableServerSideData = false;
  @Input() isCaseInsensitive = false;
  @Input() noResultsFoundText: string = "No results found";
  @Input() addNewText: string = "+ Add";
  @Input() requiredErrorMessage!: string;
  @Output() newValue = new EventEmitter();
  @Input() serverSideSearchCallback!: () => Observable<SelectItem[]>;
  @Input() showRequiredIndicator: boolean = false;
  @Input() labelStyleClass!: string;
  @Input() isFormLabel = true;
  @Input() typeHeadStyleClass!: string;
  @Input() labelText!: string;
  @Input() isVirtualScroll: boolean = false;
  @Input() virtualScrollOptions: ScrollerOptions = {
    delay: 50,
    showLoader: true,
    lazy: true,
  };
  @Input() virtualScrollItemSize: number = 40;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedTypeHeadSource = new BehaviorSubject<any>(null);
  selectedTypeHead$ = this.selectedTypeHeadSource.asObservable();
  loading = false;
  newItem: SelectItem[] = [];
  _initialServerSideList: SelectItem[] = [];

  // custom templates
  @ContentChild(NgTypeHeadInputItemTemplateDirective, { read: TemplateRef })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemTemplate: TemplateRef<any> | undefined;
  @ContentChild(NgTypeHeadInputFilterTemplateDirective, { read: TemplateRef })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterTemplate: TemplateRef<any> | undefined;
  @ContentChild(NgTypeHeadInputLoaderTemplateDirective, { read: TemplateRef })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loaderTemplate: TemplateRef<any> | undefined;

  //Extract label data
  optionLabels!: (string | undefined)[];

  newCreatedValue!: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newValueSource = new BehaviorSubject<any>(null);
  newValueObs$ = this.newValueSource.asObservable();
  isAvailability: boolean = false;
  searchValue!: string;

  constructor() {}

  ngOnInit(): void {
    if (this.disabled) {
      this.control.disable();
    }
    if (this.isNumberInput) {
      this.allowNumberInput();
    }
    this.optionLabels = this.items?.map((item) => item.label);

    // server side call for the option data
    if (this.enableServerSideData) {
      this.list$ = combineLatest([
        this.selectedTypeHead$,
        this.newValueObs$,
      ]).pipe(
        tap(() => (this.loading = true)),
        switchMap(([res, newValue]) => {
          if (res) {
            this.loading = true;
            return this.serverSideSearchCallback().pipe(
              tap(() => {
                this.loading = false;
              }),
              map((data) => {
                this._initialServerSideList = data;
                return data;
              }),
              catchError(() => of([])),
              finalize(() => {
                this.loading = false;
                // finalize operator executed
              })
            );
          }
          const isAvailable = this._initialServerSideList?.some((item) => {
            return this.newCreatedValue === item.value;
          });
          if (!isAvailable) {
            return of(newValue);
          }
          this.loading = false;
          return of([]);
          // switchMap returned an observable
        }),
        finalize(() => {
          this.loading = false;
          // finalize operator executed
        })
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onShowDropdown(event: any) {
    if (this.enableServerSideData) this.selectedTypeHeadSource.next(event);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addNewValue(inputValue?: any) {
    if (inputValue) {
      if (this.enableServerSideData) {
        this.newCreatedValue = inputValue;
        const isAvailable = this._initialServerSideList?.some((item) => {
          return inputValue === item.value;
        });

        if (!isAvailable) {
          this._initialServerSideList.push({
            label: inputValue,
            value: inputValue,
          });
          this.newValueSource.next(this._initialServerSideList);
        }
      } else {
        const newItem = { label: inputValue, value: inputValue };
        if (!this.items.find((item) => item.label === newItem.label)) {
          this.items.push(newItem);
        }
      }
    }
    const newList = {
      addedValue: inputValue,
      updatedList: this.items,
    };
    this.newValue.emit(newList);
    this.select.hide();
    this.select.value = "";
  }

  allowNumberInput() {
    setTimeout(() => {
      const input = this.select?.editableInputViewChild?.nativeElement;
      input.setAttribute("type", "number");
      input.setAttribute("pattern", "[0-9]*");
    });
  }

  onChangeValue() {
    this.optionLabels = this.items?.map((item) => item.label);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkInitialData(select: any) {
    return (
      select?.value?.length > 0 &&
      !this.items?.map((item) => item.label)?.includes(select?.value)
    );
  }

  onFilterEmitter(event: DropdownChangeEvent) {
    this.setEmptyHandler();
    this.searchValue =
      typeof this.select?.value === "object" &&
      this.select?.value?.hasOwnProperty("value")
        ? this.select?.value?.value
        : this.select?.value;
    if (this.enableServerSideData) {
      if (this.select?.options === null) {
        this.selectedTypeHeadSource.next(event);
        return;
      }
      this.isAvailability = this.select?.options!.some((item) => {
        return this.isCaseInsensitive
          ? item.value?.toLowerCase() === this.searchValue?.toLowerCase()
          : item?.value === this.searchValue;
      });
    } else {
      this.isAvailability = this.items.some((item) => {
        return this.isCaseInsensitive
          ? item?.value?.toLowerCase() === this.searchValue?.toLowerCase()
          : item?.value === this.searchValue;
      });
    }
  }

  onClick() {
    if (this.select.overlayVisible) {
      this.select.show();
    } else {
      this.select.hide();
      this.searchValue = "";
    }
  }

  setEmptyHandler = () => {
    if (this.control.value === "") {
      this.control.patchValue(null);
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes["disabled"] && !changes["disabled"].isFirstChange()) {
      if (this.disabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }
}
