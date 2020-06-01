var val;

//============================메뉴 함수============================
function m1(e) {	
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu1(val));
	
	if(val == "1"){
		SelIt(1);
		pasing();
	}
	if(val == "3"){
		SelIt(6);
	}
}

function m2(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu2(val));
	
	if(val == "0"){
		SelIt(2);
		pasing();
	}
}

var htmlString_yjBuy;
function m3(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu3(val));

	if(val == "0"){
		SelIt(3);
		SelIt(4);
		var d = new Date();
		for(var i = 2008; i <= d.getFullYear(); i++){
			$("select[name=ty]").append("<option value='" + i + "'>" + i + "</option>");
		}
		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
		var day = (d.getDate()) >= 10 ? (d.getDate()) : '0' + (d.getDate());
		$('select[name=ty]').val(d.getFullYear());
		$('select[name=tm]').val(month);
		
		$("#btn_buy").click(function click(){
			var jiname = ($("select[name=jicode] option:checked").text()).split(' - ')[1];
			
			htmlString_yjBuy +=
				'<tr>'+
					'<td width="130" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">'+ d.getFullYear() + ' / ' + month + ' / ' + day +'</span></td>'+
					'<td width="190" height="30" align="left" valign="middle" bgcolor="white"><span style="font-size:9pt; padding-left:5pt;">'+ jiname +'</span></td>'+
					'<td width="70" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;">( '+ $("select[name=jicode]").val() +' )</span></td>'+
						//'<form method="post" action="yongju3.php">'+
						'<input type="hidden" name="jm_id" value="<?=$row[uid]?>">'+
						'<input type="hidden" name="ib" value="<?=$row[ib]?>">'+
						'<input type="hidden" name="fx" value="<?=$row[fxamount]?>">'+
					'<td width="200" height="30" align="center" valign="middle" bgcolor="white"><p><span style="font-size:9pt;">'+
						'<select name="comid_buy" style="font-family:굴림; font-size:9pt; width:180px;" size="1"></select></span></p>'+
					'</td>'+
					'<td width="80" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"><font color="red">'+ $("input[name=jnum]").val() +'</font></span></td>'+
					'<td width="110" height="30" align="center" valign="middle" bgcolor="white"><span style="font-size:9pt;"></span>'+
						'<input type="button" id="btn_dell" value=" test "></span></p>'+
					'</td>'+
				'</tr>';	
			
			//$('select[name=comid_buy]').val("4");

			$('#data9').html(htmlString_yjBuy);
			SelIt(4);
		});
		return;
	}
	if(val == "1"){
		SelIt(4);
		var d = new Date();
		for(var i = 2007; i <= d.getFullYear(); i++){
			$("select[name=sy]").append("<option value='" + i + "'>" + i + "</option>");
			$("select[name=ey]").append("<option value='" + i + "'>" + i + "</option>");
		}
		
		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
		var day = (d.getDate()) >= 10 ? (d.getDate()) : '0' + (d.getDate());
		
		$('select[name=sy]').val(d.getFullYear());
		$('select[name=ey]').val(d.getFullYear());
		$('select[name=em]').val(month);
		$('select[name=ed]').val(day);
		
		$("#btn_Search").click(function click(){
			var date1 = new Date($("select[name=sy]").val() + "/" + $("select[name=sm]").val() + "/" + $("select[name=sd]").val()).getTime()/1000;
			var date2 = new Date($("select[name=ey]").val() + "/" + $("select[name=em]").val() + "/" + $("select[name=ed]").val()).getTime()/1000;
			var wccode = $("select[name=ccode]").val();
			
			SearchYjCu(wccode, date1, date2);
		});
		return;
	}
	if(val == "2"){
		$("#btn_yjShow").click(function click(){
			if ($('input[name=sdate]').val() == "") return $("input[name=sdate]").focus();
			if ($('input[name=sdate]').val() == "") return $("input[name=sdate]").focus();
			
			var sdate = $('input[name=sdate]').val().substring(0,4) + "/" + $('input[name=sdate]').val().substring(4,6) + "/" + $('input[name=sdate]').val().substring(6,8);
			var edate = $('input[name=edate]').val().substring(0,4) + "/" + $('input[name=edate]').val().substring(4,6) + "/" + $('input[name=edate]').val().substring(6,8);
			
			var date1 = new Date(sdate).getTime()/1000;
			var date2 = new Date(edate).getTime()/1000;
			var year;
			if(($('input[name=sdate]').val()).substring(2,4) == ($('input[name=edate]').val()).substring(2,4)){
				year = ($('input[name=sdate]').val()).substring(2,4);
				SearchYjjp(year, date1, date2);
			}else{
				alert("같은 년도를 입력해야합니다.");
			}
		});
		return;
	}
	if(val == "3"){
		SelIt(3);
		pasing();
		return;
	}
	if(val == "4"){
		var d = new Date();
		for(var i = 2008; i <= d.getFullYear(); i++){
			$("select[name=ty]").append("<option value='" + i + "'>" + i + "</option>");
		}
		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
		$('select[name=ty]').val(d.getFullYear());
		$('select[name=tm]').val(month);
		
		return;
	}
	if(val == "5"){
		var d = new Date();
		for(var i = 2008; i <= d.getFullYear(); i++){
			$("select[name=ty]").append("<option value='" + i + "'>" + i + "</option>");
		}
		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
		$('select[name=ty]').val(d.getFullYear());
		$('select[name=tm]').val(month);
		return;
	}
}

