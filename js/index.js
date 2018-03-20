$(()=>{
var i=1;//记录当前第几张图片
$.get("data/getproductwu.php").then(result=>{
	result = JSON.parse(result);
	var html="";
	for(var p of result){
		html+=`<li>
		<a href="product-details.html?lid=${p.lid}">
		  <img src="${p.pic}">
		</a>
		<a href=product-details.html?lid=${p.lid}">${p.title}</a>
		<p>${p.subtitle}</p>
		<p>${p.price}</p>
	 </li>`
	}
	$('.wu6').html(html)
})
// vr加载
$.get("data/getproductvr.php").then(result=>{
	result = JSON.parse(result);
	var html="";
	for(var p of result){
		html+=`<li>
		<a href="product-details.html?lid=${p.lid}">
		  <img src="${p.pic}">
		</a>
		<a href="product-details.html?lid=${p.lid}">${p.title}</a>
		<p>${p.subtitle}</p>
		<p>${p.price}</p>
	 </li>`
	}
	$('.vr6').html(html)
})
// 平衡车加载
$.get("data/getproductping.php").then(result=>{
	result = JSON.parse(result);
	var html="";
	for(var p of result){
		html+=`<li>
		<a href="product-details.html?lid=${p.lid}">
		  <img src="${p.pic}">
		</a>
		<a href="product-details.html?lid=${p.lid}">${p.title}</a>
		<p>${p.subtitle}</p>
		<p>${p.price}</p>
	 </li>`
	}
	$('.ping6').html(html)
})
// 智能手表加载
$.get("data/getproductzhi.php").then(result=>{
	result = JSON.parse(result);
	var html="";
	for(var p of result){
		html+=`<li>
		<a href="product-details.html?lid=${p.lid}">
		  <img src="${p.pic}">
		</a>
		<a href="product-details.html?lid=${p.lid}">${p.title}</a>
		<p>${p.subtitle}</p>
		<p>${p.price}</p>
	 </li>`
	}
	$('.zhi6').html(html)
})
function task(){
	i++;//换下一张
	if(i==5) i=1;//超范围，就改回1
	//查找所有div
	var divs=document.querySelectorAll(".box>div");
	var j=0,count=12,interval=50,dura=500;
	var timer=setInterval(()=>{
		var div=divs[j];//获得当前div
		div.style.backgroundImage=`url(img/${i}.jpg)`;
		div.className="shake";
		j++;//跳到下一个div的位置
		if(j==count) clearInterval(timer);//自动结束
	},50)//每隔50毫秒，才设置下一个div的震动
	setTimeout(()=>{//等最后一个div震完，才移除class
		for(var div of divs) div.className="";
		document.querySelector(".box>img").src="img/"+i+".jpg"
	},interval*count+dura)
}
setInterval(task,2000+1100);
})
//楼层滚动
$(()=>{
	$(window).scroll(()=>{
		var scrollTop=$(window).scrollTop();
		var offsetTop=$(".uav:first").offset().top;
		if(offsetTop<=scrollTop+innerHeight/2){
			$("#lift").show();
		}else{
			$("#lift").hide();
		}
		var $floors=$(".uav");
		for(var i=0;i<$floors.length;i++){
			var $f=$($floors[i]);
			if($f.offset().top>scrollTop+innerHeight/2){
				break;
			}
		}
		console.log(i);
		$(`#lift>ul>li:eq(${i-1})`)
			.addClass("lift_item_on")
			.siblings().removeClass("lift_item_on")
	})
	$("#lift>ul").on("click","a.lift_btn",function(){
		var $a=$(this);
		var i=$a.parent().index();
		var offsetTop=$(`.uav:eq(${i})`).offset().top;
		$("html").stop(true).animate({
			scrollTop:offsetTop
		},500)
	})
})