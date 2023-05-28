class FormValidator{
  constructor(validationConfig, formToValidate){
    this._formSelector = validationConfig.formSelector,
    this._inputSelector = validationConfig.inputSelector,
    this._submitButtonSelector = validationConfig.submitButtonSelector,
    this._inactiveButtonClass = validationConfig.inactiveButtonClass,
    this._inputErrorClass = validationConfig.inputErrorClass,
    this._errorClass = validationConfig.errorClass,
    this._formToValidate = formToValidate,
    this._submitButton = this._formToValidate.querySelector(this._submitButtonSelector),
    this._inputList = Array.from(this._formToValidate.querySelectorAll(this._inputSelector)),
    this._form = document.querySelector(this._formSelector)
  }

  _checkValidity = (input) =>{
    const currentInputErrorContainer = this._formToValidate.querySelector(`#${input.id}-error`);
    if(input.validity.valid){
      currentInputErrorContainer.textContent = '';
      input.classList.remove(this.inputErrorClass);
      this._diableSubmitButton()
    } else{
      currentInputErrorContainer.textContent = input.validationMessage;
      input.classList.add(this.inputErrorClass)
    }
  }

  _diableSubmitButton = () => {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true)
    }

  _enableButton = () => {
    this._submitButton.classList.remove(this._inactiveButtonClass)
    this._submitButton.removeAttribute('disabled')
  }

  _setEventListeners = () => {
    this._form.addEventListener('submit', (evt) =>{
      evt.preventDefault()
    })
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidity(input);
        if (this._hasInvalidInput()){
          this._diableSubmitButton()
         }
         else{
           this._enableButton()
         }
      })
    })
  }

  _hideInputError =(input) => {
    const currentInputErrorContainer = this._formToValidate.querySelector(`#${input.id}-error`);
    currentInputErrorContainer.textContent = ''
    input.classList.remove(this._inputErrorClass)
  }

  resetValidation = () => {
    this._inputList.forEach((input) => {
      this._hideInputError(input)
    })
    this._diableSubmitButton()
  }

  enableValidation = () =>{
    this._setEventListeners()
    }
    _hasInvalidInput = () => {
      return this._inputList.some((item) => { return !item.validity.valid})
    }
    }

export {FormValidator}
