<?php

$link=mysql_connect("localhost","root","");

mysql_select_db("spin_bd");

$cdn_string = 'cdn.dev.spinattic.com';
$cdn = 'http://'.$cdn_string;
$bucket_config_file = '.s3cfg-spinattic-dev';
$environment = 'dev';

session_start();

//$cdn = 'http://dev.spinattic.com/customizer';  //ELIMINAR PARA CDN VERDADERO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<





?>