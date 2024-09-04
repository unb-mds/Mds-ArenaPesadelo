export default interface IHashProvider {
  hash(string: string): Promise<string>;
  check(hash: string, string: string): Promise<boolean>;
}
