<?php
//data/cart/addCart.php
require_once("init.php");
session_start();
@$uid=$_SESSION["uid"];
@$lid=$_REQUEST["lid"];
@$count=$_REQUEST["count"];
$sql="select * from jj_shoppingcart_item where uid=$uid and lid=$lid";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row==null)
	$sql="insert into jj_shoppingcart_item (uid, lid, count, is_checked) values ($uid,$lid,$count,0)";
else
	$sql="update jj_shoppingcart_item set count=count+$count where uid=$uid and lid=$lid";
mysqli_query($conn,$sql);