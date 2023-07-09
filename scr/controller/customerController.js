import fs from "fs";
import qs from "qs";
import url from "url";
import CustomerService from "../service/customerService.js";
import customerService from "../service/customerService.js";
class CustomerController {
    showAll(req, res) {
            let data = '';
            req.on('data', dataRaw => {
                data += dataRaw;
            })
            req.on('end', async () => {
                if (req.method === 'GET') {
                    showList(req, res)
                } else {
                    data = qs.parse(data);
                    await CustomerService.add(data).then(()=>{
                        showList(req,res)
                    })
                }
            })
    }
    showFormAdd(req, res){
        let data = ''
        req.on('data', dataRaw =>{
            data += dataRaw
        })
        req.on('end', ()=>{
            if(req.method === 'GET') {
                fs.readFile('view/customer/addCustomer.html', 'utf-8', (err, stringHTML) => {
                    customerService.findAll().then(product =>{
                        let str = ''
                        for(const item of product){
                            str += `<option value = "${item.id}">${item.carName}</option>`
                        }
                        stringHTML =stringHTML.replace('{car}', str)
                        res.write(stringHTML);
                        res.end();
                    })
                })
            } else {
                data = qs.parse(data)
                customerService.add(data).then(()=>{
                    res.writeHead(301,{'location':'/add_customer'})
                    res.end()
                })
            }
        })
    }
    showFormEdit(req, res){
        let data = '';
        req.on('data', dataRaw =>{
            data += dataRaw;
        })
        req.on('end',()=>{
            let urlObject = url.parse(req.url, true)
            if (req.method === 'GET') {
                fs.readFile('view/customer/editCustomer.html', 'utf-8', (err, stringHTML) => {
                    CustomerService.findCustomer(urlObject.query.idEdit).then((customer)=>{
                        stringHTML = stringHTML.replace('{id}', customer.id);
                        stringHTML = stringHTML.replace('{name}', customer.name);
                        stringHTML = stringHTML.replace('{price}', customer.name);
                        stringHTML = stringHTML.replace('{quantity}', customer.quantity);
                        stringHTML = stringHTML.replace('{image}', customer.images);
                        res.write(stringHTML);
                        res.end();
                    });
                })
            } else {
                data = qs.parse(data);
                customerService.update(data).then(()=>{
                    res.writeHead(301, {'location': '/customer'})
                })
            }
        })
    }
}
function showList(req, res){
    fs.readFile('view/admin/adminIndex.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        CustomerService.findAll().then((Customers)=>{
            console.log(Customers)
            for (const customer of Customers) {
                str += `<tbody>
        <tr>
            <th scope="row">${customer.id}</th>
            <td>${customer.name}</td>
            <td>${customer.mail}</td>
            <td>${customer.phoneNum}</td>
            <td>${customer.carName}</td>
            <td><option></option></td>
           
            <td><button>Edit</button></td>
            <td><button>Delete</button></td>
        </tr>
        </tbody>`
            }
            stringHTML = stringHTML.replace('{list}', str)
            res.write(stringHTML);
            res.end()
        })
    })
}
export default new CustomerController();


// <div className="col-lg-3 col-md-4 col-sm-6 pb-2">
//     <div className="team-item bg-white mb-4">
//         <div className="team-img position-relative overflow-hidden">
//             <div className="img-01">
//                 <img className="img-fluid w-100" src=${item.img} alt="">
//             </div>
//             <div className="team-social">
//                 <a className="btn btn-outline-primary btn-square" href="${item.twitter}"><i
//                     className="fab fa-twitter"></i></a>
//                 <a className="btn btn-outline-primary btn-square" href="${item.facebook}"><i
//                     className="fab fa-facebook-f"></i></a>
//                 <a className="btn btn-outline-primary btn-square" href="${item.instagram}"><i
//                     className="fab fa-instagram"></i></a>
//             </div>
//         </div>
//         <div className="text-center py-4">
//             <h5 className="text-truncate">${item.name}</h5>
//             <p className="m-0">${item.exp}</p>
//         </div>
//     </div>
// </div>