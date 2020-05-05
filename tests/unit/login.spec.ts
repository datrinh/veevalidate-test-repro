import { mount, Wrapper, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Login from '@/components/Login.vue';
import VueCompositionApi from '@vue/composition-api';
import { setupValidation } from '@/validation';

const GOOD_EMAIL = 'test@test.de';
const GOOD_PW = 'A very secure and _1337_ password!';

let wrapper: Wrapper<Vue>;

beforeEach(() => {
  jest.useFakeTimers();
  setupValidation();
  // Init Composition API. Wont be necessary in Vue 3
  const localVue = createLocalVue();
  localVue.use(VueCompositionApi);
  wrapper = mount(Login, {
    localVue,
    mocks: { $t: (key: string) => key },
  });
});

describe('Login Page', () => {
  it('renders the component properly', () => {
    expect(wrapper.get('.label').text()).toBe('label.email');
    expect(wrapper.get('button[type="submit"]')).toBeTruthy();
  });

  it('allows submitting with valid inputs', async () => {
    const emailInput = wrapper.get('input[type="email"]');
    const passwordInput = wrapper.get('input[type="password"]');
    const submitBtn = wrapper.get('[data-test="submit-btn"]');

    await flushPromises();
    jest.runAllTimers();
    expect(submitBtn.attributes('disabled')).toBeTruthy();

    emailInput.setValue(GOOD_EMAIL);
    passwordInput.setValue(GOOD_PW);

    expect(submitBtn.attributes('disabled')).toBeUndefined();
  });
});
