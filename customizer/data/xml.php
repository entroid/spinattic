<?
ini_set("display_errors", 0);
require_once("conex.inc");

/* Parametros por querystring
 * d (1/0) consulta draft o published
 * c (1/0) muestra custom attrs
 * t (nombre) muestra un template particular
 * id el id del tour o del template
 */


$cdn = 'data';   //CAMBIAR A CDN VERDADERO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<




session_start();
$_SESSION['usr'] = 96;
$user_id = $_SESSION['usr'];

$custom_attrs = 0;

$draft_subscript = '';

//Si recibo un 1 en c, devuelvo custom tags
if(isset($_GET['c']) && $_GET['c'] == 1){
	$custom_attrs = 1;
}

//Si recibo un 1 en d, devuelvo valores de draft
if(isset($_GET['d']) && $_GET['d'] == 1){
	$draft_subscript = '_draft';
}

 

if($user_id != ''){

	//Si recibo un objeto específico, devuelvo el template, sino, el xml de un tour (agregar case para nuevos templates dentro de la funcion)
	switch ($_GET['t']){
		case 'skills':
			$id = $_GET['id'];
			$prev_tag_ident = 0;
			$print_xml .= get_template($_GET['t'], '', $prev_tag_ident);			
			
			break;
		
		default: //xml de un tour
			
			$id = $_GET['id'];
			
			//XML HEAD
			$prev_tag_ident = 0;
			$segment = 'HEAD';
			$print_xml .= '
			<!-- '.$segment.' -->
			';
			$print_xml .= get_xml($segment, '',$prev_tag_ident);
			
			//Toma de settings generales
			$prev_tag_ident = 0;
			$segment = 'GENERAL';
			$print_xml .= '
			<!-- '.$segment.' -->
			';
			$print_xml .= get_xml($segment, '',$prev_tag_ident);
			
			//Toma de scenes y hotspots
			$segment = 'SCENES';
			$print_xml .= '
			<!-- '.$segment.' -->
			';
			$print_xml .= get_scenes();
			
			//Toma de skills
			$prev_tag_ident = 0;
			$segment = 'SKILLS';
			$print_xml .= '
			<!-- '.$segment.' -->
			';
			$print_xml .= get_xml($segment, '', $prev_tag_ident);
			
			//Toma de free hotspots styles
			$prev_tag_ident = 0;
			$segment = 'FREE HOTSPOTS STYLES';
			$print_xml .= '
			<!-- '.$segment.' -->
			';
			$print_xml .= get_free_htpts_styles();
			
			//Toma de hotspots styles
			$prev_tag_ident = 0;
			$segment = 'HOTSPOTS STYLES';
			$print_xml .= '
			<!-- '.$segment.' -->
			';
			$print_xml .= get_xml($segment, '', $prev_tag_ident);
			
			
			$print_xml .= '</krpano>';			
			break;
		
	}
	

	
	if(isset($_GET['format']) && $_GET['format'] == 'txt'){
		echo '<pre>'.htmlentities($print_xml).'</pre>'; //as txt
	}else{
		echo $print_xml; //as xml
	}
	
	
}

function get_free_htpts_styles(){
	global $segment;
	global $custom_attrs;
	
	$ssqlp = "SELECT * FROM customizer_free_htspts_styles order by style_id";
	$result = mysql_query($ssqlp);
	
	while($row = mysql_fetch_array($result)){
		
		$devolver_final = 1;
		
		//Si hay un nuevo style_id, imprimo apertura
		if($style_id != $row["style_id"]){
		
			//si había uno antes, lo cierro
			if($style_id != ''){
				$final_xml .= '/>';
			}
			
			$style_id = $row["style_id"];
		
			$kind = $row["kind"];
		
			if($row["in_tag_code"] != ''){
				$in_tag_code = '
				'.$row["in_tag_code"].'
				';
			}
			
			
			if($custom_attrs == 1){
				$final_xml .= '
				<style segment="'.$segment.'" kind="'.$kind.'"';
			}else{
				$final_xml .= '
				<style';
			}
		}
		
		//Imprimo attibutes y valor dentro del tag
		$final_xml .= ' '.$row["attr"].'="'.$row["value"].'"';
				
	};
		
	if($devolver_final == 1){
		$final_xml .= '/>
		';
	}
	
	return $final_xml;		

	
}


