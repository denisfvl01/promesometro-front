import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { PromesaPresidente } from '../models/promesaPresidente.model';
import { PromesaAlcalde } from '../models/promesaAlcalde.model';

@Injectable()
export class PromesasAlcaldeService {
  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getPromesas(token, promesa): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.get(`${this.url}listar-promesas-alcalde/${promesa._id}`, { headers: headers });
  }

  addPromesa(promesa: PromesaAlcalde, token): Observable<any> {
    let params = JSON.stringify(promesa);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.post(`${this.url}registrar-promesa-alcalde`, params, { headers: headers });
  }

  updatePromesa(promesa: PromesaAlcalde, token): Observable<any> {
    let params = JSON.stringify(promesa);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.put(`${this.url}editar-promesa-alcalde/${promesa._id}`, params, { headers: headers });
  }

  deletePromesa(id, token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.delete(`${this.url}eliminar-promesa-alcalde/${id}`, { headers: headers });
  }

  votarSi(id, token): Observable<any> {
    console.log(token);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.put(`${this.url}votar-si-promesa-alcalde/${id}`, { headers: headers });
  }

  votarNo(id, token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.put(`${this.url}votar-no-promesa-alcalde/${id}`, { headers: headers });
  }
}
