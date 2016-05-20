var bbsNew = {
	config : {
		initHeight : 0,
		boxDiv : $(".commonBox"),
		comBox : {
			deleteBox : {
				selin : '',
				postArea : ''
			},
			topBox : {
				top : '',
				essence : '',
				topArea : ''
			},
			tComBox : {
				top : '',
				topArea : ''
			},
			bReBox : {
				value : ''
			},
			bAlBox: {
				value : '',
				selin : '',
				postArea : ''
			},
			bMoveBox : {
				selin_a : '',
				selin_b : '',
				postArea : ''
			}
		},

		wordTimer : null
	},

	init : function(){
		this.render();
	},

	render : function(){
		this.overTab();
		this.emit();
		this.suspension('fixPub','.publish-box','replyfix',0);
		this.suspension('nav-menu','.circle-list .bg-nav','navfix',1);
		bbsFn.silder();
	},

	overTab : function(){
		bbsFn.bbsTab('.circle-list .bg-nav','span','.bbs-circle-list','bbs-current');
		bbsFn.bbsTab('.bbs-recommend .bg-nav','span','.recommend-list','bbs-recur');
		bbsFn.bbsTab('.bbs-mrt .nav-list','em','.bbs-mrtlist','post-mrtcur');
		bbsFn.bbsTab('.bbs-hot .nav-list','em','.hot-list','bbs-wmtcur');
	},

	emit : function(){
		var _self = this;
		$(document).on("click",".theme-chk p em",function(){
			_self.chkRadio($(this));
		});

		$(document).on("click",".theme-chkbox p em",function(){
			_self.chkBox($(this));
		});

		$(document).on("click",".telescopic",function(){
			var _this = $(this);
			var $box = _this.prev();
			var pad2 = parseInt($box.css("padding"))*2;
			var init = $box[0].scrollHeight-pad2;
			var min = $box.attr("min")-pad2;
			_self.strench($(this),min,init,$box);
		});

		$(document).on("click",".bbs-select span",function(event){
			$(".head-select").show();
			event.stopPropagation();
		});

		$(document).on("click",".head-select li",function(){
			$(".bbs-select span i").html($(this).html());
			$(".head-select").hide();
		});

		$(document.body).on("click",function(){
			$(".head-select").hide();
			$(".selbox ul").hide();
		});

		$(document).on("click",".bbs-chk",function(){
			var _self = $(this);
			if(_self.hasClass("bbs-chk-act")){
				_self.removeClass("bbs-chk-act").attr("data-val",'false');
			}else{
				_self.addClass("bbs-chk-act").attr("data-val",'true');
			}
		});

		$(document).on("click",".selectBtn",function(ev){
			_self.selectBox($(this));
			ev.stopPropagation();
		});

		$(document).on("click",".selbox li",function(){
			_self.selectedLi($(this));
		});

		$(document).on("click",".close-b",function(){
			_self.closeBox();
		});

		$(document).on("click",".sure-btn",function(){
			_self.boxSubmit();
		});

		$(document).on("change focus",".mes-area",function(){
			var $iWord = $(".box-fs").find("span");
			clearInterval(_self.config.wordTimer);
			_self.divNum($(this),$iWord,500);
		});

		$(document).on("blur",".mes-area",function(){
			clearInterval(_self.config.wordTimer);
		});

		$(document).on("click",".close",function(){
			$(".mask").hide();
			$(".private").hide();
		});

		$(document).on("click",".repBtn,.delBtn,.topBtn,.altBtn,.removeBtn,.commentBtn,.addassBtn",function(){
			_self.popBoxType($(this));
		});

		$(window).on("scroll",function(){
			_self.suspension('fixPub','.publish-box','replyfix',0);
			_self.suspension('nav-menu','.circle-list .bg-nav','navfix',1);
		});

		$(document).on("click",".sub-BR",function(){
			_self.checkCom($(this));
		});
	},

	checkCom : function(obj){
		var $parent = obj.parent();
		var $check = $parent.hasClass("theme-chkbox");
		var $radio = $parent.hasClass("theme-chk");
		var $arr = [];

		if($radio){
			var $emRadio = $parent.find(".bbsR-act");
			var $raVal = $emRadio.attr("value");

			console.log($raVal);
		}

		if($check){
			var $emChk = $parent.find(".bbsR-act");
			for(var i=0; i<$emChk.size(); i++){
				$arr.push($emChk.eq(i).attr('value'));
			}
			console.log($arr);
		}
	},

	popBoxType : function(obj){
		var $report = obj.hasClass("repBtn");
		var $del = obj.hasClass("delBtn");
		var $top = obj.hasClass("topBtn");
		var $alt = obj.hasClass("altBtn");
		var $remove = obj.hasClass("removeBtn");
		var $comment = obj.hasClass("commentBtn");
		var commonBox = $(".commonBox");

		$(".mask").show();
		commonBox.show();

		if($report){
			commonBox.addClass("bReport");
		}

		if($del){
			commonBox.addClass("bPost");
		}

		if($top){
			commonBox.addClass("bTop");
		}

		if($alt){
			commonBox.addClass("bAlert");
		}

		if($remove){
			commonBox.addClass("bMove");
		}

		if($comment){
			commonBox.addClass("bTComment");
		}
	},

	divNum : function(obj,iWord,num){
		var len = 0;
		this.config.wordTimer = setInterval(function(){
			$len = obj.val().length;
			iWord.html(num-$len);
		},30);
	},

	suspension : function(obj,elem,className,num){
		var oDiv = document.getElementById(obj);
		if(oDiv){
			var clientH = document.documentElement.clientHeight;
			var scrtop = document.documentElement.scrollTop || document.body.scrollTop;
			var oDivH = oDiv.offsetTop;
			var total =  clientH + scrtop;
			var fix = $(elem);
			if(num == 0){
				total < oDivH ? fix.addClass(className) : fix.removeClass(className);
			} else if(num == 1){
				scrtop > oDivH ? fix.addClass(className) : fix.removeClass(className);
			}
			
		}
	},

	boxSubmit : function(){
		var $comDiv = this.config.boxDiv;
		var $bPost = this.isClass($comDiv,"bPost");
		var $bTop = this.isClass($comDiv,"bTop");
		var $bTComment = this.isClass($comDiv,"bTComment");
		var $bReport =  this.isClass($comDiv,"bReport");
		var $bAlert = this.isClass($comDiv,"bAlert");
		var $bMove = this.isClass($comDiv,"bMove");
		var $root = this.config.comBox;
		
		if($bPost){
			var $bPostSpan = $(".boxPost").find(".selin");
			var $bPostArea = $(".boxPost").find(".postArea");
			$root.deleteBox.selin = $bPostSpan.attr('val');
			$root.deleteBox.postArea = $bPostArea.val();

			console.log($root.deleteBox);
		}

		if($bTop){
			var $top = $(".boxTop").find(".bbs-chk").eq(0);
			var $essence = $(".boxTop").find(".bbs-chk").eq(1);
			var $topArea = $(".boxTop").find(".topArea");
			$root.topBox.top = $top.attr("data-val");
			$root.topBox.essence = $essence.attr("data-val");
			$root.topBox.topArea = $topArea.val();

			console.log($root.topBox);
		}

		if($bTComment){
			var $comtop = $(".boxTopComment").find(".bbs-chk").eq(0);
			var $topArea = $(".boxTopComment").find(".topArea");
			$root.tComBox.top = $comtop.attr("data-val");
			$root.tComBox.topArea = $topArea.val();

			console.log($root.tComBox);
		}

		if($bReport){
			var $input = $('.boxReport p input:radio[name="report"]:checked');
			var $val = $input.val();
			$root.bReBox.value = $val;

			console.log($root.bReport);
		}   

		if($bAlert){
			var $input = $('.boxAlert p input:radio[name="report"]:checked');
			var $val = $input.val();
			var $span =  $('.boxAlert').find(".selin").attr('val');
			var $area = $('.boxAlert').find(".postArea").val();
			$root.bAlBox.value = $val;
			$root.bAlBox.selin = $span;
			$root.bAlBox.postArea = $area;

			console.log($root.bAlBox);
		}

		if($bMove){
			var $selin_a = $('.boxMove').find(".selin").eq(0).attr('val');
			var $selin_b = $('.boxMove').find(".selin").eq(1).attr('val');
			var $area = $('.boxMove').find(".postArea").val();
			$root.bMoveBox.selin_a = $selin_a;
			$root.bMoveBox.selin_b = $selin_b;
			$root.bMoveBox.postArea = $area;

			console.log($root.bMoveBox);
		}
	},

	isClass : function(parent,className){
		return parent.hasClass(className);
	},

	closeBox : function(){
		$(".commonBox").hide().removeClass("bPost bTop bTComment bReport bAlert bMove");
		$(".mask").hide();
	},

	selectedLi : function(obj){
		var $span = obj.parent().prev().find(".selin");
		var $ul = obj.parent();
		$span.html(obj.html());
		$ul.hide();
	},

	selectBox : function(obj){
		var $ul = obj.next();
		$ul.show();
	},

	chkRadio : function(obj){
		var $parent = obj.parent().parent();
		var $em = $parent.find("em");
		var $len = $em.size();
		for(var i=0; i<$len; i++){
			$em.eq(i).removeClass("bbsR-act");
		}
		obj.hasClass("bbsR-act") ? obj.removeClass("bbsR-act") : obj.addClass("bbsR-act");
	},

	chkBox : function(obj){
		var $parent = obj.parent().parent();
		var $em = $parent.find("em");
		var $len = $em.size();
		obj.hasClass("bbsR-act") ? obj.removeClass("bbsR-act") : obj.addClass("bbsR-act");
	},

	strench : function(obj,min,init,box){
		if(obj.hasClass("bbs-open")){
			obj.addClass("bbs-close").removeClass("bbs-open").html("收起");
			box.animate({height:init});
		}else{
			obj.addClass("bbs-open").removeClass("bbs-close").html("展开");
			box.animate({height:min});
		}

	}
};


