var htmlString = "";
var total_page;
var global_uid;

//200601
//============================공퉁 함수============================

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function pasing(){ //페이징작업 미완성
	htmlString = "";
	htmlString += 
		'<tr>'+
			'<td width="780" height="50" align="center" valign="middle"><span style="font-size:9pt;">';
	var page = 1;
 	var total_block = Math.floor(total_page / 10) + 1;
	var block = Math.floor(page / 10) + 1;
	var first_page = (block - 1) * 10;
	var last_page = block * 10;
	if(total_block <= block) last_page = total_page;
	
	if(block > 1){
		my_page = first_page;
		htmlString +=
			'<a href="#">'+
				'<img src=/resources/style/images/jejak/icon_first.gif" width="15" height="15" border="0">'+
			'</a>&nbsp;&nbsp;';
	}else{
		htmlString += '&nbsp;';
	}
	for(var direct_page = first_page + 1 ; direct_page <= last_page ; direct_page++){
		if(page == direct_page) htmlString += '<font color="#3399FF"><b>' + direct_page + '</b></font>&nbsp;&nbsp;';
		else{
			htmlString += 
				'<a href="#"><font color="#333333">' + direct_page + '</font></a>&nbsp;&nbsp;';
		}
	}
	if(block < total_block){
		my_page = last_page + 1;
		htmlString +=
			'<a href="#">'+
				'<img src="/resources/style/images/jejak/icon_end.gif" width="15" height="15" border="0">'+
	  		'</a></p>';
	}else{
		htmlString +='&nbsp;';
	}
	htmlString += '</span></td></tr>';
	$("#pagination").html(htmlString);
}

function MsToFulldate(milisecond){
	var d = new Date(milisecond * 1000);
	var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
	var day = (d.getDate()) >= 10 ? (d.getDate()) : '0' + (d.getDate());
	var full_date = d.getFullYear().toString() + month.toString() + day.toString();
	
	return full_date;
}

//============================DB 함수============================

function SelIt(code){
	//============================거래처 select============================
	if(code == 1){ 
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/cust/select_list",
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result); //0~83	
				if ((object_num.length) / 15 != 0) {
					total_page = Math.floor(object_num.length / 15) + 1;
				} else {
					total_page = Math.floor(object_num.length / 15);
				}
				htmlString = "";
				for (var i in object_num) {
					var data = result[object_num[i]];
					htmlString +=
						'<tr>' +
							'<td width="45" height="30" align="center" valign="middle" bgcolor="white"><font color="black"><span style="font-size:9pt;">'+ data["wccode"] +'</span></font></td>' +
							'<td width="130" height="30" align="center" valign="middle" bgcolor="white"><font color="black"><span style="font-size:9pt;">' + data["wcname"] + '</span></font></td>' +
							'<td width="45" height="30" align="center" valign="middle" bgcolor="white"><font color="black"><span style="font-size:9pt;">' + data["wcyakc"] + '</span></font></td>' +
							'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><font color="black"><span style="font-size:9pt;">' + data["wcjob"] + '</span></font></td>' +
							'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><font color="black"><span style="font-size:8pt;">' + data["wctel"] + '</span></font></td>' +
							'<td width="80" height="30" align="right" valign="middle" bgcolor="white"><font color="black"><span style="font-size:9pt; padding-right:6pt;">' + data["wcjana"] + '</span></font></td>' +
							'<td width="240" height="30" align="left" valign="middle" bgcolor="white"><font color="black"><span style="font-size:9pt; padding-left:5pt;">' + data["wcjuso"] + '</span></font></td>' +
							'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><font color="black">' +
								'<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
									'<tr>' +
										'<td width="50" align="center" valign="middle"><a href="javascript:Modi('+ data["uid"] + ',' + 1 + ');"><img src="/resources/style/images/jejak/btn_modify.gif" width="40" height="20" border="0"></a></td>' +
										'<td width="50" align="center" valign="middle"><a href="javascript:DelIt(' + data["uid"] + ',' + 1 + ');"><img src="/resources/style/images/jejak/btn_delete.gif" width="40" height="20" border="0"></a></td>' +
									'</tr>' +
								'</table></font>' +
							'</td>' +
						'</tr>';
				}
				$("#data").html(htmlString);
			}
		});
		
		return;
	}	
	//============================제품 select============================
	if(code == 2){ 
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/books/select_list",
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result); //keys ->object_num
				if ((object_num.length) / 15 != 0) {
					total_page = Math.floor(object_num.length / 15) + 1;
				} else {
					total_page = Math.floor(object_num.length / 15);
				}
				(document.getElementById("total_record")).innerHTML = object_num.length;
				htmlString = "";
				//for(var i in object_num){
				for (var i = 0; i < 15; i++) {
					var data = result[object_num[i]]; //json data
					htmlString +=
						'<tr>' +
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">' + data["sbbook"] + '</font></span></td>' +
							'<td width="430" height="25" bgcolor="white" align="left" valign="middle"><p style="line-height:16px; margin-left:5px;"><span style="font-size:9pt;"><font face="돋움" >' + data["sbname"] + '</a></font></span></p></td>' +
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">' +
								'<a href="javascript:Modi(' + data["uid"] + ',' + 2 + ');" class="n">수정</a>&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;' +
								'<a href="javascript:DelIt(' + data["uid"] + ',' + 2 + ');" class="n">삭제</a></font></span>' +
							'</td>' +
						'</tr>';
				}
				$("#data2").html(htmlString);
			}
		});
		
		return;
	}
	//============================용지 select============================
	if(code == 3){
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/yongji/select_reg_list",
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result);
				var num1; var num2; 
				if ((object_num.length) / 15 != 0) {
					total_page = Math.floor(object_num.length / 15) + 1;
				} else {
					total_page = Math.floor(object_num.length / 15);
				}
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; //json data
					
					if (data["curno"] >= 0){
						num1 = Math.floor((data["curno"])/500);
						num2 = (data["curno"])%500;
					}else{
						num1 = (Math.floor(((data["curno"])*-1)/500)*-1);
						num2 = (data["curno"])%500;
					}
					
					$("select[name=jicode]").append("<option value='" + data["wjcode"] + "'>" + data["wjcode"] + " - " + data["wjname"] + "</option>");
					
					htmlString += 
						'<tr>'+
							'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="yjang.htm?uid=<?=$my_uid?>">' + data["wjcode"] + '</a></span></td>'+
							'<td width="200" height="30" align="left" valign="middle" bgcolor="white"><p style="margin-left:10px;"><span style="font-size:9pt;"><a href="javascript:yjpresent('+ "'" + data["wjname"] + "'," + "'" + data["wjcode"] + "'" +');">' + data["wjname"] + '</a></span></p></td>'+
							'<td width="100" height="30" align="center" valign="middle" bgcolor="white">'+
								'<table width="100" border="0">'+
									'<tr>'+
										'<td width="40" align="right"><span style="font-size:9pt; padding-right:3;">'; if(num1) htmlString += num1; htmlString += '</span></td>' +
										'<td width="20" align="center"><span style="font-size:9pt;">'; if(num1) htmlString += ' R '; htmlString += '</span></td>' +
										'<td width="40" align="left"><span style="font-size:9pt; padding-left:3;">'; if(num2) htmlString += num2; htmlString += '</span></td>'+
									'</tr>'+
								'</table>'+
							'</td>'+
							'<td width="100" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:15pt;">' + numberWithCommas(Math.round(data["danga"])) + '</span></td>'+
							'<td width="100" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:15pt;">' + numberWithCommas(data["facdanga"]) + '</span></td>'+
							'<td width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">' + numberWithCommas(Math.round(data["halin"]*10)/10.0) + '</span></td>'+
							'<td width="100" height="30" align="center" valign="middle" bgcolor="white">'+
								'<table border="0" cellpadding="0" cellspacing="0" width="100%">'+
									'<tr>'+
										'<td width="50" align="center" valign="middle"><a href="javascript:Modi(' + data["uid"] + ',' + 3 + ');"><img src="/resources/style/images/jejak/btn_modify.gif" width="40" height="20" border="0"></a></td>'+
										'<td width="50" align="center" valign="middle"><a href="javascript:DelIt(' + data["uid"] + ',' + 3 + ');"><img src="/resources/style/images/jejak/btn_delete.gif" width="40" height="20" border="0"></a></td>'+
									'</tr>'+
								'</table>'+
							'</td>'+
						'</tr>';
				}
				$("#data3").html(htmlString);
			}
		});
		return;
	}
	if(code == 4){ //용지 거래처 출력
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/yongji/select_cust_yj_list",
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				for(var i in object_num){
					var data = result[object_num[i]]; //json data
					$("select[name=ccode]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] +" ("+ data["wccode"] + ")" + "</option>");
					$("select[name=comid]").append("<option value='" + i + "'>" + data["wcname"] + "</option>");
					$("select[name=comid_buy]").append("<option value='" + i + "'>" + data["wcname"] + "</option>");
				}
			}
		});
		return;
	}
	
	if(code == 5){ //용지 장부 출력
		
	}
	
	if(code == 6){ //ip출력
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/cust/select_ip_list",
			async: false,
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result); //keys ->object_num
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; //json data
					htmlString +=
						'<tr>'+
							'<td width="100" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#666666">'+ data["uname"] +'</font></span></td>'+
							'<td width="250" height="30"><p style="margin-left:5px;">'+
								'<INPUT style="text-align:left; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:220px;" name="ip1[]" value="'+ data["ips"] +'"></p></td>'+
								'<input type="hidden" name="uids[]" value="'+ data["uid"] +'">'+
						'</tr>';
				}
				$("#ip_table").html(htmlString);
			}
		});
		
		$("#btn_UpIt").click(function test(){
			for(var i = 0; i < $('input[name="ip1[]"]').length; i++){
				
				var uid = $('input[name="uids[]"]')[i].value;
				var ips = $('input[name="ip1[]"]')[i].value;

				var from = {
					uid: uid,
					ips: ips
				}

				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: "http://localhost:9090/cust/update_ip",
					data: JSON.stringify(from),
					success: function (result) {
						logNow(result);
						alert("update성공");
					},
					error: function () {
					}
				});
				return;
			}
		});
		
		return;
	}
	if(code == 7){ //제품보류리스트
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/jpjejak/select_jp_hold_list",
			async: false,
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result); //keys ->object_num
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; //json data
					htmlString +=
						'<tr>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;&nbsp;&nbsp;&nbsp;'+ data["sbbook"] +'&nbsp;&nbsp;&nbsp;&nbsp;</span></td>'+
						'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:10pt;">'+ data["sbname"] +'</span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>'+
					'</tr>';
				}
				$("#jpholdData").html(htmlString);
			}
		});
		return;
	}
	if(code == 8){//제품정가인상리스트
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/jpjejak/select_jp_priceup_list",
			async: false,
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result); //keys ->object_num
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; //json data
					htmlString +=
						'<tr>'+
							'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
							'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode"] +'</span></td>'+
							'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:10pt;">'+ data["sbname"] +'</span></td>'+
							'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
								'<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:100px;" name="price[]" value="'+ data["bprice"] +'">'+
								'<input type="hidden" name="uids[]" value="<?=$row[UID]?>"></span></td>'+
							'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						'</tr>';
				}
				$("#jpPriceupData").html(htmlString);
			}
		});
		return;
	}
	if(code == 9){//제품폐간리스트
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/jpjejak/select_jp_close_list",
			async: false,
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result); //keys ->object_num
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; //json data
					htmlString +=
						'<tr>'+
							'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
							'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["sbbook"] +'</span></td>'+
							'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:10pt;">'+ data["sbname"] +'</span></td>'+
							'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
							'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						'</tr>';
				}
				$("#jpCloseData").html(htmlString);
			}
		});
		return;
	}
	if(code == 10){//신간적정재고관리
		var bdate = new Date((new Date().getFullYear()-1) + "/" + (new Date().getMonth()+1) + "/" + new Date().getDate()).getTime()/1000;
		var from = {bdate: bdate}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/jpjejak/select_jp_newstock_list",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result); //keys ->object_num
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; //json data
					
					var full_date = MsToFulldate(data["yjdate"]);
					full_date = full_date.substring(0,4) + "." + full_date.substring(4,6) + "." + full_date.substring(6,8);
					
					htmlString +=
						'<tr>'+
							'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
							'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["yjbook"] +'</span></td>'+
							'<td width="300" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:10pt;">'+ data["sbname"] +'</span></td>'+
							'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
								'<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:100px;" name="qnty[]" value="'+ data["yjqnty"] +'">'+
								'<input type="hidden" name="uids[]" value="<?=$row[UID]?>"></span></td>'+
							'<td onClick="javascript:DelIt(<?=$row[UID]?>);" onMouseOver=this.style.backgroundColor="FFDC7D" onMouseOut=this.style.backgroundColor="FFFFFF" width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">삭제</span></td>'+				
						'</tr>';
				}
				$("#jpNewstockData").html(htmlString);
			}
		});
		return;
	}
	if(code == 11){//출력료
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/directkb/select_kb_print1",
			async: false,
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result); //keys ->object_num
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; //json data
					
					var full_date = MsToFulldate(data["cdate"]);
					full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
					
					htmlString +=
						'<tr>'+
							'<td width="140" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
							'<td width="220" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
							'<td width="140" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["cgubn"] +'</span></td>'+
							'<td width="120" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["cprice"]) +'</span></td>'+
							'<td width="160" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						'</tr>';
						
				}
				$("#kbPrintData").html(htmlString);
			}
		});
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/directkb/select_kb_print2",
			async: false,
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result); //keys ->object_num
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; //json data
					$("select[name=ccode]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
				}
			}
		});
		return;
	}
	if(code == 12){//사보료
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/directkb/select_kb_house_organ1",
			async: false,
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result); //keys ->object_num
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; //json data
					
					var full_date = MsToFulldate(data["cdate"]);
					full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
					
					htmlString +=
						'<tr>'+
							'<td width="140" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
							'<td width="220" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
							'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["cgubn"] +'</span></td>'+
							'<td width="120" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["cprice"]) +'</span></td>'+
							'<td width="200" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						'</tr>';
						
				}
				$("#kbHouseOrganData").html(htmlString);
			}
		});
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/directkb/select_kb_house_organ2",
			async: false,
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result); //keys ->object_num
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; //json data
					$("select[name=ccode]").append("<option value='" + data["wccode"] + "'>" + data["wcname"] + "</option>");
				}
			}
		});
		return;
	}
	if(code == 13){ //제작예정리시트 열람
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/jpjejak/select_yejung1",
			async: false,
			success: function (result){
				var signdate = result.toString();
				
				var xxx = signdate.substring(4,6);
				full_date = signdate.substring(0,4) + " 년" + signdate.substring(4,6) + " 월" + signdate.substring(6,8) + " 일  ";
				(document.getElementById("time_result")).innerHTML = full_date;
				
				var from = {signdate: signdate}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: "http://localhost:9090/jpjejak/select_yejung2",
					data : JSON.stringify(from),
					success: function (result) {
						logNow(result);
						var object_num = Object.keys(result); 
						
						htmlString = "";
						for(var i in object_num){
							var data = result[object_num[i]];
							
							var nprice = 0;
							if (data["ncode"]) var tcode = data["ncode"];
							if (data["nprice"]) nprice = data["nprice"];
							
							htmlString += 
								'<tr>'+
									'<td width="1410">'+
										'<table border="0" cellpadding="5" cellspacing="0" width="1410" bgcolor="#CCCCCC">'+
											'<tr>'+
												'<td width="1410">'+
													'<table border="0" cellspacing="1" width="1400" bgcolor="#CCCCCC" bordercolorlight="#CCCCCC" bordercolordark="white" cellpadding="0">'+
														'<tr>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">순번</span></font></td>'+
															'<td width="50" bgcolor="white" height="40" align="center" valign="middle"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">도서명</span></font></td>'+
															'<td width="300" bgcolor="white" height="40" align="left" valign="middle" colspan="3">'+
																'<table border="0" width="300">'+
																	'<tr>'+
																		'<td width="270" align="left"><p style="margin-left:3px;"><span style="font-size:9pt;">'+ data["bname"] +'</span></p></td>'+
																		'<td width="30" align="right">&nbsp;</td>'+
																	'</tr>'+
																'</table>'+
															'</td>'+
															'<td width="50" height="40" align="center" valign="middle" bgcolor="#F6F6F6"><span style="font-size:9pt;"><font color="#666666">코드</font></span></td>'+
															'<td width="50" height="40" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(nprice) htmlString += tcode; else htmlString += data["bcode"]; htmlString += '</span></td>'+														
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">정가</span></font></td>'+
															'<td width="100" bgcolor="white" height="40" align="center" valign="middle" colspan="2"><span style="font-size:9pt;">'; if(nprice) htmlString += '<b><font color="red"> ' + data["bprice"] + ' </font></b>(' + nprice + ')'; else htmlString += data["bprice"]; htmlString += '</span></td>'+
															'<td width="700" bgcolor="#F6F6F6" height="40" align="left" valign="middle" colspan="14"><p><font color="#666666"><span style="font-size:9pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+																											
																'<input type="button" value="삭제" onClick="javascript:DelIt(<?=$row[uid]?>, <?=$page?>);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;월 별 실 판 매 수 량</span></font></p>'+
															'</td>'+													
														'</tr>'+
														'<tr>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">면수</span></font></td>'+
															'<td width="100" bgcolor="#F6F6F6" colspan="2" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">발주점 수량</span></font></td>'+
															'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">현 재고 수량</span></font></td>'+
															'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">판매<br>여유일</span></font></td>'+
															'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">발주 수량</span></font></td>'+
															'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle" colspan="2"><font color="#666666"><span style="font-size:9pt;">최초발행</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">연간<br>증감율</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">월 평균 판매</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">색도</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">년간<br>실판매</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">년간<br>총반입</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">01</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">02</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">03</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">04</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">05</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">06</span></font></td>'+														
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">07</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">08</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">09</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">10</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">11</span></font></td>'+
															'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">12</span></font></td>'+
														'</tr>'+
														'<tr>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["bmyun"] +'</span></td>'+
															'<td width="100" bgcolor="white" colspan="2" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["pnum1"] +'</span></td>'+
															'<td width="100" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["pnum2"] +'</span></td>'+
															'<td width="100" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["pdate"] +'</span></td>'+
															'<td width="100" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["bnum"] +'</span></td>'+
															'<td width="100" bgcolor="white" height="30" align="center" valign="middle" colspan="2"><span style="font-size:9pt;">'+ data["pfirst"] +'</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["yinc"] +'</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["ppan"] +'</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["bcolor"] +'</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["ypan"] +'</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["yban"] +'</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p1"]; if(xxx == "01") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p2"]; if(xxx == "02") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p3"]; if(xxx == "03") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p4"]; if(xxx == "04") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p5"]; if(xxx == "05") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p6"]; if(xxx == "06") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p7"]; if(xxx == "07") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p8"]; if(xxx == "08") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p9"]; if(xxx == "09") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p10"]; if(xxx == "10") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+															
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p11"]; if(xxx == "11") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
															'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p12"]; if(xxx == "12") htmlString += '&nbsp;('+ data["p13"]+ ')'; htmlString += '</span></td>'+
														'</tr>'+
													'</table>'+
												'</td>'+
											'</tr>'+    
										'</table>'+
									'</td>'+
								'</tr>';
						}
						$("#JpYejungData").html(htmlString);
					}
				});
			}
		});
	}
}

function DelIt(uid, code){
	var delcheck = confirm("삭제하시겠습니까?");
	if(delcheck){
		var from = {uid:uid}
		//============================거래처 delete============================
		if (code == 1){
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url : "http://localhost:9090/cust/delete",
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);
				},
				error : function(){
				}
			});
			return;
		//============================제품 delete============================	
		}else if(code == 2){ 
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url : "http://localhost:9090/books/delete",
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);
				},
				error : function(){
				}
			});
			return;
		//============================용지 delete============================	
		}else if(code == 3){
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url : "http://localhost:9090/yongji/delete_reg",
				data : JSON.stringify(from),
				success : function(result) {
					logNow(result);
				},
				error : function(){
				}
			});
			return;
		}
	}
}

