<?php
	session_start();
	require 'connect.php';
	$db = dbCon();
	$theTitle = mysql_real_escape_string($_POST['title']);
	$theExplan = mysql_real_escape_string($_POST['explan']);
	$theSrc = mysql_real_escape_string($_POST['source']);
	$addNode = $db->prepare("INSERT INTO nodes (title,explanation,source_name) VALUES (:title,:explan,:src)");
	$addNode->execute(array(':title'=>$theTitle,
							':explan'=>$theExplan,
							':src'=>$theSrc));
?>
