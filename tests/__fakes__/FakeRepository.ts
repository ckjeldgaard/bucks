import Repository from '../../server/data/Repository';
import Rates from '../../server/model/Rates';

export default class FakeRepository implements Repository {

  private readonly rates: Rates;

  constructor(rates: Rates) {
    this.rates = rates;
  }

  public getRates(): Promise<Rates> {
    return new Promise<Rates>((resolve) => {
      resolve(this.rates);
    });
  }

  public saveRates(rates: Rates): void {
    /* Do nothing */
  }
}