function InIt(code){
	//============================거래처 insert============================
	if(code == 1){ 
		var wccode = $("input[name=wccode]").val(); //코드
		var wcjob = $("select[name=wcjob]").val(); //업종
		var wcdeap = $("input[name=wcdeap]").val(); //대표자
		var wcname = $("input[name=wcname]").val(); //거래처명
		var wctel = $("input[name=wctel]").val(); //연락처
		var wcjuso = $("input[name=wcjuso]").val(); //주소
		var tax = $("select[name=tax]").val(); //계산서
		var wcyakc = $("input[name=wcyakc]").val(); //약칭
		var wcjana = $("input[name=wcjana]").val(); //잔액
		var wccode2 = $("input[name=wccode2]").val(); //구매코드
		var wcemail = $("input[name=wcemail]").val(); //EMAIL

		if (wccode == "") return $("input[name=wccode]").focus();
		if (wcjob == "") return $("select[name=wcjob]").focus();
		if (wcname == "") return $("input[name=wcname]").focus();
		if (wcyakc == "") return $("input[name=wcyakc]").focus();
		if (wccode2 == "") return $("input[name=wccode2]").focus();

		var from = {
			wccode: wccode, //sucode때문에 4자리
			wcjob: wcjob,
			wcdeap: wcdeap,
			wcname: wcname,
			wctel: wctel,
			wcjuso: wcjuso,
			tax: tax,
			wcyakc: wcyakc,
			wcjana: wcjana,
			wccode2: wccode2,
			wcemail: wcemail,
			jmfield: "code" //4자리
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/cust/insert",
			data: JSON.stringify(from),
			success: function (result) {
				logNow(result);
				alert('성공');
			},
			error: function () {
			}
		});
		return;
	}
	//============================제품 insert============================
	else if(code == 2){
		var SBBOOK = $("input[name=SBBOOK]").val(); //도서코드
		var SBNAME = $("input[name=SBNAME]").val(); //도서명
		var SBUPRC = $("input[name=SBUPRC]").val(); //정가
		var SBPANH = $("select[name=SBPANH]").val(); //본서판형
		var SBJANH = $("select[name=SBJANH]").val(); //본서장형
		var SBPAGE = $("input[name=SBPAGE]").val(); //본서 페이지
		var SBSBPH1 = $("select[name=SBSBPH1]").val(); //부록 1 판형
		var SBSBJH1 = $("select[name=SBSBJH1]").val(); //부록 1 장형
		var SBSBPG1 = $("input[name=SBSBPG1]").val(); //부록 1 페이지
		var SBSBPH2 = $("select[name=SBSBPH2]").val(); //부록 2 판형
		var SBSBJH2 = $("select[name=SBSBJH2]").val(); //부록 2 장형
		var SBSBPG2 = $("input[name=SBSBPG2]").val(); //부록 2 페이지
		var SBSBPH3 = $("select[name=SBSBPH3]").val(); //부록 3 판형
		var SBSBJH3 = $("select[name=SBSBJH3]").val(); //부록 3 장형
		var SBSBPG3 = $("input[name=SBSBPG3]").val(); //부록 3 페이지
		var SBSBPH4 = $("select[name=SBSBPH4]").val(); //부록 4 판형
		var SBSBJH4 = $("select[name=SBSBJH4]").val(); //부록 4 장형
		var SBSBPG4 = $("input[name=SBSBPG4]").val(); //부록 4 페이지
		var SBCASE2 = $("input[name=SBCASE2]").val(); //케이스
		var SBWING2 = $("input[name=SBWING2]").val(); //낱개
		var SBTIGI = $("input[name=SBTIGI]").val(); //띠지
		var SBJNJI = $("input[name=SBJNJI]").val(); //증지
		var SBINJI = $("input[name=SBINJI]").val(); //인지
		var SBSTIC = $("input[name=SBSTIC]").val(); //스티커
		var SBCD = $("input[name=SBCD]").val(); //CD
		var SBJLSU = $("input[name=SBJLSU]").val(); //절수
		var SBCOTI = $("select[name=SBCOTI]").val(); //코팅
		var SBCOTI2 = $("select[name=SBCOTI2]").val(); //오바코팅
		var SBMYUN = $("input[name=SBMYUN]").val(); //면지
		var SBBYUL = $("input[name=SBBYUL]").val(); //별지
		var SBHWBO = $("input[name=SBHWBO]").val(); //화보
		var in_gu = $("select[name=in_gu]").val(); //인세select
		var SBINSE = $("input[name=SBINSE]").val(); //인세
		var SBBIGO = $("input[name=SBBIGO]").val(); //기타사항

		if (SBBOOK == "") return $("input[name=SBBOOK]").focus();
		if (SBNAME == "") return $("input[name=SBNAME]").focus();
		if (SBUPRC == "") return $("input[name=SBUPRC]").focus();
		if (SBPANH == "") return $("select[name=SBPANH]").focus();
		if (SBJANH == "") return $("select[name=SBJANH]").focus();
		if (SBPAGE == "") return $("input[name=SBPAGE]").focus();
		if (SBCOTI == "") return $("input[name=SBCOTI]").focus();

		var from = {
			sbbook: SBBOOK,
			sbname: SBNAME,
			sbuprc: SBUPRC,
			sbpanh: SBPANH,
			sbjanh: SBJANH,
			sbpage: SBPAGE,
			sbsbph1: SBSBPH1,
			sbsbjh1: SBSBJH1,
			sbsbpg1: SBSBPG1,
			sbsbph2: SBSBPH2,
			sbsbjh2: SBSBJH2,
			sbsbpg2: SBSBPG2,
			sbsbph3: SBSBPH3,
			sbsbjh3: SBSBJH3,
			sbsbpg3: SBSBPG3,
			sbsbph4: SBSBPH4,
			sbsbjh4: SBSBJH4,
			sbsbpg4: SBSBPG4,
			sbcase2: SBCASE2,
			sbwing2: SBWING2,
			sbtigi: SBTIGI,
			sbjnji: SBJNJI,
			sbinji: SBINJI,
			sbstic: SBSTIC,
			sbcd: SBCD,
			sbjlsu: SBJLSU,
			sbcoti: SBCOTI,
			sbcoti2: SBCOTI2,
			sbmyun: SBMYUN,
			sbbyul: SBBYUL,
			sbhwbo: SBHWBO,
			//in_gu: in_gu,
			sbinse: SBINSE,
			sbbigo: SBBIGO
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/books/insert",
			data: JSON.stringify(from),
			success: function (result) {
				logNow(result);
				alert('성공');
			},
			error: function () {
			}
		});
		return;
	}
	else if(code == 3){
		var ycode = $("input[name=ycode]").val(); //코드
		var yname = $("input[name=yname]").val(); //용지명
		var yrr = $("input[name=yrr]").val(); //현재고
		var ydan = $("input[name=ydan]").val(); //현단가
		var facdanga = $("input[name=facdanga]").val(); //공장도가
		var halin = $("input[name=halin]").val(); //할인율
		var ib = $("select[name=ib]").val(); //입사용지
		var wjtype = $("select[name=wjtype]").val(); //용지구분
		var op1 = $("input[name=op1]").val(); //평량
		var op2 = $("input[name=op2]").val(); //규격
		var op3 = $("input[name=op3]").val(); //중량

		//if (wccode == "") return $("input[name=wccode]").focus();

		var from = {
			wjcode: ycode, 
			wjname: yname,
			//yrr: yrr,
			danga: ydan,
			facdanga: facdanga,
			halin: halin,
			ib: ib,
			wjtype: wjtype,
			op1: op1,
			op2: op2,
			op3: op3
		}
		
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/yongji/insert_reg",
			data: JSON.stringify(from),
			success: function (result) {
				logNow(result);
				alert('성공');
			},
			error: function () {
			}
		});
		return;
	}
	//============================출력료 insert============================
	if(code == 4){ 
		var ccode = $("select[name=ccode]").val(); 
		var cdate = $("input[name=cdate]").val(); 
		var cgubn = $("select[name=cgubn] option:checked").val(); 
		var cprice = $("input[name=cprice]").val(); 
		
		var from = {
				ccode: ccode, 
				cdate: cdate,
				cgubn: cgubn,
				cprice: cprice 
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/directkb/insert_kb_print",
			data: JSON.stringify(from),
			success: function (result) {
				logNow(result);
				alert('성공');
			},
			error: function () {
			}
		});
		return;
	}
	if(code == 5){ //사보료
		var ccode = $("select[name=ccode]").val(); 
		var cdate = $("input[name=cdate]").val(); 
		var cgubn = $("select[name=cgubn] option:checked").val(); 
		var cprice = $("input[name=cprice]").val(); 
		logNow(ccode + " / " + cdate + " / " + cgubn + " / " + cprice);
		var from = {
				ccode: ccode, 
				cdate: cdate,
				cgubn: cgubn,
				cprice: cprice 
		}
		/*$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/directkb/insert_kb_print",
			data: JSON.stringify(from),
			success: function (result) {
				logNow(result);
				alert('성공');
			},
			error: function () {
			}
		});*/
		return;
	}
}

function UpIt(uid, code){
	//============================거래처 update============================
	if(code == 1){
		var wccode = $("input[name=wccode]").val(); //코드
		var wcjob = $("select[name=wcjob]").val(); //업종
		var wcdeap = $("input[name=wcdeap]").val(); //대표자
		var wcname = $("input[name=wcname]").val(); //거래처명
		var wctel = $("input[name=wctel]").val(); //연락처
		var wcjuso = $("input[name=wcjuso]").val(); //주소
		var tax = $("select[name=tax]").val(); //계산서
		var wcyakc = $("input[name=wcyakc]").val(); //약칭
		var wcjana = $("input[name=wcjana]").val(); //잔액
		var wccode2 = $("input[name=wccode2]").val(); //구매코드
		var wcemail = $("input[name=wcemail]").val(); //EMAIL

		if (wccode == "") return $("input[name=wccode]").focus();
		if (wcjob == "") return $("select[name=wcjob]").focus();
		if (wcname == "") return $("input[name=wcname]").focus();
		if (wcyakc == "") return $("input[name=wcyakc]").focus();
		if (wccode2 == "") return $("input[name=wccode2]").focus();

		var from = {
			uid: uid,
			wccode: wccode, //sucode때문에 4자리
			wcjob: wcjob,
			wcdeap: wcdeap,
			wcname: wcname,
			wctel: wctel,
			wcjuso: wcjuso,
			tax: tax,
			wcyakc: wcyakc,
			wcjana: wcjana,
			wccode2: wccode2,
			wcemail: wcemail,
			jmfield: "code" //4자리
		}

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/cust/update",
			data: JSON.stringify(from),
			success: function (result) {
				logNow(result);
				alert("update성공");
			},
			error: function () {
			}
		});
		return;
	}
	//============================제품 update============================
	else if(code == 2){
		var SBBOOK = $("input[name=SBBOOK]").val(); //도서코드
		var SBNAME = $("input[name=SBNAME]").val(); //도서명
		var SBUPRC = $("input[name=SBUPRC]").val(); //정가
		var SBGUME = $("input[name=SBGUME]").val(); //구매처
		var SBAPDT = $("input[name=SBAPDT]").val(); //등록일자
		var SBLOCA = $("input[name=SBLOCA]").val(); //위치
		var SBPEGI = $("input[name=SBPEGI]").val(); //폐간구분
		var SBPEGA = $("input[name=SBPEGA]").val(); //폐간일자
		var SBGUBN = $("input[name=SBGUBN]").val(); //보류구분
		var SBCPBH = $("input[name=SBCPBH]").val(); //초판일자
		var SBCPSR = $("input[name=SBCPSR]").val(); //초판제작부수
		var SBCPDN = $("input[name=SBCPDN]").val(); //초판단가
		var SBCJBH = $("input[name=SBCJBH]").val(); //최종발행일자
		var SBCJPN = $("input[name=SBCJPN]").val(); //최종판수
		var SBBUSE = $("input[name=SBBUSE]").val(); //편집부서
		var SBJUJA = $("input[name=SBJUJA]").val(); //저자
		var SBYKJA = $("input[name=SBYKJA]").val(); //역자
		var SBPNJA = $("input[name=SBPNJA]").val(); //편자
		var SBPJFR = $("input[name=SBPJFR]").val(); //편집기간(FROM)
		var SBPJTO = $("input[name=SBPJTO]").val(); //편집기간(TO)
		var SBDUNG = $("input[name=SBDUNG]").val(); //등급
		var SBSOG1 = $("input[name=SBSOG1]").val(); //송고일(본문)
		var SBSOG2 = $("input[name=SBSOG2]").val(); //송고일(표지)
		var SBIPIL = $("input[name=SBIPIL]").val(); //초판입고일
		var SBCOST = $("input[name=SBCOST]").val(); //구매단가
		var SBWEIT = $("input[name=SBWEIT]").val(); //중량
		var SBGEO1 = $("input[name=SBGEO1]").val(); //사식(거래처)
		var SBAMT1 = $("input[name=SBAMT1]").val(); //사식(금액)
		var SBREM1 = $("input[name=SBREM1]").val(); //사식(내역)
		var SBGEO2 = $("input[name=SBGEO2]").val(); //사보(거래처)
		var SBAMT2 = $("input[name=SBAMT2]").val(); //사보(금액)
		var SBREM2 = $("input[name=SBREM2]").val(); //사보(내역)
		var SBGEO3 = $("input[name=SBGEO3]").val(); //원색(거래처)
		var SBAMT3 = $("input[name=SBAMT3]").val(); //원색(금액)
		var SBREM3 = $("input[name=SBREM3]").val(); //원색(내역)
		var SBPNKN = $("input[name=SBPNKN]").val(); //판권
		var SBWONS = $("input[name=SBWONS]").val(); //사용원서
		var SBWNNA = $("input[name=SBWNNA]").val(); //원저자
		var SBKOMC = $("input[name=SBKOMC]").val(); //승인번호
		var SBISBN = $("input[name=SBISBN]").val(); //국제표준도서코드
		var SBPANH = $("select[name=SBPANH]").val(); //본서판형
		var SBJANH = $("select[name=SBJANH]").val(); //본서장형
		var SBPAGE = $("input[name=SBPAGE]").val(); //본서 페이지
		var SBPANH2 = $("select[name=SBPANH2]").val(); //본서2 판형
		var SBPAGE2 = $("input[name=SBPAGE2]").val(); //본서2 페이지
		var SBSBPH1 = $("select[name=SBSBPH1]").val(); //부록 1 판형
		var SBSBJH1 = $("select[name=SBSBJH1]").val(); //부록 1 장형
		var SBSBPG1 = $("input[name=SBSBPG1]").val(); //부록 1 페이지
		var SBSBPH2 = $("select[name=SBSBPH2]").val(); //부록 2 판형
		var SBSBJH2 = $("select[name=SBSBJH2]").val(); //부록 2 장형
		var SBSBPG2 = $("input[name=SBSBPG2]").val(); //부록 2 페이지
		var SBSBPH3 = $("select[name=SBSBPH3]").val(); //부록 3 판형
		var SBSBJH3 = $("select[name=SBSBJH3]").val(); //부록 3 장형
		var SBSBPG3 = $("input[name=SBSBPG3]").val(); //부록 3 페이지
		var SBSBPH4 = $("select[name=SBSBPH4]").val(); //부록 4 판형
		var SBSBJH4 = $("select[name=SBSBJH4]").val(); //부록 4 장형
		var SBSBPG4 = $("input[name=SBSBPG4]").val(); //부록 4 페이지
		var SBCASE2 = $("input[name=SBCASE2]").val(); //케이스
		var SBWING2 = $("input[name=SBWING2]").val(); //오리꼬미
		var SBTIGI = $("input[name=SBTIGI]").val(); //띠지
		var SBJNJI = $("input[name=SBJNJI]").val(); //증지
		var SBINJI = $("input[name=SBINJI]").val(); //인지
		var SBSTIC = $("input[name=SBSTIC]").val(); //스티커
		var SBCD = $("input[name=SBCD]").val(); //CD
		var SBBINB = $("input[name=SBBINB]").val(); //책속의 책
		var SBIPGO = $("select[name=SBIPGO]").val(); //입고처
		var SBJLSU = $("input[name=SBJLSU]").val(); //절수
		var SBDSPG = $("input[name=SBDSPG]").val(); //대수당페이지
		var SBCOTI = $("select[name=SBCOTI]").val(); //코팅
		var SBSACH = $("select[name=SBSACH]").val(); //상철제본
		var SBJEGO = $("input[name=SBJEGO]").val(); //현재고
		var SBCOTI2 = $("select[name=SBCOTI2]").val(); //추가코팅
		var SBMYUN = $("input[name=SBMYUN]").val(); //면지
		var SBBYUL = $("input[name=SBBYUL]").val(); //별지
		var SBHWBO = $("input[name=SBHWBO]").val(); //화보
		var in_gu = $("select[name=in_gu]").val(); //인세
		var SBINSE = $("input[name=SBINSE]").val(); //인세
		var SBHJGB = $("select[name=in_gu2]").val(); //인세
		var in_gu3 = $("select[name=in_gu3]").val(); //인세
		var SBKC = $("select[name=SBKC]").val(); //KC
		var SBBIGO = $("input[name=SBBIGO]").val(); //기타사항
		var MEMO_JB = $("input[name=MEMO_JB]").val(); //기타(제본)
		var MEMO_CD = $("input[name=MEMO_CD]").val(); //기타(CD)
		var MEMO_CS = $("input[name=MEMO_CS]").val(); //기타(케이스)
		var MEMO_ST = $("input[name=MEMO_ST]").val(); //기타(스티커)
		var SBTPAGE = $("input[name=SBTPAGE]").val(); //전체지면수
		var SBMPAGE = $("input[name=SBMPAGE]").val(); //음악지면수
		var SBSONGN = $("input[name=SBSONGN]").val(); //총수록곡수
		var SBSONGI = $("input[name=SBSONGI]").val(); //국내승인곡
		var SBSONGO = $("input[name=SBSONGO]").val(); //해외승인곡
		var SBBOOKP = $("input[name=SBBOOKP]").val(); //도서판매가
		var SBCDP = $("input[name=SBCDP]").val(); //CD판매가
		var SBJABJI = $("select[name=SBJABJI]").val(); //잡지

		if (SBBOOK == "") return $("input[name=SBBOOK]").focus();
		if (SBNAME == "") return $("input[name=SBNAME]").focus();
		if (SBUPRC == "") return $("input[name=SBUPRC]").focus();
		if (SBPANH == "") return $("select[name=SBPANH]").focus();
		if (SBJANH == "") return $("select[name=SBJANH]").focus();
		if (SBPAGE == "") return $("input[name=SBPAGE]").focus();
		if (SBCOTI == "") return $("input[name=SBCOTI]").focus();

		var from = {
			uid: uid,
			sbbook: SBBOOK,
			sbname: SBNAME,
			sbuprc: SBUPRC,
			sbgume: SBGUME,
			sbapdt: SBAPDT,
			sbloca: SBLOCA,
			sbpegi: SBPEGI,
			sbpega: SBPEGA,
			sbgubn: SBGUBN,
			sbcpbh: SBCPBH,
			sbcpsr: SBCPSR,
			sbcpdn: SBCPDN,
			sbcjbh: SBCJBH,
			sbcjpn: SBCJPN,
			sbbuse: SBBUSE,
			sbjuja: SBJUJA,
			sbykja: SBYKJA,
			sbpnja: SBPNJA,
			sbpjfr: SBPJFR,
			sbpjto: SBPJTO,
			sbdung: SBDUNG,
			sbsog1: SBSOG1,
			sbsog2: SBSOG2,
			sbipil: SBIPIL,
			sbcost: SBCOST,
			sbweit: SBWEIT,
			sbgeo1: SBGEO1,
			sbamt1: SBAMT1,
			sbrem1: SBREM1,
			sbgeo2: SBGEO2,
			sbamt2: SBAMT2,
			sbrem2: SBREM2,
			sbgeo3: SBGEO3,
			sbamt3: SBAMT3,
			sbrem3: SBREM3,
			sbpnkn: SBPNKN,
			sbwons: SBWONS,
			sbwnna: SBWNNA,
			sbkomc: SBKOMC,
			sbisbn: SBISBN,
			sbpanh: SBPANH,
			sbjanh: SBJANH,
			sbpage: SBPAGE,
			sbpanh2: SBPANH2,
			sbpage2: SBPAGE2,
			sbsbph1: SBSBPH1,
			sbsbjh1: SBSBJH1,
			sbsbpg1: SBSBPG1,
			sbsbph2: SBSBPH2,
			sbsbjh2: SBSBJH2,
			sbsbpg2: SBSBPG2,
			sbsbph3: SBSBPH3,
			sbsbjh3: SBSBJH3,
			sbsbpg3: SBSBPG3,
			sbsbph4: SBSBPH4,
			sbsbjh4: SBSBJH4,
			sbsbpg4: SBSBPG4,
			sbcase2: SBCASE2,
			sbwing2: SBWING2,
			sbtigi: SBTIGI,
			sbjnji: SBJNJI,
			sbinji: SBINJI,
			sbstic: SBSTIC,
			sbcd: SBCD,
			sbbinb: SBBINB,
			sbipgo: SBIPGO,
			sbjlsu: SBJLSU,
			sbdspg: SBDSPG,
			sbcoti: SBCOTI,
			sbsach: SBSACH,
			sbjego: SBJEGO,
			sbcoti2: SBCOTI2,
			sbmyun: SBMYUN,
			sbbyul: SBBYUL,
			sbhwbo: SBHWBO,
			//in_gu: in_gu,
			sbinse: SBINSE,
			sbhj04: SBINSE,
			sbhjgb: SBHJGB,
			//in_gu3: in_gu3,
			sbkc: SBKC,
			sbbigo: SBBIGO,
			memo_jb: "MEMO_JB",
			memo_cd: MEMO_CD,
			memo_cs: MEMO_CS,
			memo_st: MEMO_ST,
			sbtpage: SBTPAGE,
			sbmpage: SBMPAGE,
			sbsongn: SBSONGN,
			sbsongi: SBSONGI,
			sbsongo: SBSONGO,
			sbbookp: SBBOOKP,
			sbcdp: SBCDP,
			sbjabji: SBJABJI
		}

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/books/update",
			data: JSON.stringify(from),
			success: function (result) {
				logNow(result);
				alert("update성공");
			},
			error: function () {
			}
		});
		return;
	}
	//============================용지 update============================
	else if(code == 3){
		var ycode = $("input[name=ycode]").val(); //코드
		var yname = $("input[name=yname]").val(); //용지명
		var yrr = $("input[name=yrr]").val(); //현재고
		var ydan = $("input[name=ydan]").val(); //현단가
		var facdanga = $("input[name=facdanga]").val(); //공장도가
		var halin = $("input[name=halin]").val(); //할인율
		var ib = $("select[name=ib]").val(); //입사용지
		var wjtype = $("select[name=wjtype]").val(); //용지구분
		var op1 = $("input[name=op1]").val(); //평량
		var op2 = $("input[name=op2]").val(); //규격
		var op3 = $("input[name=op3]").val(); //중량

		//if (wccode == "") return $("input[name=wccode]").focus();

		var from = {
			uid: uid,
			wjcode: ycode, 
			wjname: yname,
			//yrr: yrr,
			danga: ydan,
			facdanga: facdanga,
			halin: halin,
			ib: ib,
			wjtype: wjtype,
			op1: op1,
			op2: op2,
			op3: op3
		}
		
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/yongji/update_reg",
			data: JSON.stringify(from),
			success: function (result) {
				logNow(result);
				alert('성공');
			},
			error: function () {
			}
		});
		return;
	}
}

