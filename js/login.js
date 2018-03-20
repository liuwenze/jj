$(()=>{
$(".l1").click(function(){
	$(".enroll").removeClass("fate");
	$(".entry").addClass("fate")
})
$(".l2,.to-login").click(function(){
	$(".enroll").addClass("fate");
	$(".entry").removeClass("fate");
})
// 发送验证码计时
$(".log-time").click(()=>{
	var $time = 60;
	if($(".log-time").html()==0||$(".log-time").html()==60){
	setInterval(()=>{
	   if($time>0){
	   $time--;
	   $(".log-time").html($time);
	   }
	},1000)
    }
})
// 条款勾选之后按钮才能按
$('.ched').click(function(){
		$('.submit1').prop('disabled',!$('.ched').prop('checked'));
});
// 键盘按下验证验证码正误
$('.txtCode').keyup(function(){
   if($('.txtCode').val()!=""){
	   $.ajax({
		   type:"get",
		   url:"data/chkCode.php",
		   data:"code="+$('.txtCode').val()
	   }).then(text=>{
		   if(text=="true"){
			   $('#msg').html("验证码正确");
			   $('#msg').addClass('ok');
			   $('#msg').removeClass('err')
		   }else{
			$('#msg').html("验证码错误");
			$('#msg').addClass('err')
		   }
	   })
   }else{
	$('#msg').html("");
   }
})
// 点击加载新的验证码
$(".imgCode").click(()=>{
	$(".imgCode").attr("src","data/getCode.php")
})
// 手机号为空失去焦点
		// 符合号码的格式
		var phoneReg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
		// 符合密码的格式
		var upwdReg = /^[a-z0-9]{6,12}$/i;		
$(".phone").blur(()=>{
	if($(".phone").val()==""){
		$(".chk-phone").html("手机号不能为空")
	}else{
        if(!phoneReg.test($(".phone").val())){
			$(".chk-phone").html("手机号格式错误")
		  }else{
			$(".chk-phone").html("")
		  }
	}
})
// 密码为空时失去焦点
$(".pass").blur(()=>{
	if($(".pass").val()==""){
		$(".chk-pass").html("密码不能为空")
	}else{

        if(!upwdReg.test($(".pass").val())){
			$(".chk-pass").html("密码格式错误")
		  }else{
			$(".chk-pass").html("")
		  }
	}
})
// 再次输入密码时失去焦点
$(".pass-too").blur(()=>{
	if($(".pass-too").val()==""){
		$(".too-pass").html("密码不能为空")
	}else{
		if($(".pass-too").val()!=$(".pass").val()){
			$(".too-pass").html("两次密码必须保持一致");
		}else{
			$(".chk-pass").html("")
		  }
	}
})
// 登录密码和用户名校验
$(".user").blur(()=>{
	if($(".user").val()==""){
		$(".chk-user").html("用户名不能为空")
	}else{
        if(!phoneReg.test($(".user").val())){
			$(".chk-user").html("用户名格式错误")
		  }else{
			$(".chk-user").html("")
		  }
	}
})
// 密码为空时失去焦点
$(".upwd").blur(()=>{
	if($(".upwd").val()==""){
		$(".chk-upwd").html("密码不能为空")
	}else{

        if(!upwdReg.test($(".upwd").val())){
			$(".chk-upwd").html("密码格式错误")
		  }else{
			$(".chk-upwd").html("")
		  }
	}
})
// 点击登录
	$("#btn").click(()=>{
		console.log(2)
		if(phoneReg.test($(".user").val())&&upwdReg.test($(".upwd").val())){		
		$.ajax({
			type:'post',
			url:"data/users/login.php",
			dataType:"json",
			data:{user:$(".user").val(),upwd:$(".upwd").val(),code:$(".txtCode").val()}
		}).then(text=>{
			console.log(text);
			if(text){
				alert("登录成功!");
				var back=location.search.slice(6);
				location=back;			
			}else{
				alert("用户名或密码或验证码不正确!")
				$(".user").val("");
				$(".upwd").val("");
			}
		})
	}else{
		console.log(4)
	}	
	});
	$(window).keyup(e=>{
		if(e.keyCode==13) $("#btn").click();
	})	
	// 点击注册
	$(".submit1").click(()=>{
		console.log(2)
        if($(".pass-too").val()==$(".pass").val()){
	  	$.ajax({
		   	type:'get',
		   	url:"data/users/register.php",
		  	dataType:"json",
			data:{phone:$(".phone").val(),pass:$(".pass").val()}
	  	}).then(text=>{
			if(text==2){
				alert("该手机号已注册请重新输入");
				$(".phone").val("");
			}else if(text==3){
				alert("注册成功");
				$(".phone").val("");
				$(".pass").val("");
				$(".pass-too").val("");
				
				$(".enroll").addClass("fate");
				$(".entry").removeClass("fate");
			}				
		    }); 
		}
    })	
})
