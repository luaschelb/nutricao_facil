
import { Refeicoes } from '../models/Refeicoes.model'
import {DatabaseConnection} from '../database/database-connection'

const db=DatabaseConnection.getConnection()
export default class RefeicoesService {
    static deleteById(id: number) {
       db.transaction(
           tx => {
               tx.executeSql(`delete from refeicoes where id = ?;`, [id], (_, { rows }) => {
               }), (sqlError : any) => {
                   console.log(sqlError);
               }}, (txError) => {
               console.log(txError);
   
           });
   }
   
    static addData(param: Refeicoes) {
        return new Promise((resolve, reject) =>db.transaction(
            tx => {
                tx.executeSql(`insert into refeicoes (nome, calorias, created_at, tipo ) 
                values (?, ?, ?, ?)`, 
                [param.nome, param.calorias, param.created_at, param.tipo], 
                (_, { insertId, rows }) => {
                    console.log("id insert: " + insertId);
                    resolve(insertId)
                }), (sqlError : any) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

    static findAll() {
      return new Promise((resolve, reject) => db.transaction(tx => {
          tx.executeSql(`select * from refeicoes`, [], (_, { rows }) => {
              resolve(rows)
          }), (sqlError : any) => {
                console.log(sqlError);
          }}, (txError) => {
                console.log(txError);
        }))
    }   

    static findById(id: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from refeicoes where id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError : any) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }));
    }
}