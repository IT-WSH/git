/*
** ����ֵ
*/
	/* 
	** ҳ���л���Ч������ 
	*/
var Msize = $(".m-page").size(), 	//ҳ�����Ŀ
	page_n			= 1,			//��ʼҳ��λ��
	initP			= null,			//��ֵ����ֵ
	moveP			= null,			//ÿ�λ�ȡ����ֵ
	firstP			= null,			//��һ�λ�ȡ��ֵ
	newM			= null,			//���¼��صĸ���
	p_b				= null,			//�������ֵ
	indexP			= null, 		//������ҳ����ֱ����ת�����һҳ
	move			= null,			//�����ܻ���ҳ��
	start			= true, 		//���ƶ�����ʼ
	startM			= null,			//��ʼ�ƶ�
	position		= null,			//����ֵ
	DNmove			= false,		//������������ҳ���л�
	mapS			= null,			//��ͼ����ֵ
	canmove			= false,		//��ҳ�������һҳ
	
	textNode		= [],			//�ı�����
	winHeight       = $(window).height(),
	textInt			= 1;			//�ı�����˳��
	

	

/* 
** ��ҳ�л� ����Ԫ��fixed ����body�߶� 
*/
	var v_h	= null;		//��¼�豸�ĸ߶�
	
	function init_pageH(){
		var fn_h = function() {
			if(document.compatMode == "BackCompat")
				var Node = document.body;
			else
				var Node = document.documentElement;
			 return Math.max(Node.scrollHeight,Node.clientHeight);
		}
		var page_h = fn_h();
		var m_h = $(".m-page").height();
		page_h >= m_h ? v_h = page_h : v_h = m_h ;
		
		//���ø���ģ��ҳ��ĸ߶ȣ���չ��������Ļ�߶�
		$(".m-page").height(v_h); 	
		$(".p-index").height(v_h);
		
	};
	init_pageH();

	

/*
**ģ���л�ҳ���Ч��
*/
	//���¼�
	function changeOpen(e){
		$(".m-page").on('mousedown touchstart',page_touchstart);
		$(".m-page").on('mousemove touchmove',page_touchmove);
		$(".m-page").on('mouseup touchend mouseout',page_touchend);

	};
	
	//ȡ�����¼�
	function changeClose(e){
		$(".m-page").off('mousedown touchstart');
		$(".m-page").off('mousemove touchmove');
		$(".m-page").off('mouseup touchend mouseout');

	};
	
	//�����¼��󶨻���
	changeOpen();
	
	//��������갴�£���ʼ����
	function page_touchstart(e){
		if (e.type == "touchstart") {
			initP = window.event.touches[0].pageY;
		} else {
			initP = e.y || e.pageY;
			mousedown = true;
		}
		firstP = initP;	
	};
	
	//�����ȡ������ֵ
	function V_start(val){
		initP = val;
		mousedown = true;
		firstP = initP;		
	};
	
	//�����ƶ�������ƶ�����ʼ����
	function page_touchmove(e){
		e.preventDefault();
		e.stopPropagation();	
        var imgs = $(".m-img").length;

		//�ж��Ƿ�ʼ�������ƶ��л�ȡֵ
		if(start||startM){
			startM = true;
			if (e.type == "touchmove") {
				moveP = window.event.touches[0].pageY;
			} else { 
				if(mousedown) moveP = e.y || e.pageY;
			}
			page_n == 1 ? indexP = false : indexP = true ;	//true Ϊ���ǵ�һҳ falseΪ��һҳ
		}
		
		//����һ��ҳ�濪ʼ�ƶ�
		if(moveP&&startM&&imgs>1){
			
			//�жϷ�����һ��ҳ����ֿ�ʼ�ƶ�
			if(!p_b){
				p_b = true;
				position = moveP - initP > 0 ? true : false;	//true Ϊ���»��� false Ϊ���ϻ���
				if(position){
				//�����ƶ�
					if(indexP){								
						newM = page_n - 1 ;
						$(".m-page").eq(newM-1).addClass("active").css("top",-v_h);
						move = true ;
					}else{
						if(canmove){
							move = true;
							newM = Msize;
							$(".m-page").eq(newM-1).addClass("active").css("top",-v_h);
						}
						else move = false;
					}
							
				}else{
				//�����ƶ�
					if(page_n != Msize){
						if(!indexP) $('.audio_txt').addClass('close');
						newM = page_n + 1 ;
					}else{
						newM = 1 ;
					}
					$(".m-page").eq(newM-1).addClass("active").css("top",v_h);
					move = true ;
				} 
			}
			
			//�����ƶ�����ҳ���ֵ
			if(!DNmove){
				//��������ҳ�滬��
				if(move){	
					
				
					//�ƶ�������ҳ���ֵ��top��
					start = false;
					var topV = parseInt($(".m-page").eq(newM-1).css("top"));
					$(".m-page").eq(newM-1).css({'top':topV+moveP-initP});	
					
				    if(topV+moveP-initP>0){//����
					   var bn1 = winHeight-(topV+moveP-initP);
					   var bn2 = ((winHeight-bn1/4)/winHeight);
                       $(".m-page").eq(newM-2).attr("style","-webkit-transform:translate(0px,-"+bn1/4+"px) scale("+bn2+")");
				    }else{//����
					   var bn3 = winHeight+(topV+moveP-initP);
					   var bn4 = ((winHeight-bn3/4)/winHeight);
					   if(Msize!=newM){
                         $(".m-page").eq(newM).attr("style","-webkit-transform:translate(0px,"+bn3/4+"px) scale("+bn4+")");
					   }else{
						 $(".m-page").eq(0).attr("style","-webkit-transform:translate(0px,"+bn3/4+"px) scale("+bn4+")");  	
					   }  
				    }
					initP = moveP;
				}else{
					moveP = null;	
				}
			}else{
				console.log('2')
				moveP = null;	
			}
		}
	};

	//����������������������뿪Ԫ�أ���ʼ����
	function page_touchend(e){	
			
		//��������ҳ��
		startM =null;
		p_b = false;
		
		
		//�ж��ƶ��ķ���
		var move_p;	
		position ? move_p = moveP - firstP > 100 : move_p = firstP - moveP > 100 ;
		if(move){
			//�л�ҳ��(�ƶ��ɹ�)
			if( move_p && Math.abs(moveP) >5 ){	
				$(".m-page").eq(newM-1).animate({'top':0},300,"easeOutSine",function(){
					/*
					** �л��ɹ��ص��ĺ���
					*/
					success();
					$(".m-page").attr("style","");
				})
			//����ҳ��(�ƶ�ʧ��)
			}else if (Math.abs(moveP) >=5){	//ҳ���˻�ȥ
				position ? $(".m-page").eq(newM-1).animate({'top':-v_h},100,"easeOutSine") : $(".m-page").eq(newM-1).animate({'top':v_h},100,"easeOutSine");
				$(".m-page").attr("style","");
				$(".m-page").eq(newM-1).removeClass("active");
				start = true;
				$(".m-page").attr("style","");
			}
		}
		/* ��ʼ��ֵ */
		initP		= null,			//��ֵ����ֵ
		moveP		= null,			//ÿ�λ�ȡ����ֵ
		firstP		= null,			//��һ�λ�ȡ��ֵ
		mousedown	= null;			//ȡ����갴�µĿ���ֵ
	};
