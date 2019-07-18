import { FormGroup } from '@angular/forms';

// custom validator to check that two password fields match
export function PasswordMatch(newPassword: string, conformPassword: string) {
    return (formGroup: FormGroup) => {
        const pass = formGroup.controls[newPassword];
        const matchpass = formGroup.controls[conformPassword];

        if (matchpass.errors && !matchpass.errors.passwordMatch) {
            // return if another validator has already found an error on the matchpass
            return;
        }

        // set error on matchpass if validation fails
        if (pass.value !== matchpass.value) {
          matchpass.setErrors({ passwordMatch: true });
        } else {
          matchpass.setErrors(null);
        }
    }
}
