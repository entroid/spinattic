<?

$link=mysql_connect("localhost","root","root");

mysql_select_db("spin_bd");

$cdn_string = 'cdn.dev.spinattic.com';
$cdn = 'http://'.$cdn_string;
$bucket_config_file = '.s3cfg-spinattic-dev';
$environment = 'dev';

?>