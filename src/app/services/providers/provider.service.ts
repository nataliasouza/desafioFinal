import { environment } from '../../../environments/environment'

export abstract class ProviderService {

  private urlBase: string;
  private API: string;

  constructor(api: string) { 
    this.urlBase = `${environment.API_ORIGINAL}`
    this.API = api;
  }

  get url() : string {
    return `${this.urlBase}/${this.API}`;
  }

  urlOption(api: string): string {
    return `${this.urlBase}/${api}`;
  }
}
