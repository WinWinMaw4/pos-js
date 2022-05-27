<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>

<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <h1 class="text-center">MMS Web POS</h1>
            <div class="row mb-3">
                <div class="col">
                    <input type="text" placeholder="Customer Number"  class="form-control">
                </div>
                <div class="col">
                    <input type="text" placeholder="Invoice Number" class="form-control">
                </div>
                <div class="col">
                    <input type="text" placeholder="Date" class="form-control">
                </div>
            </div>
        </div>
        <div class="col-8">
           <div class="border rounded p-2">
               <div class="row g-2" id="products">

               </div>
           </div>
        </div>
        <div class="col-4">
            <div class="border rounded p-2">
                <h4 class="d-flex justify-content-between align-items-center mb-2">
                    <span class="text-primary">Your Voucher</span>
                    <span class="badge bg-primary rounded-pill">3</span>
                </h4>
                <ul class="list-group" id="voucherList">

                </ul>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="productDetail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="productDetailLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="productDetailLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="text-center">
                    <p id="productModalTitle"></p>
                    <img src="" height="150" id="productModalImg" alt="">
                    <p class="text-black-50" >
                        $ <span id="productModalPrice"></span>
                    </p>

                    <div class="input-group mb-3 w-50 mx-auto">
                        <button class="btn btn-outline-secondary" type="button"  id="quantityMinus">
                            <i class="fa-solid fa-minus fa-fw"></i>
                        </button>
                        <input type="number" class="form-control text-end" price="" min="1" value="1" id="productModalQuantity" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                        <button class="btn btn-outline-secondary" type="button" id="quantityPlus">
                            <i class="fa-solid fa-plus fa-fw"></i>
                        </button>
                    </div>

                </form>
            </div>
            <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-primary" id="addToVoucher">Add To Voucher</button>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/app.js') }}"></script>
<script>


</script>
</body>
</html>
