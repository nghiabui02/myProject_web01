import connection from "../connection.js";

class CustomerService {
    constructor() {
        connection.connecting();
    }
    findAll() {
        return new Promise((resolve, reject)=>{
            let sql = `SELECT customer.id, customer.name, mail,phoneNum, product.carName FROM myProject.customer
                                join product on idProduct = product.id;`
            connection.getConnection().query(sql, (err, customers)=>{
                if (err){
                    reject(err)
                } else {
                    console.log(customers)
                    resolve(customers)
                }
            })
        })
    }
    add(customer) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO customer VALUES (id, name, mail, phoneNum, carName) ('${customer.id}','${customer.name}', '${customer.mail}', '${customer.phoneNum}', '${customer.carName}');`
            connection.getConnection().query(sql, (err, customers) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(customers)
                    resolve(customers)
                }
            })
        })
    }
    findCustomer(id){
        return new Promise((resolve, reject)=>{
            connection.getConnection().query(`select * from customer where id = ${id}`,(err, customers) =>{
                if (err) {
                    reject(err)
                    } else {
                        resolve(customers[0])
                    }
                })
        })
    }
    update(customer) {
        return new Promise((resolve, reject)=>{
            connection.getConnection().query(
                `update customer 
                        set name = '${customer.name}', 
                        mail = ${customer.mail}, 
                        phoneNum = ${customer.phoneNum},
                where id = ${customer.id}`, (err, data) =>{
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                }
            )
        })
    }
}
export default new CustomerService();