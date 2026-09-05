// Official logo assets for each hand-curated OS entry, sourced
// directly from each project's own site (see comments). `needsLightBg`
// marks logos whose artwork is dark-on-transparent and would vanish
// against our dark theme without a light backing chip. CAINE has no
// discoverable official logo/favicon asset (checked their site and
// GitHub) — it uses the category badge fallback via OsIcon.astro.
export interface OsLogo {
  path: string;
  needsLightBg?: boolean;
}

export const OS_LOGOS: Record<string, OsLogo> = {
  'kali-linux': { path: '/logos/os/kali-linux.svg' }, // kali.org/images/kali-logo.svg
  'parrot-security-os': { path: '/logos/os/parrot-security-os.png' }, // parrotsec.org/favicon.png
  blackarch: { path: '/logos/os/blackarch.png', needsLightBg: true }, // blackarch.org/images/logo/ba-logo.png
  tails: { path: '/logos/os/tails.png' }, // tails.net/lib/logo.png
  pentoo: { path: '/logos/os/pentoo.png', needsLightBg: true }, // github.com/pentoo org avatar
  remnux: { path: '/logos/os/remnux.png' }, // remnux.org/img/remnux-logo.png
};
