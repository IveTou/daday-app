export default function<T extends Object>(object: T, args: string[]) {
  return !Object.entries(object).filter(([key, ]) => args.includes(key)).every(([, value]) => value)
}
