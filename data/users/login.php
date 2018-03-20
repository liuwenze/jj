<?php
//data/users/login.php
// 验证码


require_once("../init.php");
@$uname=$_REQUEST["user"];
@$upwd=$_REQUEST["upwd"];
@$code=$_REQUEST["code"];
session_start();
if($uname&&$upwd&&(strtolower($code)==strtolower($_SESSION["code"]))){
	$sql="select uid from jj_user where uname='$uname' and upwd='$upwd'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	if($row){
		$_SESSION["uid"]=$row[0];
		echo "true";
	}else{
		echo "false";
	}
}else{
	echo "false";
}
