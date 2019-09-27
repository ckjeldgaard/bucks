import Api from './Api';
import Repository from '../data/Repository';
import Rates from '../model/Rates';
import axios from 'axios';

export default class ExternalApi implements Api {

  private readonly repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  public async fetchExternalRates(url: string): Promise<Rates> {
    const externalRates = await axios.get(url, {timeout: 1500});
    return externalRates.data.rates;
  }

  public storeRates(rates: Rates): void {
    this.repository.saveRates(rates);
  }

}
