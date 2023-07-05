import CustomerController from "../controller/customerController.js";
let customerRouter = {
    '/customer': CustomerController.showAll,
    '/add-customer': CustomerController.showFormAdd,
    '/editCustomer': CustomerController.showFormEdit,
    '/delete-customer':CustomerController.showFormAdd,
}
export default customerRouter;