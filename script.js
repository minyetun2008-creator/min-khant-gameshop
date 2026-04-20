const botToken = "8731709370:AAHMkDzcrDyQhfzXH5xqW1Czwqoe_RcN-L4";
const chatId = "8547288158";

let selectedItem = "";

const data = {
"MLBB PASS":[
["Weekly Pass","6500 Ks"],
["Weekly Elite","3750 Ks"],
["Monthly Epic","17500 Ks"],
["Twilight Pass","35500 Ks"],
["Starlight","10500 Ks"]
],

"DOUBLE DIA":[
["50+50","3500 Ks"],
["150+150","10500 Ks"],
["250+250","16800 Ks"],
["500+500","33800 Ks"]
],

"SMALL":[
["11","950 Ks"],
["22","1950 Ks"],
["33","2800 Ks"],
["44","3800 Ks"],
["86","5500 Ks"]
],

"MEDIUM":[
["172","10800 Ks"],
["257","15800 Ks"],
["343","21500 Ks"],
["429","26700 Ks"],
["515","32500 Ks"],
["600","37000 Ks"],
["706","43000 Ks"]
],

"LARGE":[
["878","53850 Ks"],
["963","58800 Ks"],
["1049","64500 Ks"],
["1135","69500 Ks"],
["1412","86000 Ks"]
],

"EPIC":[
["2195","131000 Ks"],
["2901","184000 Ks"],
["3688","217900 Ks"],
["5532","325000 Ks"],
["9288","530600 Ks"]
],

"PUBG UC":[
["60","4500 Ks"],
["120","9000 Ks"],
["180","15000 Ks"],
["325","21500 Ks"],
["385","25800 Ks"],
["445","30700 Ks"],
["660","43000 Ks"],
["985","64000 Ks"],
["1320","85000 Ks"],
["1800","107000 Ks"],
["2125","128000 Ks"],
["2785","170000 Ks"],
["3850","205000 Ks"],
["8100","395000 Ks"],
["16200","787000 Ks"]
]
};

const shop = document.getElementById("shop");
for(let cat in data){
let div = document.createElement("div");
div.className="category "+cat.replaceAll(" ","_");

div.innerHTML=`<h2>${cat}</h2>`;

data[cat].forEach(item=>{
let card = document.createElement("div");
card.className="card";
card.innerHTML=`
<span>${item[0]} ➤ ${item[1]}</span>
<button onclick="buy('${cat}','${item[0]}','${item[1]}')">ဝယ်မည်</button>
`;
div.appendChild(card);
});

shop.appendChild(div);
}

function buy(cat,name,price){
selectedItem = cat+" - "+name+" ("+price+")";
document.getElementById("orderForm").style.display="block";

if(cat === "PUBG UC"){
document.getElementById("serverId").style.display="none";
}else{
document.getElementById("serverId").style.display="block";
}
}

function cancelOrder(){
document.getElementById("orderForm").style.display="none";
}
function confirmOrder(){
let gameId = document.getElementById("gameId").value;
let serverId = document.getElementById("serverId").value;
let phone = document.getElementById("phone").value;
let trx = document.getElementById("trx").value;

let text = `
🧾 NEW ORDER 🧾
📦Item: ${selectedItem}
🎮Game ID: ${gameId}
🪩Server ID: ${serverId}
📱Phone: ${phone}
💳Transaction ID: ${trx}
`;

fetch(`https://api.telegram.org/bot${botToken}/sendMessage`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
chat_id:chatId,
text:text
})
});

// show animation
const box = document.getElementById("successBox");
const loader = document.querySelector(".loader");
const check = document.querySelector(".check");

document.getElementById("orderForm").style.display="none";
box.classList.add("show");

// loading → success
setTimeout(()=>{
loader.style.display="none";
check.style.display="block";
},1500);

// auto hide
setTimeout(()=>{
box.classList.remove("show");
loader.style.display="block";
check.style.display="none";
},3000);
}
function filterItems(type,btn){

document.querySelectorAll(".filter-bar button").forEach(b=>{
b.classList.remove("active");
});
btn.classList.add("active");

document.querySelectorAll(".category").forEach(cat=>{

if(type==="ALL"){
cat.style.display="block";
}
else if(type==="MLBB"){
cat.style.display = cat.className.includes("MLBB") ? "block":"none";
}
else if(type==="PUBG"){
cat.style.display = cat.className.includes("PUBG") ? "block":"none";
}
else{
cat.style.display = cat.className.includes(type) ? "block":"none";
}

});
}