function SearchBook(){
	var key = $("input[name=key]").val();
	if($("select[name=keyfield]").val() == "SBBOOK"){
		var from = {sbbook: key}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : "http://localhost:9090/books/select_list_code_check",
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);		
				
				var object_num = Object.keys(result);
				if ((object_num.length) / 15 != 0) {
					total_page = Math.floor(object_num.length / 15) + 1;
				} else {
					total_page = Math.floor(object_num.length / 15);
				}
				(document.getElementById("total_record")).innerHTML = object_num.length;
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]];
					htmlString +=
						'<tr>' +
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">' + data["sbbook"] + '</font></span></td>' +
							'<td width="430" height="25" bgcolor="white" align="left" valign="middle"><p style="line-height:16px; margin-left:5px;"><span style="font-size:9pt;"><font face="돋움" >' + data["sbname"] + '</a></font></span></p></td>' +
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">' +
								'<a href="javascript:Modi(' + data["uid"] + ',' + 2 + ');" class="n">수정</a>&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;' +
								'<a href="javascript:DelIt(' + data["uid"] + ',' + 2 + ');" class="n">삭제</a></font></span>' +
							'</td>' +
						'</tr>';
				}
				$("#data2").html(htmlString);
			},
			error : function(){
			}
		});
		return;
	}
	if($("select[name=keyfield]").val() == "SBNAME2"){
		var from = {sbname: key}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : "http://localhost:9090/books/select_list_name_check",
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);		
				
				var object_num = Object.keys(result);
				if ((object_num.length) / 15 != 0) {
					total_page = Math.floor(object_num.length / 15) + 1;
				} else {
					total_page = Math.floor(object_num.length / 15);
				}
				(document.getElementById("total_record")).innerHTML = object_num.length;
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]];
					htmlString +=
						'<tr>' +
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">' + data["sbbook"] + '</font></span></td>' +
							'<td width="430" height="25" bgcolor="white" align="left" valign="middle"><p style="line-height:16px; margin-left:5px;"><span style="font-size:9pt;"><font face="돋움" >' + data["sbname"] + '</a></font></span></p></td>' +
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">' +
								'<a href="javascript:Modi(' + data["uid"] + ',' + 2 + ');" class="n">수정</a>&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;' +
								'<a href="javascript:DelIt(' + data["uid"] + ',' + 2 + ');" class="n">삭제</a></font></span>' +
							'</td>' +
						'</tr>';
				}
				$("#data2").html(htmlString);
			},
			error : function(){
			}
		});
		return;
	}
}

function Modi(uid, code){
	var from = {uid:uid}
	//============================거래처 수정============================
	if(code == 1){
		$('#jejak_detail_view').html(jmenu1("0-수정"));
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/cust/select_detail",
			data : JSON.stringify(from),
			success: function (result) {
				var data = result[0];
				$("input[name=wccode]").val(data["wccode"]);
				$("select[name=wcjob]").val(data["wcjob"]);
				$("input[name=wcdeap]").val(data["wcdeap"]);
				$("input[name=wcname]").val(data["wcname"]);
				$("input[name=wctel]").val(data["wctel"]);
				$("input[name=wcjuso]").val(data["wcjuso"]);
				$("select[name=tax]").val(data["tax"]);
				$("input[name=wcyakc]").val(data["wcyakc"]);
				$("input[name=wcjana]").val(data["wcjana"]);
				$("input[name=wccode2]").val(data["wccode2"]);
				$("input[name=wcemail]").val(data["wcemail"]);
			}
		});
	}
	//============================제품 수정============================
	else if (code == 2) {
		$('#jejak_detail_view').html(jmenu2("0-수정"));
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/books/select_detail",
			data: JSON.stringify(from),
			success: function (result) {
				var data = result[0];
				logNow(data);
				(document.getElementById("SBNAME")).innerHTML = data["sbname"];
				$("input[name=SBBOOK]").val(data["sbbook"]); //도서코드
				$("input[name=SBNAME]").val(data["sbname"]); //도서명
				$("input[name=SBUPRC]").val(data["sbuprc"]); //정가
				$("input[name=SBGUME]").val(data["sbgume"]); //구매처
				$("input[name=SBAPDT]").val(data["sbapdt"]); //등록일자
				$("input[name=SBLOCA]").val(data["sbloca"]); //위치
				$("input[name=SBPEGI]").val(data["sbpegi"]); //폐간구분
				$("input[name=SBPEGA]").val(data["sbpega"]); //폐간일자
				$("input[name=SBGUBN]").val(data["sbgubn"]); //보류구분
				$("input[name=SBCPBH]").val(data["sbcpbh"]); //초판일자
				$("input[name=SBCPSR]").val(data["sbcpsr"]); //초판제작부수
				$("input[name=SBCPDN]").val(data["sbcpdn"]); //초판단가
				$("input[name=SBCJBH]").val(data["sbcjbh"]); //최종발행일자
				$("input[name=SBCJPN]").val(data["sbcjpn"]); //최종판수
				$("input[name=SBBUSE]").val(data["sbbuse"]); //편집부서
				$("input[name=SBJUJA]").val(data["sbjuja"]); //저자
				$("input[name=SBYKJA]").val(data["sbykja"]); //역자
				$("input[name=SBPNJA]").val(data["sbpnja"]); //편자
				$("input[name=SBPJFR]").val(data["sbpjfr"]); //편집기간(FROM)
				$("input[name=SBPJTO]").val(data["sbpjto"]); //편집기간(TO)
				$("input[name=SBDUNG]").val(data["sbdung"]); //등급
				$("input[name=SBSOG1]").val(data["sbsog1"]); //송고일(본문)
				$("input[name=SBSOG2]").val(data["sbsog2"]); //송고일(표지)
				$("input[name=SBIPIL]").val(data["sbipil"]); //초판입고일
				$("input[name=SBCOST]").val(data["sbcost"]); //구매단가
				$("input[name=SBWEIT]").val(data["sbweit"]); //중량
				$("input[name=SBGEO1]").val(data["sbgeo1"]); //사식(거래처)
				$("input[name=SBAMT1]").val(data["sbamt1"]); //사식(금액)
				$("input[name=SBREM1]").val(data["sbrem1"]); //사식(내역)
				$("input[name=SBGEO2]").val(data["sbgeo2"]); //사보(거래처)
				$("input[name=SBAMT2]").val(data["sbamt2"]); //사보(금액)
				$("input[name=SBREM2]").val(data["sbrem2"]); //사보(내역)
				$("input[name=SBGEO3]").val(data["sbgeo3"]); //원색(거래처)
				$("input[name=SBAMT3]").val(data["sbamt3"]); //원색(금액)
				$("input[name=SBREM3]").val(data["sbrem3"]); //원색(내역)
				$("input[name=SBPNKN]").val(data["sbpnkn"]); //판권
				$("input[name=SBWONS]").val(data["sbwons"]); //사용원서
				$("input[name=SBWNNA]").val(data["sbwnna"]); //원저자
				$("input[name=SBKOMC]").val(data["sbkomc"]); //승인번호
				$("input[name=SBISBN]").val(data["sbisbn"]); //국제표준도서코드
				$("select[name=SBPANH]").val(data["sbpanh"]); //본서판형
				$("select[name=SBJANH]").val(data["sbjanh"]); //본서장형
				$("input[name=SBPAGE]").val(data["sbpage"]); //본서 페이지
				$("select[name=SBPANH2]").val(data["sbpanh2"]); //본서2 판형
				$("input[name=SBPAGE2]").val(data["sbpage2"]); //본서2 페이지
				$("select[name=SBSBPH1]").val(data["sbsbph1"]); //부록 1 판형
				$("select[name=SBSBJH1]").val(data["sbsbjh1"]); //부록 1 장형
				$("input[name=SBSBPG1]").val(data["sbsbpg1"]); //부록 1 페이지
				$("select[name=SBSBPH2]").val(data["sbsbph2"]); //부록 2 판형
				$("select[name=SBSBJH2]").val(data["sbsbjh2"]); //부록 2 장형
				$("input[name=SBSBPG2]").val(data["sbsbpg2"]); //부록 2 페이지
				$("select[name=SBSBPH3]").val(data["sbsbph3"]); //부록 3 판형
				$("select[name=SBSBJH3]").val(data["sbsbjh3"]); //부록 3 장형
				$("input[name=SBSBPG3]").val(data["sbsbpg3"]); //부록 3 페이지
				$("select[name=SBSBPH4]").val(data["sbsbph4"]); //부록 4 판형
				$("select[name=SBSBJH4]").val(data["sbsbjh4"]); //부록 4 장형
				$("input[name=SBSBPG4]").val(data["sbsbpg4"]); //부록 4 페이지
				$("input[name=SBCASE2]").val(data["sbcase2"]); //케이스
				$("input[name=SBWING2]").val(data["sbwing2"]); //오리꼬미
				$("input[name=SBTIGI]").val(data["sbtigi"]); //띠지
				$("input[name=SBJNJI]").val(data["sbjnji"]); //증지
				$("input[name=SBINJI]").val(data["sbinji"]); //인지
				$("input[name=SBSTIC]").val(data["sbstic"]); //스티커
				$("input[name=SBCD]").val(data["sbcd"]); //CD
				$("input[name=SBBINB]").val(data["sbbinb"]); //책속의 책
				$("select[name=SBIPGO]").val(data["sbipgo"]); //입고처
				$("input[name=SBJLSU]").val(data["sbjlsu"]); //절수
				$("input[name=SBDSPG]").val(data["sbdspg"]); //대수당페이지
				$("select[name=SBCOTI]").val(data["sbcoti"]); //코팅
				$("select[name=SBSACH]").val(data["sbsach"]); //상철제본
				$("input[name=SBJEGO]").val(data["sbjego"]); //현재고
				$("select[name=SBCOTI2]").val(data["sbcoti2"]); //추가코팅
				$("input[name=SBMYUN]").val(data["sbmyun"]); //면지
				$("input[name=SBBYUL]").val(data["sbbyul"]); //별지
				$("input[name=SBHWBO]").val(data["sbhwbo"]); //화보
				$("select[name=in_gu]").val(data["in_gu"]); //인세
				if(data["sbinse"] != 0){
					$("input[name=SBINSE]").val(data["sbinse"]); //인세
				}else{
					$("input[name=SBINSE]").val(data["sbhj04"]); //인세
				}
				$("select[name=in_gu2]").val(data["sbhjgb"]); //인세
				$("select[name=in_gu3]").val(data["in_gu3"]); //인세
				$("select[name=SBKC]").val(data["sbkc"]); //KC
				$("input[name=SBBIGO]").val(data["sbbigo"]); //기타사항
				$("input[name=MEMO_JB]").val(data["memo_jb"]); //기타(제본)
				$("input[name=MEMO_CD]").val(data["memo_cd"]); //기타(CD)
				$("input[name=MEMO_CS]").val(data["memo_cs"]); //기타(케이스)
				$("input[name=MEMO_ST]").val(data["memo_st"]); //기타(스티커)
				$("input[name=SBTPAGE]").val(data["sbtpage"]); //전체지면수
				$("input[name=SBMPAGE]").val(data["sbmpage"]); //음악지면수
				$("input[name=SBSONGN]").val(data["sbsongn"]); //총수록곡수
				$("input[name=SBSONGI]").val(data["sbsongi"]); //국내승인곡
				$("input[name=SBSONGO]").val(data["sbsongo"]); //해외승인곡
				$("input[name=SBBOOKP]").val(data["sbbookp"]); //도서판매가
				$("input[name=SBCDP]").val(data["sbcdp"]); //CD판매가
				$("select[name=SBJABJI]").val(data["sbjabji"]); //잡지
			}
		});
	}
	//============================용지 수정============================
	else if (code == 3) {
		$('#jejak_detail_view').html(jmenu3("3-수정"));
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/yongji/select_reg_detail",
			data : JSON.stringify(from),
			success: function (result) {
				var data = result;
				logNow(data);
				$("input[name=ycode]").val(data["wjcode"]);
				$("input[name=yname]").val(data["wjname"]);
				$("input[name=yrr]").val(data["curno"]);
				$("input[name=ydan]").val(data["danga"]);
				$("input[name=facdanga]").val(data["facdanga"]);
				$("input[name=halin]").val(data["halin"]);
				$("select[name=ib]").val(data["ib"]);
				$("select[name=wjtype]").val(data["wjtype"]);
				$("input[name=op1]").val(data["op1"]);
				$("input[name=op2]").val(data["op2"]);
				$("input[name=op3]").val(data["op3"]);
			}
		});
	}

	$("#btn_UpIt").click(function test(){
		UpIt(uid, code);
	});
}

function RegistIt(code){
	if(code == 3){
		$('#jejak_detail_view').html(jmenu3("3-등록"));
	}
}

//============================개인 함수============================

function SearchYjOrder(date1, date2){ //용지구입
	var from = {
			date1: date1,
			date2: date2
		}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: "http://localhost:9090/yongji/select_order_list_input",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			var cnum1; var cnum2; var cost1; var tax1; 
			var sum1 = 0; var sum2 = 0; var sum3 = 0;
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; // json data
				
				var full_date = MsToFulldate(data["date"]);
				full_date = full_date.substring(2,4) + "/" + full_date.substring(4,6) + "/" + full_date.substring(6,8);
				
				if(data["num"] > 0){
					cnum1 = Math.floor((data["num"]) / 500);
					cnum2 = data["num"] % 500;
				}else{
					cnum1 = Math.floor((data["num"]) / 500) * -1;
					cnum2 = (data["num"] * -1) % 500;
				}
				var danga = Math.round((data["n_fac"] * (100 - data["n_halin"])) / 100);
				if(data["tprice"] > 0){
					cost1 = Math.round(data["tprice"] / 1.1);
					tax1 = data["tprice"] - cost1;
				}else{
					cost1 = Math.round((data["tprice"] * -1) / 1.1);
					tax1 = ((data["tprice"] * -1) - cost1) * -1;
					cost1 *= -1;
				}
				sum1 += cost1;
				sum2 += tax1;
				sum3 += data["num"];
				
				htmlString += 
					'<tr>'+                
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:showPopUp('+ 1 + ',' + data["uid"] + ',' + MsToFulldate(data["date"]) +');">'+ full_date +'</a></span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:showPopUp('+ 2 + ',' + data["uid"] + ',' + "'" + data["wcname"] + "'" +');">'+ data["wcname"] +'</a></span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:showPopUp('+ 3 + ',' + data["uid"] + ',' + "'" + data["wjname"] + '/' + data["jicode"] + "'" +' );">'+ data["jicode"] +'</a></span></td>'+
						'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:4pt;">'+ data["wjname"] +'</span></td>'+
						'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(data["n_fac"]) +'</span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
							'<input type="text" size="3" name="n_hal[]" value="'+ data["n_halin"] +'" onKeypress="if(event.keyCode == 13){javascript:writeHalin();}"></span></td>'+
						'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(danga) +'</span></td>'+
						'<td height="30" align="center" valign="middle" bgcolor="white">'+
							'<table width="81" border="0">'+
								'<tr>'+
									'<td width="35" align="right"><span style="font-size:9pt; padding-right:3pt;">'+ cnum1 +'</span></td>'+
									'<td width="11" align="center"><span style="font-size:9pt;">R</span></td>'+
									'<td width="35" align="left"><span style="font-size:9pt; padding-left:3pt;">'+ cnum2 +'</span></td>'+
								'</tr>'+
							'</table>'+
						'</td>'+
						'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(cost1) +'</span></td>'+
						'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(tax1) +'</span></td>'+
						'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:4pt;">'+ numberWithCommas(cost1+tax1) +'</span></td>'+
						'<input type="hidden" name="uid[]" value="<?=$row[uid]?>">'+
						'<input type="hidden" name="jcode[]" value="<?=$row[jicode]?>">'+
					'</tr>';
					
			}
			
			$("#data6").html(htmlString);
			(document.getElementById("sum31")).innerHTML = Math.floor(sum3 / 500);
			(document.getElementById("sum32")).innerHTML = sum3 % 500;
			(document.getElementById("sum1")).innerHTML = numberWithCommas(sum1);
			(document.getElementById("sum2")).innerHTML = numberWithCommas(sum2);
			(document.getElementById("sum3")).innerHTML = numberWithCommas(sum1+sum2);
			
		}
	});
	return;
}

function SearchYjCu(wccode, date1, date2){ //용지 거래처별 구매 출력
	var from = {
		wccode: wccode,
		date1: date1,
		date2: date2
	}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: "http://localhost:9090/yongji/select_cust_buy_list",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			var p1 = 0; var p2 = 0; var p3 = 0; 
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; // json data
				
				var full_date = MsToFulldate(data["date"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				var tsum = data["tprice"]
				var tprice = Math.round(tsum/1.1);
				var ttax = tsum - tprice;
				
				p1 += tprice; p2 += ttax; p3 += tsum;
				
				htmlString += 
					'<tr>'+
						'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="231" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wjname"] +'</span></td>'+
						'<td width="60" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ Math.floor((data["num"])/500) + " R " + (data["num"])%500 +'</span></td>'+
						'<td width="60" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(Math.round(data["danga"])) + '</span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(tprice) +'</span></td>'+
						'<td width="70" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(ttax) +'</span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(tsum) +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
					'</tr>';
			}
			$("#data4").html(htmlString);
			(document.getElementById("tprice")).innerHTML = numberWithCommas(p1);
			(document.getElementById("ttax")).innerHTML = numberWithCommas(p2);
			(document.getElementById("tsum")).innerHTML = numberWithCommas(p3);
		}
	});
	return;
}

