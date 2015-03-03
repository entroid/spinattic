<?

$link=mysql_connect("mysql.spinattic.com","spindb_usu","spinusudbpwd987");

mysql_select_db("spin_bd");

$cdn_string = 'cdn.dev.spinattic.com';
$cdn = 'http://'.$cdn_string;
$bucket_config_file = '.s3cfg-spinattic-dev';
$environment = 'dev';



//$cdn = 'http://dev.spinattic.com/customizer';  //ELIMINAR PARA CDN VERDADERO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

?>