import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  appendQueryParamsToUrl(url: string, paramsObj: any) {
    const urlObject = new URL(url);
    const searchParams = new URLSearchParams(urlObject.search);

    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        searchParams.append(key, paramsObj[key]);
      }
    }

    urlObject.search = searchParams.toString();
    return urlObject.toString();
  }

  get(endpoint: string, queryParams?: object): Observable<any> {
    let fullUrl = endpoint;

    if (queryParams) {
      fullUrl = this.appendQueryParamsToUrl(fullUrl, queryParams);
    }
    return this._http.get(fullUrl);
  }

  post(endpoint: string, data: any): Observable<any> {
    return this._http.post(`${endpoint}`, data);
  }

  put(endpoint: string, data: any): Observable<any> {
    return this._http.put(`${endpoint}`, data);
  }

  delete(endpoint: string): Observable<any> {
    return this._http.delete(`${endpoint}`);
  }
}