function SearchYjjp(year, date1, date2){ //용지전표
	var from = {
			value: year,
			date1: date1,
			date2: date2
		}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: "http://localhost:9090/yongji/select_jp_list",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; // json data
				var num3; var num4; var wccode;
				
				var full_date = MsToFulldate(data["bdate"]);
				full_date = full_date.substring(0,4) + "/" + full_date.substring(4,6) + "/" + full_date.substring(6,8);
				
				if(!data["spcom"]){ // 구매
					wccode = data["buycom"];
				}else{ // 제작
					wccode = data["spcom"];
				}
				
				if(data["jsum"] > 0){
					num3 = Math.floor((data["jsum"])/500);
					num4 = data["jsum"]%500;
				}else{
					num3 = Math.floor(((data["jsum"])*-1)/500)*-1;
					num4 = data["jsum"]%500*-1;
				}
				htmlString += 
					'<tr>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["uid"] +'</span></td>'+
						'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="200" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
						if(data["bname"] == null || data["comment"] == null){ htmlString += '入</span></td>';}
						else{ htmlString += data["bname"] + ' - ' + data["comment"] +'</span></td>';} htmlString += 
						'<td width="140" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:yjpresent('+ "'" + data["jiname"] + "'," + "'" + data["jicode"] + "'" +');">'+ data["jiname"] +'</a></span></td>'+
						'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
							if(num3) htmlString += num3 + " R ";
							if(num4) htmlString += num4; htmlString += '</span></td>'+
						'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
						'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
							'<input type="button" value=" .. " onClick="javascript:Show_Pyo();"></span>'+
						'</td>'+
					'</tr>';
			}
			$("#data5").html(htmlString);
			
		}
	});
	return;
}

function SearchYjJang(date1, date2, value, year){ //용지장부
	var yj_list;
	if(value == "1"){ //용지별
		htmlString = "";
		$("#yjjang").html(htmlString);
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/yongji/select_jang_yj_list",
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result); 
				for (var i in object_num) {
					var data = result[object_num[i]];
					htmlString = "";
					var from = {
						wjcode: data["wjcode"],
						date1: date1,
						date2: date2
						}
					
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url : "http://localhost:9090/yongji/select_jang_yj_io_list",
						data : JSON.stringify(from),
						success : function(result2) {
							
							if(result2.length){
								logNow(result2);
								
								htmlString +=
									'<tr>'+
										'<td width="780" colspan="6" height="30" align="left" valign="middle" bgcolor="#EEEEEE"><span style="font-size:11pt; padding-left:10pt;"><b>'+
										'* '+ result2[0]["wjname"] +' ('+ result2[0]["jicode"] +')</b></span></td>'+
			                        '</tr>';
							}
							var object_num = Object.keys(result2);
							var cur_1 = 0; var cur_2 = 0; var new_num = 0; var num_1 = 0; var num_2 = 0; var jjnum = ""; var jjgubn = "";
							for (var i in object_num) {
								var data2 = result2[object_num[i]];
								
								if (!data2["num"]) continue;
								cur_1 = Math.floor(data2["curno"] / 500);
								cur_2 = data2["curno"] % 500;

								new_num = Math.abs(data2["num"]);
								num_1 = Math.floor(new_num / 500);
								num_2 = new_num % 500;
								
								if (data2["num"] < 0){
									var from = {
											value: year,
											jeon: data2["jeon"]
											}
										
										$.ajax({
											type: "POST",
											contentType: "application/json; charset=utf-8;",
											dataType: "json",
											async: false,
											url : "http://localhost:9090/yongji/select_jang_yj_bu_list",
											data : JSON.stringify(from),
											success : function(result3) {
												jjgubn = result3["comment"];
												jjnum = result3["busu"];
											},
											error : function(){
											}
										});
								}else jjgubn = "";
								
								
								htmlString +=
									'<tr>'+
					                   	'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ MsToFulldate(data2["date"]).substring(6,8) +'</span></td>'+
					                   	'<td width="330" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+
					                       '<table border="0" width="320" cellpadding="0" cellspacing="0">'+
						                       	'<tr>'+
						                       		'<td align="left" width="240"><span style="font-size:9pt; padding-left:5pt; letter-spacing:-1pt;">'+ data2["comment"] +'</span></td>'+
						                   			'<td align="center" width="30"><span style="font-size:9pt;">'+ jjgubn +'</span></td>'+
						                   			'<td align="right" width="50"><span style="font-size:9pt; padding-right:0pt;">'; if(data2["num"] < 0) htmlString += numberWithCommas(Number(jjnum)); htmlString += '</span></td>'+
						                       	'</tr>'+                        	
						                    '</table></span>'+
						                '</td>'+
				                        '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["jeon"] +'</span></td>';
								if(data2["num"] > 0){
									htmlString +=
										'<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
					                        '<table border="0" width="100" cellpadding="0" cellspacing="0">'+
						                    	'<tr>'+
						                   			'<td align="right" width="45"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(num_1) +'</span></td>'+
						                   			'<td align="center" width="10"><span style="font-size:9pt;"> R </span></td>'+
						                   			'<td align="left" width="45"><span style="font-size:9pt; padding-left:5pt;">'+ num_2 +'</span></td>'+
						                   		'</tr>'+
						                   	'</table></span>'+
						                '</td>';
								}else{
									htmlString +=
										'<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>';
								}
								if(data2["num"] < 0){
									htmlString +=
						                '<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
						                    '<table border="0" width="100" cellpadding="0" cellspacing="0">'+
						                    	'<tr>'+
						                   			'<td align="right" width="45"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(num_1) +'</span></td>'+
						                   			'<td align="center" width="10"><span style="font-size:9pt;"> R </span></td>'+
						                   			'<td align="left" width="45"><span style="font-size:9pt; padding-left:5pt;">'+ num_2 +'</span></td>'+
						                   		'</tr>'+
						                   	'</table></span>'+
						                '</td>';
								}else{
									htmlString +=
										'<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>';
								}
									htmlString +=
					                    '<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
					                    	'<table border="0" width="100" cellpadding="0" cellspacing="0">'+
						                    	'<tr>'+
						                    		'<td align="right" width="45"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(cur_1) +'</span></td>'+
						                   			'<td align="center" width="10"><span style="font-size:9pt;"> R </span></td>'+
						                   			'<td align="left" width="45"><span style="font-size:9pt; padding-left:5pt;">'+ cur_2 +'</span></td>'+
						                   		'</tr>'+
						                   	'</table></span>'+
						                '</td>'+
						            '</tr>';
							}
							htmlString += 
								'<tr>',
									'<td width="780" colspan="6" height="30" align="left" valign="middle" bgcolor="#EEEEEE"><span style="font-size:11pt; padding-left:10pt;"><b>',
									'* 기타용지</b></span></td>',
								'</tr>';
							
							$("#yjjang").html(htmlString);
						},
						error : function(){
						}
					});
				}
			}
		});
		return;
	}
	if(value == "2"){ //구매처별
		htmlString = "";
		$("#yjjang").html(htmlString);
		//selYjCustWcnameYjList
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/yongji/select_cust_wcname_yj_list",
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result); 
				for (var i in object_num) {
					var data = result[object_num[i]];
					htmlString = "";
					var from = {
							wccode: data["wccode"],
						date1: date1,
						date2: date2
						}
					
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						url : "http://localhost:9090/yongji/select_jang_cust_io_list",
						data : JSON.stringify(from),
						success : function(result2) {
							if(result2.length){
								logNow(result2);
								
								htmlString +=
									'<tr>'+
										'<td width="780" colspan="6" height="30" align="left" valign="middle" bgcolor="#EEEEEE"><span style="font-size:11pt; padding-left:10pt;"><b>'+
										'* '+ result2[0]["wcname"] +'</b></span></td>'+
									'</tr>';
							}
							var object_num = Object.keys(result2);
							
							for (var i in object_num) {
								var data2 = result2[object_num[i]];
								var cur_1 = 0; var cur_2 = 0; var num_1 = 0; var num_2 = 0;
								
								if (!data2["num"])
									continue;
								cur_1 = Math.floor(data2["curno"] / 500);
								cur_2 = data2["curno"] % 500;

								num_1 = Math.floor(data2["num"] / 500);
								num_2 = data2["num"] % 500;
								
								htmlString += 
									'<tr>'+
					                    '<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ MsToFulldate(data2["date"]).substring(6,8) +'</span></td>'+
					                    '<td width="330" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data2["wjname"] +'</span></td>'+
					                    '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["jeon"] +'</span></td>'+
					                    '<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
					                        '<table border="0" width="100" cellpadding="0" cellspacing="0">'+
					                    		'<tr>'+
					                    			'<td align="right" width="45"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(num_1) +'</span></td>'+
					                    			'<td align="center" width="10"><span style="font-size:9pt;"> R </span></td>'+
					                    			'<td align="left" width="45"><span style="font-size:9pt; padding-left:5pt;">'+ num_2 +'</span></td>'+
					                    		'</tr>'+
					                    	'</table></span>'+
										'</td>'+
					                    '<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
					                    	'<table border="0" width="100" cellpadding="0" cellspacing="0">'+
					                    		'<tr>'+
					                    			'<td align="right" width="45"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(cur_1) +'</span></td>'+
					                    			'<td align="center" width="10"><span style="font-size:9pt;"> R </span></td>'+
					                    			'<td align="left" width="45"><span style="font-size:9pt; padding-left:5pt;">'+ cur_2 +'</span></td>'+
					                    		'</tr>'+
					                    	'</table></span>'+
										'</td>'+
					                    '<td width="110" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;"><!--<?=number_format($row[tprice])?>-->0</span></td>'+
									'</tr>';
								
							}
							$("#yjjang").html(htmlString);
						}
					});
				}
			}
		});
		return;
	}
	
}

function SearchYjMonth(msdate){ //월별 용지 재고 현황
	var from = {msdate: msdate}
	logNow(msdate);
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: "http://localhost:9090/yongji/check_mon",
		data : JSON.stringify(from),
		success: function (result) {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: "http://localhost:9090/yongji/select_mon_list",
				data : JSON.stringify(from),
				success: function (result) {
					logNow(result);
					var object_num = Object.keys(result);
					var num1 = 0; var num2 = 0; var num3 = 0; var num4 = 0; var num5 = 0; var num6 = 0; var num7 = 0; var num8 = 0;
					var snum1 = 0; var snum2 = 0; var snum3 = 0; var snum4 = 0;
					htmlString = "";
					for(var i in object_num){
						var data = result[object_num[i]]; // json data
						
						num1 = Math.floor(data["qnty1"] / 500);
						num2 = data["qnty1"] % 500;
						num3 = Math.floor(data["qnty2"] / 500);
						num4 = data["qnty2"] % 500;
						num5 = Math.floor(data["qnty3"] / 500);
						num6 = data["qnty3"] % 500;
						num7 = Math.floor(data["qnty4"] / 500);
						num8 = data["qnty4"] % 500;
						snum1 += data["qnty1"];
						snum2 += data["qnty2"];
						snum3 += data["qnty3"];
						snum4 += data["qnty4"];
						
						htmlString += 
							'<tr>'+
								'<td width="160" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;"><a href="javascript:view_pr();">'+ data["wjname"] +'</a></span></td>'+
								'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num1) htmlString += numberWithCommas(num1) + " R "; htmlString += numberWithCommas(num2) + '</span></td>'+
								'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num3) htmlString += numberWithCommas(num3) + " R "; htmlString += numberWithCommas(num4) + '</span></td>'+
								'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num5) htmlString += numberWithCommas(num5) + " R "; htmlString += numberWithCommas(num6) + '</span></td>'+
								'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num7) htmlString += numberWithCommas(num7) + " R "; htmlString += numberWithCommas(num8) + '</span></td>'+
							'</tr>';
							
					}
					$("#data7").html(htmlString);
					
					num1 = Math.floor(snum1 / 500);
					num2 = snum1 % 500;
					num3 = Math.floor(snum2 / 500);
					num4 = snum2 % 500;
					num5 = Math.floor(snum3 / 500);
					num6 = snum3 % 500;
					num7 = Math.floor(snum4 / 500);
					num8 = snum4 % 500;
					
					htmlString = "";
					htmlString +=
						'<tr>'+
							'<td width="160" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">합계</span></td>'+
							'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num1) htmlString += numberWithCommas(num1) + " R "; htmlString += numberWithCommas(num2) + '</span></td>'+
							'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num3) htmlString += numberWithCommas(num3) + " R "; htmlString += numberWithCommas(num4) + '</span></td>'+
							'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num5) htmlString += numberWithCommas(num5) + " R "; htmlString += numberWithCommas(num6) + '</span></td>'+
							'<td width="155" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:35pt;">'; if(num7) htmlString += numberWithCommas(num7) + " R "; htmlString += numberWithCommas(num8) + '</span></td>'+
						'</tr>';
					
					$("#data7-1").html(htmlString);
				}
			});
		}
	});
	return;
}

function yjpresent(wjname, wjcode){
	$('#jejak_detail_view').html(jmenu3("3-용지현재고"));
	
	(document.getElementById("wjname")).innerHTML = wjname;
	(document.getElementById("wjcode")).innerHTML = wjcode;
	
	var from = {jicode: wjcode}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url : "http://localhost:9090/yongji/select_yj_io_list",
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; //json data
				var num1 = 0; var num2 = 0; var cnum1 = 0; var cnum2 = 0; 
				
				var full_date = MsToFulldate(data["date"]);
				full_date = full_date.substring(0,4) + "." + full_date.substring(4,6) + "." + full_date.substring(6,8);
				
				if(data["num"] >= 0){
					num1 = Math.floor(data["num"] / 500);
					num2 = (data["num"] % 500);
				}else{
					if (data["comment"] == "入"){
						num1 = Math.floor((data["num"]*-1) / 500)*-1;
						num2 = (data["num"] % 500)*-1;
					}else{
						num1 = Math.floor((data["num"]*-1) / 500);
						num2 = (data["num"] % 500)*-1;
					}
				}
				
				if (data["curno"] >= 0){
					cnum1 = Math.floor(data["curno"] / 500);
					cnum2 = data["curno"] % 500;
				}else{
					cnum1 = Math.floor((data["curno"] * -1) / 500);
					cnum1 = cnum1 * -1;
					cnum2 = data["curno"] % 500;
				}
				
				htmlString += 
					'<tr>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + full_date + '</span></td>'+
			            '<td width="240" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + data["comment"] + '</span></td>'+
			            '<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + data["jeon"] + '</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
						if(data["comment"] == "入"){ if(num1) htmlString += num1 + " R "; htmlString += num2; } else htmlString += "&nbsp;"; htmlString += '</span></td>'+
			            '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
						if(data["comment"] != "入"){ if(num1) htmlString += num1 + " R "; htmlString += num2; } else htmlString += "&nbsp;"; htmlString += '</span></td>'+
			            '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">';
						if(cnum1) htmlString += cnum1 + " R "; htmlString += cnum2 + '</span></td>'+
			            '<td width="130" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + data["wcname"] + '</span></td>'+                   
		            '</tr>';
			}
			$("#data8").html(htmlString);
		},
		error : function(){
		}
	});
	return;
	
}

function SearchJpWarehousing(bdate1, bdate2){ //입고대장
	var from = {
		bdate1: bdate1, 
		bdate2: bdate2
	}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: "http://localhost:9090/jpjejak/select_selWarehousing",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
				
			var object_num = Object.keys(result);
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["bdate"]);
				full_date = full_date.substring(2,4) + "." + full_date.substring(4,6) + "." + full_date.substring(6,8);
				
				htmlString += 
					'<tr>'+
						'<td width="30" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
						'<td width="320" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data["bname"] +'</span></td>'+
						'<td width="40" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">';
						if(data["btype"] == 1) htmlString += '신간'; else htmlString += '재판'; htmlString += '</span></td>'+
						'<td width="60" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(data["bnum"]) +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+ full_date +'</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+ data["iwan"].substring(0,2) + '.' + data["iwan"].substring(2,4) +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;"></span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;"></span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+ data["wcname"] +'</span></td>'+						
						'</tr>';
			}
			$("#jpdeaData").html(htmlString);
		}
	});
	return;
}

function SearchBal(code, date1, date2){ //발주서
	if(code == 1){//제품
		var arr_size = 0;
		var cust = new Array();
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/jpjejak/select_bal_cust_list",
			async: false,
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					cust[arr_size] = new Array (data["wccode"], data["wcname"], data["wcjob"], 0);
					
					arr_size++;
				}
			}
		});
		//
		var from = {
			bdate1: date1, 
			bdate2: date2
			}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jpjejak/select_bal_count_list",
			data : JSON.stringify(from),
			success: function (result2) {
				logNow(result2);
					
				var object_num = Object.keys(result2);
				htmlString = "";
				for(var i in object_num){
					var data = result2[object_num[i]]; 
					
					for (var j = 4 ; j < 15 ; j++){
						var temp = "";
						if(j == 4) temp = "m2"; if(j == 5) temp = "m3"; if(j == 6) temp = "m31"; if(j == 7) temp = "m32"; if(j == 8) temp = "m33"; if(j == 9) temp = "m34"; 
						if(j == 10) temp = "m4"; if(j == 11) temp = "m5"; if(j == 12) temp = "m6"; if(j == 13) temp = "m7"; if(j == 14) temp = "m8";   
						var ccode = data[temp];
						if (ccode){
							var ar_index = 0;
							while (ar_index < arr_size){
								if (ccode == cust[ar_index][0]){
									cust[ar_index][3]++;
									break;
								}
								ar_index++;
							}
						}
					}
				}
			}
		});
		
		htmlString= "";
		for(var i = 0 ; i < arr_size ; i++){
			if (cust[i][3] == 0) continue;
			var full_date = $("select[name=ty]").val() + "-" + $("select[name=tm]").val() + "-" + $("select[name=td]").val();
			
			var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
			day = parseInt($("select[name=td]").val()) + 1;
			day = day >= 10 ? day : '0' + day;
			var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
			
		    htmlString += 
		    	'<tr>'+
					'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
					'<td style="padding-left:10px;" width="440" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:SearchBalDetail(1,'+ cust[i][0] + ",'" + cust[i][2] + "'," + date1 + ',' + date2 +');">'+ cust[i][1] +'&nbsp;&nbsp;&nbsp;('+ cust[i][0] +')</a></span></td>'+
					'<td width="115" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ cust[i][2] +'</span></td>'+
					'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ cust[i][3] +'</span></td>'+
				'</tr>';
		}
		$("#jpBalData").html(htmlString);
		
		return;
	}
	if(code == 2){//잡물
		var arr_size = 0;
		var cust = new Array();
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/jmjejak/select_bal_cust_list",
			async: false,
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					cust[arr_size] = new Array (data["wccode"], data["wcname"], data["wcjob"], 0);
					
					arr_size++;
				}
			}
		});
		//
		var from = {
			tdate1: date1, 
			tdate2: date2
			}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jmjejak/select_bal_count_list",
			data : JSON.stringify(from),
			success: function (result2) {
				logNow(result2);
					
				var object_num = Object.keys(result2);
				htmlString = "";
				for(var i in object_num){
					var data = result2[object_num[i]]; 
					
					for (var j = 10 ; j < 23 ; j++){
						var temp = "";
						if(j == 10) temp = "m2"; if(j == 11) temp = "m3"; if(j == 12) temp = "m31"; if(j == 13) temp = "m32"; if(j == 14) temp = "m33"; if(j == 15) temp = "m34"; 
						if(j == 16) temp = "m4"; if(j == 17) temp = "m5";  if(j == 18) temp = "m6"; if(j == 19) temp = "m7"; if(j == 20) temp = "m8"; if(j == 21) temp = "m9"; if(j == 22) temp = "m10";   
						var ccode = data[temp];
						if (ccode){
							var ar_index = 0;
							while (ar_index < arr_size){
								if (ccode == cust[ar_index][0]){
									cust[ar_index][3]++;
									break;
								}
								ar_index++;
							}
						}
					}
				}
			}
		});
		
		htmlString= "";
		for(var i = 0 ; i < arr_size ; i++){
			if (cust[i][3] == 0) continue;
			var full_date = $("select[name=ty]").val() + "-" + $("select[name=tm]").val() + "-" + $("select[name=td]").val();
			
			var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
			day = parseInt($("select[name=td]").val()) + 1;
			day = day >= 10 ? day : '0' + day;
			var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
			
		    htmlString += 
		    	'<tr>'+
					'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
					'<td style="padding-left:10px;" width="440" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:SearchBalDetail(2,'+ cust[i][0] + ",'" + cust[i][2] + "'," + date1 + ',' + date2 +');">'+ cust[i][1] +'&nbsp;&nbsp;&nbsp;('+ cust[i][0] +')</a></span></td>'+
					'<td width="115" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ cust[i][2] +'</span></td>'+
					'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ cust[i][3] +'</span></td>'+
				'</tr>';
		}
		$("#jmBalData").html(htmlString);
		
		return;
	}

}

