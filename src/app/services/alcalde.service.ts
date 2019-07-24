import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alcalde } from '../models/alcalde.model';

@Injectable()

export class AlcaldeService {
  public url: string;
  public identity;
  public token;
  public partido;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getAlcalde(token,partido): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.get(`${this.url}listar-alcalde/${partido._id}`, { headers: headers });
  }

  addAlcalde(alcalde: Alcalde, token): Observable<any> {
    console.log(alcalde);
    let params = JSON.stringify(alcalde);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.post(`${this.url}registrar-alcalde`, params, {headers: headers})
  }

  updateAlcalde(alcalde: Alcalde, token): Observable<any> {
    let params = JSON.stringify(alcalde);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.put(`${this.url}editar-alcalde/${alcalde._id}`, params, {headers: headers})
  }

  deleteAlcalde(id, token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.delete(`${this.url}eliminar-alcalde/${id}`, {headers: headers})
  }
}
