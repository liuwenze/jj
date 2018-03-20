<?php
//data/cart/check.php
require_once("cart.php");
@$iid=$_REQUEST["iid"];
@$checked=$_REQUEST["checked"];
if($iid!=null&&$checked!=null)
	check($iid,$checked);