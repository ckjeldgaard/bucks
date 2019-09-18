import Repository from './Repository';
import Rates from '../model/Rates';
import {Logger} from '@overnightjs/logger';
import {Storage} from '@google-cloud/storage';
import {Readable} from 'stream';
import PromiseReadable from 'promise-readable';

export default class StorageRepository implements Repository {

  private readonly bucketName: string;
  private readonly jsonFileName: string;
  private readonly storage: Storage;

  constructor(bucketName: string, jsonFileName: string) {
    this.bucketName = bucketName;
    this.jsonFileName = jsonFileName;
    this.storage = new Storage();
  }

  public async getRates(): Promise<Rates> {
    const readableStream: Readable = this.storage
      .bucket(this.bucketName)
      .file(this.jsonFileName)
      .createReadStream();

    return await this.transformStream(readableStream);
  }

  private transformStream(stream: Readable): Promise<Rates> {
    const promiseReadable = new PromiseReadable(stream);
    return new Promise<Rates>(async (resolve, reject) => {
      let buffer = '';
      for (let chunk; (chunk = await promiseReadable.read());) {
        buffer += chunk;
      }

      const jsonRates = JSON.parse(buffer);
      resolve(jsonRates.rates);
    });
  }

  public saveRates(rates: object): void {
    Logger.Info(rates, true);
  }

}
