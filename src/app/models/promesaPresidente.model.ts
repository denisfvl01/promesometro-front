export class PromesaPresidente {
  constructor(
    public _id: string,
    public descripcion: string,
    public candidato: string,
    public votantes: [],
    public votoSi: number,
    public votoNo: number
  ) { }

}
