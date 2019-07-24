import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Partido } from '../models/partido.model';

@Injectable()

export class PartidoService {
  public url: string;
  public identity;
  public token;
  public partido;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getPartidos(token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.get(`${this.url}listar-partidos`, { headers: headers });
  }

  getPartido(id, token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.get(`${this.url}listar-partido/${id}`, { headers: headers });
  }

  addPartido(partido: Partido, token): Observable<any> {
    let params = JSON.stringify(partido);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.post(`${this.url}registrar-partido`, params, { headers: headers })
  }

  updatePartido(partido: Partido, token): Observable<any> {
    let params = JSON.stringify(partido);
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.put(`${this.url}editar-partido/${partido._id}`, params, { headers: headers })
  }

  deletePartido(id, token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
    return this._http.delete(`${this.url}eliminar-partido/${id}`, { headers: headers })
  }

  getPartidoOnSessionStorage() {
    var partido2 = JSON.parse(sessionStorage.getItem('partido'));
    if (partido2 != "undefined")
      this.partido = partido2;
    else
      this.partido = null;
    return this.partido;
  }
}
