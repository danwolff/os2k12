<?php
if (isset($_POST['nodeID'], $_POST['user'])) {
	$node = mysql_real_escape_string($_POST['nodeID']);
	$user = mysql_real_escape_string($_POST['user']);
	session_start();
	require 'connect.php';
	$db = dbCon();
	$q_node = $db->prepare('SELECT * FROM nodes WHERE id= :nodeID');
	$q_node->execute(array(':nodeID' => $req));
	$nodeData = $q_node->fetchAll();
	$result_array_encoded = json_encode($nodeData); 
	header('Content-type: application/json');
	echo $result_array_encoded;
	}
else {
	exit;
	}
?>	

