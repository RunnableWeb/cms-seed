import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class ToasterService {
  constructor(private _toastr: ToastrService) { }

  position: string = "toast-center-center";

  showSuccess(messageKey: string, titleKey?: string) {
    this._toastr.success(
      messageKey,
      titleKey ? titleKey : '',
      {
        positionClass: this.position
      });
  }

  showError(messageKey: string, titleKey?: string) {
    this._toastr.error(
      messageKey,
      titleKey ? titleKey : '', {
        positionClass: this.position
      });
  }
}
