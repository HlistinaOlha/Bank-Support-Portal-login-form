export class Validator {
    constructor() {
        this.loginForm = document.querySelector('.login-form');
        this.emailContainerEl = this.loginForm.querySelector('.email-container');
        this.passwordContainerEl = this.loginForm.querySelector('.password-container');
        this.emailEl = this.emailContainerEl.querySelector('#emailAddress');
        this.passwordEl = this.passwordContainerEl.querySelector('#password');
        this.validEmailRegex = /^(?=.{1,64}@)[A-Za-z0-9_\-]+(\.[A-Za-z0-9_\-]+)*@[^\-@][A-Za-z0-9\-]+(\.[A-Za-z0-9\-]+)*(\.[A-Za-z]{2,})$/;
        this.noSpacePasswordRegex = /^[^\s]+(\s+[^\s]+)*$/;

        this.submit = 'submit';
        this.focus = 'focus';
        this.blur = 'blur';
        this.input = 'input';
    }

    validate = () => {
        this.loginForm.addEventListener(this.submit, (e) => {
            e.preventDefault();

            const passwordValid = this.validatePassword();
            const emailValid = this.validateEmail();

            if (passwordValid && emailValid) {
                this.loginForm.submit();
            }
        });

        this.emailEl.addEventListener(this.focus, () => {
            this.refreshInputField(this.emailEl, this.emailContainerEl, 'email');

            if (this.isEmailValid(this.emailEl)) {
                this.highlightValidInput(this.emailEl);
            }
        });

        this.emailEl.addEventListener(this.blur, () => {
            this.removeInputHighlighting(this.emailEl);
        });

        this.emailEl.addEventListener(this.input, () => {
            this.validateEmail();
            this.refreshInputField(this.emailEl, this.emailContainerEl, 'email');
        });

        this.passwordEl.addEventListener(this.focus, () => {
            if (this.isPasswordValid(this.passwordEl)) {
                this.highlightValidInput(this.passwordEl);
            } else {
                this.refreshInputField(this.passwordEl, this.passwordContainerEl, 'password');
            }
        });

        this.passwordEl.addEventListener(this.blur, () => {
            this.removeInputHighlighting(this.passwordEl);
        });

        this.passwordEl.addEventListener(this.input, () => {
            this.validatePassword();
            this.refreshInputField(this.passwordEl, this.passwordContainerEl, 'password');
        });
    }

    validateEmail = () => {
        if (this.isEmailValid(this.emailEl)) {
            this.displaySuccessResult(this.emailEl, this.emailContainerEl, 'email');
            return true;
        } else {
            this.displayError(this.emailEl, this.emailContainerEl, 'email', 'Username');
            return false;
        }
    }

    validatePassword = () => {
        if (this.isPasswordValid(this.passwordEl)) {
            this.displaySuccessResult(this.passwordEl, this.passwordContainerEl, 'password');
            return true;
        } else {
            this.displayError(this.passwordEl, this.passwordContainerEl, 'password', 'Password');
            return false;
        }
    }

    displaySuccessResult(input, inputContainer, errorId) {
        if (!inputContainer.classList.contains('valid')) {
            inputContainer.classList.add('valid');
            this.highlightValidInput(input);
            this.hideError(errorId);
        }
    }

    displayError = (input, inputContainer, errorId, errorText) => {
        this.addError(errorId, inputContainer, errorText);
        this.hideSuccessResult(input, inputContainer);
    }

    addError = (errorId, inputContainer, errorText) => {
        if (!(inputContainer.querySelector(`#${errorId}-error`))) {
            let error = document.createElement('span');
            error.classList.add('error', 'visible');
            error.setAttribute('id', `${errorId}-error`);
            error.innerText = `Invalid ${errorText}`;

            inputContainer.appendChild(error);
        }
    }

    hideError = (errorId) => {
        let error = this.loginForm.querySelector(`#${errorId}-error`);
        if (error !== null) {
            error.remove();
        }
    }

    hideSuccessResult = (input, inputContainer) => {
        inputContainer.classList.remove('valid');
        this.removeInputHighlighting(input);
    }

    refreshInputField = (input, inputContainer, errorId) => {
        let inputVal = input.value;
        if (inputVal == null || inputVal === '') {
            this.hideError(errorId);
            this.hideSuccessResult(input, inputContainer);
        }
    }

    highlightValidInput = (input) => {
        input.classList.add('valid-input');
    }

    removeInputHighlighting = (input) => {
        input.classList.remove('valid-input');
    }

    isPasswordValid = (password) => {
        return password.value.length > 4 && this.noSpacePasswordRegex.test(password.value);
    }

    isEmailValid = (email) => {
        return this.validEmailRegex.test(email.value);
    }
}