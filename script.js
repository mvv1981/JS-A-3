'use strict';

function validateForm(setting) {
    var form = document.getElementById(setting.formId);
    var element = form.querySelectorAll('input, button');
    for (let index = 0; index < element.length; index++) {
        let elem = element[index];

        if (elem.hasAttribute('data-validator')) {
            elem.onblur = function () {
                let flag = true;
                let value = event.target.value;
                if (event.target.hasAttribute('data-required') || value != '') {
                    switch (event.target.dataset.validator) {
                        case 'letters':
                            if (!value.match(/^[a-zа-яё]+$/i)) {
                                flag = false;
                            }
                            break;
                        case 'number':
                            let min = event.target.dataset.validatorMin;
                            let max = event.target.dataset.validatorMax;

                            if ((isNaN(+value)) || +value <= +min || +value >= +max) {
                                flag = false;
                            }
                            break;
                        case 'regexp':
                            let pattern = event.target.dataset.validatorPattern;
                            if (!value.match(pattern)) {
                                flag = false;
                            }
                            break;
                    };
                }
                elem.classList.toggle(setting.inputErrorClass, !flag);
            };
            // focus
            elem.focus = function () {
                elem.classList.toggle(setting.inputErrorClass, false);
            };
        }
        // Submit
        else if (elem.tagName === 'BUTTON') {
            form.addEventListener("submit", function () {
                event.preventDefault();
                let flag = true;
                for (let j = 0; j < element.length; j++) {
                    let elementForm = element[j];
                    let value = elementForm.value;
                    if (elementForm.hasAttribute('data-required') || value != '') {
                        switch (elementForm.dataset.validator) {
                            case 'letters':
                                if (!value.match(/^[a-zа-яё]+$/i)) {
                                    flag = false;
                                }
                                break;
                            case 'number':
                                let min = elementForm.dataset.validatorMin;
                                let max = elementForm.dataset.validatorMax;
                                if ((isNaN(+value)) || +value < +min || +value > +max) {
                                    flag = false;
                                }
                            case 'regexp':
                                let pattern = elementForm.dataset.validatorPattern;
                                if (!value.match(pattern)) {
                                    flag = false;
                                }
                                break;
                        };
                    }
                    form.classList.toggle(setting.formInvalidClass, !flag);
                    form.classList.toggle(setting.formValidClass, flag);

                }
            });
        }

    }
}
