import { Messages } from '@src/features'
function appValidators() {

    function checkIndiaMobileNo(input: string) {
        let error = null
        if (input.search(/^[0-9]+$/) < 0) {
            error = Messages.errMustBeNumeric
        } else if (input.length !== 10) {
            error = Messages.errMobileNoLength
        }
        return (error)
    }

    function checkUidEmail(input: string) {
        //should be alphanumeric, non empty and no space in between or email
        let error = null
        if (!isValidEmail(input)) {
            error = checkRequired(input) || checkNoSpaceOrSpecialChar(input)
        }
        if (error) {
            error = Messages.errInvalidInput
        }
        return (error)
    }

    function checkPwd(input: string) {
        const error =
            checkRequired(input) ||
            checkAtLeast8Chars(input) ||
            checkMustHaveOneLetter(input) ||
            checkMustHaveOneDigit(input) ||
            checkMustHaveOneSpecialChar(input)
        return error
    }

    function checkAtLeast8Chars(input: string) {
        let error = null
        if (input.length < 8) {
            error = Messages.errAtLeast8Chars
        }
        return (error)
    }

    function checkMustHaveOneDigit(input: string) {
        let error = null
        if (input.search(/[0-9]/) < 0) {
            error = Messages.errMustHaveOneDigit
        }
        return error
    }

    function checkMustHaveOneLetter(input: string) {
        let error = null
        if (input.search(/[a-z]/i) < 0) {
            error = Messages.errMustHaveOneLetter
        }
        return error
    }

    function checkMustHaveOneSpecialChar(input: string) {
        let error = null
        if (input.search(/[!@#\$%\^&\*_`~]/) < 0) {
            error = Messages.errMustHaveOneSpecialChar
        }
        return error
    }

    function checkNoSpace(input: string) {
        let error = null
        if (input.search(/\s/g) > 0) {
            error = Messages.errNoSpaceAllowed
        }
        return (error)
    }

    function checkNumeric(input: string) {
        let error = null
        if (input.search(/^[0-9]+$/) < 0) {
            error = Messages.errMustBeNumeric
        }
        return (error)
    }

    function checkNoSpaceOrSpecialChar(input: string) {
        let error = null
        if (input.search(/^[\w-_]*$/) < 0) {
            error = Messages.errNoSpceOrSpecialChar
        }
        return error
    }

    function checkNoSpecialChar(input: string) {
        let error = null
        if (input.search(/[^\w\s]/) > 0) {
            error = Messages.errNoSpecialChar
        }
        return (error)
    }

    function checkRequired(input: string) {
        let error = null
        if (input.length === 0) {
            error = Messages.errRequired
        }
        return error
    }

    function checkUrl(input: string) {
        let error = null
        if (!input) {
            return (error)
        }
        if (input.search(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})$/) < 0) {
            error = Messages.errInputMustBeUrl
        }
        return (error)
    }

    function checkValidEmail(input: string) {
        let error = null
        if (input.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) < 0) {
            error = Messages.errInvalidEmail
        }
        return (error)
    }

    function isValidEmail(input: string) {
        const ret = input.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        return ret
    }

    return ({ checkIndiaMobileNo, checkNumeric, checkPwd, checkNoSpace, checkNoSpaceOrSpecialChar, checkNoSpecialChar, checkUidEmail, checkUrl, checkValidEmail })
}

export { appValidators }