'use strict';

// Код валидации формы


/**
  formId: 'profile',
  formValidClass: 'form_valid',
  formInvalidClass: 'form_invalid',
  inputErrorClass: 'input_error'
**/
const validateForm = options => {
  function checkRequired(input) {
    let cond = !input.hasAttribute('data-required') ||
      input.hasAttribute('data-required') &&
      input.value.length > 0;

    return cond;
  }

  function checkNumber(input) {
    if (!input.hasAttribute('data-validator') ||
        input.getAttribute('data-validator') != 'number') {
          return true;
    }

    let number = +input.value;
    if (isNaN(number)) return false;

    let aboveMin = !input.hasAttribute('data-validator-min') ||
      input.hasAttribute('data-validator-min') &&
      number >= input.getAttribute('data-validator-min');
    if (!aboveMin) return false;

    let belowMax = !input.hasAttribute('data-validator-max') ||
      input.hasAttribute('data-validator-max') &&
      number <= input.getAttribute('data-validator-max');
    if (!belowMax) return false;

    return true;
  }

  function checkRegexp(input) {
    if (!input.hasAttribute('data-validator') ||
        input.getAttribute('data-validator') != 'regexp') {
          return true;
    }

    if (!input.hasAttribute('data-validator-pattern')) return false;
    let pattern = input.getAttribute('data-validator-pattern');

    return input.value.length == 0 || !!input.value.match(pattern);
  }

  function checkLetters(input) {
    if (!input.hasAttribute('data-validator') ||
        input.getAttribute('data-validator') != 'letters') {
          return true;
    }

    return input.value.length == 0 || !!input.value.match(/^[a-zA-Zа-яА-Я]+$/);
  }

  const form = document.getElementById(options.formId);
  const inputs = form.querySelectorAll('input');

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('blur', e => {
      if (e.target.tagName == 'INPUT') {
        if (!checkRequired(e.target) ||
            !checkNumber(e.target) ||
            !checkRegexp(e.target) ||
            !checkLetters(e.target)) {
            e.target.classList.add(options.inputErrorClass);
        }
      }
    });

    inputs[i].addEventListener('focus', e => {
      if (e.target.tagName == 'INPUT') {
        if (e.target.classList
          .contains(options.inputErrorClass)) {
            e.target.classList.remove(options.inputErrorClass);
          }
      }
    });
  }

  form.addEventListener('submit', e => {
    // check for all elements of form
    e.preventDefault();

    if (form.classList.contains(options.formInvalidClass)) {
      form.classList.remove(options.formInvalidClass);
    }

    if (form.classList.contains(options.formValidClass)) {
      form.classList.remove(options.formValidClass);
    }

    for (let i = 0; i < inputs.length; i++) {
      if (!checkRequired(inputs[i]) ||
          !checkNumber(inputs[i]) ||
          !checkRegexp(inputs[i]) ||
          !checkLetters(inputs[i])) {

          if (!form.classList.contains(options.formInvalidClass)) {
            form.classList.add(options.formInvalidClass);
          }

      }
    }

    if (!form.classList.contains(options.formInvalidClass)) {
      form.classList.add(options.formValidClass);
    }
  });
};
