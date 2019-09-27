import Rates from '../model/Rates';

export default interface Api {
  fetchExternalRates(url: string): Promise<Rates>;
  storeRates(rates: Rates): void;
}
