// Curated map of tool slug -> official logo asset under /logos/tools/.
// Sourcing a real logo for every one of the ~3,500 synced tools isn't
// practical (most small security utilities have no distinct branding
// anyway), so this only covers well-known flagship tools — currently
// the same set featured on the homepage. Everything else falls back
// to a CategoryBadge icon — see components/ToolIcon.astro.
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
};