/*
** �л��ɹ��ĺ���
*/
	function success(){
		/*
		** �л��ɹ��ص��ĺ���
		*/							
		//����ҳ��ĳ���
		$(".m-page").eq(page_n-1).removeClass("show active").addClass("hide");
		$(".m-page").eq(newM-1).removeClass("active hide").addClass("show");
		
		
		//��������ҳ���ƶ��Ŀ���ֵ
		page_n = newM;
		start = true;
		
		//�ж��ǲ������һҳ��������ʾ����
		if(page_n == Msize) {
			canmove = true;
			$('.u-arrow').hide();
		}else{
			$('.u-arrow').show();
		}
		
	}




/*
**�豸��ת��ʾ
*/
	$(function(){
		var bd = $(document.body);
		window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', _orientationchange, false);
		function _orientationchange() {
			scrollTo(0, 1);
			switch(window.orientation){
				case 0:		//����
					bd.addClass("landscape").removeClass("portrait");
					init_pageH();					
					break;
				case 180:	//����
					bd.addClass("landscape").removeClass("portrait");	
					init_pageH();
					break;
				case -90: 	//����
					init_pageH();
					break;
				case 90: 	//����
					init_pageH();
					bd.addClass("portrait").removeClass("landscape");
					break;
			}
		}
		$(window).on('load',_orientationchange);
	});




/*
** ҳ����س�ʼ��
*/
	var input_focus = false;
	function initPage(){
		//��ʼ��һ��ҳ��
		$(".m-page").addClass("hide").eq(page_n-1).addClass("show").removeClass("hide");
		//PC��ͼƬ�����������ק
		$(document.body).find("img").on("mousedown",function(e){
			e.preventDefault();
		})	
		//����ͼƬ�ĳߴ�
		if(RegExp("iPhone").test(navigator.userAgent)||RegExp("iPod").test(navigator.userAgent)||RegExp("iPad").test(navigator.userAgent)) $('.m-page').css('height','101%');
	}(initPage());



