<?php
session_start();
if (isset($_POST['logOutVal'])) {
	session_destroy();
	die("loggedOut");
}
exit;
?>
