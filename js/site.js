$(document).ready(function(){
	
setupGrid3();
refreshNodes();
repositionGrid3();
updateRatings();

$.modal.defaults.onShow = function(dialog) {
	if (!dialog) dialog = $.modal.impl.d
	dialog.container.css('height', 'auto');
	dialog.origHeight = 0;
	$.modal.setContainerDimensions();
	$.modal.setPosition();
}

$('#srch').live('focus click', function() {
   $('#srch').select();
});

$('#changePass').live('click', function() {
	if ($('#newPassForm').is(":visible") ){
		$('#newPassForm').slideUp(200);
	}
	else {
		$('#oldPW').val("");
		$('#newPW1').val("");
		$('#newPW2').val("");
		$('#newPassForm').slideDown(200);
		$('#oldPW').focus();
		$('#userOpts').delay(300).animate({
			scrollTop: $("#newPW2").offset().top
		}, 100);
	}
});

$('#postClaim').live('click', function() {
	postContents(null);
});

$('a#logOut').live('click', function() {
	var logOutVal = 1;
	$.ajax({
		type : 'POST',
		url : 'logout.php',
//		dataType : 'json',
		data: {
			'logOutVal' : 1
		},
		success : function(response){
			$.modal.close();
				if ( response.substring(0,10) == "loggedOut") {
					$('a#registerLogin').html("Login");
				}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('Error logging out: ' + errorThrown + '  You may report this bug to info@oneslate.com.');
		}
	});
});

$('#registerLogin').live('click', function() {
	if ( $('a#registerLogin').html() == 'Login' ) {
	$("#regDialog").modal({
	containerCss: {
		width: 340,
		height: 160
		}
	});
	$('#simplemodal-container').corner({
		tl: { radius: 14 },
		tr: { radius: 14 },
		bl: { radius: 14 },
		br: { radius: 14 }
	});
	}
	else {
	$("#userOpts").modal({
	containerCss: {
		width: 400,
		height: 500
		}
	});
	$('#simplemodal-container').corner({
		tl: { radius: 14 },
		tr: { radius: 14 },
		bl: { radius: 14 },
		br: { radius: 14 }
	});
	}
	$("#radioTree").attr("disabled", "disabled");
	$("#radioHybrid").attr("disabled", "disabled");
});

$('#btnnew').live('click', function() {
	var theClaim = $('#srch').val();
	$('#claimText').val(theClaim);
	$('#explanText').val("");
	$('#srcText').val("");
	$("#newNodeDialog").modal({
	containerCss: {
		height: 300
	}
	});
		//show dialog prompting for explanation and source,
		//providing notification of possible duplicates,
		//and permitting linking as a child node supporting any of the currently-visible node claims
		//if nothing is linked, allow the creation of a new tree
		//when done creating, re-focus on the newly created node
	$('#simplemodal-container').corner({
		tl: { radius: 14 },
		tr: { radius: 14 },
		bl: { radius: 14 },
		br: { radius: 14 }
	});
});

$('div.node').live('dblclick', function(event) {
	//Re-focus grid on double-clicked node
	var nodeToRefocusOn = $(this).attr('id').substring(2);
	alert(nodeToRefocusOn);
	$('div#g_4 > ').append("<div class='node_body'>Explanation: <?php echo $explan;?></div>")
	$('div#g_4').append("<div class='meta'>Source: <?php echo $source;?></div>")
});

$('div.btnup').live('click', function() {
	var activeNodeID = $('.ratings_bar_template').attr('id').substring(11);
	$('div#g_' + activeNodeID).removeClass('b0').removeClass('b1').removeClass('b2').removeClass('b3').removeClass('b4').addClass('b4');
});
$('.btnur').live('click', function() {
	var activeNodeID = $('.ratings_bar_template').attr('id').substring(11);
	$('div#g_' + activeNodeID).removeClass('b0').removeClass('b1').removeClass('b2').removeClass('b3').removeClass('b4').addClass('b3');
});
$('.btnrt').live('click', function() {
	var activeNodeID = $('.ratings_bar_template').attr('id').substring(11);
	$('div#g_' + activeNodeID).removeClass('b0').removeClass('b1').removeClass('b2').removeClass('b3').removeClass('b4').addClass('b2');
});
$('.btndr').live('click', function() {
	var activeNodeID = $('.ratings_bar_template').attr('id').substring(11);
	$('div#g_' + activeNodeID).removeClass('b0').removeClass('b1').removeClass('b2').removeClass('b3').removeClass('b4').addClass('b1');
});
$('.btndn').live('click', function() {
	var activeNodeID = $('.ratings_bar_template').attr('id').substring(11);
	$('div#g_' + activeNodeID).removeClass('b0').removeClass('b1').removeClass('b2').removeClass('b3').removeClass('b4').addClass('b0');
});


$(window).resize(function(e) {
	repositionGrid3();
});

$('div.node').live('mouseenter mouseleave', function(event) {
	if (event.type == 'mouseenter') {
		var hoveredNodeID = $(this).attr('id').substring(2);
		killTools(hoveredNodeID);
		var w = $(this).width();
		var h = $(this).height();
		var x = (this.offsetLeft - (w/2)) * ( w > h ? (h/w) : 1 );
		var y = (event.pageY - this.offsetTop  - (h/2)) * ( h > w ? (w/h) : 1 );
		$('div.template > .ratings_bar_template').clone().appendTo('#gridpanel').attr('id','activeTools' + hoveredNodeID)
		var toolTop = $(this).position().top + $(this).height();
		var toolLeft = $(this).position().left + 0.5*( w - $("#activeTools" + hoveredNodeID).width() );
		$("#activeTools" + hoveredNodeID).css({
			position: "absolute",
			top: toolTop + 54 + "px",
			left: toolLeft + "px"
		}).fadeIn(200);
  } else {
		var hoveredNodeID = $(this).attr('id').substring(2);
		$('#activeTools' + hoveredNodeID).data('toDel', 1).fadeOut(200);
	}
});

$('#btnLogin').live('click', function() {
    var userName = $('#userName').val();
    var passWord = $('#passWord').val();
	$.ajax({
		type : 'POST',
		url : 'login.php',
//		dataType : 'json',
		data: {
			'user' : userName,
			'pass' : passWord
		},
		success : function(response){
			$.modal.close();
				if ( response.substring(0,10) == "loggedInAs") {
					$('a#registerLogin').html(response.substring(10));
				}
			updateRatings();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('Error logging in: ' + errorThrown + '  You may report this bug to info@oneslate.com.');
		}
	});
});

$('#updatePass').live('click', function() {
    var oldPass = $('#oldPW').val();
    var newPW1 = $('#newPW1').val();
    var newPW2 = $('#newPW2').val();
    var user = $('#registerLogin').html();
    if (newPW1 != newPW2) {
		alert('New passwords do not match!');
		$('#newPW1').val("");
		$('#newPW2').val("");
		$('#newPW1').focus();
	}
	else {
	$.ajax({
		type : 'POST',
		url : 'newpass.php',
//		dataType : 'json',
		data: {
			'oldPW' : oldPass,
			'newPW' : newPW1,
			'user' : user
		},
		success : function(response){
			$.modal.close();
			$('a#registerLogin').html("Login");
			alert("You password has been updated! Please log in again.");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('Error changing password: ' + errorThrown + '  You may report this bug to info@oneslate.com.');
		}
	});
	}
});

$('div[id^="activeTools"]').live('mouseenter mouseleave', function(event) {
  if (event.type == 'mouseenter') {
	$(this).stop().data('toDel', 0).show();
  } else {
	$(this).stop().data('toDel', 1).stop().delay(200).fadeOut(200);
   }
});

function killTools(hoveredNode) {
	//kill all tools except for the mouseentered node
	$('div[id^="activeTools"]').remove();
}

function setupGrid3() {
	$('div.template > div.node').clone().appendTo('#gridpanel').attr('id','g_0').addClass('g3_top').addClass('b0').data('nodeInfo', { nodeID: '1'});
	$('div.template > div.node').clone().appendTo('#gridpanel').attr('id','g_1').addClass('g3_top').addClass('b0').data('nodeInfo', { nodeID: '2'});
	$('div.template > div.node').clone().appendTo('#gridpanel').attr('id','g_2').addClass('g3_top').addClass('b0').data('nodeInfo', { nodeID: '3'});
	$('div.template > div.node').clone().appendTo('#gridpanel').attr('id','g_3').addClass('g3_mid').addClass('b0').data('nodeInfo', { nodeID: '4'});
	$('div.template > div.node').clone().appendTo('#gridpanel').attr('id','g_4').addClass('g3_mid').addClass('b0').data('nodeInfo', { nodeID: '5'});
	$('div.template > div.node').clone().appendTo('#gridpanel').attr('id','g_5').addClass('g3_mid').addClass('b0').data('nodeInfo', { nodeID: '6'});
	$('div.template > div.node').clone().appendTo('#gridpanel').attr('id','g_6').addClass('g3_top').addClass('b0').data('nodeInfo', { nodeID: '7'});
	$('div.template > div.node').clone().appendTo('#gridpanel').attr('id','g_7').addClass('g3_mid').addClass('b0').data('nodeInfo', { nodeID: '8'});
	$('div.template > div.node').clone().appendTo('#gridpanel').attr('id','g_8').addClass('g3_mid').addClass('b0').data('nodeInfo', { nodeID: '9'});
	$('div.template > div.node').clone().appendTo('#gridpanel').attr('id','g_9').addClass('g3_mid').addClass('b0').data('nodeInfo', { nodeID: '10'});
	$('div.template > div.lftarr').clone().appendTo('#gridpanel').attr('id','lftarr_top');
	$('div.template > div.rtarr').clone().appendTo('#gridpanel').attr('id','rtarr_top');
	$('div.template > div.lftarr').clone().appendTo('#gridpanel').attr('id','lftarr_mid');
	$('div.template > div.rtarr').clone().appendTo('#gridpanel').attr('id','rtarr_mid');
	$('div.template > div.lftarr').clone().appendTo('#gridpanel').attr('id','lftarr_btm');
	$('div.template > div.rtarr').clone().appendTo('#gridpanel').attr('id','rtarr_btm');
	$('div#g_4').append("<div class='node_body'>Explanation: <?php echo $explan;?></div>")
	$('div#g_4').append("<div class='meta'>Source: <?php echo $source;?></div>")
}

function repositionGrid3() {
	var newSWidth = $('#topbar').innerWidth() - 410;
	$('#srch').css('width', newSWidth)
    var gwidth = $('#topbar').outerWidth();
    var gpWidth = gwidth - 100;
	$('#gridpanel').css('width', gpWidth);
    var g3_topXtra = 7*2*3 + 2*14 + 2*7 + 8*7;   					//calc and set node widths
	var g3_topWidth = (gpWidth - g3_topXtra)/3;
	$('#g_0').css('width', g3_topWidth);
	$('#g_1').css('width', g3_topWidth);
	$('#g_2').css('width', g3_topWidth);
	var g3_midWidth = g3_topWidth;   								//same in grid 3
	$('#g_3').css('width', g3_midWidth);
	$('#g_4').css('width', g3_midWidth);
	$('#g_5').css('width', g3_midWidth);
    var g3_topXtra = 7*2*4 + 3*14 + 2*7 + 10*7;   					//borders, margins, etc
	var g3_topWidth = (gpWidth - g3_topXtra)/4;
	$('#g_6').css('width', g3_topWidth);
	$('#g_7').css('width', g3_topWidth);
	$('#g_8').css('width', g3_topWidth);
	$('#g_9').css('width', g3_topWidth);
    var gwidth = $('#gridpanel').outerWidth();
    var gpWidth = gwidth - 100;
	$('#gridpanel').css('width', gpWidth);
    var g3_topXtra = 7*2*3 + 2*14 + 2*7 + 8*7;   					//borders, margins, etc
	var g3_topWidth = (gpWidth - g3_topXtra)/3;
	$('#g_0').css('width', g3_topWidth);
	$('#g_1').css('width', g3_topWidth);
	$('#g_2').css('width', g3_topWidth);
	var g3_midWidth = g3_topWidth;   								//same in grid 3
	$('#g_3').css('width', g3_midWidth);
	$('#g_4').css('width', g3_midWidth);
	$('#g_5').css('width', g3_midWidth);
    var g3_topXtra = 7*2*4 + 3*14 + 2*7 + 10*7;   					//borders, margins, etc
	var g3_topWidth = (gpWidth - g3_topXtra)/4;
	$('#g_6').css('width', g3_topWidth);
	$('#g_7').css('width', g3_topWidth);
	$('#g_8').css('width', g3_topWidth);
	$('#g_9').css('width', g3_topWidth);
    var g0_xpos = $('#g_0').position().left;						//calc and set node top & left positions, and width
    var g0_top = $('#g_0').position().top;
    var g0_ht = $('#g_0').height();
    var g2_xpos = $('#g_2').position().left;
    var g2_top = $('#g_2').position().top;
    var g2_ht = $('#g_2').height();
    var g2_wd = $('#g_2').width();
    var g5_xpos = $('#g_5').position().left;
    var g5_top = $('#g_5').position().top;
    var g5_ht = $('#g_5').height();
    var g5_wd = $('#g_5').width();
    var g9_xpos = $('#g_9').position().left;
    var g9_top = $('#g_9').position().top;
    var g9_ht = $('#g_9').height();
    var g9_wd = $('#g_9').width();
    var g3_xpos = $('#g_3').position().left;
    var g3_top = $('#g_3').position().top;
    var g3_ht = $('#g_3').height();
    var g6_xpos = $('#g_6').position().left;
    var g6_top = $('#g_6').position().top;
    var g6_ht = $('#g_6').height();
    $("#lftarr_top").css({											//calc and set arrow positions
        position: "absolute",
        top: g0_top + .5*g0_ht + "px",
        left: g0_xpos - 100 + "px"
    });
    $("#lftarr_mid").css({
        position: "absolute",
        top: g3_top + .5*g3_ht + "px",
        left: g3_xpos - 100 + "px"
    });
    $("#lftarr_btm").css({
        position: "absolute",
        top: g6_top + .5*g6_ht + "px",
        left: g6_xpos - 100 + "px"
    });
    $("#rtarr_top").css({
        position: "absolute",
        top: g2_top + .5*g2_ht + "px",
        left: g2_xpos + g2_wd + 50 + "px"
    });
    $("#rtarr_mid").css({
        position: "absolute",
        top: g5_top + .5*g5_ht + "px",
        left: g5_xpos + g5_wd + 50 + "px"
    });
    $("#rtarr_btm").css({
        position: "absolute",
        top: g9_top + .5*g9_ht + "px",
        left: g9_xpos + g9_wd + 50 + "px"
    });
    var w3 = $('#g_3').outerWidth() - 110;
    var w4 = $('#g_4').outerWidth() + 140;
    var w5 = $('#g_5').outerWidth() - 110;
    $('#g_3').css('width', w3);
    $('#g_4').css('width', w4);
    $('#g_5').css('width', w5);
    $('#g_4 > .node_title').css('font-size', '12pt');
}

function postContents(foo) {
	var theTitle = $('#claimText').val();
	var theExplanation = $('#explanText').val();
	var theSource = $('#srcText').val();
	$.ajax({
		type : 'POST',
		url : 'post.php',
		dataType : 'json',
		data: {
			'title' : theTitle,
			'explan' : theExplanation,
			'source' : theSource
		},
		success : function(response){
			$.modal.close();
			alert('Post successful!')
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('Error posting data: ' + errorThrown + '  You may report this bug to info@oneslate.com.');
		}
	});
	return false;
}
function grabContents(index) {
	$.ajax({
		type : 'POST',
		url : 'read.php',
		dataType : 'json',
		data: {
			nodeID : index
		},
		success : function(nodeData){
			fillNode(nodeData);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('Error reading data: '+errorThrown + '  You may report this bug to info@oneslate.com.');
		}
	});
	return false;
}

function getUserRating(index) {
	if ( $('a#registerLogin').html() != 'Login') {
	var nodeID = $('#g_' + index).data('nodeID');
	var user = $('a#registerLogin').html();
	alert(nodeID);
	alert(user);
	$.ajax({
		type : 'POST',
		url : 'displayratings.php',
		dataType : 'json',
		data: {
			nodeID : index,
			user: user
		},
		success : function(nodeData){
			fillNode(nodeData);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('Error reading data: '+errorThrown + '  You may report this bug to info@oneslate.com.');
		}
	});
	
	}
	return false;
}

function fillNode(nodeData) {
	var ID = nodeData[0].id;
	var title = nodeData[0].title;
	var explanation = nodeData[0].explanation;
	var source = nodeData[0].source_name;
	$('#g_' + ID + ' > .node_title').html(title);
		if('#g_' + ID + ' > .node_body') {
			$('#g_' + ID + ' > .node_body').html(explanation);
		}
		if('#g_' + ID + ' > .meta') {
			$('#g_' + ID + ' > .meta').html(source);
		}

}

function refreshNodes() {
	$('.node').not(':hidden').each(function(index) {
		grabContents(index);
	});
}

function updateRatings() {
	$('.node').not(':hidden').each(function(index) {
		getUserRating(index);
	});
}

function newNodeDialog() {
	$( "#newNodeDialog" ).dialog({
		height: 140,
		modal: true
	});
}

});
