<?php
// 注册
header("Content-Type:application/json");
require_once("../init.php");
@$uname=$_REQUEST["phone"];
@$upwd=$_REQUEST["pass"];
if($uname&&$upwd){
   $sql ="select uid from jj_user where uname='$uname' and upwd='$upwd'";
   $result = mysqli_query($conn,$sql);
   $row = mysqli_fetch_row($result);
   if($row){
       echo "2";
   }else{
       $sql = "INSERT INTO jj_user (uname,upwd) VALUES ( '$uname', '$upwd')";
       $result = mysqli_query($conn,$sql);
       if($result){
           echo "3";
       }
   }
}else{
    echo "false";
}