import { IDiskProvider } from "../models/IDiskProvider";
import path from 'path';
import fs from 'fs';
import uploadConfig from "../../../configs/uploadConfig";

export default class DiskProvider implements IDiskProvider {
  public async saveFiles(filenames: string[]): Promise<string[]> {
    const newPaths = await Promise.all(filenames.map(async filename => {
      try {
        const filePath = path.resolve(uploadConfig.tempFolder, filename);

        await fs.promises.stat(filePath);

        const newPath = path.resolve(uploadConfig.uploadFolder, filename);

        await fs.promises.rename(filePath, newPath);

        return newPath;
      } catch (err) {
        console.log(err);
        console.log('File does not exist!');
      }

      return '';
    }));

    return newPaths;
  }

  public async deleteFiles(filenames: string[]): Promise<void> {
    await Promise.all(filenames.map(async filename => {
      try {
        const filePath = path.resolve(uploadConfig.uploadFolder, filename);

        await fs.promises.stat(filePath);

        await fs.promises.unlink(filePath);
      } catch {
        console.log('File does not exist!');
      }
    }));
  }
}
