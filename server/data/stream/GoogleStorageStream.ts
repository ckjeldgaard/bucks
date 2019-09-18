import {StorageStream} from './StorageStream';
import {Storage} from '@google-cloud/storage';
import {Readable} from 'stream';

export default class GoogleStorageStream implements StorageStream {

  private readonly bucketName: string;
  private readonly jsonFileName: string;
  private readonly storage: Storage;

  constructor(bucketName: string, jsonFileName: string) {
    this.bucketName = bucketName;
    this.jsonFileName = jsonFileName;
    this.storage = new Storage();
  }

  public getReadableStream(): Readable {
    return this.storage
      .bucket(this.bucketName)
      .file(this.jsonFileName)
      .createReadStream();
  }

}
