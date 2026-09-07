// Maps category strings that exactly match an official MITRE ATT&CK
// Enterprise tactic name to that tactic's current ID, so a tool page
// can link out to the authoritative source instead of just repeating
// the category as plain text. Only an exact 1:1 match is mapped — most
// of SecArsenal's ~178 free-form category strings (pulled verbatim
// from 8 different upstream taxonomies) are thematic keywords, not
// literal tactic names, and forcing a mapping onto those would be
// exactly the kind of unearned "official" framing this project avoids
// elsewhere (see toolTeam.ts's header comment, CONTRIBUTING.md's
// sourcing rules). These 14 are ArchStrike's own category names,
// already identical to ATT&CK tactic names verbatim.
//
// "defense-evasion" maps to TA0005, which MITRE has renamed "Stealth"
// (splitting part of its old scope into a new TA0112 "Defense
// Impairment") as of this writing — verified live against
// attack.mitre.org/tactics/enterprise/, not assumed from training
// data. The category string is left as ArchStrike's own (older) label
// since this project doesn't rewrite upstream category tags, but the
// link text uses MITRE's current tactic name so a reader isn't sent to
// a page titled differently than what they clicked.
//
// No D3FEND (blue-side) equivalent is mapped: none of the site's
// category strings exactly match a D3FEND tactic name (Harden, Detect,
// Isolate, Deceive, Evict) the way these 14 match ATT&CK's, so adding
// one would mean guessing at a mapping rather than linking a genuine
// match — left undone rather than forced.
export interface AttackTactic {
  id: string;
  name: string;
}

export const ATTACK_TACTICS: Record<string, AttackTactic> = {
  reconnaissance: { id: 'TA0043', name: 'Reconnaissance' },
  'resource-development': { id: 'TA0042', name: 'Resource Development' },
  'initial-access': { id: 'TA0001', name: 'Initial Access' },
  execution: { id: 'TA0002', name: 'Execution' },
  persistence: { id: 'TA0003', name: 'Persistence' },
  'privilege-escalation': { id: 'TA0004', name: 'Privilege Escalation' },
  'defense-evasion': { id: 'TA0005', name: 'Stealth' },
  'credential-access': { id: 'TA0006', name: 'Credential Access' },
  discovery: { id: 'TA0007', name: 'Discovery' },
  'lateral-movement': { id: 'TA0008', name: 'Lateral Movement' },
  collection: { id: 'TA0009', name: 'Collection' },
  'command-and-control': { id: 'TA0011', name: 'Command and Control' },
  exfiltration: { id: 'TA0010', name: 'Exfiltration' },
  impact: { id: 'TA0040', name: 'Impact' },
};

export function getAttackTactic(category: string): AttackTactic | undefined {
  return ATTACK_TACTICS[category.toLowerCase()];
}

export function attackTacticUrl(tactic: AttackTactic): string {
  return `https://attack.mitre.org/tactics/${tactic.id}/`;
}
