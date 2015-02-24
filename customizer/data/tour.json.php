<?
ini_set("display_errors", 0);
//require_once("inc/auth.inc");
require_once("conex.inc");

//require_once("inc/functions.inc");

session_start();
$_SESSION['usr'] = 96;
$user_id = $_SESSION['usr'];
$idtour = $_GET['idtour'];


$draft_subscript = '';

//Si recibo un 1 en d, devuelvo valores de draft
if(isset($_GET['d']) && $_GET['d'] == 1){
	$draft_subscript = '_draft';
}

if($user_id != ''){

	//Datos generales
	$ssqlp = "SELECT * FROM tours".$draft_subscript." where id = '".$idtour."' and iduser = ".$user_id."";
	$result = mysql_query($ssqlp);
	if($row = mysql_fetch_array($result)){
		$tags = $row["tags"];
		$category = $row["category"];
		$allow_comments = $row["allow_comments"];
		$allow_social = $row["allow_social"];
		$allow_embed = $row["allow_embed"];
		$allow_votes = $row["allow_votes"];
		$privacy = $row["privacy"];
		$friendlyURL = $row["friendlyURL"];
		$likes = $row["likes"];
		$views = $row["views"];
	};

	echo json_encode(array(

			'tags' => $tags,
			'name' => $category,
			'avatar' => $allow_comments,
			'followers_length' => $allow_social,
			'following_length' => $allow_embed,
			'unread_notifications' => $allow_votes,
			'privacy' => $privacy,
			'friendlyURL' => $friendlyURL,
			'likes' => $likes,
			'views' => $views

	));




}
?>