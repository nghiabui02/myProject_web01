import fs from 'fs';
import productRouter from "./productRouter.js";
import customerRouter from "./customerRouter.js";
let router = {
    '/': (req, res) => {
        fs.readFile('view/index.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    },
    '/err': (req, res) => {
        fs.readFile('view/errol.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }
}
router = {...router, ...productRouter};
router = {...router, ...customerRouter};
export default router;