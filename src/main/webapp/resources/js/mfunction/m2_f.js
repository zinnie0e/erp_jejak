//////////////////////////////////////////
//=============== 제품등록 ===============//
/////////////////////////////////////////


//제품 목록
function selBookList(lm_s, lm_t){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/books/select_bookList1",
		async: false,
		success: function (result) {
			(document.getElementById("total_record")).innerHTML = result[0]["count"];
		}
	});
	
	var from = {lm_s: lm_s, lm_t: lm_t}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/books/select_bookList2",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			var object_num = Object.keys(result); 
			htmlString = "";
			for(var i in object_num){
				var data = result[object_num[i]]; 
				if(menuTitle == "제품등록"){
					htmlString +=
						'<tr>' +
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">' + data["sbbook"] + '</font></span></td>' +
							'<td width="430" height="25" bgcolor="white" align="left" valign="middle"><p style="line-height:16px; margin-left:5px;"><span style="font-size:9pt;"><font face="돋움" >' + data["sbname"] + '</a></font></span></p></td>' +
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">' +
								'<a href="javascript:selBook(' + data["uid"] + ');" class="n">수정</a>&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;' +
								'<a href="javascript:delBook(' + data["uid"] + ');" class="n">삭제</a></font></span>' +
							'</td>' +
						'</tr>';
				} else if(menuTitle == "제품제작진행"){
					htmlString +=
						'<tr>'+
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">' + data["sbbook"] + '</font></span></td>'+
							'<td width="430" height="25" bgcolor="white" align="left" valign="middle"><p style="line-height:16px; margin-left:5px;"><span style="font-size:9pt;"><font face="돋움" color="#666666">' + data["sbname"] + '</font></span></p></td>'+																			
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">'+
								'<a href="javascript:AddBaljuYjJpList(' + data["uid"] + ');" class="n">추가</a></font></span>'+
							'</td>'+
						'</tr>';
				}
			}
			$("#data2").html(htmlString);
		}
	});
}

function selBook(uid){
	var json_data = {uid: uid}
	
	$('#jejak_detail_view').html(jmenu2("0-수정"));
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/books/select_detail",
		async: false,
		data: JSON.stringify(json_data),
		success: function (result) {
			var data = result;
			
			//구현_세션이 추가되어 권한을 파싱해야 함
			var json_data = { id : "ajk" };
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				async: false,
				url: SETTING_URL + "/login/dung",
				data : JSON.stringify(json_data),
				success: function (result) {
					logNow(result);
					
					if (data["sbbook"].substring(0, 1) == "U"  && result <= 1){
					htmlString =
						'<form name="form1" method="post" action="b_mod.php">'+
						'<tr>'+
							'<td align="center">'+
								'<input type="text" size="6" name="bnum">부&nbsp;'+
								//구현
								'<input type="button" value="잡물제작" onClick="javascript:JabBal();">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
								'<input type="button" value="임시도서코드변경" onClick="javascript:upBookTempSbbook(' + uid + ');">'+
							'</td>'+
						'</tr>';
						
						(document.getElementById("u_table")).innerHTML = htmlString;
					}
				}
			});
			
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
			if(data["sbinse"] != 0){
				$("select[name=in_gu]").val('1'); //인세
				$("input[name=SBINSE]").val(data["sbinse"]); //인세
				$("select[name=in_gu3]").val('1'); //인세
			}else{
				$("select[name=in_gu]").val('2'); //인세
				$("input[name=SBINSE]").val(data["sbhj04"]); //인세
				$("select[name=in_gu3]").val('1'); //인세
			}
			$("select[name=in_gu2]").val("0"); //인세
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
			
			$("img[name=btn_deasu]").click(function(){
				SelBookDeasu(data["uid"], data["sbname"], data["sbbook"]);
			});
			
			$("img[name=btn_yong]").click(function(){
				SelBookYongji(data["uid"], data["sbname"], data["sbbook"]);
			});
		}
	});
}

