<?
ini_set("display_errors", 0);
//require_once("inc/auth.inc");
require_once("conex.inc");
//require_once("inc/functions.inc");

session_start();
$_SESSION['usr'] = 69;
$user_id = $_SESSION['usr'];

if($user_id != ''){


	//Datos generales
	$ssqlp = "SELECT * FROM users where id = '".$user_id."'";
	$result = mysql_query($ssqlp);
	if($row = mysql_fetch_array($result)){
		$id = $row["id"];
		$name = $row["username"];
		$avatar = $row["avatar"];
	};

	//Followers
	$ssqlp = "SELECT count(*) as cuenta FROM follows, users where id_following = ".$user_id." and id_follower = users.id and users.status = 1";
	$result = mysql_query($ssqlp);
	$row = mysql_fetch_array($result);
	$followers = $row["cuenta"];

	//Following
	$ssqlp = "SELECT count(*) as cuenta FROM follows, users where id_follower = ".$user_id." and id_following = users.id and users.status = 1";
	$result = mysql_query($ssqlp);
	$row = mysql_fetch_array($result);
	$following = $row["cuenta"];

	//Unread notifications
	$ssqlp = "SELECT count(*) as cuenta FROM notifications where leido = 0 and target_id = ".$user_id;
	$result = mysql_query($ssqlp);
	$row = mysql_fetch_array($result);
	$unread_notifications = $row["cuenta"];

	//Tours
	$ssqlp = "SELECT count(*) as cuenta FROM tours_draft where iduser = ".$user_id;
	$result = mysql_query($ssqlp);
	$row = mysql_fetch_array($result);
	$tours = $row["cuenta"];

	//Panos
	$ssqlp = "SELECT count(*) as cuenta FROM panos where user = ".$user_id;
	$result = mysql_query($ssqlp);
	$row = mysql_fetch_array($result);
	$panos = $row["cuenta"];

	echo json_encode(array(

			'id' => $id,
			'name' => $name,
			'avatar' => $avatar,
			'followers_length' => $followers,
			'following_length' => $following,
			'unread_notifications' => $unread_notifications,
			'tours_length' => $tours,
			'panos_length' => $panos

	));




}
?>