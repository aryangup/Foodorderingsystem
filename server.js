const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const DATA = path.join(__dirname, "data");
const ORDERS_FILE = path.join(DATA, "orders.json");
if (!fs.existsSync(DATA)) fs.mkdirSync(DATA, { recursive: true });
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, "[]");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const menu = [
 {id:1,name:"Classic Burger",category:"Burgers",price:149,emoji:"🍔",description:"Juicy patty, fresh lettuce and house sauce"},
 {id:2,name:"Margherita Pizza",category:"Pizza",price:249,emoji:"🍕",description:"Mozzarella, basil and rich tomato sauce"},
 {id:3,name:"Paneer Tikka Wrap",category:"Wraps",price:179,emoji:"🌯",description:"Smoky paneer, crunchy veggies and mint mayo"},
 {id:4,name:"Crispy Fries",category:"Sides",price:89,emoji:"🍟",description:"Golden, crispy and perfectly seasoned"},
 {id:5,name:"Veggie Supreme Pizza",category:"Pizza",price:299,emoji:"🍕",description:"Loaded with peppers, olives and mushrooms"},
 {id:6,name:"Masala Dosa",category:"Indian",price:129,emoji:"🥞",description:"Crispy dosa with potato masala and chutneys"},
 {id:7,name:"Choco Brownie",category:"Desserts",price:99,emoji:"🍫",description:"Warm chocolate brownie"},
 {id:8,name:"Cold Coffee",category:"Drinks",price:109,emoji:"🥤",description:"Creamy chilled coffee"}
];
app.get("/api/menu", (req,res) => res.json(menu));
app.get("/api/orders", (req,res) => {
 const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, "utf8"));
 res.json(orders.map(o => ({...o, customer: undefined, phone: undefined, address: undefined})));
});
app.post("/api/orders", (req,res) => {
 const { customer, phone, address, items } = req.body || {};
 if (!customer || !phone || !address || !Array.isArray(items) || !items.length)
   return res.status(400).json({error:"Please provide name, phone, address and at least one item."});
 const orderItems = items.map(i => {
   const product = menu.find(m => m.id === Number(i.id));
   const qty = Math.max(1, Math.min(99, Number(i.qty) || 1));
   return product ? {id:product.id,name:product.name,price:product.price,qty} : null;
 }).filter(Boolean);
 if (!orderItems.length) return res.status(400).json({error:"No valid menu items found."});
 const total = orderItems.reduce((sum,i)=>sum+i.price*i.qty,0);
 const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, "utf8"));
 const order = {id:"FD"+Date.now().toString().slice(-8),customer,phone,address,items:orderItems,total,status:"Received",createdAt:new Date().toISOString()};
 orders.unshift(order);
 fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders,null,2));
 res.status(201).json({message:"Order placed successfully!",orderId:order.id,total});
});
app.get("*", (req,res) => res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT, () => console.log(`Food Ordering System running at http://localhost:${PORT}`));