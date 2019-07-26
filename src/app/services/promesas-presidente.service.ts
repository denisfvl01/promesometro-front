import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PromesaPresidente } from '../models/promesaPresidente.model';
import { Presidente } from '../models/presidente.model';

@Injectable()
export class PromesasPresidenteService {
  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getPromesas(token, presidente: Presidente): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.get(`${this.url}listar-promesas-presidente/${presidente._id}`, { headers: headers });
  }

  addPromesa(promesa: PromesaPresidente, token): Observable<any> {
    let params = JSON.stringify(promesa);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.post(`${this.url}registrar-promesa-presidente`, params, { headers: headers });
  }

  updatePromesa(promesa: PromesaPresidente, token): Observable<any> {
    let params = JSON.stringify(promesa);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.put(`${this.url}editar-promesa-presidente/${promesa._id}`, params, { headers: headers });
  }

  deletePromesa(id, token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.delete(`${this.url}eliminar-promesa-presidente/${id}`, { headers: headers });
  }

  votarSi(promesa: PromesaPresidente, token): Observable<any> {
    let params = JSON.stringify(promesa);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.put(`${this.url}votar-si-promesa-presidente/${promesa._id}`, params,{ headers: headers });
  }

  votarNo(promesa: PromesaPresidente, token): Observable<any> {
    let params = JSON.stringify(promesa);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.put(`${this.url}votar-no-promesa-presidente/${promesa._id}`, params,{ headers: headers });
  }
}
