const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'error',
}
class FormValidator{
  constructor(validationConfig, formToValidate){
    this._formSelector = validationConfig.formSelector,
    this._inputSelector = validationConfig.inputSelector,
    this._submitButtonSelector = validationConfig.submitButtonSelector,
    this._inactiveButtonClass = validationConfig.inactiveButtonClass,
    this._inputErrorClass = validationConfig.inputErrorClass,
    this._errorClass = validationConfig.errorClass,
    this._formToValidate = formToValidate
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
      const submitButton = this._formToValidate.querySelector(this._submitButtonSelector);
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.setAttribute('disabled', true)
    }
  _enableButton = () => {
    const submitButton = this._formToValidate.querySelector(this._submitButtonSelector);
    submitButton.classList.remove(this._inactiveButtonClass)
    submitButton.removeAttribute('disabled')
  }
  _setEventListeners = () => {
    const forms = Array.from(document.querySelectorAll(this._formSelector));
    forms.forEach((form) => {
      form.addEventListener('submit', (evt) =>{
        evt.preventDefault()})});};

  enableValidation = () =>{
    const inputList = Array.from(this._formToValidate.querySelectorAll(this._inputSelector));
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidity(input);
        this._hasInvalidInput(inputList);
        if (this._hasInvalidInput(inputList)){
          this._diableSubmitButton()
         }
         else{
           this._enableButton()
         }
      })
    })
    this._setEventListeners()
    }
    _hasInvalidInput = (inputList) => {
      return inputList.some((item) => { return !item.validity.valid})
    }
    }

export {validationConfig, FormValidator}