//검증필요_ update 포함됨
function upBook(){ //도서정보
	var SBGUBN = $("input[name=SBGUBN]").val(); //보류구분
	var SBJLSU = $("input[name=SBJLSU]").val(); //절수
	var SBDSPG = $("input[name=SBDSPG]").val(); //대수당페이지
	var SBBUSE = $("input[name=SBBUSE]").val(); //편집부서
	var SBJUJA = $("input[name=SBJUJA]").val(); //저자
	var SBYKJA = $("input[name=SBYKJA]").val(); //역자
	var SBPNJA = $("input[name=SBPNJA]").val(); //편자
	var SBPNKN = $("input[name=SBPNKN]").val(); //판권
	var SBWONS = $("input[name=SBWONS]").val(); //사용원서
	var SBWNNA = $("input[name=SBWNNA]").val(); //원저자
	var SBKOMC = $("input[name=SBKOMC]").val(); //승인번호
	var SBISBN = $("input[name=SBISBN]").val(); //국제표준도서코드
	var SBPANH = $("select[name=SBPANH]").val(); //본서판형
	var SBJANH = $("select[name=SBJANH]").val(); //본서장형
	var SBSBPH1 = $("select[name=SBSBPH1]").val(); //부록 1 판형
	var SBSBJH1 = $("select[name=SBSBJH1]").val(); //부록 1 장형
	var SBPAGE = $("input[name=SBPAGE]").val(); //본서 페이지
	var SBSBPG1 = $("input[name=SBSBPG1]").val(); //부록 1 페이지
	var SBSBPG2 = $("input[name=SBSBPG2]").val(); //부록 2 페이지
	var SBSBPG3 = $("input[name=SBSBPG3]").val(); //부록 3 페이지
	var SBSBPG4 = $("input[name=SBSBPG4]").val(); //부록 4 페이지
//	var SBCASE = $("input[name=SBCASE]").val(); //객체 없음
	var SBWING2 = $("input[name=SBWING2]").val(); //오리꼬미
	var SBTIGI = $("input[name=SBTIGI]").val(); //띠지
//	var SBVAT0 = $("input[name=SBVAT0]").val(); //객체 없음
//	var SBINSE = 0; //인세(국내)
//	var SBMUNG = $("input[name=SBMUNG]").val(); //객체 없음
//	var SBSBMG = $("input[name=SBSBMG]").val(); //객체 없음
//	var SBHJ04 = 0; //인세(국외)
	var SBUPRC = $("input[name=SBUPRC]").val(); //정가
	var SBGUME = $("input[name=SBGUME]").val(); //구매처
	var SBAPDT = $("input[name=SBAPDT]").val(); //등록일자
	var SBLOCA = $("input[name=SBLOCA]").val(); //위치
	var SBPEGI = $("input[name=SBPEGI]").val(); //폐간구분
	var SBPEGA = $("input[name=SBPEGA]").val(); //폐간일자
	var SBCPBH = $("input[name=SBCPBH]").val(); //초판일자
	var SBCPSR = $("input[name=SBCPSR]").val(); //초판제작부수
	var SBCPDN = $("input[name=SBCPDN]").val(); //초판단가
	var SBCJBH = $("input[name=SBCJBH]").val(); //최종발행일자
	var SBCJPN = $("input[name=SBCJPN]").val(); //최종판수
	var SBPJFR = $("input[name=SBPJFR]").val(); //편집기간(FROM)
	var SBPJTO = $("input[name=SBPJTO]").val(); //편집기간(TO)
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
//	var SBRANK = $("input[name=SBRANK]").val(); //객체 없음
	var SBJEGO = $("input[name=SBJEGO]").val(); //현재고
	var SBBIGO = $("input[name=SBBIGO]").val(); //기타사항
	var SBSBPH2 = $("select[name=SBSBPH2]").val(); //부록 2 판형
	var SBSBJH2 = $("select[name=SBSBJH2]").val(); //부록 2 장형
	var SBSBPH3 = $("select[name=SBSBPH3]").val(); //부록 3 판형
	var SBSBJH3 = $("select[name=SBSBJH3]").val(); //부록 3 장형
	var SBSBPH4 = $("select[name=SBSBPH4]").val(); //부록 4 판형
	var SBSBJH4 = $("select[name=SBSBJH4]").val(); //부록 4 장형
	var SBJNJI = $("input[name=SBJNJI]").val(); //증지
	var SBINJI = $("input[name=SBINJI]").val(); //인지
	var SBSTIC = $("input[name=SBSTIC]").val(); //스티커
	var SBCOTI = $("select[name=SBCOTI]").val(); //코팅
	var SBCOTI2 = $("select[name=SBCOTI2]").val(); //추가코팅
	var SBCD = $("input[name=SBCD]").val(); //CD
	var SBMYUN = $("input[name=SBMYUN]").val(); //면지
	var SBBYUL = $("input[name=SBBYUL]").val(); //별지
	var SBHWBO = $("input[name=SBHWBO]").val(); //화보
	var SBPANH2 = $("select[name=SBPANH2]").val(); //본서2 판형
	var SBPAGE2 = $("input[name=SBPAGE2]").val(); //본서2 페이지
	var SBBINB = $("input[name=SBBINB]").val(); //책속의 책
//	var SBJJGB = $("select[name=in_gu3]").val(); //인세
	var SBIPGO = $("select[name=SBIPGO]").val(); //입고처
	var SBDUNG = $("input[name=SBDUNG]").val(); //등급
//	var SBHJGB = $("select[name=in_gu2]").val(); //인세
	var SBSACH = $("select[name=SBSACH]").val(); //상철제본
	var SBTPAGE = $("input[name=SBTPAGE]").val(); //전체지면수
	var SBMPAGE = $("input[name=SBMPAGE]").val(); //음악지면수
	var SBSONGN = $("input[name=SBSONGN]").val(); //총수록곡수
	var SBSONGI = $("input[name=SBSONGI]").val(); //국내승인곡
	var SBSONGO = $("input[name=SBSONGO]").val(); //해외승인곡
	var SBBOOKP = $("input[name=SBBOOKP]").val(); //도서판매가
	var SBCDP = $("input[name=SBCDP]").val(); //CD판매가
	var SBJABJI = $("select[name=SBJABJI]").val(); //잡지
	var MEMO_JB = $("input[name=MEMO_JB]").val(); //기타(제본)
	var MEMO_CD = $("input[name=MEMO_CD]").val(); //기타(CD)
	var MEMO_CS = $("input[name=MEMO_CS]").val(); //기타(케이스)
	var MEMO_ST = $("input[name=MEMO_ST]").val(); //기타(스티커)
	var SBKC = $("select[name=SBKC]").val(); //KC
	
	var SBINSE = 0; //인세(국내)
	var SBHJ04 = 0; //인세(국외)
	if($("select[name=in_gu]").val() == 1) {
		SBINSE = $("input[name=SBINSE]").val();
	} else {
		SBHJ04 = $("input[name=SBINSE]").val();
	}
	
	var SBHJGB = $("select[name=in_gu2]").val(); //인세
	SBHJGB = SBHJGB == null ? "" : SBHJGB;
	
	var SBJJGB = $("select[name=in_gu3]").val(); //인세

//	if (SBBOOK == "") return $("input[name=SBBOOK]").focus();
//	if (SBNAME == "") return $("input[name=SBNAME]").focus();
//	if (SBUPRC == "") return $("input[name=SBUPRC]").focus();
//	if (SBPANH == "") return $("select[name=SBPANH]").focus();
//	if (SBJANH == "") return $("select[name=SBJANH]").focus();
//	if (SBPAGE == "") return $("input[name=SBPAGE]").focus();
//	if (SBCOTI == "") return $("input[name=SBCOTI]").focus();

	var json_data = {
		uid: uid,
		sbgubn: SBGUBN,
		sbjlsu: SBJLSU,
		sbdspg: SBDSPG,
		sbbuse: SBBUSE,
		sbjuja: SBJUJA,
		sbykja: SBYKJA,
		sbpnja: SBPNJA,
		sbpnkn: SBPNKN,
		sbwons: SBWONS,
		sbwnna: SBWNNA,
		sbkomc: SBKOMC,
		sbisbn: SBISBN,
		sbpanh: SBPANH,
		sbjanh: SBJANH,
		sbsbph1: SBSBPH1,
		sbsbjh1: SBSBJH1,
		sbpage: SBPAGE,
		sbsbpg1: SBSBPG1,
		sbsbpg2: SBSBPG2,
		sbsbpg3: SBSBPG3,
		sbsbpg4: SBSBPG4,
//		sbcase: SBCASE,
		sbwing2: SBWING2,
		sbtigi: SBTIGI,
//		sbvat0: SBVAT0,
		sbinse: SBINSE,
//		sbmung: SBMUNG,
//		sbsbmg: SBSBMG,
		sbhj04: SBHJ04,
		sbuprc: SBUPRC,
		sbgume: SBGUME,
		sbapdt: SBAPDT,
		sbloca: SBLOCA,
		sbpegi: SBPEGI,
		sbpega: SBPEGA,
		sbcpbh: SBCPBH,
		sbcpsr: SBCPSR,
		sbcpdn: SBCPDN,
		sbcjbh: SBCJBH,
		sbcjpn: SBCJPN,
		sbpjfr: SBPJFR,
		sbpjto: SBPJTO,
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
//		sbrank: SBRANK,
		sbjego: SBJEGO,
		sbbigo: SBBIGO,
		sbsbph2: SBSBPH2,
		sbsbjh2: SBSBJH2,
		sbsbph3: SBSBPH3,
		sbsbjh3: SBSBJH3,
		sbsbph4: SBSBPH4,
		sbsbjh4: SBSBJH4,
		sbjnji: SBJNJI,
		sbinji: SBINJI,
		sbstic: SBSTIC,
		sbcoti: SBCOTI,
		sbcoti2: SBCOTI2,
		sbcd: SBCD,
		sbmyun: SBMYUN,
		sbbyul: SBBYUL,
		sbhwbo: SBHWBO,
		sbpanh2: SBPANH2,
		sbpage2: SBPAGE2,
		sbbinb: SBBINB,
		sbjjgb: SBJJGB,
		sbipgo: SBIPGO,
		sbdung: SBDUNG,
		sbhjgb: SBHJGB,
		sbsach: SBSACH,
		sbtpage: SBTPAGE,
		sbmpage: SBMPAGE,
		sbsongn: SBSONGN,
		sbsongi: SBSONGI,
		sbsongo: SBSONGO,
		sbbookp: SBBOOKP,
		sbcdp: SBCDP,
		sbjabji: SBJABJI,
		memo_jb: MEMO_JB,
		memo_cd: MEMO_CD,
		memo_cs: MEMO_CS,
		memo_st: MEMO_ST
	}

	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/books/update_book",
		async: false,
		data: JSON.stringify(json_data),
		success: function (result) {
			alert("데이터 수정 완료");
		}
	});
}

