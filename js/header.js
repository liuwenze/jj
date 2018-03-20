$(()=>{
$(".header").load(
	"header.html",
    ()=>{
		// 搜索帮助
		$(".search-img").click(()=>{
			console.log($(".text").val());
			if($.trim($(".text").val())!=""){
				location = "product.html?kw="+$.trim($(".text").val());
			}else{
				location = "product.html";
			}
		});
			// 13键盘搜索
			$(document.body).on("keyup",".text",e=>{
				if(e.keyCode==13){
					$(".text").next().children().click();//模拟触发!
				}
			});			
        //登录状态
			function isLogin(){
				$.get("data/users/islogin.php")
					.then(data=>{
					if(data.ok==0){
						$("[data-toggle=loginList]").show()
							.next().hide();
					}else{
						$("[data-toggle=loginList]").hide()
							.next().show()
								.find("[data-name=uname]")
									.html(data.uname);
					}
				})
			}
			isLogin();
			$(document.body).on(//为登录按钮绑定事件
				"click",
				"[data-toggle=loginList]>li:last-child>a",
				e=>{
					var $tar=$(e.target);
                    location="login.html?back="+location.href;
				}
			);
			$(document.body).on(
				"click",
				"[data-toggle=welcomeList]>li:nth-child(2)>a",
				e=>{
					$.get("data/users/logout.php").then(()=>{
						location.reload(true);
					})
				}
			);
			$(window).scroll(()=>{
				var scrollTop=$(window).scrollTop();
				//如果scrollTop>=380,就为id为header-top的div添加class fixed_nav
				if(scrollTop>=380){
					$(".header-down").addClass("fixed_nav");
				//否则，就移除id为header-top的div的fixed_nav class
				}else{
					$(".header-down").removeClass("fixed_nav");
				}
			});	
    }
)
});