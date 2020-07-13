import { ValidatorFn, FormControl } from '@angular/forms';

export class CustomValidators {
    static launchDateValidate(): ValidatorFn {
        return (control: FormControl) => {
            const date = new Date(control.value);

            var currentDate = new Date();
            var year = currentDate.getFullYear();
            var month = currentDate.getMonth();
            var day = currentDate.getDate();
            var yearOlderDate = new Date(year + 1, month, day);
    
            if (date >= currentDate) {
                return {
                    launchDatePassCurrentDateError: true
                }
            } else if (date > yearOlderDate) {
                return {
                    launchDatePassYearDateError: true
                }
            }
            return null;
        };
    }
}