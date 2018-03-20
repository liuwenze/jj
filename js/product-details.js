$(()=>{//加载商品信息
	//url:product_details.html?lid=1
	$.ajax({
		type:"get",
		url:"data/getProductById.php",
		data:location.search.slice(1),
		dataType:"json"
	}).then(data=>{
        console.log(data)
        var {product,pics}=data;
        $(".a").html(`<img src="${product.a}">`);
        $(".b").html(`<img src="${product.b}">`);
        $(".b").html(`<img src="${product.c}">`);
        $(".d").html(`<img src="${product.d}">`);
        console.log(product.title)
		document.querySelector("#show-details>h1")
			.innerHTML=product.title;
		document.querySelector("#show-details>h3>a")
			.innerHTML=product.subtitle;
		document.querySelector(
			"#show-details>div.price"
		).innerHTML=`<div class="stu-price">
			<b>家家价：</b>
            <span>¥${product.price}</span>
            <div class="promise">
                <b>促　销：</b>
                <b class="xian">   限制 </b><b>此价格不与套装优惠同时享受</b>
             </div>
        </div>`;
        $(".yue").html(product.yue);
        $(".ping").html(product.ping);
        $(".ji").html(product.ji);
		var html="";
		for(var pic of pics){
			html+=`<li class="i1"><img src="${pic.sm}" data-md="${pic.md}" data-lg="${pic.lg}"></li>`
		}
		$("#icon_list").html(html);
		var mImg=document.getElementById("mImg"),
			lgDiv=document.getElementById("largeDiv"),
			mask=document.getElementById("mask"),
			sMask=document.getElementById("superMask"),
			MSIZE=175,MAX=350-175;
        mImg.src=pics[0].md;
        
        lgDiv.style.backgroundImage=`url(${pics[0].lg})`
        lgDiv.style.backgroundSize="200%";
        console.log(pics[0].lg)
		icon_list.onmouseover=function(e){
			if(e.target.nodeName==="IMG"){
				var {md,lg}=e.target.dataset;
				mImg.src=md;
				lgDiv.style.backgroundImage=`url(${lg})`;
			}
		}
		sMask.onmouseover=function(){
			mask.style.display="block";
			lgDiv.style.display="block";
		}
		sMask.onmouseout=function(){
			mask.style.display="none";
			lgDiv.style.display="none";
		}
		sMask.onmousemove=function(e){
			var offsetX=e.offsetX,offsetY=e.offsetY;
			var top=offsetY-MSIZE/2,
				  left=offsetX-MSIZE/2;
			if(top<0) top=0; else if(top>MAX) top=MAX;
			if(left<0) left=0; else if(left>MAX) left=MAX;
			mask.style.top=top+"px";
			mask.style.left=left+"px";
			lgDiv.style.backgroundPosition=
				`${-16/7*left}px ${-16/7*top}px`;
		}

		document.querySelector("#param>ul")
			.innerHTML=`<li>
					<a href="javascript:;">商品名称：${product.lname}</a>
				</li>
				<li>
					<a href="javascript:;">系统：${product.os}</a>
				</li>
				<li>
					<a href="javascript:;">内存容量：${product.memory}</a>
				</li>
				<li>
					<a href="javascript:;">分辨率：${product.resolution}</a>
				</li>
				<li>
					<a href="javascript:;">显卡型号：${product.video_card}</a>
				</li>
				<li>
					<a href="javascript:;">处理器：${product.cpu}</a>
				</li>
				<li>
					<a href="javascript:;">显存容量：${product.video_memory}</a>
				</li>
				<li>
					<a href="javascript:;">分类：${product.category}</a>
				</li>
				<li>
					<a href="javascript:;">硬盘容量：${product.disk}</a>
				</li>`
		document.getElementById("product-intro")
			.innerHTML=product.details;
	});

	$("#show-details>.account").on("click","button",e=>{
		var $btn=$(e.target);
		var $input=$btn.siblings("input");
		var n=parseInt($input.val());
		if($btn.is(".number-add"))
			n++;
		else if(n>1)
			n--;
		$input.val(n);
	})
});