export class Validate {
    attached() {
        //@ts-ignore
        grecaptcha.enterprise.ready(() => {
            //@ts-ignore
            grecaptcha.enterprise.execute('6Ldk2jwhAAAAAGkAnBY61bCGPODEqz3cHANb6CWg', { action: 'validate' }).then((token) => {
                console.log(token);
                // IMPORTANT: The 'token' that results from execute is an encrypted response sent by
                // reCAPTCHA Enterprise to the end user's browser.
                // This token must be validated by creating an assessment.
                // See https://cloud.google.com/recaptcha-enterprise/docs/create-assessment
            });
        });
    }
}
