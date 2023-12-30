
import { Peso } from "../models/Peso.model"
import {DatabaseConnection} from '../database/database-connection'

const table = "peso"
const db=DatabaseConnection.getConnection()

export default class PesoService {
     static addData(param: Peso) {
        return new Promise((resolve, reject) =>db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (peso, data) 
                values (?, ?)`, 
                [param.peso, param.data], 
                (_, { insertId, rows }) => {
                    console.log("id insert in peso table: " + insertId);
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


     static updateById(param: Peso) {
        return new Promise((resolve, reject) =>db.transaction(tx => {
                tx.executeSql(`update ${table} set peso = ? where id = ?;`, [param.peso,param.id], () => {
                }), (sqlError : any) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            }));
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