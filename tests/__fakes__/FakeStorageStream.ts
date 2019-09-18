import {StorageStream} from '../../server/data/stream/StorageStream';
import {Readable} from 'stream';

export default class FakeStorageStream implements StorageStream {

  private readonly rates: object;

  constructor(rates: object) {
    this.rates = rates;
  }

  public getReadableStream(): Readable {

  let emitted: boolean = false;
  const mockEventStream: Readable = new Readable({
    objectMode: true,
    read: (size: number) => {
      if (!emitted) {
        emitted = true;
        return mockEventStream.push(JSON.stringify(this.rates));
      } else {
        mockEventStream.push(null);
        mockEventStream.emit('end');
      }
    },
  });
  return mockEventStream;


    /*
    const stream = new Readable();
    stream._read = (size) => {  };
    stream.emit('data', JSON.stringify(this.rates));
    stream.emit('end'); // EOF
    return stream;
    */
  }

}
