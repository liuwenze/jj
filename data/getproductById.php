<?php
//data/products/getProductById.php
header("Content-Type:application/json");
require_once("init.php");
$output=[
	//"product"=>{...},
	//"specs"=>[...],
	//"pics"=>[...]
];
@$lid=$_REQUEST["lid"];
if($lid!=null){
	$sql="SELECT * FROM `jj_laptop` where lid=$lid";
	$result=mysqli_query($conn,$sql);
	$product=mysqli_fetch_all($result,1)[0];
	$output["product"]=$product;

	$sql="SELECT * FROM `jj_laptop_pic` where lid=$lid";
	$result=mysqli_query($conn,$sql);
	$output["pics"]=mysqli_fetch_all($result,1);

	echo json_encode($output);
}