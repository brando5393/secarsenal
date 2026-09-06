// Best-effort red/blue team classification for tools, from each
// tool's `categories` array. None of the 8 upstream sources this site
// syncs tools from tag anything as "red/blue team" — that's not a
// concept their own taxonomies use — so this is a heuristic, not a
// verified fact the way notableTools cross-references are. The UI
// must always label it as such.
//
// Definitions this classifier targets (CNSSI 4009-2022, via the NIST
// CSRC glossary — csrc.nist.gov/glossary/term/red_team and .../blue_team):
// Red Team = "a group ... authorized and organized to emulate a
// potential adversary's attack or exploitation capabilities"; Blue
// Team = "the group responsible for defending an enterprise's use of
// information systems by maintaining its security posture." In
// practice: red-characteristic tooling emulates/performs an attack
// (recon, exploitation, credential access, lateral movement, C2 —
// matching MITRE ATT&CK's adversary tactic names, which are
// attacker-side by construction); blue-characteristic tooling detects,
// analyzes, or responds to one (forensics, malware analysis, honeypots,
// SIEM/detection — the domain MITRE D3FEND catalogs from the defensive
// side).
//
// This is a purpose-built keyword set, not a reuse of categoryIcons.ts's
// bucketing: that system groups categories for icon *choice*, and its
// "defens" keyword would wrongly catch "defense-evasion" (an ATT&CK
// attacker technique for evading defenses, not a defensive tool) —
// fine for picking a shield icon, wrong for team classification.
//
// Interpretive lens: every source here frames its own tools as
// penetration-testing/security-assessment tooling first (that's the
// premise of Kali/BlackArch/etc.'s own docs), so a category like
// "scanner" or "web application" is classified by that typical
// pentest-catalog usage, not by every possible real-world use of a
// dual-use tool. Genuinely ambiguous categories (crypto, general
// networking, platform tags, automation, reporting, uncategorized) are
// deliberately left unclassified rather than guessed. There's no
// "purple" here at all, and none in `src/content.config.ts`'s OS
// `team` field either (see that file's comment for the citations) —
// no authoritative source treats purple-teaming as a property a single
// tool or platform can hold; it names a collaborative red+blue
// exercise, so no category maps to it here.
export type ToolTeam = 'red' | 'blue';

const RED_KEYWORDS = [
  'exploit', 'dos', 'denial', 'fuzz',
  'backdoor', 'command-and-control', 'c2', 'post-exploitation', 'lateral', 'privilege-escalation', 'persistence',
  'password', 'cracker', 'credential', 'brute',
  'webapp', 'web-app', 'web-scanning', 'web-vulnerability', 'sql', 'xss',
  'scanner', 'scanning', 'vulnerability', 'fingerprinting',
  'recon', 'osint', 'gather', 'information-gathering', 'discovery', 'collection',
  'database',
  'wireless', 'wifi', 'wi-fi', 'bluetooth', 'sdr', 'nfc', 'rfid',
  'social-engineering', 'phish',
  'mobile', 'android', 'apk',
  // MITRE ATT&CK attacker-tactic names some sources use directly as
  // categories — all describe adversary techniques, so all count red.
  'defense-evasion', 'initial-access', 'execution', 'resource-development', 'impact', 'exfiltration',
];

const BLUE_KEYWORDS = [
  'malware', 'revers', 'disassembl', 'decompil', 'deobfuscat', 'unpack', 'ransomware',
  'forensic', 'carving', 'memory-forensics', 'incident-response',
  'honeypot', 'detect', 'defensive',
];

function teamFromCategories(categories: string[]): ToolTeam | undefined {
  const teams = new Set<ToolTeam>();
  for (const category of categories) {
    const normalized = category.toLowerCase();
    if (RED_KEYWORDS.some((kw) => normalized.includes(kw))) teams.add('red');
    if (BLUE_KEYWORDS.some((kw) => normalized.includes(kw))) teams.add('blue');
  }
  return teams.size === 1 ? [...teams][0] : undefined;
}

// Fallback signal for the ~half of tools whose category tags carry no
// red/blue keyword at all (e.g. Kali's own "networking" or "misc"):
// each sync script stamps `commonlyOn` with the exact name of the OS
// entry it came from, and those OS entries already carry a real,
// hand-judged `team` (see content.config.ts). Inheriting that when the
// category-based check is silent closes coverage from ~50% to ~99.5%
// with zero conflicts against the category-based signal in practice —
// checked against the actual dataset before relying on it. Left as
// `undefined` for OSes with no team of their own (Tails, Whonix, etc.)
// so their generic bundled desktop apps (GIMP, LibreOffice, audacity —
// not team tools at all) correctly stay unclassified rather than
// inheriting one.
const OS_TEAM: Record<string, ToolTeam> = {
  'Kali Linux': 'red',
  BlackArch: 'red',
  ArchStrike: 'red',
  REMnux: 'blue',
  'Security Onion': 'blue',
  'FLARE VM': 'blue',
  'T-Pot': 'blue',
};

// Checks every category a tool carries — a tool spanning categories
// that would classify as both red and blue is left unclassified rather
// than arbitrarily picking one. Same conflict-averse rule applies to
// the commonlyOn fallback: synced from more than one OS with different
// teams, it's left unclassified rather than guessed.
export function getToolTeam(categories: string[], commonlyOn: string[] = []): ToolTeam | undefined {
  const fromCategories = teamFromCategories(categories);
  if (fromCategories) return fromCategories;

  const osTeams = new Set(commonlyOn.map((os) => OS_TEAM[os]).filter((t): t is ToolTeam => Boolean(t)));
  return osTeams.size === 1 ? [...osTeams][0] : undefined;
}