//검증필요_ insert, update 포함됨
function upBookInsang(){
	var json_data = {sbbook: $("input[name=SBBOOK]").val(), sbuprc: $("input[name=SBUPRC]").val()};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		url: SETTING_URL + "/books/update_book_insang",
		async: false,
		data: JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
		}
	});
}

//검증필요_ update 포함됨
function upBookTempSbbook(uid){
	var json_data = {sbbook: $("input[name=SBBOOK]").val(), sbname: $("input[name=SBNAME]").val(), uid: uid};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		url: SETTING_URL + "/books/update_temp_sbbook",
		async: false,
		data: JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
			
			if(result == "overlab") alert('코드 중복');
		}
	});
}

function SelBookDeasu(uid, sbname, sbbook){ //대수정보
	$('#jejak_detail_view').html(jmenu2("대수정보"));
	$("input[name=sbname]").val(sbname);
	$("input[name=sbbook]").val(sbbook);
	
	$("img[name=btn_book]").click(function(){
		selBook(uid);
	});
	$("img[name=btn_yong]").click(function(){
		SelBookYongji(uid, sbname, sbbook);
	});
	
	if(sbbook.substring(0,1) == "U"){
		var tmpcode = sbbook;
		var dbname = "KSWDESUJ";
	}else{
		var tmpcode = sbbook.substring(0,5);
		var dbname = "KSWDESU0";
	}
	
	logNow(tmpcode + "/" + dbname);
	var from = {tmpcode: tmpcode}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/books/select_book_daesu1",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			var total_record = result[0]["count"];
			if(total_record){ 
				var from = {tmpcode: tmpcode}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/books/select_book_daesu2",
					async: false,
					data : JSON.stringify(from),
					success: function (result) {
						var object_num = Object.keys(result);
						htmlString = "";
						for(var i in object_num){
							var data = result[object_num[i]]; 
							
							htmlString += 
								'<tr>'+
									'<td width="120" align="center" valign="middle" bgcolor="#F9F9F9" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" height="24"><p style="margin-top:5px; margin-bottom:5px;"><span style="font-size:9pt;">'+ (++i) +'</span></p></td>'+
									'<td width="110" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle" height="24"><INPUT style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); text-align:center; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:80px;" name=WDDESU[] value="'+ data["wddesu"] +'"></td>'+
									'<td width="110" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle" height="24"><INPUT style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); text-align:center; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:80px;" name=WDPAGE[] value="'+ data["wdpage"] +'"></td>'+
									'<td width="110" align="center" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" height="24"><INPUT style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); text-align:center; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:80px;" name=WDCOLO[] size="10" value="'+ data["wdcolo"] +'"></td>'+
									'<td width="110" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle" height="24"><INPUT style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); text-align:center; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:80px;" name=WDQNTY[] value="'+ data["wdqnty"] +'"></td>'+
									'<td width="110" style="border-bottom-width:1px; border-right-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle">'+
										'<select name=WDBOO9[]>'+
											'<option value=9> </option>'+
											'<option value=0'; if(data["wdboo9"] == 0) htmlString += " selected"; htmlString += '>본책</option>'+
											'<option value=5'; if(data["wdboo9"] == 5) htmlString += " selected"; htmlString += '>본책 2</option>'+
											'<option value=1'; if(data["wdboo9"] == 1) htmlString += " selected"; htmlString += '>부록 1</option>'+
											'<option value=2'; if(data["wdboo9"] == 2) htmlString += " selected"; htmlString += '>부록 2</option>'+
											'<option value=3'; if(data["wdboo9"] == 3) htmlString += " selected"; htmlString += '>부록 3</option>	'+		
											'<option value=4'; if(data["wdboo9"] == 4) htmlString += " selected"; htmlString += '>부록 4</option>'+
										'</select>'+
									'</td>'+
									'<td width="50" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle" height="24"><input type=checkbox name=check[] checked></td>'+
								'</tr>';
						}
						if(total_record < 20){
							for(var i = (total_record+1); i <= 20; i++){
								htmlString += 
									'<tr>'+
										'<td width="120" align="center" valign="middle" bgcolor="#F9F9F9" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;"><p style="margin-top:5px; margin-bottom:5px;"><span style="font-size:9pt;">'+ i +'</span></p></td>'+
										'<td width="110" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle"><INPUT style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); text-align:center; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:80px;" name=WDDESU[]></td>'+
										'<td width="110" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle"><INPUT style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); text-align:center; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:80px;" name=WDPAGE[]></td>'+
										'<td width="110" align="center" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;"><INPUT style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); text-align:center; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:80px;" name=WDCOLO[] size="10"></td>'+
										'<td width="110" align="center" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;"><INPUT style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); text-align:center; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:80px;" name=WDQNTY[] size="10"></td>'+
										'<td width="110" style="border-bottom-width:1px; border-right-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle">'+
											'<select name=WDBOO9[]>'+
												'<option value=9> </option>'+
												'<option value=0>본책</option>'+
												'<option value=5>본책 2</option>'+
												'<option value=1>부록 1</option>'+
												'<option value=2>부록 2</option>'+
												'<option value=3>부록 3</option>'+
												'<option value=4>부록 4</option>'+
											'</select>'+
										'</td>'+
										'<td width="50" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle" height="24"><input type=checkbox name=check[]></td>'+
									'</tr>';
							}
						}
						$("#BooksDeasuData1").html(htmlString);
					}
				});
				
			}else{
				htmlString = "";
				for(var i = 1; i <= 20; i++){
					htmlString += 
						'<tr>'+
							'<td width="120" align="center" valign="middle" bgcolor="#F9F9F9" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;"><p style="margin-top:5px; margin-bottom:5px;"><span style="font-size:9pt;">'+ i +'</span></p></td>'+
							'<td width="110" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle"><INPUT style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); text-align:center; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:80px;" name=WDDESU[]></td>'+
							'<td width="110" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle"><INPUT style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); text-align:center; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:80px;" name=WDPAGE[]></td>'+
							'<td width="110" align="center" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;"><INPUT style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); text-align:center; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:80px;" name=WDCOLO[] size="10"></td>'+
							'<td width="110" align="center" valign="middle" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;"><INPUT style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); text-align:center; border-width:1px; border-color:rgb(204,204,204); border-style:solid; width:80px;" name=WDQNTY[] size="10"></td>'+
							'<td width="110" style="border-bottom-width:1px; border-right-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle">'+
								'<select name=WDBOO9[]>'+
									'<option value=9> </option>'+
									'<option value=0>본책</option>'+
									'<option value=5>본책 2</option>'+
									'<option value=1>부록 1</option>'+
									'<option value=2>부록 2</option>'+
									'<option value=3>부록 3</option>'+
									'<option value=4>부록 4</option>'+
								'</select>'+
							'</td>'+
							'<td width="50" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle" height="24"><input type=checkbox name=check[]></td>'+
						'</tr>';
				}
				$("#BooksDeasuData1").html(htmlString);
			}
		}
	});
}

