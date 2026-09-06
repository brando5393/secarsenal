// Official logo assets for each hand-curated OS entry, sourced directly
// from each project's own site/repo (see comments). `needsLightBg` marks
// logos whose artwork is dark-on-transparent (or has an opaque white
// background baked into the source file) and would vanish, or show a
// white box, against our dark theme without a light backing chip.
//
// Ground rule (see CONTRIBUTING.md "Adding or updating an OS entry"):
// every entry that has a genuine, distinctive official logo/favicon
// must have it here — never leave a real logo undisplayed in favor of
// the generic CategoryBadge fallback. The following entries were
// checked and have no discoverable official logo/favicon distinct from
// a generic platform icon (Tux, a SourceForge/Allura placeholder, etc.)
// — they intentionally use the CategoryBadge fallback via OsIcon.astro:
// androl4b, caine, csi-linux, demon-linux, dshield, nst,
// open-secure-k-os, samuraiwtf, sift, tsurugi-linux. Re-check these
// periodically — a project without a logo today may adopt one later.
export interface OsLogo {
  path: string;
  needsLightBg?: boolean;
}

export const OS_LOGOS: Record<string, OsLogo> = {
  'kali-linux': { path: '/logos/os/kali-linux.svg' }, // kali.org/images/kali-logo.svg
  'kali-purple': { path: '/logos/os/kali-purple.png', needsLightBg: true }, // gitlab.com/kalilinux/documentation/kali-purple promo banner (dragon head cropped)
  'kali-nethunter': { path: '/logos/os/kali-nethunter.png' }, // gitlab.com/kalilinux/nethunter group avatar
  'parrot-security-os': { path: '/logos/os/parrot-security-os.png' }, // parrotsec.org/favicon.png
  blackarch: { path: '/logos/os/blackarch.png', needsLightBg: true }, // blackarch.org/images/logo/ba-logo.png
  tails: { path: '/logos/os/tails.png' }, // tails.net/lib/logo.png
  pentoo: { path: '/logos/os/pentoo.png', needsLightBg: true }, // github.com/pentoo org avatar
  remnux: { path: '/logos/os/remnux.png' }, // remnux.org/img/remnux-logo.png
  archstrike: { path: '/logos/os/archstrike.png', needsLightBg: true }, // archstrike.org/favicon.ico
  'athena-os': { path: '/logos/os/athena-os.svg' }, // athenaos.org build asset (Astro content-hashed filename — re-check on site redeploys)
  backbox: { path: '/logos/os/backbox.png' }, // backbox.org (white wordmark, dark-theme-only asset)
  'berserk-arch': { path: '/logos/os/berserk-arch.svg', needsLightBg: true }, // berserkarch.org build asset (Astro content-hashed filename — re-check on site redeploys)
  commandovm: { path: '/logos/os/commandovm.png' }, // github.com/mandiant/commando-vm Images/commando.png (mascot cropped from full banner)
  cuckoo3: { path: '/logos/os/cuckoo3.png' }, // cuckoo-hatch.cert.ee docs (hummingbird icon cropped from wordmark banner)
  dragonos: { path: '/logos/os/dragonos.png' }, // cemaxecuter.com (DragonOS creator's site)
  exegol: { path: '/logos/os/exegol.svg' }, // docs.exegol.com (dark-theme light-variant asset)
  fact: { path: '/logos/os/fact.png' }, // fkie-cad.github.io/FACT_core docs (circular mark cropped from wordmark banner)
  'fedora-security-lab': { path: '/logos/os/fedora-security-lab.svg' }, // Wikimedia Commons mirror of Fedora's official icon (2021)
  'flare-vm': { path: '/logos/os/flare-vm.png' }, // github.com/mandiant/flare-vm Images/flarevm-logo.png
  frieren: { path: '/logos/os/frieren.png' }, // github.com/xchwarze/frieren avatar
  hackeros: { path: '/logos/os/hackeros.png' }, // hackeros-linux-system.github.io/HackerOS-Website/HackerOS.png
  'linux-kodachi': { path: '/logos/os/linux-kodachi.png' }, // sourceforge.net/projects/linuxkodachi project icon
  malcolm: { path: '/logos/os/malcolm.png', needsLightBg: true }, // idaholab.github.io/Malcolm docs (Celtic-knot mark cropped from wordmark banner; opaque white background)
  misp: { path: '/logos/os/misp.png' }, // misp-project.org (mark cropped from wordmark logo)
  mobexler: { path: '/logos/os/mobexler.png' }, // mobexler.com (fox mark cropped from full logo)
  nethydra: { path: '/logos/os/nethydra.png' }, // nethydra.github.io brand assets (dragon-head mark cropped from wordmark logo)
  paladin: { path: '/logos/os/paladin.png' }, // sumuri.com apple-touch-icon (Paladin forensic suite, made by SUMURI)
  'predator-os': { path: '/logos/os/predator-os.png' }, // github.com/hosseinseilani/predator-os banner.png (mask icon cropped from banner; repo's own logo_square.png is mislabeled/wrong)
  pwnagotchi: { path: '/logos/os/pwnagotchi.png' }, // pwnagotchi.ai/favicon.png (the project's iconic ASCII mascot face)
  'qubes-os': { path: '/logos/os/qubes-os.png' }, // qubes-os.org icon
  secbsd: { path: '/logos/os/secbsd.png' }, // secbsd.org/img/logo.png (wordmark only — no separate icon-only mark found)
  'security-onion': { path: '/logos/os/security-onion.png' }, // securityonionsolutions.com/favicon.ico
  sigintos: { path: '/logos/os/sigintos.png' }, // sigintos.com (wifi-signal mark cropped from wordmark logo)
  systemrescue: { path: '/logos/os/systemrescue.png' }, // system-rescue.org (icon cropped from wordmark logo)
  't-pot': { path: '/logos/os/t-pot.webp' }, // telekom-security/tpotce project branding (self-contained dark background)
  thehive: { path: '/logos/os/thehive.svg' }, // strangebee.com (TheHive's parent company) TH_logo_icon.svg
  'trace-labs-osint-vm': { path: '/logos/os/trace-labs-osint-vm.jpg', needsLightBg: true }, // tracelabs.org branding (opaque JPEG, white background)
  wazuh: { path: '/logos/os/wazuh.png' }, // github.com/wazuh org avatar
  whonix: { path: '/logos/os/whonix.svg' }, // whonix.org wiki logo
  wifislax: { path: '/logos/os/wifislax.png' }, // wifislax.com/favicon.ico (low-resolution 16x16 source — no larger official asset found)
  winfe: { path: '/logos/os/winfe.png' }, // winfe.wordpress.com sidebar logo
};
