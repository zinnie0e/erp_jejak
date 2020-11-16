var val;

// ============================메뉴 함수============================
function m1(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu1(val));

	if (val == "1") {
		page_code = "거래처";
		goToPage(1);
	}
	if (val == "3") {
		SelIpList();
	}
}

function m2(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu2(val));

	if (val == "0") {
		menuTitle = "제품등록";
		page_code = "전체도서검색";
		goToPage(1);
	}
}

var htmlString_yjBuy;
function m3(e) {
	logNow(e);
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu3(val));

	if (val == "0") {
		SetoptionYongji(3);
		SetoptionCust(4);
		var d = new Date();
		for (var i = 2008; i <= d.getFullYear(); i++) {
			$("select[name=ty]").append(
					"<option value='" + i + "'>" + i + "</option>");
		}
		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0'
				+ (d.getMonth() + 1);
		var day = (d.getDate()) >= 10 ? (d.getDate()) : '0' + (d.getDate());
		$('select[name=ty]').val(d.getFullYear());
		$('select[name=tm]').val(month);

		
		return;
	}
	if (val == "1") {
		SetoptionCust(4);
		var d = new Date();
		for (var i = 2007; i <= d.getFullYear(); i++) {
			$("select[name=sy]").append(
					"<option value='" + i + "'>" + i + "</option>");
			$("select[name=ey]").append(
					"<option value='" + i + "'>" + i + "</option>");
		}

		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0'
				+ (d.getMonth() + 1);
		var day = (d.getDate()) >= 10 ? (d.getDate()) : '0' + (d.getDate());

		$('select[name=sy]').val(d.getFullYear());
		$('select[name=ey]').val(d.getFullYear());
		$('select[name=em]').val(month);
		$('select[name=ed]').val(day);
	}
	if (val == "2") {
	}
	if (val == "3") {
		page_code = "용지등록";
		goToPage(1);
	}
	if (val == "4") {
		var d = new Date();
		for (var i = 2008; i <= d.getFullYear(); i++) {
			$("select[name=ty]").append(
					"<option value='" + i + "'>" + i + "</option>");
		}
		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0'
				+ (d.getMonth() + 1);
		$('select[name=ty]').val(d.getFullYear());
		$('select[name=tm]').val(month);

		return;
	}
	if (val == "5") {
		var d = new Date();
		for (var i = 2008; i <= d.getFullYear(); i++) {
			$("select[name=ty]").append(
					"<option value='" + i + "'>" + i + "</option>");
		}
		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0'
				+ (d.getMonth() + 1);
		$('select[name=ty]').val(d.getFullYear());
		$('select[name=tm]').val(month);
		return;
	}
}

function m4(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu4(val));
	if (val == "0" || val == "8") {
		$("#jejak_middle").css('padding-left', '0px');
	} else {
		$("#jejak_middle").css('padding-left', 'calc((100% - 1000px) / 2)');
	}
	//
	if (val == "0" || val == "1" || val == "2" || val == "3" || val == "4"
			|| val == "5" || val == "6") {// 공통 년월 표시
		var d = new Date();
		for (var i = 2008; i <= d.getFullYear(); i++) {
			$("select[name=ty]").append(
					"<option value='" + i + "'>" + i + "</option>");
		}

		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0'
				+ (d.getMonth() + 1);
		var day = (d.getDate()) >= 10 ? (d.getDate()) : '0' + (d.getDate());

		$('select[name=ty]').val(d.getFullYear());
		$('select[name=tm]').val(month);
		$('select[name=td]').val(day);

		if (val == "0") {
			d = new Date();
			d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
					+ " " + d.getHours() + ":" + d.getMinutes() + ":"
					+ d.getSeconds();
			(document.getElementById("time_result")).innerHTML = d;
		}
	}
	if (val == "8")
		SelJpJejakYejung(13); 
	if (val == "9") {
		menuTitle = "제품제작진행";
		page_code = "전체도서검색";
		goToPage(1);
	}
	if (val == "11")
		SelJpPriceupList(8); // 제품정가인상리스트
	if (val == "12")
		SelJpHoldList(7); // 제품보류리스트
	if (val == "13")
		SelJpCloseList(9); // 제품폐간리스트
	if (val == "14")
		SelJpNewstockList(10); // 신간적정재고관리
}

function m5(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu5(val));
	// 공통 년월 표시
	var d = new Date();
	for (var i = 2007; i <= d.getFullYear(); i++) {
		$("select[name=ty]").append(
				"<option value='" + i + "'>" + i + "</option>");
	}

	var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0'
			+ (d.getMonth() + 1);
	var day = (d.getDate()) >= 10 ? (d.getDate()) : '0' + (d.getDate());

	$('select[name=ty]').val(d.getFullYear());
	$('select[name=tm]').val(month);
	$('select[name=td]').val(day);

}

function m6(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu6(val));
	//
	if (val == "3" || val == "6" || val == "7" || val == "8" || val == "9"
			|| val == "10" || val == "11" || val == "12" || val == "13") {
		var d = new Date();
		for (var i = 2008; i <= d.getFullYear(); i++) {
			$("select[name=ty]").append(
					"<option value='" + i + "'>" + i + "</option>");
		}

		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0'
				+ (d.getMonth() + 1);

		$('select[name=ty]').val(d.getFullYear());
		$('select[name=tm]').val(month);
	}
	if (val == "4")
		SelKbPrint(11); // 출력료
	if (val == "5")
		SelKbHouseOrgan(12); // 사보료
}

function m7(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu7(val));
	if (val == "0" || val == "1" || val == "2" || val == "3" || val == "6" || val == "7" || val == "8" || val == "14") {
		var d = new Date();
		for (var i = 2008; i <= d.getFullYear(); i++) {
			$("select[name=ty]").append(
					"<option value='" + i + "'>" + i + "</option>");
		}
		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0'
				+ (d.getMonth() + 1);
		$('select[name=ty]').val(d.getFullYear());
		$('select[name=tm]').val(month);
		
		
		
		return;
	}
}

function m8(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu8(val));
	if (val == "14") {
		$("#jejak_middle").css('padding-left', '0px');
	} else {
		$("#jejak_middle").css('padding-left', 'calc((100% - 1000px) / 2)');
	}
	
	if (val == "6" || val == "7" || val == "12" || val == "13") {
		var d = new Date();
		for (var i = 2008; i <= d.getFullYear(); i++) {
			$("select[name=ty]").append(
					"<option value='" + i + "'>" + i + "</option>");
		}
		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0'
				+ (d.getMonth() + 1);
		$('select[name=ty]').val(d.getFullYear());
		$('select[name=tm]').val(month);
		
		return;
	}
	//
}

function m9(e) {
	val = $(e).attr('value');
	$('#jejak_detail_view').html(jmenu9(val));
	//
	if (val == "0" || val == "1") {
		var d = new Date();
		for (var i = 2008; i <= d.getFullYear(); i++) {
			$("select[name=ty]").append(
					"<option value='" + i + "'>" + i + "</option>");
		}
		var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
		$('select[name=ty]').val(d.getFullYear());
		$('select[name=tm]').val(month);
		
		return;
	}
	if (val == "9") {
		SelBooksNotin();
	}
}