function m4(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu4(val));
	if(val == "0" || val == "8"){
		$("#jejak_middle").css('padding-left', '0px');
	}else{
		$("#jejak_middle").css('padding-left', 'calc((100% - 1000px) / 2)');	
	}
	//
	if(val == "0" || val == "1" || val == "2" || val == "3" || val == "4" || val == "5" || val == "6"){//공통 년월 표시
		var d = new Date();
		for(var i = 2008; i <= d.getFullYear(); i++){
			$("select[name=ty]").append("<option value='" + i + "'>" + i + "</option>");
		}
		
		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
		var day = (d.getDate()) >= 10 ? (d.getDate()) : '0' + (d.getDate());
		
		$('select[name=ty]').val(d.getFullYear());
		$('select[name=tm]').val(month);
		$('select[name=td]').val(day);
		
		if(val == "0"){
			d = new Date();
			d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
			(document.getElementById("time_result")).innerHTML = d;
		}
	}
	if(val == "8") SelIt(13); //제품정가인상리스트
	if(val == "11") SelIt(8); //제품정가인상리스트
	if(val == "12") SelIt(7); //제품보류리스트
	if(val == "13") SelIt(9); //제품폐간리스트
	if(val == "14") SelIt(10); //신간적정재고관리
}

function m5(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu5(val));
	//공통 년월 표시
	var d = new Date();
	for(var i = 2007; i <= d.getFullYear(); i++){
		$("select[name=ty]").append("<option value='" + i + "'>" + i + "</option>");
	}
	
	var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
	var day = (d.getDate()) >= 10 ? (d.getDate()) : '0' + (d.getDate());
	
	$('select[name=ty]').val(d.getFullYear());
	$('select[name=tm]').val(month);
	$('select[name=td]').val(day);
	
	
}

function m6(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu6(val));
	//
	if(val == "3" || val == "6" || val == "7" || val == "8" || val == "9" || val == "10" || val == "11" || val == "12" || val == "13"){
		var d = new Date();
		for(var i = 2008; i <= d.getFullYear(); i++){
			$("select[name=ty]").append("<option value='" + i + "'>" + i + "</option>");
		}
		
		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
		
		$('select[name=ty]').val(d.getFullYear());
		$('select[name=tm]').val(month);
	}
	if(val == "4") SelIt(11); //출력료
	if(val == "5") SelIt(12); //사보료
}

function m7(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu7(val));
	//
}

function m8(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu8(val));
	if(val == "14"){
		$("#jejak_middle").css('padding-left', '0px');
	}else{
		$("#jejak_middle").css('padding-left', 'calc((100% - 1000px) / 2)');	
	}
	//
}

function m9(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu9(val));
	//
}