var bbsFn = {

	config : {
		iNum : 0,
		bClick : true
	},

	/**
	 * [bbsTab 选项卡]
	 * @param  {string} emit    [鼠标移动元素父级]
	 * @param  {string} elemTag [元素标签名]
	 * @param  {string} elemBox [显示元素的父级]
	 * @param  {string} hidshow [当前的样式]
	 */

	bbsTab : function(emit,elemTag,elemBox,hidshow){
		var $elem = $(emit).find(elemTag);
		var $div = $(elemBox).children();
		var $len = $elem.size();
		for(var i=0; i<$len; i++){
			$elem.eq(i).on("mouseover",function(){
				var $index = $(this).index();
				for(var k=0; k<$len; k++){
					$elem.eq(k).removeClass("active");
					$div.eq(k).removeClass(hidshow);
				}
				$(this).addClass("active");
				$div.eq($index).addClass(hidshow);
			});	
		}
	},

	silder : function(){
		var _this = this;
		var $ul = $(".bbs-hd ul");
		var $li = $ul.find("li");
		var $width = $li.eq(0).width();
		var $len = $li.size();
		var $div = $(".pointer-num");
		var $html = '';
		for(var i=0; i<$len; i++){
			if(i == 0){
				$html+='<span class="active"></span>';
			} else {
				$html+='<span></span>';
			}
		}

		$div.html($html);
		$ul.css({'width':$len*$width});
		var $size = $(".pointer-num span").size();

		$(document).on("click",".pointer-num span",function(){ 
			_this.config.iNum = $(this).index();
			_this.initCircle($size);
			$(this).addClass("active");
			$ul.animate({left:-(_this.config.iNum*$width)});
		});

		$(document).on("click",".bbs-hd-next",function(){
			if(!_this.config.bClick) return;
			_this.config.bClick = false;
			_this.config.iNum++;
			if(_this.config.iNum >= $len){
				_this.config.iNum = 0;
			}
			_this.hdMove($size,$ul,$width);
		});

		$(document).on("click",".bbs-hd-prev",function(){
			if(!_this.config.bClick) return;
			_this.config.bClick = false;
			_this.config.iNum--;
			if(_this.config.iNum < 0){
				_this.config.iNum = $len-1;
			}
			_this.hdMove($size,$ul,$width);
		});
	},

	hdMove : function($size,$ul,$width){
		var _this = this;
		_this.initCircle($size);
		$(".pointer-num span").eq(_this.config.iNum).addClass("active");
		$ul.animate({left:-(_this.config.iNum*$width)},{complete : function(){
			_this.config.bClick = true;
		}});
	},

	initCircle : function($size){
		for(var k=0; k<$size; k++){
			$(".pointer-num span").eq(k).removeClass("active");
		}
	}
};

bbsNew.init();