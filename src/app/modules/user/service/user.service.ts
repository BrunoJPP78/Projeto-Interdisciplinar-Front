import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl= environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listUsuarios(unidadeId: number) {    
    return this.http.get(`${this.apiUrl}/usuario/?unidade=${unidadeId}`);
  }

  salvarUsuario(data: any) {
    return this.http.post(`${this.apiUrl}/novo-usuario/`, data, this.httpOptions);
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${this.apiUrl}/usuario/${id}/`);
  }

  updateUsuario(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/atualizar-usuario/${id}/`, data);
  }
  
  updateUsuarioAtribuicao(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/atualizar-atribuicao-usuario/${id}/`, data);
  }

  getUsuarioById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${id}/`);
  }
  
  getUsuarioAtribuicaoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarioatribuicao/?usuario=${id}`);
  }

}
