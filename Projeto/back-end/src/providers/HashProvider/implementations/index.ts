import { hash, compare } from 'bcrypt';
import { Service } from 'typedi';
import IHashProvider from '../models/IHashProvider';

@Service('hashProviders.bcrypt')
export default class BcryptProvider implements IHashProvider {
  public async hash(string: string): Promise<string> {
    const hashed = await hash(string, 10);

    return hashed;
  }

  public async check(hash: string, string: string): Promise<boolean> {
    return compare(string, hash);
  }
}
