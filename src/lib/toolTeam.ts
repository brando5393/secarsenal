// Best-effort red/blue team classification for tools, from each
// tool's `categories` array. None of the 8 upstream sources this site
// syncs tools from tag anything as "red/blue team" — that's not a
// concept their own taxonomies use — so this is a heuristic, not a
// verified fact the way notableTools cross-references are. The UI
// must always label it as such.
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
// "purple" here at all — purple-teaming describes how tools from both
// sides get used together in an exercise, not a property of a single
// utility, so no category maps to it.
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

// Checks every category a tool carries — a tool spanning categories
// that would classify as both red and blue is left unclassified rather
// than arbitrarily picking one.
export function getToolTeam(categories: string[]): ToolTeam | undefined {
  const teams = new Set<ToolTeam>();
  for (const category of categories) {
    const normalized = category.toLowerCase();
    if (RED_KEYWORDS.some((kw) => normalized.includes(kw))) teams.add('red');
    if (BLUE_KEYWORDS.some((kw) => normalized.includes(kw))) teams.add('blue');
  }
  return teams.size === 1 ? [...teams][0] : undefined;
}