function get_template($template, $kind, $prev_tag_ident){
	global $user_id;
	global $id;
	global $cdn;
	global $custom_attrs;

	$final_xml = '';
	$tag_ident = '';
	$tag_name = '';

	$devolver_final = 0;
	$in_tag_code = '';

	if ($kind != ''){
		$kind_condition = " kind = '".$kind."' and ";
	}
	
	
	switch ($template){
		case 'skills':
			$ssqlp = "SELECT * FROM customizer_skills_templates where skill_id = ".$id." and prev_tag_ident = ".$prev_tag_ident." order by tag_ident";
			break;
	}
	
	
	
	$result = mysql_query($ssqlp);


	while($row = mysql_fetch_array($result)){

		$devolver_final = 1;

		//Si hay un nuevo tag, imprimo apertura (si el tag_name != '', imprimo cierre antes)
		if($tag_ident != $row["tag_ident"] || $tag_name != $row["tag_name"] || $kind != $row["kind"]){

			if($tag_ident != ''){ //si ya había tag, lo cierro
				$final_xml .= '>';
				$final_xml .= $in_tag_code;
				$final_xml .= get_template($template, $kind, $tag_ident);
				$final_xml .= '</'.$tag_name.'>
				';
				$in_tag_code = '';
			}

			$tag_ident = $row["tag_ident"];
			$tag_name = $row["tag_name"];
			$segment = $row["segment"];

			$kind = $row["kind"];


			if($custom_attrs == 1){
				$final_xml .= '
				<'.$tag_name.' tag_ident="'.$tag_ident.'" prev_tag_ident="'.$prev_tag_ident.'" segment="'.$segment.'" kind="'.$kind.'"';
			}else{
				$final_xml .= '
				<'.$tag_name;
			}

		}

		//Imprimo attibutes y valor dentro del tag (si es text, no)
		if($row["attr"] == 'text'){ //si es text, es codigo dentro del tag, lo almaceno pero no lo muestro, se inserta en el cierre del tag
			$in_tag_code = '
			'.$row["value"].'
			';
		}else{
			$final_xml .= ' '.$row["attr"].'="'.$row["value"].'"';
		}




	};

	if($devolver_final == 1){
		$final_xml .= '>';
		$final_xml .= $in_tag_code;
		$final_xml .= get_template($template, $kind, $tag_ident);
		$final_xml .= '</'.$tag_name.'>
		';
		$in_tag_code = '';
	}

	return $final_xml;

}



function get_xml($segment, $kind, $prev_tag_ident){
	global $user_id;
	global $id;
	global $draft_subscript;
	global $segment;
	global $cdn;
	global $custom_attrs;
	
	$final_xml = '';
	$tag_ident = '';
	$tag_name = '';

	$devolver_final = 0;
	$in_tag_code = '';
	
	$kind_condition = '';
	
	if ($kind != ''){$kind_condition = " kind = '".$kind."' and ";}
	
	//$ssqlp = "SELECT * FROM customizer".$draft_subscript." where segment = '".$segment."' and idtour = '".$id."' and user_id = ".$user_id." and prev_tag_ident = ".$prev_tag_ident." order by segment_ord, ord";
	$ssqlp = "SELECT * FROM customizer".$draft_subscript." where ".$kind_condition." segment = '".$segment."' and idtour = '".$id."' and user_id = ".$user_id." and prev_tag_ident = ".$prev_tag_ident." order by kind, tag_ident";
	//echo $ssqlp.'<br>';
	
	$result = mysql_query($ssqlp);

	
	while($row = mysql_fetch_array($result)){
		
		$devolver_final = 1;

		//Si hay un nuevo tag, imprimo apertura (si el tag_name != '', imprimo cierre antes)
		if($tag_ident != $row["tag_ident"] || $tag_name != $row["tag_name"] || $kind != $row["kind"]){

			if($tag_ident != ''){ //si ya había tag, lo cierro
				$final_xml .= '>';
				$final_xml .= $in_tag_code;
				$final_xml .= get_xml($segment, $kind, $tag_ident);
				$final_xml .= '</'.$tag_name.'>
				';
				$in_tag_code = '';
			}
			
			$tag_ident = $row["tag_ident"];
			$tag_name = $row["tag_name"];
			$segment = $row["segment"];
			
			$kind = $row["kind"];
			
			
			if($custom_attrs == 1){
				$final_xml .= '
				<'.$tag_name.' tag_ident="'.$tag_ident.'" prev_tag_ident="'.$prev_tag_ident.'" segment="'.$segment.'" kind="'.$kind.'"';
			}else{
				$final_xml .= '
				<'.$tag_name;
			}
			
		}

		//Imprimo attibutes y valor dentro del tag (si es text, no)
		if($row["attr"] == 'text'){ //si es text, es codigo dentro del tag, lo almaceno pero no lo muestro, se inserta en el cierre del tag
			$in_tag_code = '
			'.$row["value"].'
			';
		}else{
			$final_xml .= ' '.$row["attr"].'="'.$row["value"].'"';
		}
		
		


	};

	if($devolver_final == 1){
		$final_xml .= '>';
		$final_xml .= $in_tag_code;
		$final_xml .= get_xml($segment, $kind, $tag_ident);
		$final_xml .= '</'.$tag_name.'>
		';
		$in_tag_code = '';
	}
	
	return $final_xml;

}


