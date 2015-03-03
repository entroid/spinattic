<?
ini_set("display_errors", 0);
//require_once("inc/auth.inc");
//require_once("../../inc/conex.inc");
require_once("../php/functions.php");


/*
 * Parametros por querystring
 * t ("t" / "u" / "s") para mostrar datos de un tour, usuario, o listado de skills
 * 
 * Para tour:
 * d (1/0) consulta draft o published
 * id el id del tour (el tour DEBE pertenecer al usuario logueado, sino, tira todo null)
 * 
 * Para usuario:
 * No se mandan otros valores, devuelve los datos del USUARIO LOGUEADO
 * 
 * Para skills:
 * No se mandan otros valores, devuelve el listado de skills con su ID y descripcion
 */


session_start();
$user_id = $_SESSION['usr'];

if(isset($_GET['t']) && $_GET['t'] != ''){
	$table = $_GET['t'];

	switch ($table){
		case 'u': 								//Datos del usuario
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
	
			break;
	
		case 't':						//Datos generales del tour
			 
			$draft_subscript = '';
			
			//Si recibo un 1 en d, devuelvo valores de draft
			if(isset($_GET['d']) && $_GET['d'] == 1){
				$draft_subscript = '_draft';
			}
						
			$id = $_GET['id'];

				$ssqlp = "SELECT * FROM tours".$draft_subscript." where id = '".$id."' and iduser = ".$user_id;
				$result = mysql_query($ssqlp);
				if($row = mysql_fetch_array($result)){
					
					
					$title = $row["title"];
					$category = $row["category"];
					$tags = $row["tags"];
					$allow_comments = $row["allow_comments"];
					$allow_social = $row["allow_social"];
					$allow_embed = $row["allow_embed"];
					$allow_votes = $row["allow_votes"];
					$privacy = $row["privacy"];
					$friendlyURL = $row["friendlyURL"];
					$likes = $row["likes"];
					$views = $row["views"];
					$comments = $row["comments"];
					$lat = $row["lat"];
					$lon = $row["lon"];
					$skin_id = $row["skin_id"];
					$enable_title = $row["enable_title"];
					$thumb_width = $row["thumb_width"];
					$thumb_height = $row["thumb_height"];
					$thumb_margin = $row["thumb_margin"];
					
				};
				
				echo json_encode(array(
				
						'title' => $title,
						'category' => $category,
						'tags' => $tags,
						'allow_comments' => $allow_comments,
						'allow_social' => $allow_social,
						'allow_embed' => $allow_embed,
						'allow_votes' => $allow_votes,
						'privacy' => $privacy,
						'friendlyURL' => $friendlyURL,
						'likes' => $likes,
						'views' => $views,
						'comments' => $comments,
						'lat' => $lat,
						'lon' => $lon,
						'skin_id' => $skin_id,
						'enable_title' => $enable_title,
						'thumb_width' => $thumb_width,
						'thumb_height' => $thumb_height,
						'thumb_margin' => $thumb_margin
						
				
				));			
	
			break;
			
		case 's': //Listado de skills disponibles
			
			$i=0;
			$ssqlp = "SELECT skill_id, kind as title, description FROM customizer_templates_skills group by skill_id, kind, description order by skill_id";
			$result = mysql_query($ssqlp);
			while($row = mysql_fetch_array($result)){
				
				
				$skill_values = array(
			
					'id' => $row["skill_id"],
					'title' => $row["title"],
					'description' => $row["description"]
			
				);
				
				$array_skills[$i] = $skill_values;
				
				$i++;
				
				
			};
			
			
			echo json_encode($array_skills);
	
			
			break;
	
	}
	
}

?>