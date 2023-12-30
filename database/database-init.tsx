import { DatabaseConnection } from './database-connection'

var db : any= null
export default class DatabaseInit {

    constructor() {
        db = DatabaseConnection.getConnection()
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
        console.log('Foreign keys turned on')
    );
        this.InitDb()
    }
    private InitDb() {
        var sql = [
            `DROP TABLE IF EXISTS peso;`,
            `DROP TABLE IF EXISTS metaCalorias;`,
            `DROP TABLE IF EXISTS refeicoes;`,
     
            `create table if not exists peso (
                id integer primary key autoincrement,
                peso string,
                data string
            );`,
            `create table if not exists metaCalorias (
                id integer primary key autoincrement,
                meta int,
                created_at string
            );`,
            `create table if not exists refeicoes (
                id integer primary key autoincrement,
                nome string,
                calorias int,
                tipo int,
                created_at string
            );`,
            `INSERT INTO peso (peso, data) VALUES
            ('71', '01/23'),
            ('73', '02/23'),
            ('72', '03/23'), 
            ('72', '04/23');`,
            `INSERT INTO metaCalorias (meta, created_at) VALUES
            (2000, '04/23');`,
            `INSERT INTO refeicoes (nome, calorias, tipo, created_at) VALUES 
            ('Pão de forma', 200, 1, '2023-12-12'),
            ('Frango', 100, 1, '2023-12-12'),
            ('Arroz e feijão', 300, 2, '2023-12-12'),
            ('Bolo de chocolate', 250, 3, '2023-12-12'),
            ('Salmão grelhado', 400, 4, '2023-12-12');
            `
        ];

        db.transaction(
            (tx : any) => {
                for (var i = 0; i < sql.length; i++) {
                    console.log("execute sql : " + sql[i]);
                    tx.executeSql(sql[i]);
                }
            }, (error :any) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete call back ");
            }
        );
    }

}