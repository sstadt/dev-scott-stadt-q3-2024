
const searchParams = new URLSearchParams(window.location.search);
const HIDDEN_BANNERS_KEY = 'tbg_hidden_promo_banners';

const init = () => {
  const medium = searchParams.get('utm_medium');

  if (medium) {
    showBanner(document.querySelector(`[data-promo-banner-utm-medium="${medium}"]`));
  }

  document.querySelector('[data-close-promo-banner]')
    .addEventListener('click', closeBanner);
};

// TODO: how do I check for discount page ????

const getHiddenBanners = () => {
  const banners = localStorage.getItem(HIDDEN_BANNERS_KEY);

  return banners ? JSON.parse(banners) : [];
};

const showBanner = ($banner) => {
  if ($banner) {
    const id = $banner.getAttribute('data-promo-banner');
    const hiddenBanners = getHiddenBanners();

    if (!hiddenBanners.includes(id)) $banner.style.display = 'block';
  }
};

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

init();
