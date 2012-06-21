<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>OneSlate</title>
	<meta http-equiv="Pragma" content="no-cache">
	<link rel="stylesheet" type="text/css" href="styles/site.css"/>
	<!-- <link rel="stylesheet" href="http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.css" /> -->
	<link type='text/css' href='css/basic.css' rel='stylesheet' media='screen' />
</head>
<body>
<div id="veryTop">
	<a id="registerLogin" href="#">Login</a>
</div>
<div id="topbar">
	<a href="#"><img src="img/logo_sm.jpg" class="logo"></a>
    <form action="search.php" method="get" class="srchfrm">
         <span><input id="srch" type="text" name="query" value="" class="srchfld"></span>
         <button type="button" class="topbtn">Find</button>
         <button type="button" id="btnnew" class="topbtn">New</button>
         <button type="button" class="topbtn lst opt">OPT</button>
    </form>
</div>
<div id="gridwrap">
<div id="gridpanel">
</div>
</div>
<div class="template">
	<div class="node">
		<div class="node_title"><?php echo $title;?></div>
	</div>
	<div class="ratings_bar_template">
		<div class="arw btnup" style="color:#000000;background:#89f6f9;"><div class="up">&uarr;</div></div>
		<div class="arw btnrt" style="color:#aaaaaa;background:#0156d8;"><div class="rt">&uarr;</div></div>
		<div class="arw btnur" style="color:#333333;background:#3d9fec;"><div class="ur">&uarr;</div></div>
		<div class="arw btndr" style="color:#cccccc;background:#002863;"><div class="dr">&uarr;</div></div>
		<div class="arw btndn" style="color:#ffffff;background:#000000;"><div class="dn">&uarr;</div></div>
	</div>
	<div class="lftarr"><span id="lftarrnum">0</span>&nbsp;&#9664;</div>
	<div class="rtarr">&#9654;&nbsp;<span id="rtarrnum">0</span></div>
	<div id="newNodeDialog">
		<fieldset>
			<label for="claimText">Claim</label>
			<textarea id="claimText" rows="4"></textarea>
		</fieldset>
		<fieldset>
			<label for="explanText">Explanation</label>
			<input id="explanText" value="" type="text" />
		</fieldset>
		<fieldset>
			<label for="srcText">Source</label>
			<input id="srcText" value="" type="text" />
		</fieldset>
		<div id="newNodeActions">
			<input type="submit" id="checkBias" value="Check Bias">
			<input type="submit" id="postClaim" value="Post Claim">
			<br><br><span class="dialogFoot">Esc to cancel</span>
		</div>
	</div>
	<div id="regDialog">
		<fieldset>
			<label for="userName">Username</label>
			<input id="userName" value="" type="text" />
		</fieldset>
		<fieldset>
			<label for="passWord">Password</label>
			<input id="passWord" value="" type="password" />
		</fieldset>
		<div id="newNodeActions">
			<input type="submit" id="btnLogin" value="Go!">
			<br><br><span class="dialogFoot">Esc to cancel</span>
		</div>
	</div>
	<div id="userOpts">
		<h2>Control Panel</h2>
		<h3>My Posts</h3>
		<div id="myPosts"></div>
		<h3>Alerts</h3>
		<div id="myAlerts"></div>
		<h3>Following</h3>
		<div id="myFollowing"></div>
		<h3>My Stats</h3>
		<div id="myAlerts"></div>
		<h2>Options</h2>
			<span class="optText">Starting view:</span><br>
			<div id="myOptions">
				<input type="radio" id="radioGrid" name="defaultView" value="grid"><span class="optText">Grid</span><br>
				<input type="radio" id="radioTree" name="defaultView" value="tree"><span class="optText">Tree</span><br>
				<input type="radio" id="radioHybrid" name="defaultView" value="tree"><span class="optText">Hybrid</span><br><br>
			</div>
		<div class="optsBtmBar">
			<a id="changePass" href="#"><span class="optText">Update Password</span></a>
			<div id="newPassForm">
				<fieldset>
					<label for="oldPW">Old Password</label>
					<input id="oldPW" value="" type="password"><br>
					<label for="newPW1">New Password</label>
					<input id="newPW1" value="" type="password"><br>
					<label for="newPW2">Repeat New Password</label>
					<input id="newPW2" value="" type="password"><br>
					<button type="button" id="updatePass">Update</button>
				</fieldset>
			</div>
			<br>
			<a id="logOut" href="#">Logout</a>
		</div>
	</div>
</div>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/site.js"></script>
<script type="text/javascript" src="js/jquery.autogrow-textarea.js"></script>
<script type="text/javascript" src="js/json2.js"></script>
<script type="text/javascript" src="js/jquery.jeditable.mini.js"></script>
<script type="text/javascript" src="js/jquery.curvycorners.min.js"></script>
<script type='text/javascript' src='js/jquery.simplemodal.js'></script>
<script type="text/javascript" src="js/jquery-ui-1.8.6.custom.min.js"></script>
</body>
</html>
