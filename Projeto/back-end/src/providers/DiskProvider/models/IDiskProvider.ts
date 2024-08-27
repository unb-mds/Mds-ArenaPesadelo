export interface IDiskProvider {
  saveFiles(filenames: string[]): Promise<string[]>;
  deleteFiles(filenames: string[]): Promise<void>;
}