function CheckJANH(jhcode){
	switch (parseInt(jhcode)){
		case 1:
			var t_jan = "무선"; break;
		case 2:
			var t_jan = "반양장"; break;
		case 3:
			var t_jan = "절공"; break;
		case 4:
			var t_jan = "양장"; break;
		case 5:
			var t_jan = "중철"; break;
		case 6:
			var t_jan = "중미싱"; break;
		case 7:
			var t_jan = "스프링"; break;
		case 8:
			var t_jan = "PUR"; break;
	}
	return t_jan;
}

function SearchBalDetail(code, ccode, ctype, date1, date2){ 
	if(code == 1){//제품
		$('#jejak_detail_view').html(jmenu4("발주서_디테일"));
		
		var from = { ccode: ccode }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jpjejak/select_bal_list3",
			data : JSON.stringify(from),
			success: function (result) {
				
				var full_date = MsToFulldate(date1);
				var email = result[0]["wcemail"];
				
				(document.getElementById("wcname")).innerHTML = result[0]["wcname"];
				(document.getElementById("full_date")).innerHTML = full_date.substring(0,4) + " 년 "+ full_date.substring(4,6) + " 월 " + full_date.substring(6,8) + " 일";
				
			}
		});
		
		htmlString = "";
		if ((ctype == "코팅") || (ctype == "스티커") || (ctype == "CD")){
			htmlString +=
				'<tr>'+
		            '<td width="50" align="center" valign="middle" bgcolor="#F4F4F4" height="50"><p><span style="font-size:9pt;">도서코드</span></p></td>'+
					'<td width="165" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
		            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
					'<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판형</span></td>'+
		            '<td width="40" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">장형</span></td>'+
		            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">면수</span></td>'+
		            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">부수</span></td>'+
					'<td width="285" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">내용</span></td>'+
		            '<td width="100" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">입고처</span></td>'+
		        '</tr>';
		}else{
			htmlString +=
				'<tr>'+
					'<td width="50" align="center" valign="middle" bgcolor="#F4F4F4" height="50"><p><span style="font-size:9pt;">도서코드</span></p></td>'+                    
					'<td width="165" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
					'<td width="40" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">구분</span></td>'+
		            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판형</span></td>'+
		            '<td width="40" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">장형</span></td>'+
		            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">면수</span></td>'+
		            '<td width="35" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">부수</span></td>'+
					'<td width="40" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">인쇄<br>완료일</span></td>'+
		            '<td width="40" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">입고일</span></td>'+
		            '<td width="50" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">입고처</span></td>'+
		            '<td width="250" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">내용</span></td>'+
		        '</tr>';
		}
		$("#jpBalDetailData1").html(htmlString);
		
		var from = { bdate1: date1, bdate2: date2 }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jpjejak/select_bal_list4",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; // json data
					
					if((ctype != "제본") && (data["bucode"])) continue;
					if((data["m2"] == ccode) || (data["m3"] == ccode) || (data["m4"] == ccode) || (data["m5"] == ccode) || (data["m6"] == ccode) || (data["m7"] == ccode) || (data["m8"] == ccode) || (data["m9"] == ccode)){
						var from = { listid: data["listid"] }
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							async: false,
							url: "http://localhost:9090/jpjejak/select_bal_list5",
							data : JSON.stringify(from),
							success: function (result2) {
								logNow(result2);
								var object_num = Object.keys(result2);
								
								for(var i in object_num){
									var data2 = result2[object_num[i]]; // json data
									
									var sin = ""; var bigo = "";
									
									if (data2["btype"] == 1) sin = "신간";
									else sin = "재판";
									if ((ccode.toString()).substring(0,1)== "2"){   
									    if (data2["tbigo"]) bigo = data2["tbigo"];
							            else{
							                switch(data2["sbcoti"]){
							                    case 1:
							                        bigo = "유광"; break;
							                    case 2:
							                        bigo = "무광"; break;
							                    case 3:
							                        bigo = "홀로그램"; break;
												case 4:
							                        bigo = "홀로그램(크리스탈)"; break;
							                    case 5:
							                        bigo = "엠보싱";  break;						
												case 7:
							                        bigo = "무광에폭시"; break;
												case 8:
							                        bigo = "유광에폭시"; break;						
							                }
											switch(data2["sbcoti2"]){
							                    case 7:
							                        bigo = "무광 후 유광에폭시"; break;
							                    case 8:
							                        bigo = "유광 후 무광에폭시"; break;
							                }
							            }
							        }else bigo = data2["sbbigo"];
									
									if (data["bucode"]){
										var janh = CheckJANH(data2["sbsbjh" + data["bucode"]]);
										var myun = data2["sbsbpg" + data["bucode"]];
									}else{
										var janh = CheckJANH(data2["sbjanh"]);
										var myun = data2["bmyun"];
									}
									
									if ((ctype == "코팅") || (ctype == "스티커") || (ctype == "CD")){ //코팅, 스티커는 입고처 표시
										htmlString += 
											'<tr>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["bcode"] +'</span></td>'+
							                    '<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data2["bname"] +'</span></td>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ sin +'</span></td>'+
												'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["bpanh"] +'</span></td>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ janh +'</span></td>'+
							                    '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(myun) +'</span></td>'+
							                    '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["bnum"]) +'</span></td>'+
												'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:266px;" name="comm[]" value="'+ bigo +'"></span></td>'+
							                    '<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:90px;" name="wname[]" value="'+ data["wcname"] +'"></span></td>'+
							                '<tr>';
									}else{
										htmlString += 
											'</tr>'+
												'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["bcode"] +'</span></td>'+                    
												'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data2["bname"] +'</span></td>'+
												'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:0pt;">'+ sin +'</span></td>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data2["bpanh"] +'</span></td>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ janh +'</span></td>'+
							                    '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(myun) +'</span></td>'+
							                    '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:3pt;">'+ numberWithCommas(data2["bnum"]) +'</span></td>'+					
												'<td height="30" align="center" valign="middle" bgcolor="white"><INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:36px;" name="pwan" maxlength="4" value="'+ data["pwan"] +'" onKeypress="if(event.keyCode == 13){javascript:chPwan();}"></span></td>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:36px;" name="iwan" maxlength="4" value="'+ data["iwan"] +'" onKeypress="if(event.keyCode == 13){javascript:chIwan();}"></span></td>'+
							                    '<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">';
													if((janh == "중철") && (data["bucode"])){
														htmlString += 
															'<select name="ip2[]" size="1" style="width:30pt;">'+
										                        '<option value="본사">본사</option>'+                        
										                        '<option value="장곡">장곡</option>'+
																'<option value="민성" selected>민성</option>'+
										                        '<option value="영글">영글</option>'+
																'<option value="태산">태산</option>'+
																'<option value="중앙">중앙</option>'+
									                        '</select>';
													}else{
														htmlString += 
															'<select name="ip2[]" size="1" style="width:30pt;">'+
										                        '<option value="본사"'; if(data2["sbipgo"] == "본사") htmlString += ' selected'; htmlString += '>본사</option>'+                        
										                        '<option value="장곡"'; if(data2["sbipgo"] == "장곡") htmlString += ' selected'; htmlString += '>장곡</option>'+
																'<option value="민성"'; if(data2["sbipgo"] == "민성") htmlString += ' selected'; htmlString += '>민성</option>'+
										                        '<option value="영글"'; if(data2["sbipgo"] == "영글") htmlString += ' selected'; htmlString += '>영글</option>'+
																'<option value="태산"'; if(data2["sbipgo"] == "태산") htmlString += ' selected'; htmlString += '>태산</option>'+
																'<option value="중앙"'; if(data2["sbipgo"] == "중앙") htmlString += ' selected'; htmlString += '>중앙</option>'+
									                        '</select>';
													}
							                        htmlString += '</span>'+
							                    '</td>'+
							                    '<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:246px;" name="comm[]" value="'+ bigo +'"></span></td>'+
							                '</tr>';
									}
								}
								$("#jpBalDetailData2").html(htmlString);
							}
						});
					}
				}
				
			}
		});
		
	}
	if(code == 2){//잡물 
		$('#jejak_detail_view').html(jmenu5("발주서_디테일"));
		htmlString = "";
		htmlString += 
			'<tr>'+
		        '<td width="80" align="center" valign="middle" bgcolor="#F4F4F4" height="50"><p><span style="font-size:9pt;">도서코드</span></p></td>'+
		        '<td width="200" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
		        '<td width="60" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">판형</span></td>'+
		        '<td width="60" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">장형</span></td>'+
		        '<td width="60" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">면수</span></td>'+
		        '<td width="60" height="50" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">부수</span></td>';
			if ((ctype == "코팅") || (ctype == "스티커") || (ctype == "CD")) htmlString += // 코팅, 스티커는 입고처 표시
				'<td width="150" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">비고</span></td>'+
				'<td width="100" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">입고처</span></td>';
			else htmlString +=
				'<td width="250" height="25" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">비고</span></td>'; htmlString +=
			'</tr>'+
			
		$("#jmBalDetailData1").html(htmlString);
			
		var from = { ccode: ccode }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jmjejak/select_bal_list3",
			data : JSON.stringify(from),
			success: function (result) {
						
				var full_date = MsToFulldate(date1);
						
				(document.getElementById("wcname")).innerHTML = result[0]["wcname"];
				(document.getElementById("full_date")).innerHTML = full_date.substring(0,4) + " 년 "+ full_date.substring(4,6) + " 월 " + full_date.substring(6,8) + " 일";
				
			}
		});
		
		var from = { tdate1: date1, tdate2: date2 }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jmjejak/select_bal_list4",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					if((data["m2"] == ccode) || (data["m3"] == ccode) || (data["m5"] == ccode) || (data["m6"] == ccode) || (data["m8"] == ccode)){
						var from = { jbcode: data["jbcode"] }
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							async: false,
							url: "http://localhost:9090/jmjejak/select_bal_list5",
							data : JSON.stringify(from),
							success: function (result2) {
								logNow(result2);
								var object_num = Object.keys(result2);
								
								for(var i in object_num){
									var data2 = result2[object_num[i]]; 
									
									if ((ccode.toString()).substring(0,1)== "2"){   
									    if (data2["tbigo"]) bigo = data2["tbigo"]; //tbigo가 없는걸 .... 이상해..
							            else{
							                switch(data2["sbcoti"]){
							                    case 1:
							                        bigo = "유광"; break;
							                    case 2:
							                        bigo = "무광"; break;
							                    case 3:
							                        bigo = "홀로그램"; break;
							                }
							            }
							        }else bigo = data2["sbbigo"];
									janh = CheckJANH(data2["sbjanh"]);
									
									htmlString +=
										'<tr>'+
								            '<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
								            '<td width="200" height="30" align="left" style="padding-left:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["jbname"] +'</span></td>'+
								            '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["jbpanh"] +'</span></td>'+
								            '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ janh +'</span></td>'+
								            '<td width="60" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["jbpage"] +'</span></td>'+
								            '<td width="60" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["jbamnt"]) +'</span></td>';					
								        if ((ctype == "코팅") || (ctype == "스티커") || (ctype == "CD")) htmlString += // 코팅, 스티커는 입고처 표시
								            '<td width="150" height="30" align="left" style="padding-left:5" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:140px;" name="comm[]" value="'+ bigo +'"></span></td>'+
								            '<td width="100" height="30" align="left" style="padding-left:5" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:90px;" name="wname[]" value="'+ data["wcname"] +'"></span></td>';
								        else htmlString +=
								            '<td width="250" height="30" align="left" style="padding-left:10" valign="middle" bgcolor="white"><span style="font-size:9pt;"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:170px;" name="comm[]" value="'+ bigo +'"></span></td>'; htmlString +=
								        '</tr>';
										
								}
								$("#jmBalDetailData2").html(htmlString);
							}
						});
					}
				}
				
			}
		});
	}
}

function SearchBon(code, date1, date2){ //본문작업지시서
	if(code == 1){//제품제작
		var from = {
			bdate1: date1, 
			bdate2: date2
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/jpjejak/select_jpbon_list",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
						
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var full_date = MsToFulldate(data["bdate"]);
					full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
						
					htmlString += 
						'<tr>'+
							'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
							'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
							'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode"] + '-' + data["bucode"] +'</span></td>'+
							'<td width="360" height="30" align="left" valign="middle" bgcolor="white"><p style="margin-left:5px;"><span style="font-size:9pt;">&nbsp;&nbsp;<a href="javascript:SearchBonDetail(1, '+ data["uid"] +')" class="n">'+ data["bname"] +'</a></span></p></td>'+
							'<td width="84" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["temp1"] + '</span></td>'+
							'<td width="84" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["temp2"] + '</span></td>'+
						'</tr>';
				}
				$("#jpBonData").html(htmlString);
			}
		});
		return;
	}
	if(code == 2){// 잡물제작
		var from = {
				tdate1: date1, 
				tdate2: date2
			}
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: "http://localhost:9090/jmjejak/select_jmbon_list",
				data : JSON.stringify(from),
				success: function (result) {
					logNow(result);
							
					var object_num = Object.keys(result);
					htmlString = "";
					for(var i in object_num){
						var data = result[object_num[i]]; 
						
						var full_date = MsToFulldate(data["jbdate"]);
						full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
							
						htmlString += 
							'<tr>'+
								'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
								'<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
								'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
								'<td width="360" height="30" align="left" valign="middle" bgcolor="white"><p style="margin-left:5px;"><span style="font-size:9pt;">&nbsp;&nbsp;<a href="javascript:SearchBonDetail(2, '+ data["uid"] +')" class="n">'+ data["jbname"] +'</a></span></p></td>'+
								'<td width="84" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(data["temp1"]) htmlString += data["temp1"]; htmlString += '</span></td>'+
								'<td width="84" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(data["temp2"]) htmlString += data["temp2"]; htmlString += '</span></td>'+
							'</tr>';
					}
					$("#jmBonData").html(htmlString);
				}
			});
			return;
	}
	
	
}

function SearchBonDetail(code, uid){ //본문작업지시서 디테일
	if(code == 1){ //제품
		$('#jejak_detail_view').html(jmenu4("본문작업지시서_디테일"));
		var bucode;
		var from = { uid: uid }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jpjejak/select_jpbon_list2",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var full_date = MsToFulldate(data["bdate"]);
					full_date = full_date.substring(0,4) + "년 " + full_date.substring(4,6) + "월 " + full_date.substring(6,8) + "일";
					
					if (data["btype"] == 1) var typegubn = "신간";
					else var typegubn = "재판";
					
					var tbcode = data["bcode"].substring(0,5);
					var comment = "";
					comment = data["t3bigo"];
					if ((tbcode >= '12471') && (tbcode <= '12479')) comment += "본문 1대 우영테크"; // 음악가 친구 비발디
					if ((tbcode >= '12481') && (tbcode <= '12490')) comment += "인계처 : 우영테크 \n\n 본문 1대 미싱작업"; // NEW 음악가 친구
					
					(document.getElementById("wcname2")).innerHTML = data["wcname2"];
					(document.getElementById("bdate")).innerHTML = full_date;
					(document.getElementById("bname")).innerHTML = data["bname"];
					bucode = data["bucode"];
					if (data["bucode"] > 0){
	            		if (data["bucode"] == 5) (document.getElementById("bucode")).innerHTML = "  -  본문2";
	            		else (document.getElementById("bucode")).innerHTML = "  -  " + data["bucode"];
	            	}
					(document.getElementById("jname_jcode")).innerHTML = data["jname"] + " - " + data["jcode"];
					(document.getElementById("pannum5")).innerHTML = data["pannum5"];
					(document.getElementById("typegubn")).innerHTML = typegubn;
					(document.getElementById("bnum")).innerHTML = data["bnum"];
					(document.getElementById("comment")).innerHTML = comment;
					if (data["pwan"] == "급") (document.getElementById("pwan")).innerHTML = "급";
					else (document.getElementById("pwan")).innerHTML = data["pwan"].substring(0,2) + "월 " + data["pwan"].substring(2,4) + "일";
					(document.getElementById("wcname")).innerHTML = data["wcname"];
				}
			}
		});
		
		var from = { uid: uid, bucode: bucode}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jpjejak/select_jpbon_list3",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				var t1 = 0; var t2 = 0; var t3 = 0; var t4 = 0;  var rec_num = 0;
	 			htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					rec_num++;
					t1 = Math.floor(data["jm"] / 500);
					t2 = data["jm"] % 500;
					t3 = Math.floor(data["yb"] / 500);
					t4 = data["yb"] % 500;
					
					htmlString +=
						'<tr>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["gb"] +'</span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["dae"] +'</span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="JM1[]" value="'+ t1 +'"> R'+ 
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="JM2[]" value="'+ t2 +'"></span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="YB1[]" value="'+ t3 +'"> R'+ 
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="YB2[]" value="'+ t4 +'"></span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:40px;" name="COLO[]" value="'+ data["colo"] +'"></span></td>'+
			                '<td width="330" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:320px;" name="T4BIGO[]" value="'+ data["t4bigo"] +'"></span></td>'+
			            '</tr>';
				}
				if(rec_num < 20){
					var t_num = 20 - rec_num;
					for(var i = 0; i < t_num; i++){
						htmlString +=
							'<tr>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="330" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>'+
				            '</tr>';
					}
				}
				$("#jpBonDetailData").html(htmlString);
			}
		});
		
		var from = { uid: uid, bucode: bucode}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jpjejak/select_jpbon_list4",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				var t1 = 0; var t2 = 0; var t3 = 0; var t4 = 0; var t5 = 0; var t6 = 0; var tta = 0; 
	 			htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					t1 += Math.floor(data["jm"] / 500);
					t2 += data["jm"] % 500;
					t3 += Math.floor(data["yb"] / 500);
					t4 += data["yb"] % 500;
					tta += data["jm"] + data["yb"];
				}
				t5 = Math.floor(tta / 500);
				t6 = tta % 500;
				
				$('input[name=SU1]').val(t1);
				$('input[name=SU2]').val(t2);
				$('input[name=SU3]').val(t3);
				$('input[name=SU4]').val(t4);
				$('input[name=SU5]').val(t5);
				$('input[name=SU6]').val(t6);
			}
		});
	}
	
	if(code == 2){ //잡물 
		$('#jejak_detail_view').html(jmenu5("본문작업지시서_디테일"));
		var from = { uid: uid }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jmjejak/select_jmbon_list2",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				var t1 = 0; var t2 = 0; var t3 = 0; var t4 = 0; var t5 = 0; var t6 = 0;
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var full_date = MsToFulldate(data["jbdate"]);
					full_date = full_date.substring(0,4) + "년 " + full_date.substring(4,6) + "월 " + full_date.substring(6,8) + "일";
					
					t1 = Math.floor(data["jm"] / 500);
					t2 = data["jm"] % 500;
					t3 = Math.floor(data["yb"] / 500);
					t4 = data["yb"] % 500;
					var tta = data["jm"] + data["yb"];
					t5 = Math.floor(tta / 500);
					t6 = tta % 500;
					
					(document.getElementById("wcname2")).innerHTML = data["wcname2"];
					(document.getElementById("jbdate")).innerHTML = full_date;
					(document.getElementById("jbname")).innerHTML = data["jbname"];
					(document.getElementById("yjname_yjcode")).innerHTML = data["yjname"] + " - " + data["yjcode"];
					(document.getElementById("pannum5")).innerHTML = data["pannum5"];
					(document.getElementById("jbamnt")).innerHTML = data["jbamnt"];
					(document.getElementById("comment")).innerHTML = data["t3bigo"];
					(document.getElementById("wcname")).innerHTML = data["wcname"];
					
					$('input[name=SU1]').val(t1);
					$('input[name=SU2]').val(t2);
					$('input[name=SU3]').val(t3);
					$('input[name=SU4]').val(t4);
					$('input[name=SU5]').val(t5);
					$('input[name=SU6]').val(t6);
				}
			}
		});
		
		var from = { uid: uid }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jmjejak/select_jmbon_list3",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
				var t1 = 0; var t2 = 0; var t3 = 0; var t4 = 0;  var rec_num = 0;
	 			htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					rec_num++;
					t1 = Math.floor(data["jm"] / 500);
					t2 = data["jm"] % 500;
					t3 = Math.floor(data["yb"] / 500);
					t4 = data["yb"] % 500;
					
					htmlString +=
						'<tr>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["gb"] +'</span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["dae"] +'</span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="JM1[]" value="'+ t1 +'"> R'+ 
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="JM2[]" value="'+ t2 +'"></span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="YB1[]" value="'+ t3 +'"> R'+ 
			                    '<INPUT style="text-align:center; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:30px;" name="YB2[]" value="'+ t4 +'"></span></td>'+
			                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["colo"] +'</span></td>'+
			                '<td width="330" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
			                    '<INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:320px;" name="T4BIGO[]" value="'+ data["t4bigo"] +'"></span></td>'+
			            '</tr>';
				}
				if(rec_num < 20){
					var t_num = 20 - rec_num;
					for(var i = 0; i < t_num; i++){
						htmlString +=
							'<tr>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
				                '<td width="330" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>'+
				            '</tr>';
					}
				}
				
				$("#jpBonDetailData").html(htmlString);
			}
		});
	}
}