//검증필요_ delete, insert 포함됨. 로딩 이미지 표시 필요
function upDaesu(){
	var bcode =  $("#sbbook").text().substring(0,5);
	var json_data = {wdbook: bcode};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		url: SETTING_URL + "/books/delete_daesu1",
		async: false,
		data: JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
		}
	});
	
	var new_uid = 0;
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		url: SETTING_URL + "/books/select_daesu2",
		async: false,
		success: function (result) {
			logNow(result);
			
			new_uid = result + 1;
		}
	});
	
	var t_0 = 1;
	var t_1 = 1;
	var t_2 = 1;
	var t_3 = 1;
	var t_4 = 1;
	
	var tmp_no = 0;
	var wdboo9 = $('select[name="WDBOO9[]"]');
	for(var i = 0; i < $('input[name="check[]"]').length; i++){
		if($('input[name="check[]"]')[i].value == "on"){
			switch(wdboo9[i].value){
			case 0 :
				tmp_no = t_0;
				t_0++;
				break;
			case 1 :
				tmp_no = t_1;
				t_1++;
				break;
			case 2 :
				tmp_no = t_2;
				t_2++;
				break;
			case 3 :
				tmp_no = t_3;
				t_3++;
				break;
			case 4 :
				tmp_no = t_4;
				t_4++;
				break;
				
			}
			
			var json_data = {uid: new_uid,
					wdbook: bcode,
					wdboo9: wdboo9[i].value,
					wdsuns: tmp_no,
					wddesu: $('input[name="WDDESU[]"]')[i].value,
					wdpage: $('input[name="WDPAGE[]"]')[i].value,
					wdcolo: $('input[name="WDCOLO[]"]')[i].value,
					wdqnty: $('input[name="WDQNTY[]"]')[i].value,};
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				url: SETTING_URL + "/books/insert_daesu3",
				async: false,
				data: JSON.stringify(json_data),
				success: function (result) {
					logNow(result);
				}
			});
		}
	}
}

