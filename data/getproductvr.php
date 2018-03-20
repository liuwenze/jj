<?php
header("Countent-Type:application/json");
require_once("init.php");
$sql="select lid,title,subtitle,price,pic from jj_laptop limit 30,6";
$result = mysqli_query($conn,$sql);
$data = mysqli_fetch_all($result,1);
echo json_encode($data);