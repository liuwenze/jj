<?php
//datadelete.php
require_once("init.php");
@$lid=$_REQUEST["lid"];
$sql="delete from jj_shoppingcart_item where lid=$lid";
mysqli_query($conn,$sql);
