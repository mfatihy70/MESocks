/**
 * Contact — placeholder contact details, the shop address and a link
 * that opens the location in Google Maps. Reuses the Section component
 * for the shell (content column + side socks).
 */
import { loadCss } from '../../lib/cssLoader.mjs';
import { Section } from './Section.mjs';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Wollzeile%205%2C%201010%20Wien';

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
      'past the queue for schnitzel — warm wool and a friendly hello are waiting.</p>' +
      '<div class="contact-card reveal">' +
      '<ul class="contact__list">' +
      contactItem('📍', 'Address', 'Wollzeile 5, 1010 Wien', 'the little lane behind Stephansdom', true) +
      contactItem('☎', 'Phone', '+43 1 123 45 67', 'we answer with socks on', true, 'tel:+4311234567') +
      contactItem('📧', 'E-mail', 'hello@mestore.at', 'hello is our favourite word', true, 'mailto:hello@mestore.at') +
      contactItem('🕒', 'Hours', 'Mon–Sat · 10:00–19:00', 'closed on Sundays, socks sleep in', true) +
      '</ul>' +
      '<div class="contact__map">' +
      '<a class="btn" href="' + MAPS_URL + '" target="_blank" rel="noopener">Open in Google Maps 🧦</a>' +
      '</div>' +
      '</div>' +
      '<p class="contact__hint">All contact details above are placeholders for the real shop — ' +
      'swap them in right here when they are confirmed.</p>',
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
