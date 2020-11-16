///////////////////////////////////////////
//=============== 거래처관리 ===============//
///////////////////////////////////////////


//둥록관리
function InsertCuList(){
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
		wccode: wccode,
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
		url: SETTING_URL + "/cust/insert",
		async: false,
		data: JSON.stringify(from),
		success: function (result) {
			alert('데이터 입력 완료');
		},
		error: function () {
		}
	});
}

//목록관리
function SelCuList(lm_s, lm_t){
	var from = {lm_s: lm_s, lm_t: lm_t}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/cust/select_custList2",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result); 
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
									'<td width="50" align="center" valign="middle"><a href="javascript:ModiCuList('+ data["uid"] + ');"><img src="/resources/style/images/jejak/btn_modify.gif" width="40" height="20" border="0"></a></td>' +
									'<td width="50" align="center" valign="middle"><a href="javascript:DelCuList(' + data["uid"] + ');"><img src="/resources/style/images/jejak/btn_delete.gif" width="40" height="20" border="0"></a></td>' +
								'</tr>' +
							'</table></font>' +
						'</td>' +
					'</tr>';
			}
			$("#data").html(htmlString);
		}
	});
}

function ModiCuList(uid){
	$('#jejak_detail_view').html(jmenu1("0-수정"));
	
	var from = {uid: uid}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/cust/select_detail",
		async: false,
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
	
	document.getElementById("btn_UpIt").onclick = function() { //수정 버튼 클릭
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
			wccode: wccode, 
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
			url: SETTING_URL + "/cust/update",
			async: false,
			data: JSON.stringify(from),
			success: function (result) {
				logNow(result);
				alert("데이터 수정 완료");
			},
			error: function () {
			}
		});
	}
}

function DelCuList(uid){
	var delcheck = confirm("삭제하시겠습니까?");
	if(delcheck){
		var from = {uid: uid};
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : SETTING_URL + "/cust/delete",
			async: false,
			data : JSON.stringify(from),
			success : function(result) {
				alert('데이터 삭제 완료');
			},
			error : function(){
			}
		});
	}
}

//IP 변경
function SelIpList(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/cust/select_ip_list",
		async: false,
		success: function (result) {
			var object_num = Object.keys(result); 
			
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
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
	
	$("#btn_UpIt").click(function test(){ //변경 버튼 클릭
		for(var i = 0; i < $('input[name="ip1[]"]').length; i++){
			
			var uid = $('input[name="uids[]"]')[i].value;
			var ips = $('input[name="ip1[]"]')[i].value;
			
			var from = {uid: uid, ips: ips}

			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: SETTING_URL + "/cust/update_ip",
				async: false,
				data: JSON.stringify(from),
				success: function (result) {
				},
				error: function () {
				}
			});
		}
		alert("데이터 수정 완료");
	});
}