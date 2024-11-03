const path = require('path')
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))


let barang = [
    {
        item : 'baju',
        price : 85,
        deskripsi :'baju adalah pakaian yang digunakan untuk menutupi bagian badan, baju sendiri sudah menjadi kebutuhan umum untuk seseorng dalam beraktivitas'
    },
    {
        item : 'gelang',
        price : 32,
        deskripsi: ' gelanang digunakan sebagai aksesorin pelengkap dalam berpakaian, gelang mengisi bagian pergelangan tangan supaya lebih indah'
    },{
        item : 'topi',
        price : 150,
        deskripsi:'topi merupakan salah satu pakaian yang dikenakan di bagian kepala, topi digunakan untuk melindungin kepala dari sinar matahari secara langsung'
    },{
        item : 'jaket',
        price : 200,
        deskripsi: 'jaket digunakan untuk menjaga tubuh dari suhu dingin, dan melindungi tubuh dari sinar mahari'
    },{
        item : 'celana',
        price : 100,
        deskripsi: 'menutupi alat kelamin'
    },
]

app.get('/order',(req,res)=>{
    res.render('order',{barang})
})

app.get('/order/create',(req,res) => {
    res.render('create')
})

app.post('/order/create',(req,res)=>{
    const {item,price,deskripsi} = req.body
    barang.push({item,price,deskripsi})
    // res.send(`${item} - ${price}`)
    res.redirect('/order')
})

app.get('/order/:item',(req,res)=>{
    const {item} = req.params
    const barangDetail = barang.find((x)=>x.item === item)
    res.render('detail',{barangDetail})

})

app.post('/order/:item',(req,res)=>{
    const {item} = req.params;
    const newDescribe = req.body

    const barangParams = barang.find((x)=>x.item == item);
    
    barangParams.price = newDescribe.price ||  barangParams.price
    barangParams.deskripsi = newDescribe.deskripsi || barangParams.deskripsi 
    
    res.redirect('/order')
})

app.delete('/order/:item',(req,res)=>{
    const {item} = req.params;
    barang = barang.filter((x)=>x.item != item)
    res.redirect('/order')
})

app.get('/order/edit/:item',(req,res)=>{
    const {item} = req.params;
    const dataParams = barang.find((x)=>x.item === item)
    
    res.render('editData',{dataParams})
})

app.listen(4040,()=>{
    console.log('listening to port 4040')
})