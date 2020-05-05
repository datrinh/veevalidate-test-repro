<template>
  <div class="flex flex-wrap w-full">
    <ValidationObserver v-slot="{ invalid }">
      <form
        class="flex flex-col pt-3 md:pt-8"
        @submit.prevent="login"
      >
        <div class="flex flex-col pt-4">
          <label class="label" for="email">
            {{ $t('label.email') }}
          </label>
          <ValidationProvider v-slot="{ errors }" rules="required|email">
            <input
              id="email"
              v-model="email"
              class="mt-1 focus:outline-none"
              type="email"
              :placeholder="$t('placeholder.email')"
            >
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="flex flex-col">
          <label for="password">
            {{ $t('label.password') }}
          </label>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <password
              id="password"
              v-model="password"
              toggle
              class="password-container"
              default-class="mt-1 focus:outline-none"
              :placeholder="$t('placeholder.password')"
              :show-strength-meter="false"
              :badge="false"
            />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <button
          type="submit"
          class="w-full mx-auto mt-8 primary"
          data-test="submit-btn"
          :disabled="invalid"
        >
          {{ $t('button.login') }}
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from '@vue/composition-api';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Password from 'vue-password-strength-meter';

export default defineComponent({
  components: {
    Password,
    ValidationProvider,
    ValidationObserver,
  },
  setup() {
    const email = ref('');
    const password = ref('');

    return {
      login: async (ev: Event) => {
        ev.preventDefault();
      },
      logout: (ev: Event) => {
        ev.preventDefault();
      },
      email,
      password,
    };
  },
});
</script>
