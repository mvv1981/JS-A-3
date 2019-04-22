'use strict';

// Код валидации формы
function validateForm(parameter) {
    let inputList = document.getElementsByTagName('input');
    let saveButton = document.getElementsByTagName('button');
    processInput(inputList, parameter).setOnBlur().setOnFocus();
    processButton(saveButton).validateOnSubmit(inputList);
}
function processInput(elementList, parameter) {
    return {
        input: elementList,
        parameter: parameter,
        setOnBlur: function() {
            let input = this.input;
            let parameter = this.parameter;
            if(input !== []) {
                for (let i = 0; i < input.length; i++) {
                    input[i].onblur = function () {
                        let validateType = this.dataset.validator;
                        switch (validateType) {
                            case ('number'):
                                validate(input[i], parameter).validateNumber();
                                break;
                            case ('letters'):
                                validate(input[i], parameter).validateLetter();
                                break;
                            case ('regexp'):
                                validate(input[i], parameter).validateRegExp();
                                break;
                        }
                    }
                }
            }
            return this
        },
        setOnFocus: function() {
            let input = this.input;
            let parameter = this.parameter;
            if(input !== []) {
                for (let i = 0; i < input.length; i++) {
                    input[i].onfocus = function() {
                        if(Array.prototype.indexOf.call(input[i].classList, parameter.inputErrorClass) !== -1) {
                            input[i].classList.remove(parameter.inputErrorClass);
                        }
                    }
                }
            }
            return this
        }
    }
}
function processButton(button, elementList) {
    return {
        button: button,
        list: elementList,
        validateOnSubmit: function() {
            button[0].addEventListener(
                'click',
                function() {
                    alert('its good for you');
                },
                false);
            return this
        }
    }
}
function validate(element, classParameter) {
    return {
        element: element,
        classParameter: classParameter,
        validateNumber: function() {
            let minValue = element.dataset.validatorMin;
            let maxValue = element.dataset.validatorMax;
            if(element.value === '') {
                return this
            }
            else {
                if(isNaN(element.value)) {
                    element.classList.add(classParameter.inputErrorClass);
                }
                else {
                    if ((minValue !== undefined)&&(element.value <= Number(minValue))) {
                        element.classList.add(classParameter.inputErrorClass);
                    }
                    if ((maxValue !== undefined)&&(element.value >= Number(maxValue))) {
                        element.classList.add(classParameter.inputErrorClass);
                    }
                    else {
                        return this
                    }
                }
            }
            return this
        },
        validateLetter: function() {
            let regexp = /^[А-Яа-яЁёA-Za-z]+$/i;
            if((regexp.test(element.value))||(element.value === '')) {
                return this
            }
            else {
                element.classList.add(classParameter.inputErrorClass);
            }
            return this
        },
        validateRegExp: function() {
            let regexp = new RegExp(element.dataset.validatorPattern);
            if((regexp.test(element.value))||(element.value === '')) {
                return this
            }
            else {
                element.classList.add(classParameter.inputErrorClass);
            }
            return this
        }
    }
}
