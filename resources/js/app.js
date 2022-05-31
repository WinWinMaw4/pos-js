require('./bootstrap');


let products = document.getElementById('products');
let productDetailModal = document.getElementById("productDetail");
let modal = new bootstrap.Modal(productDetailModal);
let productLists;

let productModalTitle = document.getElementById("productModalTitle");
let productModalImg = document.getElementById("productModalImg");
let productModalPrice = document.getElementById("productModalPrice");
let productModalQuantity = document.getElementById("productModalQuantity");
let modalForm = document.getElementById("modalForm");
let quantityPlus = document.getElementById("quantityPlus");
let quantityMinus = document.getElementById("quantityMinus");

let addToVoucher = document.getElementById("addToVoucher");
let voucherList = document.getElementById("voucherList");
let storeVoucher = [];

let checkout = document.getElementById("checkout");

function voucherListCount(){
    let voucherListCount = document.getElementById("voucherListCount");
    voucherListCount.innerText = storeVoucher.length
}

function voucherTotal(){
    let voucherTotal = document.getElementById("voucherTotal");
    voucherTotal.innerText = storeVoucher.reduce((x,y)=>x+Number(y.cost),0).toFixed(2)
}


function productCardCreate(product){
    let div = document.createElement("div");
    div.classList.add("col-3");
    div.innerHTML = `
    <div class="card product-card" data-id="${product.id}">
        <div class="card-body">
            <img class="product-img" src="${product.image}" alt="">
            <p class="small text-truncate mb-0">${product.title}</p>
            <p class="small text-black-50 mb-0">$ ${product.price}</p>
        </div>
    </div>
    `
    return div;
}

function voucherListCreate(title,price,quantity,cost,productId){
    let li = document.createElement("li");
    li.classList.add("list-group-item","d-flex","justify-content-between");
    // li.setAttribute("data-index",index)
    li.innerHTML = `
        <div class="w-75">
            <h6 class="my-0 text-truncate">${title}</h6>
            <small class="text-muted">
                Price : ${price} x ${quantity}
            </small>
        </div>
        <div class="text-muted w-25 text-end">
            <p class="voncher-cost mb-0">${cost}</p>
            <i class="fa-solid fa-trash-alt text-danger vocuher-list-del" data-product-id="${productId}"></i>
        </div>
    `;

    return li;
}

function calcCost(){
    currentPrice = Number(productModalQuantity.getAttribute("price"));
    productModalPrice.innerText = productModalQuantity.valueAsNumber * currentPrice
}

axios.get("https://fakestoreapi.com/products")
.then(function (res){
    console.log(res.data)
    productLists = res.data
    productLists.forEach(productList=> products.append(productCardCreate(productList)))
    let allProductCard = document.querySelectorAll(".product-card");
    console.log(allProductCard);
    allProductCard.forEach(function (el){
        el.addEventListener("click",function (){
            let currentId = el.getAttribute("data-id");
            let currentDetail = productLists.find(productList => productList.id == currentId);

            productModalTitle.innerText = currentDetail.title
            productModalImg.src = currentDetail.image
            productModalPrice.innerText = currentDetail.price
            productModalQuantity.setAttribute("price",currentDetail.price)
            modalForm.setAttribute("data-id",currentDetail.id)


            modal.show()
        });
    })

})


quantityPlus.addEventListener('click',function (){
    productModalQuantity.valueAsNumber += 1
    calcCost()
})

quantityMinus.addEventListener('click',function (){
   if(productModalQuantity.valueAsNumber > 1){
       productModalQuantity.valueAsNumber -= 1
       calcCost()
   }
})

addToVoucher.addEventListener("click",function (){

    if( x = storeVoucher.find(el => el.item_id == modalForm.getAttribute("data-id") )) {
        // console.log("shi tal")
        let index = storeVoucher.findIndex(el => el.item_id == modalForm.getAttribute("data-id") )
        x.quantity += productModalQuantity.valueAsNumber;
        x.cost = x.quantity * x.price;
        storeVoucher[index] = x;
        voucherList.innerHTML = null;
        storeVoucher.forEach(el=>{
            voucherList.append(voucherListCreate(
                el.title,
                el.price,
                el.quantity,
                el.cost,
                el.item_id
            ));
        })
    }else{
        // return console.log("ma shi buu");
        let v = {
            item_id:modalForm.getAttribute("data-id"),
            title:productModalTitle.innerText,
            price : productModalQuantity.getAttribute("price"),
            quantity : productModalQuantity.valueAsNumber,
            cost:productModalPrice.innerText ,
        }
        storeVoucher.push(v);

        voucherList.append(voucherListCreate(
            productModalTitle.innerText,
            productModalQuantity.getAttribute("price"),
            productModalQuantity.valueAsNumber,
            productModalPrice.innerText,
            modalForm.getAttribute("data-id")
        ));
    }

    localStorage.setItem('storeVoucher',JSON.stringify(storeVoucher))

    voucherListCount()
    voucherTotal()
    modal.hide();
    productModalQuantity.valueAsNumber = 1
})

window.addEventListener('load',function (){
    let data = localStorage.getItem("storeVoucher") ? JSON.parse(localStorage.getItem("storeVoucher")) : []
    console.log(data)
    storeVoucher = data
    data.forEach(el=>{
        voucherList.append(voucherListCreate(
            el.title,
            el.price,
            el.quantity,
            el.cost,
            el.item_id
        ));
    })
    voucherListCount()
    voucherTotal()
})

voucherList.addEventListener('click',function (e){
    // console.dir(e.target)
    if(e.target.classList.contains("vocuher-list-del")){
        let productId = e.target.getAttribute("data-product-id");
        console.log(productId)
        storeVoucher = storeVoucher.filter(el => el.item_id != productId)
        localStorage.setItem('storeVoucher',JSON.stringify(storeVoucher))

        e.target.parentElement.parentElement.remove()
        voucherListCount()
        voucherTotal()
    }
})

checkout.addEventListener('click',function (){
    let data = {
        customer_name : document.getElementById("cName").value,
        invoice_number : document.getElementById("cIN").value,
        voucher_list : storeVoucher
    }

    console.log(data)



    axios.post("api/store-voucher",data)
        .then(function (response) {
            if(response.status === "success"){
                storeVoucher = [];
                localStorage.setItem('storeVoucher',JSON.stringify(storeVoucher))
                voucherList.innerHTML = null
                voucherListCount()
                voucherTotal()
            }
        })

})




