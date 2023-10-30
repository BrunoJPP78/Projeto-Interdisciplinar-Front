import { Pipe, PipeTransform } from "@angular/core";
import { getCurrentTenantAssets, getCurrentColorHexByVariant } from "../utils/theme-utils";

@Pipe({
  name: "color",
  standalone: true,
})
export class ColorPipe implements PipeTransform {
  transform(colorVariant: any, _args?: any): string {
    return getCurrentColorHexByVariant(colorVariant);
  }
}
