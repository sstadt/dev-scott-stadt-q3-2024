import 'vite/modulepreload-polyfill'
import promoBanner from '~/components/promoBanner'

document.addEventListener('DOMContentLoaded', () => {
  promoBanner.init();
});
