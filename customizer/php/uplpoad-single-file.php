<?php

function exit_status($return)
{
    echo json_encode($return);
    exit;
}

function get_extension($file_name)
{
    $ext = explode('.', $file_name);
    $ext = array_pop($ext);
    return strtolower($ext);
}

$upload_dir = '../graphics/';
$allowed_ext = array('tif', 'tiff','jpg', 'jpeg', 'png');


if(strtolower($_SERVER['REQUEST_METHOD']) != 'post')
{
    exit_status(array(
                    'result' => 'ERROR', 
                    'msg' => 'Error! Wrong HTTP method!'
    ));         
}


if(array_key_exists('pic',$_FILES) && $_FILES['pic']['error'] == 0 )
{
    $pic = $_FILES['pic'];
    $ext = get_extension($pic['name']);

    if(!in_array($ext,$allowed_ext))
    {
        exit_status(array(
                'result' => 'ERROR', 
                'msg' => 'Only '.implode(',',$allowed_ext).' files are allowed!'
        ));   
    }	
    
    
    if(!in_array($ext,$allowed_ext))
    {
        exit_status(array(
                'result' => 'ERROR', 
                'msg' => 'Only '.implode(',',$allowed_ext).' files are allowed!'
        ));   
    }	


    if($demo_mode)
    {
        // File uploads are ignored. We only log them.

        $line = implode('		', array( date('r'), $_SERVER['REMOTE_ADDR'], $pic['size'], $pic['name']));
        file_put_contents('log.txt', $line.PHP_EOL, FILE_APPEND);

        exit_status(array(
                'result' => 'ERROR', 
                'msg' => 'Uploads are ignored in demo mode.'
        ));                        
    }

   	
	
   	
    

    if(move_uploaded_file($pic['tmp_name'], $upload_dir.'/'.$file_name)    
    {
        
        exit_status(array(
                'result' => 'SUCCESS', 
                'msg' => 'File was uploaded successfuly!', 
                'params' => array(
                             
                                'file_name' => $pic['name']
                    
        )));
    }
	
}

/*si hubo un error borro el registro de la pano y la scene*/

/*
mysql_query("delete from panos where id = ".$elid);
mysql_query("delete from panosxtour where id = ".$scene_id);

exit_status(array(
                'result' => 'ERROR', 
                'msg' => 'Something went wrong with your upload!'
));
*/

?>
