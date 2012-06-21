<?php
	session_start();
	require 'connect.php';
if (isset($_POST['user'], $_POST['pass'])) {
    $user = mysql_real_escape_string($_POST['user']);
    $pass = mysql_real_escape_string($_POST['pass']);
	$db = dbCon();
	$userQuery = $db->prepare('SELECT id FROM users WHERE username= :user');
	$userQuery->execute(array(':user' => $user));
	$userQueryData = $userQuery->fetchAll();	
    if($userQueryData[0] > 0) {
		//Username exists, so attempt login with supplied password
		$getUserIDQuery = $db->prepare("SELECT id FROM users WHERE username= :user AND password=MD5( :pass)");
		$getUserIDQuery->execute(array(':user'=>$user,
		   						       ':pass'=>$pass));
		$userIDData = $getUserIDQuery->fetchAll();
		if($userIDData[0] > 0) {
			$_SESSION['id'] = $userIDData['id'];
			die("loggedInAs" . $user);
		}
		else {
			die("badPass");
		}
    }
	else {
		//Username does not exist yet, so attempt user creation using supplied password
		$addUser = $db->prepare("INSERT INTO users (username, password) VALUES (:user, MD5( :pass))");
		$addUser->execute(array(':user'=>$user,
								':pass'=>$pass));  
		if (!$addUser) {
			die("errCreateUserFailed");
		}
		//Now that new user is created, get the user ID and attempt login
		$getUserIDQuery = $db->prepare("SELECT id FROM users WHERE username= :user AND password=MD5( :pass)");
		$getUserIDQuery->execute(array(':user'=>$user,
								   ':pass'=>$pass));
		$userIDData = $getUserIDQuery->fetchAll();	  
		if($userIDData[0] > 0) {
			$_SESSION['id'] = $userIDData['id'];
			die("loggedInAs" . $user);
		}
		else {
			die("errNewUserLoginFailed");
		}
	}
}
exit;
?>
