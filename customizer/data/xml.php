<?
ini_set("display_errors", 0);
require_once("conex.inc");




$cdn = 'data';   //CAMBIAR A CDN VERDADERO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<




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
	
//XML HEAD
	$print_xml = '<krpano onstart="startup();">
	';
	

//Toma de settings generales y skills
	$prev_tag_ident = 0;
	$print_xml .= get_xml($prev_tag_ident);	

//Toma de scenes y hotspots
	$print_xml .= get_scenes();

	
//Toma de free hotspots styles
	$prev_tag_ident = 0;
	$print_xml .= get_free_htpts_styles();
		
	
	$print_xml .= '</krpano>';
	
	if(isset($_GET['format']) && $_GET['format'] == 'txt'){
		echo '<pre>'.htmlentities($print_xml).'</pre>'; //as txt
	}else{
		echo $print_xml; //as xml
	}
	
	
}

function get_free_htpts_styles(){
	global $segment;
	$ssqlp = "SELECT * FROM customizer_free_htspts_styles order by kind, style_id";
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
			
			
			$final_xml .= '
			<style';
			
			/*
			$final_xml .= '
			<style segment="'.$segment.'" kind="'.$kind.'"';
			*/
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

function get_xml($prev_tag_ident){
	global $user_id;
	global $idtour;
	global $draft_subscript;
	global $cdn;
	
	$final_xml = '';
	$tag_ident = '';
	$tag_name = '';

	$devolver_final = 0;
	$in_tag_code = '';
	
	//$ssqlp = "SELECT * FROM customizer".$draft_subscript." where segment = '".$segment."' and idtour = '".$idtour."' and user_id = ".$user_id." and prev_tag_ident = ".$prev_tag_ident." order by segment_ord, ord";
	$ssqlp = "SELECT * FROM customizer".$draft_subscript." where idtour = '".$idtour."' and user_id = ".$user_id." and prev_tag_ident = ".$prev_tag_ident." order by tag_ident";
	//echo $ssqlp.'<br>';
	
	$result = mysql_query($ssqlp);

	
	while($row = mysql_fetch_array($result)){
		
		$devolver_final = 1;
		
		/*
		//Si hay un nuevo segmento, imprimo comentario (si el $segment != '', imprimo cierre antes y pongo bandera para que no se vuelva a cerrar)
		if($segment != $row["segment"]){
			if($segment != ''){
				$final_xml .= '>';
				$final_xml .= $in_tag_code;
				$final_xml .= get_xml($segment, $tag_ident);
				$final_xml .= '</'.$tag_name.'>
				';
				$tag_name = '';
				$in_tag_code = '';
			}
			$segment = $row["segment"];

		}
		*/


		//Si hay un nuevo tag, imprimo apertura (si el tag_name != '', imprimo cierre antes)
		if($tag_ident != $row["tag_ident"] || $tag_name != $row["tag_name"]){

			if($tag_ident != ''){
				$final_xml .= '>';
				$final_xml .= $in_tag_code;
				$final_xml .= get_xml($tag_ident);
				$final_xml .= '</'.$tag_name.'>
				';
				$in_tag_code = '';
			}
			$tag_ident = $row["tag_ident"];
			$tag_name = $row["tag_name"];
			
			
			if($row["in_tag_code"] != ''){
				$in_tag_code = '
				'.$row["in_tag_code"].'
				';
			}
			/*
			if($segment != 'GENERAL'){
				$final_xml .= '
				<'.$tag_name.' tag_ident="'.$tag_ident.'" prev_tag_ident="'.$prev_tag_ident.'" segment="'.$segment.'" kind="'.$kind.'"';
			}else{
			*/
				$final_xml .= '
				<'.$tag_name;
			//}
		}

		//Imprimo attibutes y valor dentro del tag
		$final_xml .= ' '.$row["attr"].'="'.$row["value"].'"';


	};

	if($devolver_final == 1){
		$final_xml .= '>';
		$final_xml .= $in_tag_code;
		$final_xml .= get_xml($tag_ident);
		$final_xml .= '</'.$tag_name.'>
		';
		$in_tag_code = '';
	}
	
	return $final_xml;

}


function get_scenes(){
	global $user_id;
	global $idtour;
	global $draft_subscript;
	global $cdn;

	$final_data = '';

	//SCENES

	$ssqlp = "SELECT * FROM panosxtour".$draft_subscript." where idtour = ".$idtour." order by ord";



	$result = mysql_query($ssqlp);
	while($row = mysql_fetch_array($result)){

		$final_data.= '
		<scene name="scene_'.$row["id"].'" urlname="'.htmlspecialchars($row["urlname"]).'" title="'.htmlspecialchars($row["name"]).'" onstart=""  thumburl="'.$cdn.'/panos/'.$row["idpano"].'/pano.tiles/thumb200x100.jpg" lat="'.htmlspecialchars($row["lat"]).'" lng="'.htmlspecialchars($row["lng"]).'" description="'.htmlspecialchars($row["description"]).'" heading="'.htmlspecialchars($row["heading"]).'">
			<view hlookat="'.$row["hlookat"].'" vlookat="'.$row["vlookat"].'" fovtype="'.$row["fovtype"].'" fov="'.$row["fov"].'" maxpixelzoom="'.$row["maxpixelzoom"].'" fovmin="'.$row["fovmin"].'" fovmax="'.$row["fovmax"].'" limitview="'.$row["limitview"].'"  />

			<preview url="'.$cdn.'/panos/'.$row["idpano"].'/pano.tiles/preview.jpg" />

			<image>

				<cube url="'.$cdn.'/panos/'.$row["idpano"].'/pano.tiles/pano_%s.jpg" />

				<mobile>
					<cube url="'.$cdn.'/panos/'.$row["idpano"].'/pano.tiles/mobile_%s.jpg" />
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