import "server-only";
import { siteConfig } from "@/lib/data/site";

const brand = {
  westernRed: "#e00000",
  deepInk: "#101820",
  iceBlue: "#f4faff",
  poolBlue: "#72b8f5",
  heritageYellow: "#ffe500",
  white: "#ffffff",
  muted: "#5b6672",
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Wraps a block of inner HTML in a branded, table-based email shell (header
 * with logo on a Western Red band, white content card, Deep Ink footer) so
 * staff notification emails look like they come from Western Swimming Pool
 * instead of plain unstyled text. Uses inline styles and tables throughout
 * for email client compatibility.
 */
export function renderEmail(options: { preheader: string; heading: string; bodyHtml: string }) {
  const logoUrl = `${siteConfig.url}/images/logo.png`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(options.heading)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:${brand.iceBlue}; font-family: Arial, Helvetica, sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(options.preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${brand.iceBlue}; padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:${brand.white}; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(16,24,32,0.08);">
            <tr>
              <td style="background-color:${brand.westernRed}; padding:24px 32px;" align="center">
                <img src="${logoUrl}" alt="${escapeHtml(siteConfig.name)}" width="100" height="100" style="display:block; width:100px; height:100px;" />
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 16px; font-family: Arial, Helvetica, sans-serif; font-size:20px; line-height:1.3; color:${brand.deepInk};">
                  ${escapeHtml(options.heading)}
                </h1>
                <div style="font-size:14px; line-height:1.6; color:${brand.deepInk};">
                  ${options.bodyHtml}
                </div>
              </td>
            </tr>
            <tr>
              <td style="background-color:${brand.deepInk}; padding:20px 32px; font-size:12px; line-height:1.6; color:${brand.white};" align="center">
                <p style="margin:0;">${escapeHtml(siteConfig.name)} &middot; ${escapeHtml(siteConfig.address.line1)}, ${escapeHtml(siteConfig.address.town)}, ${escapeHtml(siteConfig.address.postcode)}</p>
                <p style="margin:4px 0 0;">${escapeHtml(siteConfig.phone)} &middot; ${escapeHtml(siteConfig.email)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderFieldRows(fields: Array<[label: string, value: string]>) {
  const rows = fields
    .filter(([, value]) => value.trim().length > 0)
    .map(
      ([label, value]) => `
            <tr>
              <td style="padding:10px 0; border-bottom:1px solid ${brand.iceBlue}; font-size:13px; font-weight:bold; color:${brand.muted}; vertical-align:top; width:140px;">${escapeHtml(label)}</td>
              <td style="padding:10px 0; border-bottom:1px solid ${brand.iceBlue}; font-size:14px; color:${brand.deepInk}; vertical-align:top;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
            </tr>`
    )
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">${rows}</table>`;
}

export function renderBadge(text: string) {
  return `<span style="display:inline-block; background-color:${brand.heritageYellow}; color:${brand.deepInk}; font-size:12px; font-weight:bold; padding:4px 12px; border-radius:999px; margin-bottom:16px;">${escapeHtml(text)}</span>`;
}

export { brand };
