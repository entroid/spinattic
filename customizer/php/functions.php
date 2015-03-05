<?

$link=mysql_connect("54.69.210.2","root","Srca4SQ3");

mysql_select_db("spin_bd");

$cdn_string = 'cdn.dev.spinattic.com';
$cdn = 'http://'.$cdn_string;
$bucket_config_file = '.s3cfg-spinattic-dev';
$environment = 'dev';


?>