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
  bettercap: { path: '/logos/tools/bettercap.png' }, // bettercap.org (mascot icon)
  ettercap: { path: '/logos/tools/ettercap.ico' }, // ettercap-project.org favicon
  sqlmap: { path: '/logos/tools/sqlmap.ico' }, // sqlmap.org favicon
  tcpdump: { path: '/logos/tools/tcpdump.ico' }, // tcpdump.org favicon
  kismet: { path: '/logos/tools/kismet.ico' }, // kismetwireless.net favicon
  maltego: { path: '/logos/tools/maltego.ico' }, // maltego.com favicon
  john: { path: '/logos/tools/john.ico' }, // openwall.com favicon (John the Ripper's official home)
  wpscan: { path: '/logos/tools/wpscan.png' }, // github.com/wpscanteam org avatar (diamond/layers mark, matches wpscan.com branding)
  spiderfoot: { path: '/logos/tools/spiderfoot.ico' }, // spiderfoot.net favicon
  nuclei: { path: '/logos/tools/nuclei.png', needsLightBg: true }, // raw.githubusercontent.com/projectdiscovery/nuclei (atom mark + wordmark, black-on-transparent)
  sleuthkit: { path: '/logos/tools/sleuthkit.ico' }, // sleuthkit.org favicon
  amass: { path: '/logos/tools/amass.png' }, // github.com/owasp-amass org avatar ("A" mark, dark background baked in)
  cutter: { path: '/logos/tools/cutter.svg', needsLightBg: true }, // github.com/rizinorg/cutter (rewind/C mark, black-on-transparent)
  autopsy: { path: '/logos/tools/autopsy.ico' }, // autopsy.com favicon
  frida: { path: '/logos/tools/frida.ico' }, // frida.re favicon
  x64dbg: { path: '/logos/tools/x64dbg.ico' }, // x64dbg.com favicon
  volatility3: { path: '/logos/tools/volatility3.png', needsLightBg: true }, // github.com/volatilityfoundation org avatar (power/pulse mark, black-on-transparent)
  bloodhound: { path: '/logos/tools/bloodhound.png', needsLightBg: true }, // github.com/BloodHoundAD org avatar (graph-hound mark, red/black on transparent)
  mobsf: { path: '/logos/tools/mobsf.png' }, // github.com/MobSF org avatar (dark background baked in)
  ffuf: { path: '/logos/tools/ffuf.png' }, // github.com/ffuf org avatar (mascot)
  zaproxy: { path: '/logos/tools/zaproxy.png' }, // github.com/zaproxy org avatar (lightning-bolt mark, OWASP ZAP's own branding)
  openvas: { path: '/logos/tools/openvas.png' }, // github.com/greenbone org avatar (Greenbone now maintains OpenVAS/GVM)
  empire: { path: '/logos/tools/empire.png' }, // github.com/BC-SECURITY org avatar (BC-Security is Empire's maintaining org)
  radare2: { path: '/logos/tools/radare2.png', needsLightBg: true }, // github.com/radareorg org avatar (r2/rewind mark, black-on-transparent)
  sherlock: { path: '/logos/tools/sherlock.png' }, // github.com/sherlock-project org avatar (detective mascot, matches the tool's name)
  beef: { path: '/logos/tools/beef.png', needsLightBg: true }, // github.com/beefproject org avatar (bull-head mark, dark-on-transparent) — also used for beef-git and beef-xss below, same real-world tool under different distros' packaging
  'beef-git': { path: '/logos/tools/beef.png', needsLightBg: true },
  'beef-xss': { path: '/logos/tools/beef.png', needsLightBg: true },
  binwalk: { path: '/logos/tools/binwalk.png' }, // github.com/ReFirmLabs org avatar (green hexagon/"r" mark) — ReFirmLabs is a small firmware-security shop built around binwalk, same "maintaining org whose brand is this tool" reasoning as openvas/Greenbone, not a generic large-company logo
  rubeus: { path: '/logos/tools/rubeus.jpg' }, // github.com/GhostPack org avatar (ghost mascot + wordmark) — GhostPack is SpecterOps's specific tool-suite brand Rubeus belongs to, not SpecterOps's own corporate logo; opaque black JPEG background, self-contained on dark theme (same as t-pot.webp)
  netexec: { path: '/logos/tools/netexec.png' }, // github.com/Pennyw0rth org avatar (spider mark) — NetExec's own maintaining org and distinct branding
  'fern-wifi-cracker': { path: '/logos/tools/fern-wifi-cracker.png', needsLightBg: true }, // github.com/savio-code/fern-wifi-cracker Fern-Wifi-Cracker/resources/icon.png — the app's own window/taskbar icon; black signal-wave arcs need a light backing to stay visible on the dark theme
  apktool: { path: '/logos/tools/apktool.png' }, // ibotpeaches.github.io/Apktool/img/logo.png (official project site)
  jadx: { path: '/logos/tools/jadx.svg' }, // github.com/skylot/jadx jadx-gui/src/main/resources/logos/jadx-logo.svg — opaque black ring background, self-contained on dark theme
};

// Checked for a real official logo and found none distinct from a
// generic parent-company/personal-account mark — not fabricated,
// not used: sliver (only BishopFox's generic company logo, no
// Sliver-specific mark), drozer (only WithSecure's generic "W"
// wordmark), ghidra (NSA's official seal isn't Ghidra-specific
// branding, and no dedicated Ghidra mark was found within reasonable
// effort — worth another look later), mimikatz (repo owner is a
// personal account, not an org, same reasoning as CAPEv2 in
// osLogos.ts), yara (VirusTotal's generic company logo, no
// YARA-specific mark), impacket (Fortra's generic company logo, no
// Impacket-specific mark). Second pass: masscan, netcat, gobuster,
// cewl, medusa, hydra, reaver, foremost, theharvester, recon-ng
// (README only shows third-party sponsor logos, not its own mark),
// crackmapexec (checked both the current mpgn/CrackMapExec and the
// original byt3bl33d3r/CrackMapExec — personal accounts, no project
// logo in either README; its actively-maintained successor, NetExec,
// does have one and is included above), powersploit (PowerShellMafia's
// GitHub avatar is a default identicon, not a real logo), wifite,
// responder — all personal-account repos with no logo/banner in their
// README and no dedicated project site found.
