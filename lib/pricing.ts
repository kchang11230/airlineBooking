export function getPrice(orig: string, dest: string) {
  const route = `${orig}-${dest}`;

  const prices: Record<string, number> = {
    "NZNE-YSSY": 399,
    "NZNE-NZGB": 199,
    "NZNE-NZRO": 209,
    "NZNE-NZCI": 299,
    "NZNE-NZTL": 259,
    "YSSY-NZNE": 399,
    "NZGB-NZNE": 199,
    "NZRO-NZNE": 209,
    "NZCI-NZNE": 299,
    "NZTL-NZNE": 259,
  };

  return prices[route] ?? 399; // 默认价
}