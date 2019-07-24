import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global.service';
import { Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { UserService } from '../../services/user.service';
import { PartidoService } from 'src/app/services/partido.service';
import { Alcalde } from '../../models/alcalde.model';
import { AlcaldeService } from '../../services/alcalde.service';
import { PromesaAlcalde } from '../../models/promesaAlcalde.model';
import { PromesasAlcaldeService } from '../../services/promesas-alcalde.service';

@Component({
  selector: 'app-alcalde',
  templateUrl: './alcalde.component.html',
  styleUrls: ['./alcalde.component.scss'],
  providers: [UploadService, AlcaldeService, PartidoService, PromesasAlcaldeService, UserService]
})

export class AlcaldeComponent implements OnInit {
  public identity;
  public token;
  public url;
  public status: string;

  public filesToUpload: Array<File>;
  public alcaldes: Alcalde[];
  public alcalde: Alcalde;
  public modelAlcalde: Alcalde;
  public promesas: PromesaAlcalde[] = null;
  public modelPromesa: PromesaAlcalde;
  public partido;
  constructor(
    // private _router: Router,
    private _uploadService: UploadService,
    private _userService: UserService,
    private _alcaldeService: AlcaldeService,
    private _partidoService: PartidoService,
    private _promesaService: PromesasAlcaldeService
  ) {
    this.identity = this._userService.getidentity();
    this.token = this._userService.getToken();
    this.partido = this._partidoService.getPartidoOnSessionStorage();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.listarAlcalde();
    this.limpiarVariables();
  }

  public limpiarVariables() {
    this.modelAlcalde = new Alcalde('', '', this.partido._id, '');
    this.modelPromesa = new PromesaAlcalde('', '', '', 0, 0);
  }

  public setAlcalde(alcalde: Alcalde) {
    sessionStorage.setItem('alcalde', JSON.stringify(alcalde));
    this.modelAlcalde = alcalde;
  }

  public setPromesa(promesa: PromesaAlcalde) {
    this.modelPromesa = promesa;
  }

  public listarAlcalde() {
    this._alcaldeService.getAlcalde(this.token, this.partido).subscribe(
      response => {
        if (response.alcalde) {
          if (response.alcalde) {
            this.alcaldes = response.alcalde;
            this.alcalde = this.alcaldes[0];
          }
          this.status = 'ok';
          console.log(this.alcaldes);
          if (this.alcaldes.length > 0) {
            this._promesaService.getPromesas(this.token, this.alcaldes[0]).subscribe(
              response => {
                if (response.promesas) {
                  this.promesas = response.promesas;
                  this.status = 'ok';
                  console.log(this.promesas);
                }
              }, error => {
                let errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null)
                  this.status = 'error';
              }
            );
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

  public listarPromesas() {
    // this.partido = this._partidoService.getPartidoOnSessionStorage();
    this._promesaService.getPromesas(this.token, this.alcaldes[0]).subscribe(
      response => {
        if (response.promesas) {
          this.promesas = response.promesas;
          this.status = 'ok';
          console.log(this.promesas);
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
    this._alcaldeService.addAlcalde(this.modelAlcalde, this.token).subscribe(
      response => {
        if (response.alcalde) {
          console.log(response.alcalde);
          this.listarAlcalde();
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
    this._alcaldeService.updateAlcalde(this.modelAlcalde, this.token).subscribe(
      response => {
        if (response.alcalde) {
          console.log(response.alcalde);
          this.listarAlcalde();
          this.status = 'ok';
          // subir imagen usuario
          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(this.url + 'subir-imagen-alcalde/' + this.modelAlcalde._id, [], this.filesToUpload, this.token, 'image')
              .then((result: any) => {
                this.modelAlcalde.image = result.alcalde.image;
                this.listarAlcalde();
                this.limpiarVariables();
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
    this._alcaldeService.deleteAlcalde(this.modelAlcalde._id, this.token).subscribe(
      response => {
        if (response.alcalde) {
          console.log(response.alcalde);
          this.listarAlcalde();
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

  public agregarPromesa() {
    this.modelPromesa.candidato = this.alcaldes[0]._id;
    this._promesaService.addPromesa(this.modelPromesa, this.token).subscribe(
      response => {
        if (response.promesa) {
          console.log(response.promesa);
          this.listarPromesas();
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

  public editarPromesa() {
    this._promesaService.updatePromesa(this.modelPromesa, this.token).subscribe(
      response => {
        if (response.promesa) {
          console.log(response.promesa);
          this.listarPromesas();
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

  public eliminarPromesa() {
    this._promesaService.deletePromesa(this.modelPromesa, this.token).subscribe(
      response => {
        if (response.promesa) {
          console.log(response.promesa);
          this.listarPromesas();
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

  public votarSi(promesa: PromesaAlcalde) {
    this._promesaService.votarSi(promesa._id, this.token).subscribe(
      response => {
        if (response.promesa) {
          console.log(response.promesa);
          this.listarPromesas();
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null)
          this.status = 'error';
      }
    );
  }

  public votarNo(promesa: PromesaAlcalde) {
    this._promesaService.votarNo(promesa._id, this.token).subscribe(
      response => {
        if (response.promesa) {
          console.log(response.promesa);
          this.listarPromesas();
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