function SearchPyo(code, date1, date2){ //표지작업지시서
	if(code == 1){//제품
		var from = {
			bdate1: date1, 
			bdate2: date2
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/jpjejak/select_jppyo_list",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
					
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var yakc = ""; var comment = "";
					var jnum1 = 0; var jnum2 = 0; var ynum1 = 0; var ynum2 = 0; 
					
					if (((data["bcode"] >='113010') && (data["bcode"] <='113019')) && (data["gubn"] == "면지")) comment = "앞면지+뒷면지";
					if (((data["bcode"] >='113010') && (data["bcode"] <='113019')) && (data["gubn"] == "화보")) comment = "화보 5대";
						
					jnum1 = Math.floor(data["jm"] / 500);
					jnum2 = data["jm"] % 500;
					ynum1 = Math.floor(data["yb"] / 500);
					ynum2 = data["yb"] % 500;
					
					if(data["gubn"] == "표지"){
						var from = {wccode: data["m2"]}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							async: false,
							url: "http://localhost:9090/jpjejak/select_selYakc",
							data : JSON.stringify(from),
							success: function (result2) {
								yakc = result2["wcyakc"];
								if(!yakc){
									logNow("값 없음");
									var from = {wccode: data["m3"]}
									$.ajax({
										type: "POST",
										contentType: "application/json; charset=utf-8;",
										dataType: "json",
										async: false,
										url: "http://localhost:9090/jpjejak/select_selYakc",
										data : JSON.stringify(from),
										success: function (result3) {
											yakc = result3["wcyakc"];
										}
									});
								}
							}
						});
					}else{
						var query_data = "";
						if (((data["bcode"] == "124910") && (data["gubn"] == "면지")) || ((data["bcode"] == "124920") && (data["gubn"] == "면지")) || ((data["bcode"] == "124930") && (data["gubn"] == "면지")) || ((data["bcode"] == "124940") && (data["gubn"] == "면지")) || ((data["bcode"] == "124950") && (data["gubn"] == "면지")) || ((data["bcode"] == "124960") && (data["gubn"] == "면지1")) || ((data["bcode"] == "124970") && (data["gubn"] == "면지1")) || ((data["bcode"] == "124980") && (data["gubn"] == "면지1"))){
							query_data = data["m5"];
						}else{
							if (((data["bcode"] == "124710") && (data["gubn"] == "면지")) || ((data["bcode"] == "124720") && (data["gubn"] == "면지")) || ((data["bcode"] == "124730") && (data["gubn"] == "면지")) || ((data["bcode"] == "124740") && (data["gubn"] == "면지")) || ((data["bcode"] == "124750") && (data["gubn"] == "면지")) || ((data["bcode"] == "124760") && (data["gubn"] == "면지")) || ((data["bcode"] == "124770") && (data["gubn"] == "면지"))|| ((data["bcode"] == "124780") && (data["gubn"] == "면지")) || ((data["bcode"] == "124790") && (data["gubn"] == "면지")) || ((data["bcode"] == "124800") && (data["gubn"] == "면지")) || ((data["bcode"] == "124810") && (data["gubn"] == "면지")) || ((data["bcode"] == "124820") && (data["gubn"] == "면지")) || ((data["bcode"] == "124830") && (data["gubn"] == "면지")) || ((data["bcode"] == "124840") && (data["gubn"] == "면지")) || ((data["bcode"] == "124850") && (data["gubn"] == "면지")) || ((data["bcode"] == "124860") && (data["gubn"] == "면지")) || ((data["bcode"] == "124870") && (data["gubn"] == "면지")) || ((data["bcode"] == "124880") && (data["gubn"] == "면지")) || ((data["bcode"] == "124890") && (data["gubn"] == "면지")) || ((data["bcode"] == "124900") && (data["gubn"] == "면지"))){
								query_data = data["m3"];
							}else{
								if ((data["m12"] != "N") && (((data["bcode"] == "124810") && (data["gubn"] == "별지")) || (data["bcode"] != "124810")) && (((data["bcode"] == "124820") && (data["gubn"] == "별지")) || (data["bcode"] != "124820")) && (((data["bcode"] == "124830") && (data["gubn"] == "별지")) || (data["bcode"] != "124830")) && (((data["bcode"] == "124840") && (data["gubn"] == "별지")) || (data["bcode"] != "124840")) && (((data["bcode"] == "124850") && (data["gubn"] == "별지")) || (data["bcode"] != "124850")) && (((data["bcode"] == "124860") && (data["gubn"] == "별지")) || (data["bcode"] != "124860")) && (((data["bcode"] == "124870") && (data["gubn"] == "별지")) || (data["bcode"] != "124870")) && (((data["bcode"] == "124880") && (data["gubn"] == "별지")) || (data["bcode"] != "124880")) && (((data["bcode"] == "124890") && (data["gubn"] == "별지")) || (data["bcode"] != "124890")) && (((data["bcode"] == "124900") && (data["gubn"] == "별지")) || (data["bcode"] != "124900"))){
									query_data = data["m12"];
									comment = "도무송작업";
								}else{
									if ((data["m13"] == "N") || (data["bcode"] == "124780")){
										query_data = data["m3"];
									}else{
										query_data = data["m13"];
										comment = "도무송작업";
									}
								}
							}
						}
						var from = {
							wccode: query_data
						}
						$.ajax({
							type: "POST",
							contentType: "application/json; charset=utf-8;",
							dataType: "json",
							async: false,
							url: "http://localhost:9090/jpjejak/select_selYakc",
							data : JSON.stringify(from),
							success: function (result4) {
								yakc = result4["wcyakc"];
							}
						});
					}
						
					if (data["bcode"] == "211200") comment = "표지코팅없음";
						
					htmlString += 
						'<tr>'+
							'<td width="270" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;&nbsp;'+ data["bname"] + ' - ' + data["bcode"] +'</span></td>'+
							'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(data["btype"] == 1) htmlString += '신간'; else htmlString += '재판'; htmlString += '</span></td>'+
							'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["bnum"]) +'</span></td>'+
							'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["gubn"] +'</span></td>'+
							'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["jname"] +'</span></td>'+
							'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jnum1 + ' R ' + jnum2 +'</span></td>'+
							'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ ynum1 + ' R ' + ynum2 +'</span></td>'+      
							'<td width="30" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
								'<input type="text" size="1" value="'+ data["colo"] +'"></span>'+
							'</td>'+
							'<td width="50" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ yakc +'</span></td>'+
							'<td width="80" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:2pt;">'+ numberWithCommas(data["sbuprc"]) +'&nbsp;'; if (data["btype"] == 3) htmlString += '※'; else htmlString += '&nbsp;&nbsp;&nbsp;'; htmlString += '</span></td>'+
							'<td width="120" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
								'<INPUT style="font-family:굴림; font-size:9pt; border-width:0px; border-color:rgb(204,204,204); border-style:solid; width:118px;" name="comm[]" value="'+ comment +'"></span>'+
							'</td>'+
						'</tr>';
				}
				$("#jpPyoData").html(htmlString);
			}
		});
		return;
	}
	if(code == 2){//잡물
		var from = {
			tdate1: date1, 
			tdate2: date2
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/jmjejak/select_jmpyo_list",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
						
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var yakc = ""; var comment = ""; var query_data = "";
					var jnum1 = 0; var jnum2 = 0; var ynum1 = 0; var ynum2 = 0; 
					
					jnum1 = Math.floor(data["jm"] / 500);
					jnum2 = data["jm"] % 500;
					ynum1 = Math.floor(data["yb"] / 500);
					ynum2 = data["yb"] % 500;
						
					if ((data["m2"] != 'N') && (data["gubn"] == "표지")) query_data = data["m2"];
					else query_data = data["m3"];
					
					var from = {wccode: query_data}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url: "http://localhost:9090/jpjejak/select_selYakc",
						data : JSON.stringify(from),
						success: function (result2) {
							logNow(result2);
							yakc = result2["wcyakc"];
						}
					});
					
					htmlString += 
						'<tr>'+
						'<td width="200" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;&nbsp;'+ data["jbname"] +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["jbamnt"]) +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["gubn"] +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["yjname"] +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ jnum1 + " R " + jnum2 +'</span></td>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ ynum1 + " R " + ynum2 +'</span></td>'+
						'<td width="30" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["sbjlsu"] +'</span></td>'+
						'<td width="30" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["colo"] +'</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ yakc +'</span></td>'+
						'<td width="180" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
							'<INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:170px;" name="comm[]"></span>'+
						'</td>'+
					'</tr>';
				}
				$("#jmPyoData").html(htmlString);
			}
		});
		return;
	}
}

function SearchJpBalYj(signdate){//발주예정제품리스트
	var from = {signdate: signdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: "http://localhost:9090/jpjejak/select_bjlist_list",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
					
			var object_num = Object.keys(result);
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				htmlString += 
					'<tr>'+
						'<td width="1410">'+
							'<table border="0" cellspacing="1" width="1400" bgcolor="#CCCCCC" bordercolorlight="#CCCCCC" bordercolordark="white" cellpadding="0">'+
								'<tr>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">순번</span></font></td>'+
									'<td width="50" bgcolor="white" height="40" align="center" valign="middle"><span style="font-size:9pt;">'+ (++i) +'</span></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">도서명</span></font></td>'+
									'<td width="300" bgcolor="white" height="40" align="left" valign="middle" colspan="3"><p style="margin-left:10px;"><span style="font-size:9pt;">'+ data["bname"] +'</span></p></td>'+
									'<td width="50" height="40" align="center" valign="middle" bgcolor="#F6F6F6"><span style="font-size:9pt;"><font color="#666666">코드</font></span></td>'+
									'<td width="50" height="40" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode"] +'</span></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">정가</span></font></td>'+
									'<td width="100" bgcolor="white" height="40" align="center" valign="middle" colspan="2"><span style="font-size:9pt;">'+ data["bprice"] +'</span></td>'+
									'<td width="700" bgcolor="#F6F6F6" height="40" align="left" valign="middle" colspan="14"><p><font color="#666666"><span style="font-size:9pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
										'<input type="button" value="발주" onClick="javascript:SendIt();">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+													
										'<input type="button" value="삭제" onClick="javascript:DelIt(<?=$row[uid]?>);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;월 별 실 판 매 수 량</span></font></p>'+
									'</td>'+														
								'</tr>'+
								'<tr>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">면수</span></font></td>'+
									'<td width="100" bgcolor="#F6F6F6" colspan="2" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">발주점 수량</span></font></td>'+
									'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">현 재고 수량</span></font></td>'+
									'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">판매<br>여유일</span></font></td>'+
									'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">발주 수량</span></font></td>'+
									'<td width="100" bgcolor="#F6F6F6" height="40" align="center" valign="middle" colspan="2"><font color="#666666"><span style="font-size:9pt;">최초발행</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">연간<br>증감율</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">월평균<br>판매</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">색도</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">년간<br>실판매</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">년간<br>총반입</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">01</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">02</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">03</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">04</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">05</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">06</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">07</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">08</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">09</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">10</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">11</span></font></td>'+
									'<td width="50" bgcolor="#F6F6F6" height="40" align="center" valign="middle"><font color="#666666"><span style="font-size:9pt;">12</span></font></td>'+
								'</tr>'+
								'<tr>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["bmyun"] +'</span></td>'+
									'<td width="100" bgcolor="white" colspan="2" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["pnum1"] +'</span></td>'+
									'<td width="100" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["pnum2"] +'</span></td>'+
									'<td width="100" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["pdate"] +'</span></td>'+
									'<td width="100" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["bnum"] +'</span></td>'+
									'<td width="100" bgcolor="white" height="30" align="center" valign="middle" colspan="2"><span style="font-size:9pt;">'+ data["pfirst"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["yinc"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["ppan"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["bcolor"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["ypan"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["yban"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p1"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p2"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p3"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p4"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p5"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p7"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p7"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p8"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p9"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p10"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p11"] +'</span></td>'+
									'<td width="50" bgcolor="white" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["p12"] +'</span></td>'+
								'</tr>'+
							'</table>'+
						'</td>'+
					'</tr>';
			}
			$("#jpBalYjData").html(htmlString);
		}
	});
	return;
}

function Searchjejakplan(code, date1, date2){//제작계획표
	if(code == 1){ //제품
		var from = {date1: date1, date2: date2}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jpjejak/select_jejakplan1",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
					
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var full_date = MsToFulldate(data["bdate"]);
					full_date = full_date.substring(2,4) + "/" + full_date.substring(4,6) + "/" + full_date.substring(6,8);
					
					var btype2 = ""; var t_p = ""; var t_j = ""; var t_g = ""; var SBJANH = ""; var inse = ""; var coat = "";
					
					if (data["sbinse"] > 0) inse = data["sbinse"];
					else inse = data["sbhj04"];
					if (inse) inse += "%";
				
					if (!data["bucode"]){
						t_p = "sbpanh";
						t_j = "sbjanh";
						t_g = "bmyun";
					}else{
						t_p = "sbsbph" + data["bucode"];
						t_j = "sbsbjh" + data["bucode"];
						t_g = "sbsbpg" + data["bucode"];
					}
					
					switch (parseInt(data[t_j])){
						case 1:
							SBJANH = "무선"; break;
						case 2:
							SBJANH = "반양장"; break;
						case 3:
							SBJANH = "절공"; break;
						case 4:
							SBJANH = "양장"; break;
						case 5:
							SBJANH = "중철"; break;
						case 6:
							SBJANH = "중미싱"; break;
						case 7:
							SBJANH = "스프링"; break;
				        case 8:
							SBJANH = "PUR"; break;
					}
					
					switch (data["btype"]){
						case 1:
							btype2 = "신간"; break;
						case 2:
							btype2 = "재판"; break;
						case 3:
							btype2 = "개정"; break;
					}
					
					switch (data["sbcoti"]){
						case 1:
							coat = "유광"; break;
						case 2:
							coat = "무광"; break;
						case 3:
							coat = "홀로그램"; break;
						case 4:
							coat = "홀로그램(크리스탈)"; break;
						case 5:
							coat = "엠보싱"; break;
						case 7:
							coat = "무광에폭시"; break;
						case 8:
							coat = "유광에폭시"; break;
						default:
							coat = " "; break;
					}
					
					var from = {uid: data["uid"]}
					var arr_size = 0;
					var yongji_array = new Array();
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url: "http://localhost:9090/jpjejak/select_jejakplan2",
						data : JSON.stringify(from),
						success: function (result2) {
							var object_num = Object.keys(result2);
							var jnum1 = 0; var jnum2 = 0; var ynum1 = 0; var ynum2 = 0;
							for(var i in object_num){
								var data2 = result2[object_num[i]]; 
									
								jnum1 = Math.floor(data2["jm"] / 500);
								jnum2 = data2["jm"] % 500;
								jnum = jnum1 + " R " + jnum2;
								ynum1 = Math.floor(data2["yb"] / 500);
								ynum2 = data2["yb"] % 500;
								ynum = ynum1 + " R " + ynum2;
							
								yongji_array[arr_size] = new Array (data2["gubn"], data2["jcode"], data2["jname"], data2["colo"], jnum, ynum);
								
								arr_size++;
							}
						}
					});
					
					var prev_jj = "";
					var from = {bcode: data["bcode"], listid: data["listid"]}
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url: "http://localhost:9090/jpjejak/select_jejakplan3",
						data : JSON.stringify(from),
						success: function (result) {
							var object_num = Object.keys(result);
							for(var i in object_num){
								var data = result[object_num[i]]; 
								
								var from = {uid: data["uid"]}
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8;",
									dataType: "json",
									async: false,
									url: "http://localhost:9090/jpjejak/select_jejakplan4",
									data : JSON.stringify(from),
									success: function (result) {
										if(result){
											prev_jj = data["signdate"].substring(2,4) + ". "+ data["signdate"].substring(4,6) + ". " + data["signdate"].substring(6) + " : " + data["bnum"] + " 부";
										}
									}
								});	
								break;
							}
						}
					});
					
					htmlString += 
						'<tr>'+
							'<td width="320" align="center" valign="top" style="border-right-width:1px; border-right-color:rgb(102,102,102); border-right-style:dotted;">'+
								'<table border="0" cellpadding="2" cellspacing="0" width="310">'+
									'<tr>'+
										'<td width="59" height="25" valign="middle" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><b><font face="돋움">'+ full_date +'</font></b></span></td>'+
										'<td width="242" colspan="6" height="25" valign="middle" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><b><font face="돋움">'+ data["bname"] +'</font></b></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="59" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><font face="돋움">'+ data["bcode"] + '-' + data["bucode"] +'</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ btype2 +'</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">'+ numberWithCommas(data["bprice"]) +'</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">'+ numberWithCommas(data["bnum"]) +'</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ data[t_p] + '</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ SBJANH + '</font></span></td>'+
										'<td width="32" height="25" valign="middle" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ data[t_g] + '</font></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="59" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><font face="돋움">'+ data["crnum"] +'</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt; padding-left:0pt;"><font face="돋움">'+ inse +'</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="32" height="25" valign="middle" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="306" colspan="7" height="25" valign="middle" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;"><span style="font-size:9pt;"><font face="돋움">'; if(data["sbbigo"]) htmlString += ' ≫ ' + data["sbbigo"]; htmlString += '</font></span></td>'+
									'</tr>'+
								'</table>'+
							'</td>'+
							'<td width="320" align="center" valign="top" style="border-right-width:1px; border-right-color:rgb(102,102,102); border-right-style:dotted;">'+
								'<table border="0" cellpadding="2" cellspacing="0" width="311">';
									for(var i=0; i < arr_size ; i++){
										htmlString += 
											'<tr>'+
												'<td width="49" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][0] +'</font></span></td>'+
												'<td width="49" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][1] +'</font></span></td>'+
												'<td width="69" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][2] +'</font></span></td>'+
												'<td width="19" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][3] +'</font></span></td>'+
												'<td width="48" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][4] +'</font></span></td>'+
												'<td width="48" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;" height="25" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][5] +'</font></span></td>'+
											'</tr>';
										}
									htmlString +=
								'</table>'+
							'</td>'+
							'<td width="240" align="center" valign="top">'+
								'<table border="0" cellpadding="2" cellspacing="0" width="231">'+
									'<tr>'+
										'<td width="85" height="25" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m1"] != "0") htmlString += data["m1"] + '&nbsp;' + data["wcname1"]; htmlString += '</font></span></td>'+
										'<td width="85" height="25" style="border-top-width:0px; border-right-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m2"] != "0") htmlString += data["m2"] + '&nbsp;' + data["wcname2"]; htmlString += '</font></span></td>'+
										'<td width="49" height="25" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;" valign="middle" align="center" ><span style="font-size:9pt;"><font face="돋움">'+ coat +'</font></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="85" height="25" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m3"] != "0") htmlString += data["m3"] + '&nbsp;' + data["wcname3"]; htmlString += '</font></span></td>'+
										'<td width="85" height="25" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt; padding-left:0pt;"><font face="돋움"></font></span></td>'+
										'<td width="49" height="25" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;" valign="middle" align="center" ><span style="font-size:9pt;"><font face="돋움">'+
											'<input type="button" value="취소" onClick="javascript:CancelIt(<?=$row[uid]?>,<?=$row[crnum]?>);"></font></span>'+
										'</td>'+
									'</tr>'+
									'<tr>'+
										'<td width="219" colspan="3" height="25" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt; padding-left:0pt;"><font face="돋움">'+ prev_jj +'</font></span></td>'+
									'</tr>'+
								'</table>'+
							'</td>'+
						'</tr>'+
						'<tr>'+
							'<td width="880" colspan="3" height="1" style="border-top-width:1px; border-top-color:rgb(0,0,0); border-top-style:solid;"><span style="font-size:1pt;"></span></td>'+
						'</tr>';
				}
				$("#jpJejakplanData").html(htmlString);
			}
		});
	}
	if(code == 2){ //잡물
		var from = {date1: date1, date2: date2}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jmjejak/select_jejakplan1",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
					
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]]; 
					
					var full_date = MsToFulldate(data["jbdate"]);
					full_date = full_date.substring(2,4) + "/" + full_date.substring(4,6) + "/" + full_date.substring(6,8);
					
					var t_p = ""; var t_j = ""; var t_g = ""; var SBJANH = ""; var coat = "";
					
					t_p = "sbpanh";
					t_j = "sbjanh";
					t_g = "bmyun";
					
					switch (data["jbjanh"])
					{
						case 1:
							SBJANH = "무선"; break;
						case 2:
							SBJANH = "반양장"; break;
						case 3:
							SBJANH = "절공"; break;
						case 4:
							SBJANH = "양장"; break;
						case 5:
							SBJANH = "중철"; break;
						case 6:
							SBJANH = "중미싱"; break;
						case 7:
							SBJANH = "스프링"; break;
			            case 8:
							SBJANH = "PUR"; break;
						default:
							SBJANH = "없음"; break;
					}
					
					switch (data["sbcoti"]){
						case 1:
							coat = "유광"; break;
						case 2:
							coat = "무광"; break;
						case 3:
							coat = "홀로그램"; break;
						case 4:
							coat = "홀로그램(크리스탈)"; break;
						case 5:
							coat = "엠보싱"; break;
						case 7:
							coat = "무광에폭시"; break;
						case 8:
							coat = "유광에폭시"; break;
						default:
							coat = " "; break;
					}
					
					var from = {uid: data["uid"]}
					var arr_size = 0;
					var yongji_array = new Array();
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8;",
						dataType: "json",
						async: false,
						url: "http://localhost:9090/jmjejak/select_jejakplan2",
						data : JSON.stringify(from),
						success: function (result2) {
							var object_num = Object.keys(result2);
							var jnum1 = 0; var jnum2 = 0; var ynum1 = 0; var ynum2 = 0;
							for(var i in object_num){
								var data2 = result2[object_num[i]]; 
									
								jnum1 = Math.floor(data2["jm"] / 500);
								jnum2 = data2["jm"] % 500;
								jnum = jnum1 + " R " + jnum2;
								ynum1 = Math.floor(data2["yb"] / 500);
								ynum2 = data2["yb"] % 500;
								ynum = ynum1 + " R " + ynum2;
							
								yongji_array[arr_size] = new Array (data2["gubn"], data2["yjcode"], data2["yjname"], data2["colo"], jnum, ynum);
								
								arr_size++;
							}
						}
					});
					
					htmlString += 
						'<tr>'+
							'<td width="320" align="center" valign="top" style="border-right-width:1px; border-right-color:rgb(102,102,102); border-right-style:dotted;">'+
								'<table border="0" cellpadding="2" cellspacing="0" width="310">'+
									'<tr>'+
										'<td width="59" height="25" valign="middle" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><b><font face="돋움">'+ full_date +'</font></b></span></td>'+
										'<td width="242" colspan="6" height="25" valign="middle" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><b><font face="돋움">'+ data["jbname"] +'</font></b></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="59" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">'+ numberWithCommas(data["jbamnt"]) +'</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ data["jbpanh"] +'</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ SBJANH +'</font></span></td>'+
										'<td width="32" height="25" valign="middle" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">'+ data["jbpage"] +'</font></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="59" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;"><span style="font-size:9pt;"><font face="돋움">'+ (++i) +'</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="49" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="right"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="29" height="25" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
										'<td width="32" height="25" valign="middle" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;" align="center"><span style="font-size:9pt;"><font face="돋움">&nbsp;</font></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="306" colspan="7" height="25" valign="middle" style="border-bottom-width:1px; border-bottom-color:rgb(153,153,153); border-bottom-style:dashed;"><span style="font-size:9pt;"><font face="돋움">'; if(data["jbbigo"]) htmlString += ' ≫ ' + data["jbbigo"]; htmlString += '</font></span></td>'+
									'</tr>'+
								'</table>'+
							'</td>'+
							'<td width="320" align="center" valign="top" style="border-right-width:1px; border-right-color:rgb(102,102,102); border-right-style:dotted;">'+
								'<table border="0" cellpadding="2" cellspacing="0" width="311">';
									for(var i=0; i < arr_size ; i++){
										htmlString += 
											'<tr>'+
												'<td width="49" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][0] +'</font></span></td>'+
												'<td width="49" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][1] +'</font></span></td>'+
												'<td width="69" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][2] +'</font></span></td>'+
												'<td width="19" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][3] +'</font></span></td>'+
												'<td width="48" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" height="25" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][4] +'</font></span></td>'+
												'<td width="48" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;" height="25" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움">'+ yongji_array[i][5] +'</font></span></td>'+
											'</tr>';
									}
									htmlString +=
								'</table>'+
							'</td>'+
							'<td width="240" align="center" valign="top">'+
								'<table border="0" cellpadding="2" cellspacing="0" width="231">'+
									'<tr>'+
										'<td width="85" height="25" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m1"] != "N") htmlString += data["m1"] + '&nbsp;' + data["wcname1"]; htmlString += '</font></span></td>'+
										'<td width="85" height="25" style="border-top-width:0px; border-right-width:1px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m2"] != "N") htmlString += data["m2"] + '&nbsp;' + data["wcname2"]; htmlString += '</font></span></td>'+
										'<td width="49" height="45" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;" valign="middle" align="center"><span style="font-size:9pt;"><font face="돋움"><?=$coat?></font></span></td>'+
									'</tr>'+
									'<tr>'+
										'<td width="85" height="25" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m3"] != "N") htmlString += data["m3"] + '&nbsp;' + data["wcname3"]; htmlString += '</font></span></td>'+
										'<td width="85" height="25" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-right-style:dashed; border-bottom-style:dashed;" valign="middle"><span style="font-size:9pt;"><font face="돋움">'; if(data["m8"] != "N") htmlString += data["m8"] + '&nbsp;' + data["wcname8"]; htmlString += '</font></span></td>'+
										'<td width="49" height="45" style="border-top-width:0px; border-bottom-width:1px; border-top-color:rgb(153,153,153); border-bottom-color:rgb(153,153,153); border-top-style:dashed; border-bottom-style:dashed;" valign="middle" align="center"><span style="font-size:9pt;"><font face="돋움">'+
											'<input type="button" value="취소" onClick="javascript:CancelIt(<?=$row[UID]?>);"></font></span>'+
										'</td>'+
									'</tr>'+
								'</table>'+
							'</td>'+
						'</tr>'+								
						'<tr>'+
							'<td width="880" colspan="3" height="1" style="border-top-width:1px; border-top-color:rgb(0,0,0); border-top-style:solid;"><span style="font-size:1pt;"></span></td>'+
						'</tr>';	
				}
				$("#jmJejakplanData").html(htmlString);
			}
		});
	}
}

