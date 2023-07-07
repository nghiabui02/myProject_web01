import CustomerController from "../controller/customerController.js";
let customerRouter = {
    '/customer': CustomerController.showAll,
    '/add_customer': CustomerController.showFormAdd,
    '/editCustomer': CustomerController.showFormEdit,
    '/delete-customer':CustomerController.showFormAdd,
}
export default customerRouter;