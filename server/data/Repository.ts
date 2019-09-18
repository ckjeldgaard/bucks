import Rates from '../model/Rates';

export default interface Repository {
  getRates(): Promise<Rates>;
  saveRates(rates: Rates): void;
}