function SearchDays(code, bdate){
	if(code == 1){//제품제작
		var from = {bdate: bdate}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/jpjejak/select_jp_date",
			data : JSON.stringify(from),
			success: function (result) {
				
				logNow(result);
				var object_num = Object.keys(result);
			    
			    $("select[name=td] option").remove(); //select option 초기화
			    $("select[name=td]").append("<option value=''>-</option>");
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var day = MsToFulldate(data["bdate"]).substring(6,8);
					$("select[name=td]").append("<option value='" + day + "'>" + day + "</option>");
				}
			}
		});
	}
	if(code == 2){//잡물제작
		var from = {jbdate: bdate}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: "http://localhost:9090/jmjejak/select_jm_date",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
			    
			    $("select[name=td] option").remove(); //select option 초기화
			    $("select[name=td]").append("<option value=''>-</option>");
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var day = MsToFulldate(data["jbdate"]).substring(6,8);
					$("select[name=td]").append("<option value='" + day + "'>" + day + "</option>");
				}
			}
		});
	}
	
	if(code == 3){//둘다합친거
		$("select[name=td] option").remove(); //select option 초기화
		var from = {bdate: bdate}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jpjejak/select_jp_date",
			data : JSON.stringify(from),
			success: function (result) {
				
				logNow(result);
				var object_num = Object.keys(result);
			    
			    $("select[name=td]").append("<option value=''>-</option>");
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var day = MsToFulldate(data["bdate"]).substring(6,8);
					$("select[name=td]").append("<option value='" + day + "'>" + day + "</option>");
				}
			}
		});
		var from = {jbdate: bdate}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: "http://localhost:9090/jmjejak/select_jm_date",
			data : JSON.stringify(from),
			success: function (result) {
				logNow(result);
				var object_num = Object.keys(result);
			    
			    $("select[name=td]").append("<option value=''>-</option>");
				
				for(var i in object_num){
					var data = result[object_num[i]]; 
					var day = MsToFulldate(data["jbdate"]).substring(6,8);
					$("select[name=td]").append("<option value='" + day + "'>" + day + "</option>");
				}
			}
		});
	}
}

function SearchKbYongji(date1, date2){ //용지대
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "http://localhost:9090/directkb/select_kb_yongji1",
		async: false,
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var from = {
					date1: date1, 
					date2: date2,
					wccode: data["wccode"]
					}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: "http://localhost:9090/directkb/select_kb_yongji2",
					data : JSON.stringify(from),
					success: function (result2) {
						logNow(result2);
								
						var object_num = Object.keys(result2);
						for(var i in object_num){
							var data2 = result2[object_num[i]]; 
							if (data2["count"] > 0){
								var j = 1; 
								htmlString += 
									'<tr>'+
										'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ (j++) +'</span></td>'+
										'<td style="padding-left:10px;" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</a></span></td>'+
										'<td style="padding-right:10px;" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data2["count"]) +'</span></td>'+
										'<td style="padding-right:10px;" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data2["sum"]) +'</span></td>'+
										'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><input type="button" value="인 쇄" onClick="javascript:PrintIt(<?=$sy?>, <?=$sm?>, <?=$row[wccode]?>)"></span></td>'+
									'</tr>';
							}
						}
					}
				});
			}
			$("#kbYongjiData").html(htmlString);
		}
	});
}

function SearchKbPresswork(date1, date2){ //인쇄비
	var from = {
		date1: date1, 
		date2: date2
		}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: "http://localhost:9090/directkb/select_kb_presswork1",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
						
			var object_num = Object.keys(result);
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				var f_sum = 0; var p_sum = 0; var op2 = 0; var op51 = ""; var op52 = "";
				
				var full_date = MsToFulldate(data["bdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				var from = {uid: data["uid"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: "http://localhost:9090/directkb/select_kb_presswork2",
					data : JSON.stringify(from),
					success: function (result2) {
						var object_num = Object.keys(result2);
						for(var i in object_num){
							var data2 = result2[object_num[i]]; 
							op2 = data2["op52"];
							f_sum += data2["sum5"];
						}
					}
				});
				
				var from = {uid: data["uid"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: "http://localhost:9090/directkb/select_kb_presswork3",
					data : JSON.stringify(from),
					success: function (result2) {
						var object_num = Object.keys(result2);
						for(var i in object_num){
							var data2 = result2[object_num[i]]; 
							p_sum += data2["pcost"];
						}
					}
				});
				switch (data["tax"]){
					case 0:
						op51 = "세금계산서"; break;
					case 1:
						op51 = "계산서"; break;
				}
				switch(op2){
					case 1:
						op52 = "제품원가"; break;
					case 2:
						op52 = "관리비"; break;
				}
				
				htmlString +=
					'<tr>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["crnum"] +'</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="280" height="30" align="left" valign="middle" bgcolor="white"><a href="javascript:SearchKbPressworkDetail('+ data["uid"] +')" class="n"><p style="margin-left:5px;"><span style="font-size:9pt;">'+ data["bname"] +'&nbsp;&nbsp;:&nbsp;&nbsp;'+ data["bcode"]; if(data["bucode"]) htmlString += '-' + data["bucode"]; htmlString += '</span></p></a></td>'+
						'<td width="77" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
						'<td style="padding-right:10;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(p_sum) +'</span></td>'+
						'<td style="padding-right:10;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(f_sum) +'</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ op51 +'</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ op52 +'</span></td>'+
					'</tr>';
			}
		}
	});
	$("#kbPressworkData").html(htmlString);
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: "http://localhost:9090/directkb/select_kb_presswork4",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
						
			var object_num = Object.keys(result);
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				var f_sum = 0; var p_sum = 0; 
				
				var full_date = MsToFulldate(data["jbdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				var from = {uid: data["uid"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: "http://localhost:9090/directkb/select_kb_presswork5",
					data : JSON.stringify(from),
					success: function (result2) {
						var object_num = Object.keys(result2);
						for(var i in object_num){
							var data2 = result2[object_num[i]]; 
							f_sum += data2["sum5"];
						}
					}
				});
				
				var from = {uid: data["uid"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: "http://localhost:9090/directkb/select_kb_presswork6",
					data : JSON.stringify(from),
					success: function (result2) {
						var object_num = Object.keys(result2);
						for(var i in object_num){
							var data2 = result2[object_num[i]]; 
							p_sum += data2["pcost"];
						}
					}
				});
				
				htmlString +=
					'<tr>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="280" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ data["jbname"] +'</span></td>'+
						'<td width="77" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span></td>'+
						'<td style="padding-right:10;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(p_sum) +'</span></td>'+
						'<td style="padding-right:10;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(f_sum) +'</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">세금계산서</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">관리비</span></td>'+
					'</tr>';
			}
		}
	});
	$("#kbPressworkData2").html(htmlString);
}

function SearchKbPressworkDetail(uid){ //인쇄비 디테일
	$('#jejak_detail_view').html(jmenu6("인쇄비_디테일"));
	
	var from = { uid: uid }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: "http://localhost:9090/directkb/select_kb_presswork7",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["bdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				htmlString +=
					'<tr>'+
				        '<td width="780">'+
				        	'<table border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC">'+
					            '<tr>'+
					                '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">제작번호</span></td>'+
					                '<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["crnum"] +'</span></td>'+
					                '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">년월일</span></td>'+
					                '<td width="100" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
					                '<td width="80" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">도서명</span></td>'+
					                '<td style="padding-left:10;" width="353" height="30" bgcolor="white"><span style="font-size:9pt;">'+ data["bname"] + ' - ' + data["bcode"] +  '</span></td>'+
					            '</tr>'+
					        '</table>'+
					    '</td>'+
				    '</tr>'+
				    '<tr>'+
				        '<td width="780" height="10"></td>'+
				    '</tr>'+
				    '<tr>'+
				        '<td width="780">'+
				        	'<table border="0" cellspacing="1" width="780" bordercolordark="white" bordercolorlight="black" bordercolor="#CCCCCC" cellpadding="0" bgcolor="#CCCCCC">'+
				                '<tr>'+
				                    '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">거래처</span></td>'+
				                    '<td width="200" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] + ' - ' + data["m1"] +'</span></td>'+
				                    '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">계산</span></td>'+
				                    '<td width="145" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
					                    '<select name="op1" size="1" style="font-family:굴림; font-size:9pt; width:100;">'+
						                    '<option value="0"'; if (data["tax"] == 0) htmlString += ' selected'; htmlString += '>세금계산서</option>'+
						                    '<option value="1"'; if (data["tax"] == 1) htmlString += ' selected'; htmlString += '>계산서</option>'+
										'</select></span>'+
				                    '</td>'+
				                    '<td width="70" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">회계</span></td>'+
				                    '<td width="145" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+
					                    '<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:100;">'+
						                    '<option value="1">제품원가</option>'+
						                    '<option value="2">관리비</option>'+
										'</select></span>'+
				                    '</td>'+
				                    '<td width="72" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;"><a href="javascript:Chg(<?=$uid?>);"><img src="/resources/style/images/jejak/btn_modify.gif" border="0"></a></span></td>'+
				                '</tr>'+
				            '</table>'+
				        '</td>'+
				    '</tr>';
			}
			$("#kbPressworkDetailData").html(htmlString);
		}
	});
	var record_num = 1; var sum_all = 0; var sum_1 = 0; var sum_2 = 0; var sum_3 = 0;
	var from = { uid: uid }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: "http://localhost:9090/directkb/select_kb_presswork8",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			var total_record = object_num.length;
		
			htmlString = "";
			var htmlString2 = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				if (data["filmcost5"]) sum_1 += data["filmcost5"];
				else sum_1 += data["daeji5"];
				sum_all += (data["filmcost5"] * 1.1);
				
				sum_2 += data["sobu5"];
				sum_all += (data["sobu5"] * 1.1);
				
				htmlString +=
					'<tr>'+
	                    '<td width="114" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["gubn5"] +'</span></td>'+
	                    '<td width="114" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["filmnum5"] +'</span></td>'+
	                    '<td width="114" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(data["filmdan5"]) + '</span></td>'+
	                    '<td width="114" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(data["filmcost5"]) + '</span></td>'+
	                    '<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><input type="text" size="10" name="daeji5[]" value="'+ data["daeji5"] +'"></span></td><input type="hidden" name="t5id[]" value="<?=$row[uid]?>">'+
	                    '<td width="141" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(record_num == total_record) htmlString += numberWithCommas(sum_1 * 1.1); htmlString += '</span></td>'+
	                    '<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'; if(record_num == total_record) htmlString += '<input type="image" src="/resources/style/images/jejak/btn_modify.gif" onClick="this.form.submit();">'; htmlString += '</span></td>'+
	                '</tr>';
	                    
				htmlString2 +=
					'<tr>'+
		                '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["gubn5"] +'</span></td>'+
		                '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["panst5"] +'</span></td>'+
		                '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["pannum5"] +'</span></td>'+
		                '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">' + numberWithCommas(data["sobudan5"]) + '</span></td>'+
		                '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">' + numberWithCommas(data["sobu5"]) + '</span></td>'+
		                '<td width="125" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'; if(record_num == total_record) htmlString2 += numberWithCommas(Math.floor(sum_2 * 1.1)); htmlString2 += '</span></td>'+
		            '</tr>';
		        record_num++;
			}
			$("#kbPressworkDetailData2").html(htmlString);
			$("#kbPressworkDetailData3").html(htmlString2);
		}
	});
	
	var from = { uid: uid }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: "http://localhost:9090/directkb/select_kb_presswork9",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			var total_record = object_num.length;
			
			htmlString = "";
			record_num = 1;
			
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				sum_3 += data["pcost"];
				sum_all += data["pcost"];
				
				htmlString +=
					'<tr>'+
	                    '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["gubn"] +'</span></td>'+
	                    '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["rnum"] +'</span></td>'+
	                    '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["colo"] +'</span></td>'+
	                    '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">' + numberWithCommas(data["pdanga"]) + '</span></td>'+
	                    '<td width="128" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">' + numberWithCommas(data["pcost"]) + '</span></td>'+
	                    '<td width="125" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'; if(record_num == total_record) htmlString += numberWithCommas(sum_3); htmlString += '</span></td>'+
	                '</tr>';
				record_num++;
			}
			$("#kbPressworkDetailData4").html(htmlString);
			(document.getElementById("sum_all")).innerHTML = numberWithCommas(sum_all);
		}
	});
	
}

function SearchBinding(bdate){ //제본비
	var tdate;
	var tm = parseInt(bdate.substring(4,6)) - 1;
	if(tm <= 0){
		var ty = parseInt(bdate.substring(2,4)) - 1;
		tdate = (ty >= 10 ? ty : '0' + ty) + "12" + "%";
	}
	else tdate = bdate.substring(2,4) + (tm >= 10 ? tm : '0' + tm) + "%";
	
	var from = {tdate: tdate}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: "http://localhost:9090/directkb/select_kb_binding1",
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result);
			htmlString = ""; var tsum = 0;
			for(var i in object_num){
				var data = result[object_num[i]]; 
				var from = {t1id: data["t1id"], idate: data["idate"]}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					async: false,
					url: "http://localhost:9090/directkb/select_kb_binding2",
					data : JSON.stringify(from),
					success: function (result2) {
						if(result2.length == 0) {
							var from = {juid: data["juid"]}
							$.ajax({
								type: "POST",
								contentType: "application/json; charset=utf-8;",
								dataType: "json",
								async: false,
								url: "http://localhost:9090/directkb/select_kb_binding3",
								data : JSON.stringify(from),
								success: function (result3) {
									sum_totcost7 = result3["sum_totcost7"];
									logNow(data);
									
									var full_date = MsToFulldate(data["jdate"]);
									full_date = full_date.substring(2,4) + "/" + full_date.substring(4,6) + "/" + full_date.substring(6,8);
									
									var full_date2 = data["idate"];
									full_date2 = full_date2.substring(0,2) + "/" + full_date2.substring(2,4) + "/" + full_date2.substring(4,6);
									
									tsum += sum_totcost7;
									
									htmlString += 
										'<tr>'+
											'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
											'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date2 +'</span></td>'+
											'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bookcode"] +'</span></td>'+
											'<td height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:10pt;">'+ data["bookname"] +'</span></td>'+
											'<td height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
											'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">'+ numberWithCommas(data["jnum"]) +'</span></td>'+
											'<td height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:10pt;">'+ numberWithCommas(sum_totcost7) +'</span></td>'+
										'</tr>';
									
									
								}
							});
							$("#kbBindingData").html(htmlString);
							(document.getElementById("tsum")).innerHTML = numberWithCommas(tsum);
						}
					}
				});
			}
		}
	});
	
	
}

