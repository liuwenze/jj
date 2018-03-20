// 搜索完成之后加载页面
function loadPage(pageNo=1){
    var pageSize=9;
    var query={pageNo,pageSize};
    var search = location.search;
    if(search!=""){
        query.kw=decodeURI(search.split("=")[1])
    }
    $.get("data/getProductsByKw.php",query).then(result=>{
        var{pageNo,pageCount,data}=result;
        var html="";
        for(var p of data){
            html+=`<li>
            <a href="product-details.html?lid=${p.lid}">
              <img src="${p.md}" alt="">
            </a>
            <p>
              ¥<span class="price">${p.price}</span>
              <a href="product-details.html?lid=${p.lid}">${p.title}</a>
            </p>
            <div>
              <span class="reduce">-</span>
              <input type="text" value="1">
              <span class="add">+</span>
              <a href="javascript:;" data-lid="${p.lid}" class="addCart">加入购物车</a>
            </div>
          </li>`
        }
    $(".show-list").html(html);
    html=`<a href="javascript:;" class='${pageNo==1?"previous disabled":"previous"}'>上一页</a>`;
		for(var i=1;i<=pageCount;i++){
			html+=`<a href="javascript:;" class=${pageNo==i?"current":""}>${i}</a>`
		}
        html+=`<a href="javascript:;" class='${pageNo==pageCount?"next disabled":"next"}'>下一页</a> `; 
        $(".pages").html(html);   
    })
}
function loadCart(){
	$.get("data/users/islogin.php").then(data=>{
		if(data.ok==1){
			$.get("data/getCart.php")
			.then(items=>{
      var html="";
      var price =0;
			for(var p of items){
				html+=`<div class="item">
					<span title="${p.title}">${p.title}</span>
					<div>
						<span class="reduce" data-lid="${p.lid}">-</span>
						<input type="text" value="${p.count}">
						<span class="add" data-lid="${p.lid}">+</span>
					</div>
					<p>
						<span>¥${(p.price*p.count).toFixed(2)}</span>	
					</p>
        </div>`;
         price+=(p.price*p.count); 
         price=parseInt(price)    
      }
      $(".cart_content").html(html);
      $(".result").html(price+".00")
      })     
		}
	})	
}
$(()=>{
  loadPage();
  loadCart();
});
$(()=>{//分页
	var $pages=$(".pages");
	$pages.on("click","a",function(e){
    // 获取点击事件按钮的页码
    var pno = $(this).html();
   if(!$(this).hasClass("disabled")){
    var i = 1;
    // 点击上一页
    if($(this).hasClass("previous")){
      i = parseInt($(".current").html())-1;
      // 点击下一页
    }else if($(this).hasClass("next")){
      i = parseInt($(".current").html())+1;
    }else{
      // 点击页码
      i = pno;
    }
    loadPage(i)
   }
  })
});
$(()=>{//商品列表中单击按钮
	$(".show-list")//用jquery实现加减
		.on("click",".reduce,.add",e=>{
			var $tar=$(e.target);
			//查找tar的父元素下的第二个子元素input
			var $input=$tar.parent().children(":eq(1)");
			//获得input的内容，转为整数保存在n
			var n=parseInt($input.val());
			//如果tar的className为add
			if($tar.is(".add"))
				n++;//n++
			else if(n>1)//否则 如果n>1
				n--;//n--
			//将n保存回input的内容中
			$input.val(n);
    })
    .on("click",".addCart",e=>{
			var $tar=$(e.target);
			$.get("data/users/islogin.php")
				.then(data=>{
				if(data.ok==0)
					location="login.html?back="+location.href;
				else{
					var lid=$tar.data("lid"),
							count=$tar.prev().prev().val();
					$.post("data/addCart.php",{lid,count})
						.then(loadCart);
					$tar.prev().prev().val(1);
				}
			})
		});
});   
$(()=>{
  $(".cart_content").on("click",".reduce,.add",e=>{
      var $tar =$(e.target);
      var $input=$tar.parent().children(":eq(1)");
      var n=parseInt($input.val());
      if($tar.is(".add")){
          n++;
          $tar.parent().children(":eq(1)").val(n);
          var count =n;
          var lid=$tar.data("lid");
          $.post("data/Cart.php",{lid,count})
						.then(loadCart);
      }else if(n>1){
         n--;
         $tar.parent().children(":eq(1)").val(n);
         var count =n;
         var lid=$tar.data("lid");
         $.post("data/Cart.php",{lid,count})
           .then(loadCart);
      }else{
        $tar.parent().parent().hide();
        var lid=$tar.data("lid");
        console.log(lid)
        $.post("data/delete.php",{lid})
           .then(loadCart);
      }
  })   
})