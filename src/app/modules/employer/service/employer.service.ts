import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  apiUrl= environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }
  list() {    
    return this.http.get(`${this.apiUrl}/funcionarios/`);
  }

  salvar(data: any) {
    return this.http.post(`${this.apiUrl}/funcionarios/`, data, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/funcionarios/${id}/`);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/funcionarios/${id}/`, data);
  }

  getFuncionarioById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/funcionarios/${id}/`);
  }
}
