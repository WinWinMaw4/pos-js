require('./bootstrap');


let products = document.getElementById('products');
let productDetailModal = document.getElementById("productDetail");
let modal = new bootstrap.Modal(productDetailModal);
let productLists;

let productModalTitle = document.getElementById("productModalTitle");
let productModalImg = document.getElementById("productModalImg");
let productModalPrice = document.getElementById("productModalPrice");
let productModalQuantity = document.getElementById("productModalQuantity");
let quantityPlus = document.getElementById("quantityPlus");
let quantityMinus = document.getElementById("quantityMinus");

let addToVoucher = document.getElementById("addToVoucher");
let voucherList = document.getElementById("voucherList");


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

function voucherListCreate(title,price,quantity,cost){
    let li = document.createElement("li");
    li.classList.add("list-group-item","d-flex","justify-content-between");
    li.innerHTML = `
        <div class="w-75">
            <h6 class="my-0 text-truncate">${title}</h6>
            <small class="text-muted">
                Price : ${price} x ${quantity}
            </small>
        </div>
        <div class="text-muted w-25 voncher-cost text-end">${cost}</div>
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
    voucherList.append(voucherListCreate(
        productModalTitle.innerText,
        productModalQuantity.getAttribute("price"),
        productModalQuantity.valueAsNumber,
        productModalPrice.innerText
    ));
    modal.hide();
    productModalQuantity.valueAsNumber = 1
})





