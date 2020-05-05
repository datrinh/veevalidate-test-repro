import { extend, setInteractionMode } from 'vee-validate';
import validator from 'validator';

// eslint-disable-next-line import/prefer-default-export
export const setupValidation = () => {
  /**
   * Either `aggressive`, `passive`, `lazy`, or `eager`
   * @see https://logaretm.github.io/vee-validate/guide/interaction-and-ux.html#interaction-modes
   */
  setInteractionMode('eager');

  /**
   * Set up rules
   * @see https://logaretm.github.io/vee-validate/guide/basics.html#adding-rules
   */
  extend('required', {
    validate: (value) => ({
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1,
    }),
    computesRequired: true,
    message: 'validation.error.required',
  });

  extend('checked', {
    validate: (value) => value === true,
    message: 'validation.error.checked',
  });

  extend('email', {
    validate: (value) => validator.isEmail(value),
    message: 'validation.error.email',
  });
};
