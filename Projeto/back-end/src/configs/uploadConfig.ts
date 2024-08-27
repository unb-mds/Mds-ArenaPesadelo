import { diskStorage, StorageEngine } from 'multer';
import path from 'path';

const tempFolder = path.resolve('uploads');
const uploadFolder = path.resolve('uploads');

interface IUploadConfig {
  tempFolder: string;
  uploadFolder: string;
  config: {
    upload: StorageEngine;
  }
}

export default {
  tempFolder,
  uploadFolder,
  config: {
    upload: diskStorage({
      destination: tempFolder,
      filename(req, file, callback) {
        const ext = file.originalname.split('.').reverse()[0];
        const unix = Date.now();
        const field = file.fieldname;
        const filename = `${field}-${unix}.${ext}`;

        callback(null, filename);
      },
    }),
  }
} as IUploadConfig;
