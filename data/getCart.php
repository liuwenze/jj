<?php
//data/getCart.php
header("Content-Type:application/json");
require_once("init.php");
session_start();
@$uid=$_SESSION["uid"];
$sql="select iid,lid,count,is_checked,(select sm from jj_laptop_pic where jj_laptop_pic.lid=jj_shoppingcart_item.lid limit 1) as sm,(select price from jj_laptop where jj_laptop.lid=jj_shoppingcart_item.lid) as price,(select title from jj_laptop where jj_laptop.lid=jj_shoppingcart_item.lid) as title,(select subtitle from jj_laptop where jj_laptop.lid=jj_shoppingcart_item.lid) as subtitle from jj_shoppingcart_item where uid=$uid";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));