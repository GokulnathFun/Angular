<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "testing_db";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  //Getting in post reqest from http
  $postdata = json_decode(file_get_contents("php://input"));

  if(isset($postdata)){ //If exist
   
   //Accessing data from Json decode. 
  $first_name = $postdata->firstName;
  $last_name = $postdata->lastName;
  $age = $postdata->age;
  
  $sql = "INSERT INTO `post_detail`(`first_name`, `last_name`, `age`) VALUES ('".$first_name."', '".$last_name."', '$age')";
  
  if($conn->exec($sql)){
    //Returning response to http
    $http_response_header = json_encode("Success");
    echo($http_response_header);
  }
  else{
    $http_response_header = json_encode("Failed");
    echo($http_response_header);
  }

  }
  
}
  catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
  $conn = null;
  
?>

