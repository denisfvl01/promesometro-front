import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Presidente } from '../models/presidente.model';

@Injectable({
  providedIn: 'root'
})
export class PresidenteService {
  public url: string;
  public identity;
  public token;
  public partido;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getPresidente(token,partido): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.get(`${this.url}listar-presidente/${partido._id}`, { headers: headers });
  }

  addPresidente(presidente: Presidente, token): Observable<any> {
    console.log(presidente);
    let params = JSON.stringify(presidente);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.post(`${this.url}registrar-presidente`, params, {headers: headers})
  }

  updatePresidente(presidente: Presidente, token): Observable<any> {
    let params = JSON.stringify(presidente);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.put(`${this.url}editar-presidente/${presidente._id}`, params, {headers: headers})
  }

  deletePresidente(id, token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.delete(`${this.url}eliminar-presidente/${id}`, {headers: headers})
  }
}
