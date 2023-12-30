export class Refeicoes {
    public id: any;
    public nome: any;
    public calorias : any;
    public tipo : any;
    public created_at : any;

    constructor(id?: number, nome?: string, calorias?: string, created_at?: string, tipo ?: number) {

        this.id = id;
        this.nome = nome;
        this.calorias = calorias;
        this.created_at = created_at;
        this.tipo = tipo;
    }
}