import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  

  apiUrl: string = environment.apiUrl; 
  constructor(private http: HttpClient) {}

  // Função para criar um select com base em uma URL de API
  createSelect(id: string, endpoint: string, titulo: string, unidade: boolean, filtro: any = {}): Observable<any[]> {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userDataParsed = JSON.parse(userData);
      var unidadePadrao = userDataParsed.unidade_padrao.id;
    }
    if (unidade) {
      var apiUrl = `${this.apiUrl}${endpoint}?id=${unidadePadrao}`;
    } else {
      var apiUrl = `${this.apiUrl}${endpoint}`; // Combine a URL base com o endpoint
    }

    return this.http.post<any[]>(apiUrl, filtro);
  }
}





function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
