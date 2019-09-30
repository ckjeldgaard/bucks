import Repository from './Repository';
import Rates from '../model/Rates';
import {Firestore} from '@google-cloud/firestore';
import {Logger} from '@overnightjs/logger';
import DocumentReference = FirebaseFirestore.DocumentReference;
import WriteResult = FirebaseFirestore.WriteResult;

export default class DatastoreRepository implements Repository {

  private readonly firestore: Firestore;

  constructor() {
    this.firestore = new Firestore();
  }

  public getRates(): Promise<Rates> {
    return new Promise<Rates>(async (resolve, reject) => {
      const docRef: DocumentReference = await this.firestore.doc('xchange/currency_rates');

      try {
        const document = await docRef.get();
        if (!document.exists) {
          throw new Error(`Rates document doesn't exist`);
        }
        const docData = document.data();
        if (docData === undefined) {
          throw new Error(`Can't read database data`);
        }
        resolve(docData.rates);
      } catch (err) {
        Logger.Err('Error retrieving rates' + err.toString(), true);
        reject(err);
      }
    });
  }

  public async saveRates(rates: Rates): Promise<void> {
    try {
      const docRef: DocumentReference = await this.firestore.doc('xchange/currency_rates');
      const result: WriteResult = await docRef.set( {rates});
      Logger.Info(result, true);
    } catch (err) {
      Logger.Err('Error saving rates' + err.toString(), true);
      throw err;
    }
  }

}
