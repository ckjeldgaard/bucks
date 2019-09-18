import Repository from './Repository';
import Rates from '../model/Rates';
import {Logger} from '@overnightjs/logger';
import {Readable} from 'stream';
import PromiseReadable from 'promise-readable';
import {StorageStream} from './stream/StorageStream';

export default class StorageRepository implements Repository {

  private readonly storageStream: StorageStream;

  constructor(storageStream: StorageStream) {
    this.storageStream = storageStream;
  }

  public async getRates(): Promise<Rates> {
    return await this.transformStream(
      this.storageStream.getReadableStream(),
    );
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