function SelBookYongji(uid, sbname, sbbook){//용지정보
	$('#jejak_detail_view').html(jmenu2("용지정보"));
	(document.getElementById("sbname")).innerHTML = sbname;
	(document.getElementById("sbbook")).innerHTML = sbbook;
	
	$("img[name=btn_book]").click(function(){
		selBook(uid);
	});
	$("img[name=btn_deasu]").click(function(){
		SelBookDeasu(uid, sbname, sbbook);
	});
	
	if(sbbook.substring(0,1) == "U"){
		var tmpcode = sbbook;
		var dbname = "KSWYONJJ";
	}else{
		var tmpcode = sbbook.substring(0,5);
		var dbname = "KSWYONJ0";
	}
	
	var from = {tmpcode: tmpcode, dbname: dbname}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/books/select_book_yong1",
		async: false,
		data : JSON.stringify(from),
		success: function (result) {
			var total_record = result[0]["count"];
			if(total_record){ 
				var from = {tmpcode: tmpcode, dbname: dbname}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: SETTING_URL + "/books/select_book_yong2",
					async: false,
					data : JSON.stringify(from),
					success: function (result) {
						var object_num = Object.keys(result);
						htmlString = "";
						for(var i in object_num){
							var data = result[object_num[i]]; 
							
							htmlString += 
								'<tr>'+
									'<td width="60" align="center" valign="middle" bgcolor="#F9F9F9" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;"><p style="margin-top:5px; margin-bottom:5px;"><span style="font-size:9pt;">'+ (++i) +'</span></p></td>'+
									'<td width="135" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle">'+
										'<select name=WYBOO9[] size="1" style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); width:100px;">'+
											'<option value=9 selected> </option>'+
											'<option value=0'; if(data["wyboo9"] == 0) htmlString += ' selected'; htmlString += '>본책</option>'+
											'<option value=5'; if(data["wyboo9"] == 5) htmlString += ' selected'; htmlString += '>본책 2</option>'+
											'<option value=1'; if(data["wyboo9"] == 1) htmlString += ' selected'; htmlString += '>부록 1</option>'+
											'<option value=2'; if(data["wyboo9"] == 2) htmlString += ' selected'; htmlString += '>부록 2</option>'+
											'<option value=3'; if(data["wyboo9"] == 3) htmlString += ' selected'; htmlString += '>부록 3</option>'+
											'<option value=4'; if(data["wyboo9"] == 4) htmlString += ' selected'; htmlString += '>>부록 4</option>'+
										'</select>'+
									'</td>'+
									'<td width="135" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle">'+
										'<select name="WYGUBN[]" size="1" style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); width:100px;">'+
										    '<option value="00" selected> </option>'+
										    '<option value="01"'; if(data["wygubn"] == "01") htmlString += ' selected'; htmlString += '>표지</option>'+
										    '<option value="15"'; if(data["wygubn"] == "15") htmlString += ' selected'; htmlString += '>속표지</option>'+
										    '<option value="02"'; if(data["wygubn"] == "02") htmlString += ' selected'; htmlString += '>면지</option>'+
											'<option value="17"'; if(data["wygubn"] == "17") htmlString += ' selected'; htmlString += '>면지 1</option>'+
											'<option value="16"'; if(data["wygubn"] == "16") htmlString += ' selected'; htmlString += '>>면지 2</option>'+
										    '<option value="03"'; if(data["wygubn"] == "03") htmlString += ' selected'; htmlString += '>본문 1</option>'+
										    '<option value="04"'; if(data["wygubn"] == "04") htmlString += ' selected'; htmlString += '>본문 2</option>'+
										    '<option value="13"'; if(data["wygubn"] == "13") htmlString += ' selected'; htmlString += '>본문 3</option>'+
										    '<option value="14"'; if(data["wygubn"] == "14") htmlString += ' selected'; htmlString += '>본문 4</option>'+
										    '<option value="05"'; if(data["wygubn"] == "05") htmlString += ' selected'; htmlString += '>케이스</option>'+
										    '<option value="06"'; if(data["wygubn"] == "06") htmlString += ' selected'; htmlString += '>화보</option>'+
										    '<option value="07"'; if(data["wygubn"] == "07") htmlString += ' selected'; htmlString += '>엽서</option>'+
										    '<option value="08"'; if(data["wygubn"] == "08") htmlString += ' selected'; htmlString += '>별지</option>'+
										    '<option value="09"'; if(data["wygubn"] == "09") htmlString += ' selected'; htmlString += '>도비라</option>'+
										    '<option value="10"'; if(data["wygubn"] == "10") htmlString += ' selected'; htmlString += '>날개</option>'+
										    '<option value="11"'; if(data["wygubn"] == "11") htmlString += ' selected'; htmlString += '>비닐</option>'+
										    '<option value="12"'; if(data["wygubn"] == "12") htmlString += ' selected'; htmlString += '>띠지</option>'+
										'</select>'+
									'</td>'+
									'<td width="260" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle">'+
										'<select name="WYJIJL[]" size="1" style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); width:280px;">'+
											'<option value="0">&nbsp;</option>';
										    $.ajax({
												type: "POST",
												dataType: "json",
												url: SETTING_URL + "/books/select_book_yong3",
												async: false,
												success: function (result2) {
													var object_num2 = Object.keys(result2);
													for(var j in object_num2){
														var data2 = result2[object_num2[j]]; 
														htmlString += '<option value="' + data2["wjcode"] + '"'; 
														if(data2["wjcode"] == data["wyjijl"]) htmlString += ' selected'; 
														htmlString += '>' + data2["wjname"] + ' - < ' + data2["wjcode"] + ' ></option>';
													}
												}
											});
										    htmlString += 
										'</select>'+
									'</td>'+
									'<td width="40" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle"><input type=text name=colo[] size="3" value="'+ data["wycolo"] +'" style="text-align:center"></td>'+
									'<td width="40" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle"><input type=text name=page[] size="3" value="'+ data["wypage"] +'" style="text-align:center"></td>';
									if(sbbook.substring(0,1) == "U"){ htmlString += '<td width="55" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle"><input type=text name=jul[] size="3" value="'+ data["wyjuls"] +'" style="text-align:center"></td>'; } htmlString +=
									'<td width="50" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle"><input type=checkbox name=check[] checked></td>'+
								'</tr>';
						}
						if(total_record < 20){
							for(var i = (total_record+1); i <= 20; i++){
								htmlString += 
									'<tr>'+
										'<td width="60" align="center" valign="middle" bgcolor="#F9F9F9" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;"><p style="margin-top:5px; margin-bottom:5px;"><span style="font-size:9pt;">'+ i +'</span></p></td>'+
										'<td width="135" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle">'+
											'<select name=WYBOO9[] size="1" style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); width:100px;">'+
												'<option value=9 selected> </option>'+
												'<option value=0>본책</option>'+
												'<option value=5>본책 2</option>'+
												'<option value=1>부록 1</option>'+
												'<option value=2>부록 2</option>'+
												'<option value=3>부록 3</option>'+
												'<option value=4>부록 4</option>'+
											'</select>'+
										'</td>'+
										'<td width="135" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle">'+
											'<select name="WYGUBN[]" size="1" style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); width:100px;">'+
											    '<option value="00" selected> </option>'+
											    '<option value="01">표지</option>'+
											    '<option value="15">속표지</option>'+
											    '<option value="02">면지</option>'+
												'<option value="17">면지 1</option>'+
												'<option value="16">면지 2</option>'+
											    '<option value="03">본문 1</option>'+
											    '<option value="04">본문 2</option>'+
											    '<option value="13">본문 3</option>'+
											    '<option value="14">본문 4</option>'+
											    '<option value="05">케이스</option>'+
											    '<option value="06">화보</option>'+
											    '<option value="07">엽서</option>'+
											    '<option value="08">별지</option>'+
											    '<option value="09">도비라</option>'+
											    '<option value="10">날개</option>'+
											    '<option value="11">비닐</option>'+
											    '<option value="12">띠지</option>'+
											'</select>'+
										'</td>'+
										'<td width="260" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle">'+
											'<select name="WYJIJL[]" size="1" style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); width:280px;">'+
												'<option value="0">&nbsp;</option>';
											    $.ajax({
													type: "POST",
													dataType: "json",
													url: SETTING_URL + "/books/select_book_yong3",
													async: false,
													success: function (result2) {
														var object_num2 = Object.keys(result2);
														for(var j in object_num2){
															var data2 = result2[object_num2[j]]; 
															htmlString += '<option value="' + data2["wjcode"] + '">' + data2["wjname"] + ' - < ' + data2["wjcode"] + ' ></option>';
														}
													}
												});
											    htmlString += 
											'</select>'+
										'</td>'+
										'<td width="40" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle"><input type=text name=colo[] size="3" style="text-align:center"></td>'+
										'<td width="40" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle"><input type=text name=page[] size="3" style="text-align:center"></td>';
										if(sbbook.substring(0,1) == "U"){ htmlString += '<td width="55" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle"><input type=text name=jul[] size="3" style="text-align:center"></td>'; } htmlString +=
										'<td width="50" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle"><input type=checkbox name=check[]></td>'+
									'</tr>';									
							}
						}
						$("#BooksYongData1").html(htmlString);
					}
				});
				
			}else{
				htmlString = "";
				for(var i = 1; i <= 20; i++){
					htmlString += 
						'<tr>'+
							'<td width="60" align="center" valign="middle" bgcolor="#F9F9F9" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;"><p style="margin-top:5px; margin-bottom:5px;"><span style="font-size:9pt;">'+ i +'</span></p></td>'+
							'<td width="135" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle">'+
								'<select name=WYBOO9[] size="1" style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); width:100px;">'+
									'<option value=9> </option>'+
									'<option value=0>본책</option>'+
									'<option value=5>본책 2</option>'+
									'<option value=1>부록 1</option>'+
									'<option value=2>부록 2</option>'+
									'<option value=3>부록 3</option>'+
									'<option value=4>부록 4</option>'+
								'</select>'+
							'</td>'+
							'<td width="135" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle">'+
								'<select name="WYGUBN[]" size="1" style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); width:100px;">'+
								    '<option value="00"> </option>'+
								    '<option value="01">표지</option>'+
								    '<option value="15">속표지</option>'+
								    '<option value="02">면지</option>'+
									'<option value="17">면지 1</option>'+
									'<option value="16">면지 2</option>'+
								    '<option value="03">본문 1</option>'+
								    '<option value="04">본문 2</option>'+
								    '<option value="13">본문 3</option>'+
								    '<option value="14">본문 4</option>'+
								    '<option value="05">케이스</option>'+
								    '<option value="06">화보</option>'+
								    '<option value="07">엽서</option>'+
								    '<option value="08">별지</option>'+
								    '<option value="09">도비라</option>'+
								    '<option value="10">날개</option>'+
								    '<option value="11">비닐</option>'+
								    '<option value="12">띠지</option>'+
								'</select>'+
							'</td>'+
							'<td width="260" style="border-right-width:1px; border-bottom-width:1px; border-right-color:rgb(222,222,222); border-bottom-color:rgb(222,222,222); border-right-style:solid; border-bottom-style:solid;" align="center" valign="middle">'+
								'<select name="WYJIJL[]" size="1" style="font-family:굴림; font-size:9pt; color:rgb(102,102,102); width:280px;">'+
									'<option value="0">&nbsp;</option>';
								    $.ajax({
										type: "POST",
										dataType: "json",
										url: SETTING_URL + "/books/select_book_yong3",
										async: false,
										success: function (result2) {
											var object_num2 = Object.keys(result2);
											for(var j in object_num2){
												var data2 = result2[object_num2[j]]; 
												htmlString += '<option value="' + data2["wjcode"] + '">' + data2["wjname"] + ' - < ' + data2["wjcode"] + ' ></option>';
											}
										}
									});
								    htmlString += 
								'</select>'+
							'</td>'+
							'<td width="40" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle"><input type=text name=colo[] size="3" style="text-align:center"></td>'+
							'<td width="40" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle"><input type=text name=page[] size="3" style="text-align:center"></td>';
							if(sbbook.substring(0,1) == "U"){ htmlString += '<td width="55" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle"><input type=text name=jul[] size="3" style="text-align:center"></td>'; } htmlString +=
							'<td width="50" style="border-bottom-width:1px; border-bottom-color:rgb(222,222,222); border-bottom-style:solid;" align="center" valign="middle"><input type=checkbox name=check[]></td>'+
						'</tr>';
				}
				$("#BooksYongData1").html(htmlString);
			}
		}
	});
}

