// Curated map of tool slug -> official logo asset under /logos/tools/.
// Sourcing a real logo for every one of the ~4,200 synced tools isn't
// practical (most small security utilities have no distinct branding
// anyway), so this only covers well-known flagship tools with genuine,
// distinctive official branding — not limited to the homepage's
// featured six (see src/pages/index.astro), just a stricter bar than
// "someone happened to add it." Everything else falls back to a
// CategoryBadge icon — see components/ToolIcon.astro. There's no
// per-entry CI enforcement here the way OS_NO_LOGO_FOUND gates
// src/content/os (scripts/check-logos.mjs) — the scale makes an
// exhaustive per-tool decision impractical — but a newly noticed gap
// in a genuinely famous tool (e.g. Armitage, missed for months despite
// being one of Kali's better-known GUIs) should still be fixed the
// same way: real official source, not a guess.
export interface ToolLogo {
  path: string;
  needsLightBg?: boolean;
}

export const TOOL_LOGOS: Record<string, ToolLogo> = {
  nmap: { path: '/logos/tools/nmap.png' }, // nmap.org/images/sitelogo.png
  'metasploit-framework': { path: '/logos/tools/metasploit-framework.svg' }, // metasploit.com (light-for-dark variant)
  wireshark: { path: '/logos/tools/wireshark.ico' }, // wireshark.org favicon
  hashcat: { path: '/logos/tools/hashcat.ico' }, // hashcat.net favicon
  burpsuite: { path: '/logos/tools/burpsuite.webp', needsLightBg: true }, // portswigger.net (dark text)
  'aircrack-ng': { path: '/logos/tools/aircrack-ng.jpg', needsLightBg: true }, // aircrack-ng.org (white bg baked in)
  armitage: { path: '/logos/tools/armitage.png' }, // fastandeasyhacking.com (site now down; recovered via Wayback Machine, 2021-06-27 snapshot) — wordmark only, no separate icon-only mark found; dark circuit-board background needs no light-bg chip
};
