import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  apiUrl= environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }
  listEstoque() {    
    return this.http.get(`${this.apiUrl}/produtos/`);
  }

  salvarProduto(data: any) {
    return this.http.post(`${this.apiUrl}/produtos/`, data, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/produtos/${id}/`);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/produtos/${id}/`, data);
  }

  getProdutoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/produtos/${id}/`);
  }
}
