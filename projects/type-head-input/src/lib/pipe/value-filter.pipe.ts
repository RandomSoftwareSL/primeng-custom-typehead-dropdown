import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "valueFilter",
})
export class ValueFilterPipe implements PipeTransform {
  transform(
    items: any[] | null,
    filterValue: string,
    fieldName: string
  ): any[] {
    if (!items) {
      return [];
    }

    if (!filterValue) {
      return items;
    }

    if (typeof filterValue !== "string") {
      return items;
    }

    filterValue = filterValue.toLowerCase();

    return items.filter((item) => {
      const fieldValue = item[fieldName].toString();
      if (typeof fieldValue === "string") {
        return fieldValue.toLowerCase().includes(filterValue);
      }
      return false;
    });
  }
}
