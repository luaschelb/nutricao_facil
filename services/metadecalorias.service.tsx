
import {DatabaseConnection} from '../database/database-connection'
import { MetaCalorias } from '../models/MetaCalorias.model';

const table = "metaCalorias"
const db=DatabaseConnection.getConnection()

export default class MetaCaloriasService {
     static addData(param: MetaCalorias) {
        return new Promise((resolve, reject) =>db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (meta, created_at) 
                values (?, ?)`, 
                [param.meta, param.created_at], 
                (_, { insertId, rows }) => {
                    console.log("id insert at metacalorias table: " + insertId);
                    resolve(insertId)
                }), (sqlError : any) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

     static deleteById(id: number) {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rows }) => {
                }), (sqlError : any) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            });
    }

/*
     static updateById(param: MetaCalorias) {
        return new Promise((resolve, reject) =>db.transaction(tx => {
                tx.executeSql(`update ${table} set peso = ? where id = ?;`, [param.peso,param.id], () => {
                }), (sqlError : any) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            }));
    }
    */
    static getByToday() {
        const today = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato 'yyyy-mm-dd'

        return new Promise((resolve, reject) =>
        db.transaction(
            tx => {
            tx.executeSql(
                `SELECT * FROM ${table} WHERE created_at = ?`,
                [today],
                (_, { rows }) => {
                resolve(rows);
                }),
                (sqlError: any) => {
                    console.log(sqlError);
                    reject(sqlError);
                }
            },
            txError => {
                console.log(txError);
                reject(txError);
            }
        )
        );
    }
    
     static findById(id: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError : any) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);

        }));
    }

      static findAll() {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError : any) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }))


    }


}