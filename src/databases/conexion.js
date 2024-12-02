import { createPool } from "mysql2/promise";


export const mysql= createPool(
    {
        host:"localhost",
        user:"root",
        password:"",
        port:3306,
        database:"mascotas"
    }
);