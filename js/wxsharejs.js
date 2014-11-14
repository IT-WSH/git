/**
 * ΢�ŷ���
 * @shareTitle	�������
 * @imgUrl		����ͼƬ
 * @descContent	��������
 * @lineLink	�����ַ
 */
function wx_share_out(shareTitle,imgUrl,descContent) {
	var appid = '';
	var lineLink = window.location.href;
	if(imgUrl=='' || imgUrl=='0' || imgUrl=='null') {
		var imgs = document.getElementsByTagName("img");
		if(imgs.length>0) {
			var urlm = /http:\/\//i;
			imgUrl = imgs[0].src;
			if(urlm.test(imgUrl)) {} else {
			//if(imgUrl.indexOf('http:\/\/')>0) { } else {
				imgUrl = 'http://'+window.location.host+imgUrl;
			}
		}
		//imgUrl = $("img:first").attr('src');
	}
	
	function shareFriend() {
		WeixinJSBridge.invoke('sendAppMessage',{
			"appid": appid,
			"img_url": imgUrl,
			"img_width": "200",
			"img_height": "200",
			"link": lineLink,
			"desc": descContent,
			"title": shareTitle
		}, function(res) {
			//_report('send_msg', res.err_msg);
		})	
	}
	function shareTimeline() {
		WeixinJSBridge.invoke('shareTimeline',{
			"img_url": imgUrl,
			"img_width": "200",
			"img_height": "200",
			"link": lineLink,
			"desc": descContent,
			"title": shareTitle
		}, function(res) {
			   //_report('timeline', res.err_msg);
		});
	}
	function shareWeibo() {
		WeixinJSBridge.invoke('shareWeibo',{
			"content": descContent,
			"url": lineLink,
		}, function(res) {
			//_report('weibo', res.err_msg);
		});
	}
	// ��΢���������������ڲ���ʼ����ᴥ��WeixinJSBridgeReady�¼���
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		// ���͸�����
			WeixinJSBridge.on('menu:share:appmessage', function(argv){
				shareFriend();
			});
			// ��������Ȧ
			WeixinJSBridge.on('menu:share:timeline', function(argv){
				shareTimeline();
			});
			// ����΢��
			WeixinJSBridge.on('menu:share:weibo', function(argv){
				shareWeibo();
			});
		/*var ua = navigator.userAgent.toLowerCase();
		if(ua.indexOf("android")>0) {
			// ���͸�����
			WeixinJSBridge.on('menu:share:appmessage', function(argv){
				shareFriend();
			});
			// ��������Ȧ
			WeixinJSBridge.on('menu:share:timeline', function(argv){
				shareTimeline();
			});
			// ����΢��
			WeixinJSBridge.on('menu:share:weibo', function(argv){
				shareWeibo();
			});
		} else {
			WeixinJSBridge.on('menu:general:share', function(argv){  
				var scene = 0;  
				switch(argv.shareTo){  
					case 'friend'  : scene = 1; break;  
					case 'timeline': scene = 2; break;  
					case 'weibo'   : scene = 3; break;  
				}  
				argv.generalShare({  
					"img_url"    : imgUrl,  
					"img_width"  : "200",  
					"img_height" : "200",  
					"link"       : share_scene(lineLink,scene),  
					"desc"       : descContent,  
					"title"      : shareTitle  
				}, function(res){  
			
				});
			});
		}*/
	}, false);
}
