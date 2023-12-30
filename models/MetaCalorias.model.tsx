export class MetaCalorias {
    public id: any;
    public meta: any;
    public created_at : any;

    constructor(id?: number, meta?: number, created_at?: string) {

        this.id = id;
        this.meta = meta;
        this.created_at = created_at;
    }
}