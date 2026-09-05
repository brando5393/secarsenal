// Maps the ~130+ free-form category strings across our four synced
// tool sources (each with its own taxonomy) down to a small set of
// icon "buckets" via keyword matching, so every tool/category always
// has a sensible visual even though we don't control the category
// vocabulary. First matching bucket wins; `wrench` is the fallback for
// anything unmatched (including the very common "uncategorized").
export interface CategoryBucket {
  icon: string;
  color: string;
  label: string;
}

const BUCKETS: { keywords: string[]; bucket: CategoryBucket }[] = [
  {
    keywords: ['exploit', 'dos', 'denial'],
    bucket: { icon: 'bug', color: 'rose', label: 'Exploitation' },
  },
  {
    keywords: ['malware', 'revers', 'disassembl', 'decompil', 'deobfuscat', 'unpack', 'code-audit', 'binary', 'ransomware'],
    bucket: { icon: 'skull', color: 'rose', label: 'Reverse engineering' },
  },
  {
    keywords: ['fuzz'],
    bucket: { icon: 'dices', color: 'rose', label: 'Fuzzing' },
  },
  {
    keywords: ['backdoor', 'command-and-control', 'c2', 'post-exploitation', 'lateral', 'privilege-escalation', 'persistence'],
    bucket: { icon: 'waypoints', color: 'rose', label: 'Post-exploitation' },
  },
  {
    keywords: ['password', 'cracker', 'credential', 'brute'],
    bucket: { icon: 'key', color: 'violet', label: 'Password attacks' },
  },
  {
    keywords: ['crypto', 'stego', 'encrypt'],
    bucket: { icon: 'lock', color: 'violet', label: 'Cryptography' },
  },
  {
    keywords: ['forensic', 'carving', 'memory-forensics', 'incident-response'],
    bucket: { icon: 'fingerprint', color: 'amber', label: 'Forensics' },
  },
  {
    keywords: ['defens', 'honeypot', 'evasion', 'detect'],
    bucket: { icon: 'shield', color: 'amber', label: 'Defensive' },
  },
  {
    keywords: ['webapp', 'web-app', 'web-scanning', 'web-vulnerability', 'sql', 'xss', 'http'],
    bucket: { icon: 'globe', color: 'sky', label: 'Web application' },
  },
  {
    keywords: ['scanner', 'scanning', 'vulnerability', 'fingerprint-service', 'fingerprinting'],
    bucket: { icon: 'radar', color: 'sky', label: 'Vulnerability scanning' },
  },
  {
    keywords: ['recon', 'osint', 'gather', 'collection', 'discovery', 'information-gathering'],
    bucket: { icon: 'search', color: 'sky', label: 'Reconnaissance' },
  },
  {
    keywords: ['database', 'sql-injection'],
    bucket: { icon: 'database', color: 'sky', label: 'Database' },
  },
  {
    keywords: ['network', 'sniff', 'spoof', 'proxy', 'tunnel', 'protocol', 'traffic'],
    bucket: { icon: 'network', color: 'emerald', label: 'Network analysis' },
  },
  {
    keywords: ['wireless', 'wifi', 'wi-fi', 'bluetooth', 'radio', 'sdr', 'nfc', 'rfid', '802-11', '802.11'],
    bucket: { icon: 'wifi', color: 'emerald', label: 'Wireless' },
  },
  {
    keywords: ['social', 'phish'],
    bucket: { icon: 'users', color: 'emerald', label: 'Social engineering' },
  },
  {
    keywords: ['mobile', 'android', ' ios', 'apk'],
    bucket: { icon: 'smartphone', color: 'emerald', label: 'Mobile' },
  },
  {
    keywords: ['windows', 'pe-files', 'microsoft-office', '.net', 'elf', 'linux', 'macos'],
    bucket: { icon: 'terminal', color: 'gray', label: 'Platform-specific' },
  },
  {
    keywords: ['automation', 'script', 'utilities', 'utility'],
    bucket: { icon: 'settings', color: 'gray', label: 'Automation & utilities' },
  },
  {
    keywords: ['report', 'document'],
    bucket: { icon: 'file-text', color: 'gray', label: 'Reporting' },
  },
];

const DEFAULT_BUCKET: CategoryBucket = { icon: 'wrench', color: 'gray', label: 'General' };

export function getCategoryBucket(category: string): CategoryBucket {
  const normalized = category.toLowerCase();
  for (const { keywords, bucket } of BUCKETS) {
    if (keywords.some((kw) => normalized.includes(kw))) return bucket;
  }
  return DEFAULT_BUCKET;
}

// Tools often carry several category tags (e.g. Kali's own taxonomy
// commonly lists 2-6 per tool); the first one alphabetically/positionally
// isn't necessarily the most descriptive. Try each in order and use the
// first one that actually matches a bucket, only falling back to the
// generic default if none of them do.
export function getCategoryBucketForList(categories: string[]): CategoryBucket {
  for (const category of categories) {
    const normalized = category.toLowerCase();
    for (const { keywords, bucket } of BUCKETS) {
      if (keywords.some((kw) => normalized.includes(kw))) return bucket;
    }
  }
  return DEFAULT_BUCKET;
}

// Single source of truth for the /categories key page — every bucket a
// badge can actually render, including the fallback, each paired with
// the keyword(s) that produce it so the page never drifts out of sync
// with BUCKETS above.
export function getAllBuckets(): { bucket: CategoryBucket; keywords: string[] }[] {
  return [...BUCKETS, { keywords: [], bucket: DEFAULT_BUCKET }];
}

export const BADGE_COLOR_CLASSES: Record<string, string> = {
  rose: 'bg-rose-500/10 text-rose-400',
  violet: 'bg-violet-500/10 text-violet-400',
  amber: 'bg-amber-500/10 text-amber-400',
  sky: 'bg-sky-500/10 text-sky-400',
  emerald: 'bg-emerald-500/10 text-emerald-400',
  gray: 'bg-gray-500/10 text-gray-400',
};
