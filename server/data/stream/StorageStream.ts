import {Readable} from 'stream';

export interface StorageStream {
  getReadableStream(): Readable;
}
