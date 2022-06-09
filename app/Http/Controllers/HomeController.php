<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use App\Models\VoucherList;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function store(Request $request){
        $voucher = new Voucher();
        $voucher->customer_name = $request->customer_name;
        $voucher->invoice_number = $request->invoice_number;
        $voucher->save();


        foreach($request->voucher_list as $list){
            $item = Item::find($list->item_id);

            $voucherList = new VoucherList();
            $voucherList->voucher_id = $voucher->id;
            $voucherList->item_id = $list->item_id;
            $voucherList->quantity = $list->quantity;
            $voucherList->title = $item->name;
            $voucherList->pirce =$item->price;
            $voucherList->cost = $list->quantity * $item->price;
            $voucherList->save();
        }

        return response()->json([

        ]);


    }
}