function get_scenes(){
	global $user_id;
	global $id;
	global $draft_subscript;
	global $cdn;
	global $custom_attrs;

	$final_data = '';

	//SCENES

	$ssqlp = "SELECT * FROM panosxtour".$draft_subscript." where idtour = ".$id." order by ord";

	if($custom_attrs == 1){
		$segment_html .= 'segment="SCENES"';
	}else{
		$segment_html .= '';
	}	

	$result = mysql_query($ssqlp);
	while($row = mysql_fetch_array($result)){

		$final_data.= '
		<scene '.$segment_html.' name="scene_'.$row["id"].'" urlname="'.htmlspecialchars($row["urlname"]).'" title="'.htmlspecialchars($row["name"]).'" onstart=""  thumburl="'.$cdn.'/panos/'.$row["idpano"].'/pano.tiles/thumb200x100.jpg" lat="'.htmlspecialchars($row["lat"]).'" lng="'.htmlspecialchars($row["lng"]).'" description="'.htmlspecialchars($row["description"]).'" heading="'.htmlspecialchars($row["heading"]).'">
			<view '.$segment_html.' hlookat="'.$row["hlookat"].'" vlookat="'.$row["vlookat"].'" fovtype="'.$row["fovtype"].'" fov="'.$row["fov"].'" maxpixelzoom="'.$row["maxpixelzoom"].'" fovmin="'.$row["fovmin"].'" fovmax="'.$row["fovmax"].'" limitview="'.$row["limitview"].'"  />

			<preview '.$segment_html.' url="'.$cdn.'/panos/'.$row["idpano"].'/pano.tiles/preview.jpg" />

			<image '.$segment_html.'>

				<cube '.$segment_html.' url="'.$cdn.'/panos/'.$row["idpano"].'/pano.tiles/pano_%s.jpg" />

				<mobile '.$segment_html.'>
					<cube '.$segment_html.' url="'.$cdn.'/panos/'.$row["idpano"].'/pano.tiles/mobile_%s.jpg" />
				</mobile>

			</image>';

		//HOTSPOTS

		$ssqlp_htsp = "SELECT * FROM hotspots".$draft_subscript." where scene_id = ".$row["id"];
		$result_htsp = mysql_query($ssqlp_htsp);
		while($row_htsp = mysql_fetch_array($result_htsp)){



			$final_data.= '
			<hotspot style="'.$row_htsp["style"].'" kind="'.htmlspecialchars($row_htsp["type"]).'" name="'.htmlspecialchars($row_htsp["name"]).'" ath="'.$row_htsp["ath"].'" atv="'.$row_htsp["atv"].'"';

			switch ($row_htsp["type"]) {
				case "arrow":
					$final_data.= ' linkedscene="'.$row_htsp["extra_linkedscene"].'" />';
					break;
				case "info":
					$final_data.= ' infotitle="'.str_replace("'", "´", htmlspecialchars($row_htsp["extra_infotitle"])).'" infotext="'.str_replace("'", "´", htmlspecialchars($row_htsp["extra_infotext"])).'" />';
					break;
				case "photo":
					$final_data.= ' pic="'.htmlspecialchars($row_htsp["extra_photourl"], ENT_QUOTES).'" tooltip="'.htmlspecialchars($row_htsp["extra_tooltip"], ENT_QUOTES).'" />';
					break;
				case "link":
					$final_data.= ' linkurl="'.$row_htsp["extra_linkurl"].'" tooltip="'.htmlspecialchars($row_htsp["extra_tooltip"], ENT_QUOTES).'" />';
					break;
			}

		}


		$final_data .= 	'
		</scene>';
	}

	return $final_data;

}

?>