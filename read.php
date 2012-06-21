<?php
	session_start();
	require 'connect.php';
	$db = dbCon();
	$req = $_POST['nodeID'];
	$q_node = $db->prepare('SELECT * FROM nodes WHERE id= :nodeID');
	$q_node->execute(array(':nodeID' => $req));
	$nodeData = $q_node->fetchAll();
	$result_array_encoded = json_encode($nodeData); 
	header('Content-type: application/json');
	echo $result_array_encoded;
?>	