function SerchCoating(date1, date2){//코팅비
	var from = { date1: date1, date2: date2 }
	var sp3 = 0;
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: "http://localhost:9090/directkb/select_kb_coating1",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["bdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				var p3 = Math.floor(data["totcost8"] * 1.1);
				sp3 += p3;
				
				htmlString +=
					'<tr>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["crnum"] +'</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="260" height="30" align="left" valign="middle" bgcolor="white"><p style="margin-left:5px;"><span style="font-size:9pt;">'+
							'<a href="javascript:SearchCosting('+ data["uid"] +')" class="n">'+ data["bname"] + ' - ' + data["bcode"] + '</span></p></a>'+
						'</td>'+
						'<td width="77" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["cnum8"] +' R</span></td>'+
						'<td style="padding-right:10;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["cprice8"]) +'</span></td>'+
						'<td width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(p3) +'</span></td>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">대신실업</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">제품</span></td>'+
					'</tr>';
			}
			$("#kbCoatingData1").html(htmlString);
		}
	});
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: "http://localhost:9090/directkb/select_kb_coating2",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["jbdate"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				var p3 = Math.floor(data["totcost8"] * 1.1);
				sp3 += p3;
				
				htmlString +=
					'<tr>'+
						'<td width="60" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">&nbsp;</span></td>'+
						'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td width="260" height="30" align="left" valign="middle" bgcolor="white"><p style="margin-left:5px;"><span style="font-size:9pt;">'+
							'<a href="exj_view.php?uid=<?=$row[uid]?>" class="n">'+ data["jbname"] +'</span></p></a>'+
						'</td>'+
						'<td width="77" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["cnum8"] +' R</span></td>'+
						'<td style="padding-right:10;" width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ numberWithCommas(data["cprice8"]) +'</span></td>'+
						'<td width="70" height="30" align="right" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-right:5pt;">'+ numberWithCommas(p3) +'</span></td>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">대신실업</span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">관리비</span></td>'+
					'</tr>';
			}
			$("#kbCoatingData2").html(htmlString);
			
		}
	});
	(document.getElementById("sp3")).innerHTML = numberWithCommas(sp3);
}

function SearchCosting(uid){//코팅비_디테일 //원가계산서 //미완성
	
}

function SearchKbManagement(tag, date1, date2){ //비닐비, 케이스대, CD음반대, 스티커대, 기타
	var from = { tag: tag, date1: date1, date2: date2 }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: "http://localhost:9090/directkb/select_kb_management1",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["cdate9"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				if(data["cnum9"] == 0) var t_dan = 0;
				else var t_dan = Math.ceil((data["cprice9"] / 1.1) / data["cnum9"]);
				
				htmlString +=
					'<tr>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td style="padding-left:10px;" width="220" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:SearchKbManagementDetail('+ data["ccode9"] + ',' + tag +')" class="n">'+ data["sbname"] +'</a></span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode9"] +'</span></td>'+
						'<td width="150" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(data["cnum9"]) + '</span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(t_dan) + '</span></td>'+
						'<td width="90" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(data["cprice9"]) + '</span></td>'+
					'</tr>';
			}
			$("#kbManagementData1").html(htmlString);
		}
	});
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: "http://localhost:9090/directkb/select_kb_management2",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["cdate9"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				if(data["cnum9"] == 0) var t_dan = 0;
				else var t_dan = Math.ceil((data["cprice9"] / 1.1) / data["cnum9"]);
				
				htmlString +=
					'<tr>'+
						'<td width="90" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
						'<td style="padding-left:10px;" width="220" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt;"><a href="javascript:SearchKbManagementDetail('+ data["ccode9"] + ',' + tag +')" class="n">'+ data["sbname"] +'</a></span></td>'+
						'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["bcode9"] +'</span></td>'+
						'<td width="150" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ data["wcname"] +'</span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(data["cnum9"]) + '</span></td>'+
						'<td width="80" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(t_dan) + '</span></td>'+
						'<td width="90" height="30" align="right" style="padding-right:10" valign="middle" bgcolor="white"><span style="font-size:9pt;">' + numberWithCommas(data["cprice9"]) + '</span></td>'+
					'</tr>';
			}
			$("#kbManagementData2").html(htmlString);
		}
	});
}

function SearchKbManagementDetail(ccode9, tag){ //  //비닐비, 케이스대, CD음반대, 스티커대, 기타 - 디테일
	$('#jejak_detail_view').html(jmenu6("관리비_디테일"));
	var tag_name; var btag;
	switch (tag){
    	case 1:
    		tag_name = "비닐 관리";
    		btag = "비닐";
    		break;
    	case 2:
    		tag_name = "케이스 관리";
    		btag = "케이스";
    		break;
    	case 3:
    		tag_name = "CD. 음반 관리";
    		btag = "CD";
    		break;
    	case 4:
    		tag_name = "스티커 관리";
    		btag = "스티커";
    		break;
    	case 5:
    		tag_name = "기타 관리";
    		btag = "기타";
    		break;
    }
	(document.getElementById("tag_name")).innerHTML = tag_name;
	
	var from = { ccode9: ccode9 }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: "http://localhost:9090/directkb/select_kb_management3",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var data = result[0];
			htmlString = "";
			htmlString += 
				'<tr>'+
		            '<td width="140" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">거래처</span></td>'+
		            '<td width="345" height="30" align="center" valign="middle" bgcolor="white"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:290px; text-align:center;" name="cname" value="'+ data["wcname"] + ' - ' + data["wccode"] +'" onFocus="blur();" onClick="javascript:AddC();"></td>'+
		            '<td width="102" height="30" align="center" valign="middle" bgcolor="#F4F4F4"><span style="font-size:9pt;">계산</span></td>'+
		            '<td width="185" height="30" align="center" valign="middle" bgcolor="white">'+
		            	'<select name="op1" size="1" style="font-family:굴림; font-size:9pt; width:100;">'+
		                    '<option value="0"'; if(data["tax"] == 0) htmlString += ' selected'; htmlString += '>세금계산서</option>'+
		                    '<option value="1"'; if(data["tax"] == 1) htmlString += ' selected'; htmlString += '>계산서</option>'+
						'</select>'+
					'</td>'+
		        '</tr>'+
		        '<input type="hidden" name="cc" value="<?=$cc?>">'+
		        '<input type="hidden" name="tag" value="<?=$tag?>">';
			
		    $("#kbManagementDetailData1").html(htmlString);
		}
	});
	
	var record_no = 1; var sum = 0;
	
	var from = { ccode9: ccode9, tag: tag }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: "http://localhost:9090/directkb/select_kb_management4",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			var  t_mul = 0;
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["cdate9"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				if (data["cnum9"]) t_mul = (data["cprice9"] / 1.1) / data["cnum9"];
				else t_mul = 0;
				sum += t_mul;
				
				var top2 = data["op29"];
				
				htmlString +=
					'<tr>'+
		                '<td width="50" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ (record_no++) +'</span></td>'+
		                '<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
		                '<td width="270" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["sbname"] +'&nbsp;-&nbsp;'+ data["sbbook"] +'</span></td>'+
		                '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(t_mul.toFixed(2)) +'</span></td>'+
		                '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(data["cnum9"]) +'</span></td>'+
		                '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'; 
							if(data["cprice9"]) htmlString += numberWithCommas(data["cprice9"]); 
							else htmlString +=  
								'<INPUT style="text-align:right; padding-right:5; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:60px;" name="cprice[]">'+
								'<input type="hidden" name="uid[]" value="'+ data["uid"] +'">'; htmlString += '</span>'+
		                '</td>'+
		                '<td width="162" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+
		                    '<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:Chg(this.value, <?=$row[uid]?>, <?=$row[ccode9]?>, <?=$tag?>);">'+
							//<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:60;">
			                    '<option value="1"'; if(data["op29"] == 1) htmlString += ' selected'; htmlString += '>제품</option>'+
			                    '<option value="2"'; if(data["op29"] == 2) htmlString += ' selected'; htmlString += '>잡물</option>'+
			                '</select>';
			                if(!data["cprice9"]) htmlString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="javascript:jform.submit();"><image src="/resources/style/images/jejak/btn_modify.gif" border="0"></a>'; htmlString += '</span>'+
			            '</td>'+
		            '</tr>';
			}
			$("#kbManagementDetailData2").html(htmlString);
		}
	});
	
	var from = { ccode9: ccode9, tag: tag } 
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: "http://localhost:9090/directkb/select_kb_management5",
		data : JSON.stringify(from),
		success: function (result) {
			logNow(result);
			var object_num = Object.keys(result);
			var  t_mul = 0;
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				
				var full_date = MsToFulldate(data["cdate9"]);
				full_date = full_date.substring(0,4) + "-" + full_date.substring(4,6) + "-" + full_date.substring(6,8);
				
				if (data["cnum9"]) t_mul = (data["cprice9"] / 1.1) / data["cnum9"]; 
				else t_mul = 0;
				sum += t_mul;
				
				var top2 = data["op29"];
				
				htmlString +=
					'<tr>'+
		                '<td width="50" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ (record_no++) +'</span></td>'+
		                '<td width="80" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ full_date +'</span></td>'+
		                '<td width="270" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ data["sbname"] +'&nbsp;-&nbsp;'+ data["sbbook"] +'</span></td>'+
		                '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(t_mul.toFixed(2)) +'</span></td>'+
		                '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+ numberWithCommas(data["cnum9"]) +'</span></td>'+
		                '<td width="70" align="right" style="padding-right:10" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'; 
							if(data["cprice9"]) htmlString += numberWithCommas(data["cprice9"]); 
							else htmlString +=  
								'<INPUT style="text-align:right; padding-right:5; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:60px;" name="cprice[]">'+
								'<input type="hidden" name="uid[]" value="'+ data["uid"] +'">'; htmlString += '</span>'+
		                '</td>'+
		                '<td width="162" align="center" valign="middle" bgcolor="white" height="30"><span style="font-size:9pt;">'+
		                	'<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:60;" onChange="javascript:Chg(this.value, <?=$row[uid]?>, <?=$row[ccode9]?>, <?=$tag?>);">'+
							//<select name="op2" size="1" style="font-family:굴림; font-size:9pt; width:60;">
			                    '<option value="1"'; if(data["op29"] == 1) htmlString += ' selected'; htmlString += '>제품</option>'+
			                    '<option value="2"'; if(data["op29"] == 2) htmlString += ' selected'; htmlString += '>잡물</option>'+
			                '</select>'; 
			                if(!data["cprice9"]) htmlString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="javascript:jform.submit();"><image src="/resources/style/images/jejak/btn_modify.gif" border="0"></a>'; htmlString += '</span>'+
			            '</td>'+
		            '</tr>';
				
			}
			$("#kbManagementDetailData3").html(htmlString);
		}
	});
	
	(document.getElementById("sum")).innerHTML = numberWithCommas(Math.floor(sum));
	
	if(tag == 5){
		htmlString = "";
		htmlString +=
			'<tr>'+
		        '<td width="50" align="center" valign="middle" bgcolor="white" height="30"></td>'+
		        '<td width="80" align="center" valign="middle" bgcolor="white" height="30"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:70px;" name="cdate" maxlength="6"></td>'+
		        '<td width="270" align="center" valign="middle" bgcolor="white" height="30"><INPUT style="font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:260px;" name="bname" onFocus="blur();" onClick="javascript:AddB();"></td>'+
		            '<input type="hidden" name="bcode">'+
		            '<input type="hidden" name="ccode" value="<?=$cc?>">'+
		            '<input type="hidden" name="tag" value="<?=$tag?>">'+
		        '<td width="70" align="center" valign="middle" bgcolor="white" height="30"></td>'+
		        '<td width="70" align="center" valign="middle" bgcolor="white" height="30"></td>'+
		        '<td width="70" align="center" valign="middle" bgcolor="white" height="30"><INPUT style="text-align:right; font-family:굴림; font-size:9pt; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:64px;" name="t_sum"></td>'+
		        '<td width="162" align="center" valign="middle" bgcolor="white" height="30"><a href="javascript:SendIt();"><img src="/resources/style/images/jejak/b_in.gif" border="0"></a></td>'+
		    '</tr>';
		$("#kbManagementDetailData4").html(htmlString);
	}
	
}

//============================window open 함수============================

var popUp;
function UpPopUp(code){
	
	if(code == 1){
		logNow("close111111");
		
		var yyy = popUp.document.getElementById("yyy").value;
		var mmm = popUp.document.getElementById("mmm").value;
		var ddd = popUp.document.getElementById("ddd").value;
		
		if (yyy == "") return popUp.document.getElementById("yyy").focus(); //포커스 고정
		if (mmm == "") return popUp.document.getElementById("mmm").focus();
		if (ddd == "") return popUp.document.getElementById("ddd").focus();
		
		var date = new Date(yyy + "/" + mmm + "/" + ddd).getTime()/1000;
		logNow(date);
		
		var from = {
		    uid: global_uid,
		    wccode: date
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : "http://localhost:9090/yongji/up_order_detail_date",
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);
				popUp.close();
			},
			error : function(){
			}
		});
		return;
	}
	if(code == 2){
		var s = popUp.document.getElementById("comm");
	    var temp = s.options[s.selectedIndex].value;
	    logNow(temp);

	    logNow(global_uid);
	    
	    var from = {
	    	uid: global_uid,
	    	wccode: temp
	    }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : "http://localhost:9090/yongji/up_order_detail_cust",
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);
				popUp.close();
			},
			error : function(){
			}
		});
		return;
	}
	if(code == 3){
		var s = popUp.document.getElementById("yjyj");
	    var temp = s.options[s.selectedIndex].text;
	    temp = temp.split(' - ');
	    logNow(temp[0]);
	    logNow(temp[1]);

	    logNow(global_uid);
	    
	    var from = {
	    	uid: global_uid,
	    	wjcode: temp[1],
	    	wjname: temp[0]
	    }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : "http://localhost:9090/yongji/up_order_detail_code",
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);
				popUp.close();
			},
			error : function(){
			}
		});
		return;
	}
	//window.self.close();
}

function showPopUp(code, uid, title){
	popUp = "";
	global_uid = "";
	global_uid = uid;
	var t_URL = "/popup?uid=" + uid;
	if(popUp && !popUp.closed){
		popUp.close();
	}
	popUp = window.open(t_URL, uid, 'left=0,top=0,width=390,height=350,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');//DATEW
	
	if(code == 1){//구입일 팝업
		popUp.document.write(jmenu3("0-구입일-popup"));
		
		title = (title.toString()).substring(0,4) + "-" + (title.toString()).substring(4,6) + "-" + (title.toString()).substring(6,8);
		(popUp.document.getElementById("dsend")).innerHTML = title;
		return;
	}
	if(code == 2){//구입처 팝업
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/yongji/select_cust_wcname_yj_list",
			success: function (result) {
				popUp.document.write(jmenu3("0-구입처-popup"));
				(popUp.document.getElementById("wcname")).innerHTML = title;
				
				logNow(result);
				var object_num = Object.keys(result);
				for(var i in object_num){
					
					var data = result[object_num[i]]; //json data
					
					var objOption = document.createElement("option");       
				    objOption.text = data["wcname"];
				    objOption.value = data["wccode"];
				    
				    //$("#comm", opener.document).append("<option value='" + data["wccode"] + "'>" + data["wcname"] + ")" + "</option>");
				    //$("#comm", opener.document).append(objOption);
				    (popUp.document.getElementById("comm")).append(objOption);
				}
				
			}
		});
		
		return;
	}
	if(code == 3){//용지코드 팝업
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost:9090/yongji/sel_order_detail_code_list",
			success: function (result) {
				popUp.document.write(jmenu3("0-용지-popup"));
				var title_split = title.split('/');
				(popUp.document.getElementById("wjname")).innerHTML = title_split[0];
				(popUp.document.getElementById("jicode")).innerHTML = title_split[1];
				
				logNow(result);
				var object_num = Object.keys(result);
				for(var i in object_num){
					
					var data = result[object_num[i]]; //json data
					
					var objOption = document.createElement("option");       
				    objOption.text = data["wjname"] + " - " + data["wjcode"];
				    objOption.value = data["wjcode"];
				    
				    (popUp.document.getElementById("yjyj")).append(objOption);
				}
			}
		});
		return;
	}
}

//============================날짜 변화 함수============================
function ChangeDate(code){
	////////////
	// 년월 변경 //
	////////////
	if(code == 1 || code == 2 || code == 17 || code == 18 || code == 22 || code == 23 || code == 24 || code == 25 || code == 26){//년월 변경
		//yj_용지구입(1), yj_용지장부(2), kb_용지대(17), kb_인쇄비(18), kb_비닐비(22), kb_케이스대(23), kb_CD음반대(24), kb_스티커대(25), kb_기타(26)
		var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + "01").getTime()/1000;
		if(Number($("select[name=tm]").val()) == 12){
			year = Number($("select[name=ty]").val()) + 1;
			var date2 = new Date(year + "/" + "01" + "/" + "01").getTime()/1000;
		}else{
			month = Number($("select[name=tm]").val()) + 1;
			month = month >= 10 ? month : '0' + month;
			var date2 = new Date($("select[name=ty]").val() + "/" + month + "/" + "01").getTime()/1000;
		}
		
		if(code == 1) SearchYjOrder(date1, date2); 
		if(code == 2){ 
			var year = $("select[name=ty]").val().substring(2,4);
			var value = $("select[name=pgubn]").val();
			SearchYjJang(date1, date2, value, year);
		}
		if(code == 17) SearchKbYongji(date1, date2);
		if(code == 18) SearchKbPresswork(date1, date2);
		if(code == 22) SearchKbManagement(1, date1, date2);
		if(code == 23) SearchKbManagement(2, date1, date2);
		if(code == 24) SearchKbManagement(3, date1, date2);
		if(code == 25) SearchKbManagement(4, date1, date2); 
		if(code == 26) SearchKbManagement(5, date1, date2); 
	}
	
	if(code == 3 || code == 4 || code == 12 || code == 19 || code == 20){ //yj_월별용지재고현황(3), 제품(4), 잡물(12), kb_제본비(19), kb_코팅비(20) 년월 변경
		var bdate = $("select[name=ty]").val() + $("select[name=tm]").val();
		
		if(code == 3) SearchYjMonth(bdate);
		if(code == 4){ $("#jpdeaData").html(""); SearchDays(1, bdate); }
		if(code == 12) SearchDays(2, bdate);
		if(code == 19) SearchBinding(bdate);
		if(code == 20) SearchDays(3, bdate); 
	}
	
	////////////
	//  일 변경  //
	////////////
	if(code == 5){//jp_발주예정(5) 일 변경
		var signdate = $("select[name=ty]").val() + $("select[name=tm]").val() + $("select[name=td]").val();
		
		SearchJpBalYj(signdate);
	}
	
	if(code == 6 || code == 8 || code == 9 || code == 10  || code == 11 || code == 13 || code == 14 || code == 15 || code == 16 || code == 21){ //일 변경
		//jp_제작계획표(6), jp_발주서(8), jp_표지작업(9), jp_본문작업(10), jp_입고대장(11)
		//jm_제작계획표(13),jm_표지작업(14), jp_본문작업(15), jp_발주서(16)
		//kb_코팅비(21)
		
		var date1 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + $("select[name=td]").val()).getTime()/1000;
		day = parseInt($("select[name=td]").val()) + 1;
		day = day >= 10 ? day : '0' + day;
		var date2 = new Date($("select[name=ty]").val() + "/" + $("select[name=tm]").val() + "/" + day).getTime()/1000;
		
		//제품
		if(code == 6) Searchjejakplan(1, date1, date2);
		if(code == 8) SearchBal(1, date1, date2);
		if(code == 9) SearchPyo(1, date1, date2);
		if(code == 10) SearchBon(1, date1, date2);
		if(code == 11) SearchJpWarehousing(date1, date2);
		//잡물
		if(code == 13) Searchjejakplan(2, date1, date2);
		if(code == 14) SearchPyo(2, date1, date2);
		if(code == 15) SearchBon(2, date1, date2);
		if(code == 16) SearchBal(2, date1, date2);
		//직접경비
		if(code == 21) SerchCoating(date1, date2); 
	
	}
}