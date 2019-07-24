import { Component, OnInit } from '@angular/core';
import { Partido } from 'src/app/models/partido.model';
import { UploadService } from '../../services/upload.service';
import { PartidoService } from '../../services/partido.service';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss'],
  providers: [UploadService, PartidoService, UserService]
})
export class PartidosComponent implements OnInit {
  public identity;
  public token;
  public url;
  public status: string;

  public filesToUpload: Array<File>;
  public partidos: Partido[];
  public modelPartido: Partido;

  constructor(
    private _router: Router,
    private _uploadService: UploadService,
    private _userService: UserService,
    private _partidoService: PartidoService
  ) {
    this.identity = this._userService.getidentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.listarPartidos();
    this.limpiarVariables();
  }

  public limpiarVariables() {
    this.modelPartido = new Partido('', '', '', '');
  }

  public setPartido(partido: Partido) {
    sessionStorage.setItem('partido', JSON.stringify(partido));
    this.modelPartido = partido;
  }

  public vistaPresidente(partido: Partido) {
    this.setPartido(partido);
    this._router.navigate(['/presidente']);
  }

  public vistaAlcalde(partido: Partido) {
    this.setPartido(partido);
    this._router.navigate(['/alcalde']);
  }

  public listarPartidos() {
    this._partidoService.getPartidos(this.token).subscribe(
      response => {
        if (response.partidos) {
          this.partidos = response.partidos;
          this.status = 'ok';
          console.log(this.partidos);
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null)
          this.status = 'error';
      }
    );
  }

  public agregar() {
    this._partidoService.addPartido(this.modelPartido, this.token).subscribe(
      response => {
        if (response.partido) {
          console.log(response.partido);
          this.listarPartidos();
          this.limpiarVariables();
          this.status = 'ok';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null)
          this.status = 'error';
      }
    );
  }

  public editar() {
    this._partidoService.updatePartido(this.modelPartido, this.token).subscribe(
      response => {
        if (response.partido) {
          console.log(response.partido);
          this.listarPartidos();
          this.status = 'ok';
          // subir imagen usuario
          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(this.url + 'subir-imagen-partido/' + response.partido._id, [], this.filesToUpload, this.token, 'image')
              .then((result: any) => {
                this.modelPartido.image = result.partido.image;
                this.listarPartidos();
              });
          }
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null)
          this.status = 'error';
      }
    );
  }

  public eliminar() {
    this._partidoService.deletePartido(this.modelPartido._id, this.token).subscribe(
      response => {
        if (response.partido) {
          console.log(response.partido);
          this.listarPartidos();
          this.limpiarVariables();
          this.status = 'ok';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null)
          this.status = 'error';
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
