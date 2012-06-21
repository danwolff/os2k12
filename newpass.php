<?php
	session_start();
	require 'connect.php';
if (isset($_POST['oldPW'], $_POST['newPW'], $_POST['user'])) {
    $oldPW = mysql_real_escape_string($_POST['oldPW']);
    $newPW = mysql_real_escape_string($_POST['newPW']);
    $user = mysql_real_escape_string($_POST['user']);
	$db = dbCon();
	$userQuery = $db->prepare('SELECT id FROM users WHERE username= :user');
	$userQuery->execute(array(':user' => $user));
	$userQueryData = $userQuery->fetchAll();	
    if($userQueryData[0] > 0) {
		//Username exists, so attempt login with supplied password
		$getUserIDQuery = $db->prepare("SELECT id FROM users WHERE username= :user AND password=MD5( :pass)");
		$getUserIDQuery->execute(array(':user'=>$user,
		   						       ':pass'=>$oldPW));
		$userIDData = $getUserIDQuery->fetchAll();
		if($userIDData[0] > 0) {
		$changePWQuery = $db->prepare("UPDATE users SET password=REPLACE(password, MD5( :oldPW), MD5( :newPW)) where id= :theID ");
		$changePWQuery->execute(array(':oldPW'=>$oldPW,
								      ':newPW'=>$newPW,
								      ':theID'=>$userIDData[0]));
		$changePWData = $changePWQuery->fetchAll();
			die("passChanged");
		}
		else {
			die("badPass");
		}
    }
else {
	exit;
	}
}
?>
