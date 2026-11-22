/**
 * Contact — placeholder contact details, the shop address, a Google Maps
 * pin embed of the listing and a link that opens it in Google Maps.
 * Reuses the Section component for the shell (centred column + socks).
 */
import { loadCss } from '../../lib/cssLoader.mjs';
import { Section } from './Section.mjs';

// pin coordinates of the shop's Google Maps listing
const MAP_EMBED_URL =
  'https://www.google.com/maps?q=48.2093966,16.3747986&z=17&hl=en&output=embed';
const MAP_LISTING_URL = 'https://maps.app.goo.gl/mGZ7d9idEZSRgZcF7';

export function Contact() {
  loadCss('./css/components/Contact.css');

  return Section({
    id: 'contact',
    kicker: 'Find us',
    title: 'Two minutes from Stephansdom, next to the famous schnitzel.',
    tone: 'paper',
    seed: 5,
    body:
      '<p class="lede">Follow the Wollzeile around the corner from the cathedral, ' +
      'past the queue for schnitzel — warm socks and a friendly hello are waiting.</p>' +
      '<div class="contact-card reveal">' +
      '<ul class="contact__list">' +
      contactItem('📍', 'Address', 'Wollzeile, 1010 Wien', 'the little lane behind Stephansdom', false) +
      contactItem('☎', 'Phone', '+43 1 123 45 67', 'we answer with socks on', true, 'tel:+4311234567') +
      contactItem('📧', 'E-mail', 'hello@mestore.at', 'hello is our favourite word', true, 'mailto:hello@mestore.at') +
      contactItem('🕒', 'Hours', 'Mon–Sat · 10:00–19:00', 'closed on Sundays, socks sleep in', true) +
      '</ul>' +
      '<div class="contact__map">' +
      '<iframe class="contact__map-embed" src="' + MAP_EMBED_URL + '" title="Map with the ME shop pin" ' +
      'loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
      '<a class="btn" href="' + MAP_LISTING_URL + '" target="_blank" rel="noopener">Open in Google Maps 🗺️</a>' +
      '</div>' +
      '</div>' +
      '<p class="contact__hint">Phone, e-mail and hours above are placeholders — ' +
      'swap in the real ones right here once confirmed.</p>',
  });
}

function contactItem(icon, label, value, note, placeholder, href) {
  const valueHtml = href ? '<a href="' + href + '">' + value + '</a>' : value;
  return (
    '<li>' +
    '<span class="contact__icon" aria-hidden="true">' + icon + '</span>' +
    '<div>' +
    '<small class="contact__label">' + label + '</small>' +
    '<div class="contact__value">' + valueHtml + (placeholder ? '<em class="chip">placeholder</em>' : '') + '</div>' +
    '<small class="contact__note">' + note + '</small>' +
    '</div>' +
    '</li>'
  );
}
