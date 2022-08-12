export interface IItems {
  title: string,
  items?: Array<IItems>,
  subTitle?: string,
  dateStart?: number,
  dateEnd?: number,
  data?: Array<{
    title: string,
    number: number,
  }>,
}

export function randomData(): Array<IItems> {
  function t(t: number , e: number): number {
    return t > e || t < 0 ? 0 : Math.floor(Math.random() * (e - t + 1) + t);
  }
  function e(): string {
    return Math.random().toString(36).slice(-5);
  }
  const n: Array<IItems> = [];
  for (let o = 0; o < t(1, 10); o++) {
    const o = [];
    for (let n = 0; n < t(1, 10); n++) {
      const n = [];
      for (let o = 0; o < t(1, 10); o++) {
        const o = [];
        for (let n = 0; n < t(5, 15); n++)
          o.push({ title: e(), number: t(1, 1e7) });
        n.push({
          title: e(),
          subTitle: e(),
          dateStart: Date.now(),
          dateEnd: Date.now() + 6e5,
          data: o,
        });
      }
      o.push({ title: e(), items: n });
    }
    n.push({ title: e(), items: o });
  }
  return n;
}

