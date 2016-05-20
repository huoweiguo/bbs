var timer = null;
var timer2 = null;
$(function(){
    $(".h-top-head").hover(function(){
	    clearTimeout(timer);
	    $(".h-bell-one").show();
		$(".h-username > i").addClass("imgactive");
	},function(){
		timer = setTimeout(function(){
			$(".h-bell-one").hide();
			$(".h-username > i").removeClass("imgactive");
		},100);
	});
	$(".h-username > i").hover(function(){
	    clearTimeout(timer);
	    $(".h-bell-one").show();
		$(".h-username > i").addClass("imgactive");
	},function(){
		timer = setTimeout(function(){
			$(".h-bell-one").hide();
			$(".h-username > i").removeClass("imgactive");
		},100); 
	});
	$(".h-bell-one").hover(function(){
		clearTimeout(timer);
	},function(){
		$(this).hide();
		$(".h-username > i").removeClass("imgactive");
	});
	
	$(".h-bell").hover(function(){
	    clearTimeout(timer2);
	    $(".h-bell-two").show();
		$(".h-bell").addClass("h-bell-active");
	},function(){
		timer2 = setTimeout(function(){
			$(".h-bell-two").hide();
			$(".h-bell").removeClass("h-bell-active");
		},100);
	});
	$(".h-ts").hover(function(){
	    clearTimeout(timer2);
	    $(".h-bell-two").show();
		$(".h-bell").addClass("h-bell-active");
	},function(){
		timer2 = setTimeout(function(){
			$(".h-bell-two").hide();
			$(".h-bell").removeClass("h-bell-active");
		},100); 
	});
	
	$(".h-bell-two").hover(function(){
		clearTimeout(timer2);
	},function(){
		$(this).hide();
		$(".h-bell").removeClass("h-bell-active");
	});
	
	$(".top_menu_tag").each(function (i) {
		if(location.href.indexOf($(this).attr("href"))>=0){
			$(this).addClass("active");
		}else{
			$(this).removeClass("active");
		}
	});
});