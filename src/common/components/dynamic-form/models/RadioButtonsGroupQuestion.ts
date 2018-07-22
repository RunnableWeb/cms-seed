import { DropdownQuestion, DropdownCtrlOptions } from "./DropdownQuestion";
import { FormControlType } from "./enums";

export class RadioButtonsGroupQuestion extends DropdownQuestion {
    controlType = FormControlType.RadioButtonsGroup

    constructor(options: RadioButtonsGroupOptions = {options: []}) {
        super(options);
    }
}

export class RadioButtonsGroupOptions extends DropdownCtrlOptions {}