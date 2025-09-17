const ValidateFields = function ValidateFields(FormValidation, value) {
    let errorMessage = ''
    // if (FormValidation.validationType == 'required') {
    //     if (value.length > parseInt(FormValidation.value)) {
    //         errorMessage = FormValidation.message
    //     }
    // }
        if (FormValidation.validationType == 'required') {
        if (!value || String(value).trim() === '') {

            errorMessage = FormValidation.message
        }
    }

    else if (FormValidation.validationType == 'fieldLength') {

        if(value ==null ||  value == undefined)
        {
            debugger
        }
       
        if (value.length > parseInt(FormValidation.value)) {
            errorMessage = FormValidation.message
        }
    }
else if (FormValidation.validationType === 'phoneLength') {
    const trimmedValue = String(value).trim();
    const digitsOnly = trimmedValue.replace(/\D/g, ''); // Remove all non-digit characters

    if (digitsOnly.length > 0 && digitsOnly.length < 10) {
        errorMessage = FormValidation.message;
    }
}

else if (FormValidation.validationType == 'noNumbers') {
    var format = /\d/;
    if (format.test(value)) {
        errorMessage = FormValidation.message;
    }
}


    else if (FormValidation.validationType == 'specialChar') {
        //var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        var format = /[!@#$%^&*()_+\-=\[\]{};'"\\|<>?~`]| {4,}/;
        if (format.test(value)) {
            errorMessage = FormValidation.message
        }
    }
    else if (FormValidation.validationType == 'specialCharForNotes') {
        //var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        var format = /[!@#$%^&*()_+\-=\[\]{};'"\\|<>?~`]/;
        if (format.test(value)) {
            errorMessage = FormValidation.message
        }
    }
     else if (FormValidation.validationType == 'specialFordot') {
    // Disallow all special characters except dot
    var format = /[!@#$%^&*()_+\-=\[\]{};'"\\|<>?~`]/;

    if (format.test(value)) {
        errorMessage = FormValidation.message;
    }
    }
    return errorMessage
}

export {ValidateFields}