//검증필요_ delete, insert 포함됨. 로딩 이미지 표시 필요
function upYongji(){
	var bcode =  $("#sbbook").text().substring(0,5);
	var json_data = {wybook: bcode};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		url: SETTING_URL + "/books/delete_yongji1",
		async: false,
		data: JSON.stringify(json_data),
		success: function (result) {
			logNow(result);
		}
	});
	
	var t_0 = 1;
	var t_1 = 1;
	var t_2 = 1;
	var t_3 = 1;
	var t_4 = 1;
	
	var tmp_no = 0;
	var wyboo9 = $('select[name="WYBOO9[]"]');
	for(var i = 0; i < $('input[name="check[]"]').length; i++){
		if($('input[name="check[]"]')[i].value == "on"){
			switch(wyboo9[i].value){
			case 0 :
				tmp_no = t_0;
				t_0++;
				break;
			case 1 :
				tmp_no = t_1;
				t_1++;
				break;
			case 2 :
				tmp_no = t_2;
				t_2++;
				break;
			case 3 :
				tmp_no = t_3;
				t_3++;
				break;
			case 4 :
				tmp_no = t_4;
				t_4++;
				break;
				
			}
			
			var json_data = {wybook: bcode,
					wyboo9: wyboo9[i].value,
					wysuns: tmp_no,
					wygubn: $('input[name="$WYGUBN[]"]')[i].value,
					wyjijl: $('input[name="WYJIJL[]"]')[i].value.substring(0, 6),
					wycolo: $('input[name="colo[]"]')[i].value,
					wypage: $('input[name="page[]"]')[i].value,};
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				url: SETTING_URL + "/books/insert_yongji2",
				async: false,
				data: JSON.stringify(json_data),
				success: function (result) {
					logNow(result);
				}
			});
		}
	}
}

