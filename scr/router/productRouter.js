import fs from "fs";

let productRouter = {
    '/add-Pro': (req, res) =>{
        fs.readFile('view/product/addPro.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    },
    '/pro-List': (req, res) => {
        fs.readFile('view/product/listPro.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }
}
export default productRouter;