const Messages = {
  errAtLeast3Chars: 'Should be at least 3 chars long',
  errAtLeast4Chars: 'Should be at least 4 chars long',
  errAtLeast6Chars: 'Should be at least 6 chars long',
  errAtLeast8Chars: 'Should be at least 8 chars long',
  errClientExists: 'Client already exists',
  errControlExists: 'Control already exists',
  errControlNoExists: 'Control no already exists',
  errFetchingData: 'Error in fetching data',
  errInputMustBeUrl: 'Input value should be url',
  errInvalidEmail: 'This email is not valid',
  errInvalidInput: 'Invalid input',
  errInvalidUidPwd: 'Invalid user id or password',
  errMobileNoLength: 'Mobile number should be 10 digits long',
  errMustBeNumeric: 'Must be numeric',
  errMustHaveOneDigit: 'Should have a digit',
  errMustHaveOneLetter: 'Should have one letter',
  errMustHaveOneSpecialChar: 'Must have a special character',
  errNoSpaceAllowed: 'Space is not allowed',
  errNoSpceOrSpecialChar: 'Cannot have space or special character',
  errNoSpecialChar: 'Cannot have special character',
  errPasswordsNotSame: 'Old and new passwords must be same',
  errUidValuesSame: 'You must give a new value for uid',
  errRequired: 'This value is required',
  errRoleNameExists: 'Role name already exists',
  errGenericServerError: 'Server side error',
  errUpdatingData: 'Error in updating data at server',

  messMin8Char1Digit1Special:
    'At lest 8 characters long | 1 digit | 1 special char',
  messNoSpecialSpace4Plus:
    'At lest 4 characters long | no space | no special char',
  messNoSpecial4Plus: 'At lest 4 characters long | no special char',
  messSuccess: 'Operation was successful',

  // Email
  messChangeUid: 'Change of uid in Trace accounting software',
  messEmailBodyChangeUid: (oldUid: string, newUid: string) =>
    `<span>In Trace accounting software, your uid has been changed from <b>${oldUid}</b> to <b>${newUid}</b>. If you have not made this change then kindly report to Admin.</span>`
}
export { Messages }