function delBook(uid){
	var delcheck = confirm("삭제하시겠습니까?");
	if(delcheck){
		var from = {uid: uid};
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : SETTING_URL + "/books/delete_book",
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

function SearchBook(code){ //도서검색 (m4_제작예정리스트 등록 포함)
	if($("input[name=key]").val()){
		if(code == 1) page_code = "m2_도서검색"; //m2 제품등록 
		if(code == 2) page_code = "m4_도서검색"; //m4 제작예정리스트 등록 
	}else page_code = "전체도서검색"; //빈문자열일때 도서 전체 
	goToPage(1);
}

function SelSearchBook(lm_s, lm_t){ //도서검색결과 (m4_제작예정리스트 등록 포함)
	var keyfield = $("select[name=keyfield]").val();
	var key = $("input[name=key]").val();
	if(menuTitle == "제품등록"){
		var from = {key: key}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/books/select_list_check1",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				(document.getElementById("total_record")).innerHTML = result[0]["count"];
			}
		});
		
		var from = {key: key, lm_s: lm_s, lm_t: lm_t}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : SETTING_URL + "/books/select_list_check2",
			async: false,
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);		
				
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]];
					htmlString +=
						'<tr>' +
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">' + data["sbbook"] + '</font></span></td>' +
							'<td width="430" height="25" bgcolor="white" align="left" valign="middle"><p style="line-height:16px; margin-left:5px;"><span style="font-size:9pt;"><font face="돋움" >' + data["sbname"] + '</a></font></span></p></td>' +
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">' +
								'<a href="javascript:selBook(' + data["uid"] + ');" class="n">수정</a>&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;' +
								'<a href="javascript:delBook(' + data["uid"] + ');" class="n">삭제</a></font></span>' +
							'</td>' +
						'</tr>';
				}
				$("#data2").html(htmlString);
			},
			error : function(){
			}
		});
	} else if(menuTitle == "제품제작진행"){
		var from = {keyfield: keyfield, key: key}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/jpjejak/select_jp_yejung_regi1",
			async: false,
			data : JSON.stringify(from),
			success: function (result) {
				(document.getElementById("total_record")).innerHTML = result[0]["count"];
			}
		});
		
		var from = {keyfield: keyfield, key: key, lm_s: lm_s, lm_t: lm_t}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url : SETTING_URL + "/jpjejak/select_jp_yejung_regi2",
			async: false,
			data : JSON.stringify(from),
			success : function(result) {
				logNow(result);		
				
				var object_num = Object.keys(result);
				htmlString = "";
				for(var i in object_num){
					var data = result[object_num[i]];
					htmlString +=
						'<tr>'+
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">' + data["sbbook"] + '</font></span></td>'+
							'<td width="430" height="25" bgcolor="white" align="left" valign="middle"><p style="line-height:16px; margin-left:5px;"><span style="font-size:9pt;"><font face="돋움" color="#666666">' + data["sbname"] + '</font></span></p></td>'+																			
							'<td width="140" height="25" bgcolor="white" align="center" valign="middle"><span style="font-size:9pt;"><font face="돋움" color="#666666">'+
								'<a href="javascript:AddBaljuYjJpList(' + data["uid"] + ');" class="n">추가</a></font></span>'+
							'</td>'+
						'</tr>';
				}
				$("#data2").html(htmlString);
			},
			error : function(){
			}
		});
	}
	
}

//제품 등록
function InBookList(){
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
	var SBBIGO = $("input[name=SBBIGO]").val(); //기타사항
	
	var SBINSE = 0; //인세(국내)
	var SBHJ04 = 0; //인세(국외)
	if(in_gu == 1){
		SBINSE = $("input[name=SBINSE]").val();
	} else {
		SBHJ04 = $("input[name=SBINSE]").val();
	}
	
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
		sbhj04: SBHJ04,
		sbbigo: SBBIGO
	}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/books/insert_book",
		async: false,
		data: JSON.stringify(from),
		success: function (result) {
			logNow(result);
			alert('성공');
		},
		error: function () {
		}
	});
}

