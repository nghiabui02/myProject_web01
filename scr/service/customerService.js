import connection from "../connection.js";

class CustomerService {
    constructor() {
        connection.connecting();
    }
    findAll() {
        return new Promise((resolve, reject)=>{
            connection.getConnection().query('select * from customer', (err, customers)=>{
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
        return new Promise((resolve, reject)=>{
            connection.getConnection().query(`INSERT INTO customer values (${customer.id}, '${customer.name}',${customer.age},${customer.phoneNum});`, (err, data)=>{
                if (err){
                    reject(err)
                } else {
                    console.log('Tao moi thanh cong')
                    resolve(data)
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
                        phoneNum = ${customer.phoneNum}, '
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