import cookie from 'cookie';

const searchParams = new URLSearchParams(window.location.search);
const cookies = cookie.parse(document.cookie);

const HIDDEN_BANNERS_KEY = 'tbg_hidden_promo_banners';

/**
 * Initialize component
 */
const init = () => {
  const medium = searchParams.get('utm_medium');

  if (medium) {
    showBanner(document.querySelector(`[data-promo-banner-utm-medium="${medium}"]`));
  } else if (cookies.discount_code) {
    showBanner(document.querySelector(`[data-promo-banner-code="${cookies.discount_code}"]`));
  }

  document.querySelectorAll('[data-close-promo-banner]')
    .forEach($banner => $banner.addEventListener('click', closeBanner));
};

/**
 * Get a list of promo banners that have been hidden by the user
 *
 * @returns Array of banner IDs to keep hidden
 */
const getHiddenBanners = () => {
  const banners = localStorage.getItem(HIDDEN_BANNERS_KEY);

  return banners ? JSON.parse(banners) : [];
};

/**
 * Show a promo banner element, checks closed list before render
 * to ensure we don't show a banner the user has previously closed
 *
 * @param {Element} $banner The banner to show
 */
const showBanner = ($banner) => {
  if ($banner) {
    const id = $banner.getAttribute('data-promo-banner');
    const hiddenBanners = getHiddenBanners();

    if (!hiddenBanners.includes(id)) $banner.style.display = 'block';
  }
};

/**
 * Close a banner, adding it to the closed list so it does not automatically
 * open again
 *
 * @param {Event} event The event object from the original click handler
 */
const closeBanner = (event) => {
  const $button = event.target;
  const bannerId = $button.getAttribute('data-close-promo-banner');
  const $banner = document.querySelector(`[data-promo-banner="${bannerId}"]`);
  const hiddenBanners = getHiddenBanners();

  if ($banner) $banner.style.display = 'none';

  // save hidden banner to localStorage so we don't load it again
  if (!hiddenBanners.includes(bannerId)) {
    hiddenBanners.push(bannerId);
    localStorage.setItem(HIDDEN_BANNERS_KEY, JSON.stringify(hiddenBanners));
  }
};

export default { init };