//제품 등록(임시)
function checkInBook(temp_key){
	var from = {key: temp_key}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		url : SETTING_URL + "/books/sel_books_max_sbbook",
		async: false,
		data : JSON.stringify(from),
		success : function(result) {
			logNow(result);
			
			var sbbook = "";
			
			if(result == "") {
				sbbook = temp_key + "10000";
			} else {
				var sbbook_num = parseInt(result.substring(1));
				
				if(sbbook_num > 99999){
					sbbook_num = 10000;
				} else {
					sbbook_num++;
				}
				
				sbbook = temp_key + sbbook_num;
			}
			
			$("input[name=SBBOOK]").val(sbbook);
		}
	});
}


//품절 도서
function soldOutCheckDate(){
	if($("select[name=kgubn]").val() != 3){
		if($("input[name=kgubn2]").val() != ""){
			soldOutList();
		} else {
			$("input[name=kgubn2]").focus();
		}
	} else {
		soldOutList();
	}
}

function soldOutCheckGubn(){
	$("input[name=kgubn2]").val("");
	if($("select[name=kgubn]").val() != 3){
		$("input[name=kgubn2]").focus();
	} else {
		if($("input[name=date1]").val() != ""){
			soldOutList();
		} else {
			$("input[name=date1]").focus();
		}
	}
}

function soldOutCheckGubn2(){
	if($("input[name=date1]").val() != ""){
		soldOutList();
	} else {
		$("input[name=date1]").focus();
	}
}

function soldOutList(){
	$("#data1").css('display', '');
	htmlString =
		'<tr>'+
			'<td width="30" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#000000">No</font></span></td>'+
			'<td width="50" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#000000">CODE</font></span></td>'+
			'<td width="240" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#000000">도서명</font></span></td>'+
			'<td width="50" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#000000">일자</font></span></td>'+
			'<td width="60" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#000000">수량</font></span></td>'+
			'<td width="40" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#000000">구분</font></span></td>'+
			'<td width="160" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#000000">거래처</font></span></td>'+
			'<td width="40" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#000000">CODE</font></span></td>'+
			'<td width="50" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#000000">전표</font></span></td>'+
		'</tr>';
	
	var date1 = $("input[name=date1]").val();
	var gubn = $("select[name=kgubn]").val();
	var gubn2 = $("input[name=kgubn2]").val();
	
	var url;
	if(gubn == 1){
		url = SETTING_URL + "/books/sel_books_sold_out1";
	} else if(gubn == 2){
		url = SETTING_URL + "/books/sel_books_sold_out2";
	} else if(gubn == 3){
		url = SETTING_URL + "/books/sel_books_sold_out3";
	}
	
	var count_num = 1;
	var sum_s1jjch = 0;
	
	var temp_td_2 = "";
	var temp_td_4 = "";
	var temp_td_8 = "";
	
	var json_data = {value: date1, num_value: gubn2};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url : url,
		async: false,
		data : JSON.stringify(json_data),
		success : function(result) {
			logNow(result);
			
			var object_num = Object.keys(result);
			for(var i in object_num){
				var data = result[i];
				
				var td_2 = data["s1book"];
				var td_3 = data["sbname"];
				if(td_2 == temp_td_2){
					td_2 = "";
					td_3 = "";
				} else {
					temp_td_2 = td_2;
				}

				var td_4 = date1.substring(0, 2) + "." + date1.substring(2) + "." + data["s1ilja"].substring(4);
				if(td_4 == temp_td_4){
					td_4 = "";
				} else {
					temp_td_4 = td_4;
				}
				
				var td_6 = data["s1pumj"] == 1 ? "품절" : "미달";
				
				var td_7 = data["scyakc"];
				var td_8 = data["s1cust"];
				if(gubn == 1){
					if(td_8 == temp_td_8){
						continue;
					} else {
						temp_td_8 = td_8;
					}
				} else {
					if(td_8 == temp_td_8){
						td_8 = "";
						td_7 = "";
					} else {
						temp_td_8 = td_8;
					}
				}
				
				htmlString +=
					'<tr>'+
				        '<td width="30" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ count_num +'</span></td>'+
				        '<td width="50" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ td_2 +'</span></td>'+
				        '<td width="240" height="30" align="left" valign="middle"><span style="font-size:9pt; padding-left:5;">'+ td_3 +'</span></td>'+
						'<td width="50" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ td_4 + '</span></td>'+
				        '<td width="60" height="30" align="right" valign="middle"><span style="font-size:9pt; padding-right:10;">'+ numberWithCommas(data["s1jjch"]) +'</span></td>'+
				        '<td width="40" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ td_6 + '</span></td>'+
				        '<td width="160" height="30" align="left" valign="middle"><span style="font-size:9pt; padding-left:5;">'+ td_7 +'</span></td>'+
				        '<td width="40" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ td_8 +'</span></td>'+
				        '<td width="50" height="30" align="center" valign="middle"><span style="font-size:9pt;">'+ data["s1bunh"] +'</span></td>'+
				    '</tr>';
				
				count_num++;
				sum_s1jjch += Number(data["s1jjch"]);
			}
			$("#data1").html(htmlString);
		}
	});
	
	htmlString +=
		'<tr>'+
			'<td width="30" bgcolor="#F4F4F4" align="center" valign="middle" height="30"><span style="font-size:9pt;"><font color="#000000">계</font></span></td>'+
			'<td colspan="4" width="400" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:9pt;"><font color="#000000">' + sum_s1jjch + '</font></span></td>'+
			'<td colspan="4" width="290" bgcolor="#F4F4F4" align="right" valign="middle" height="30"><span style="font-size:9pt; padding-right:15;"><font color="#000000">&nbsp;</font></span></td>'+
		'</tr>';
	
	$("#data1").html(htmlString);
}
