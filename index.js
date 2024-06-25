let express = require("express");  //add product

let app = express();
require('dotenv').config()
app.use(express.json())
let product = []

app.get('/getHello', (req, res) => {
    res.send("HELLO");
});
app.get('/getperams/:name', (req, res) => {
    let name = req.params.name
    res.send("getperams" + name)

})
app.get('/getquery', (req, res) => {
    let name = req.query.name
    res.send("hello" + name)

})
app.post('/createproduct', (req, res) => {
    try {
        console.log(req.body)
        let obj = req.body
        obj.isdeleted = false
        obj.id = product.length + 1
        product.push(obj)
        console.log("product", product)
        res.status(210).send({
            msg: "product added successfully"
        })
    }
    catch (err) {
        res.status(500).send({
            msg: "internal server problem"
        })
    }

})
app.get('/getproduct', (req, res) => {
    try {
        let x = product.filter((val) => {
            if (val.isdeleted == false) {
                return true
            }

        })
        console.log("x", x)
        res.status(200).send({ issuccessful: true, data: x })
    }
    catch (err) {
        res.status(500).send({
            msg: "internal server problem"
        })
    }



})
app.put('/updateproduct', (req, res) => {
    try {
        console.log(req.query)
        let id = req.query.id
        let obj = req.body
        let searchproduct = product.find((val) => {
            return val.id == id
        })
        if (searchproduct && searchproduct.isdeleted == true) {
            res.status(404).send({ issuccessful: false, msg: "product not found" })
        } else {
            searchproduct.productname = obj.productname ? obj.productname : searchproduct.productname,
                searchproduct.productcost = obj.productcost ? obj.productcost : searchproduct.productcost,
                searchproduct.description = obj.description ? obj.description : searchproduct.description
            product.push(searchproduct)
            console.log("product", +product)
            res.status(200).send({
                msg: "product update successfully"
            })
        }
    }
    catch (err) {
        res.status(500).send({
            msg: "internal server problem"
        })
    }
})


app.delete('/deleteproduct', (req, res) => {
    try {
        let id = req.query.id
        let idx = product.findIndex((val) => {
            if( val.id == id){
                return true
            } 
        })
        product.splice(idx, 1)

        res.status(200).send({
            msg: "product deleted successfully"
        })
    }
    catch (err) {
        res.status(500).send({
            msg: "internal server problem"
        })
    }
})
app.put("/softDeelete", (req, res) => {
    try {
        let id = req.query.id;
        let idx = product.findIndex((fld) => {
            if (fld.id == id) {
                return true
            }
        })
        product[idx].isdeleted = true;
        res.status(404).send({ issuccessful: true, id: idx })
    }
    catch (err) {
        res.status(500).send({
            msg: "internal server problem"
        })
    }
})
app.get('/sortascdes',(req,res)=>{
    try{
        let sor=req.body.sort
        product.sort((a,b)=>{
            if(sor=="asc"){
                return a.cost-b.cost
            }else if(sor=="des"){
                return b.cost-a.cost
            }else{
                res.status(404).send({
                    msg:"product is not there"
                })
            }
        })
    }catch(err){
        res.status(500).send({msg: "internal server problem"})
    }
})


app.listen(process.env.PORT, (err) => {
    if (!err) {
        console.log("servar running on "+process.env.PORT)
    }
});


