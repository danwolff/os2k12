<?php
function dbCon() {
  $dsn = 'mysql:dbname=os;host=127.0.0.1';
  $user = 'root';
  $pass = '54321';
  try {
    return new PDO($dsn, $user, $pass);
  } catch (PDOException $e) {
    echo 'Error! You may contact info@oneslate.com. Connection failed: ' . $e->getMessage();
  }
}
?>
