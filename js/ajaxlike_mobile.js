function like(id){

		{
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		{
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		  {
			if(xmlhttp.responseText == 'error'){
				showMessage('Spinattic', 'You must be logged in to like a tour')
			}else{
			  notificate(id, 2);
			  document.getElementById("like"+id).innerHTML=xmlhttp.responseText;
			  if (jQuery('div.count a#like').length)  jQuery('div.count a#like').html(xmlhttp.responseText);
			}
		  }
		}
		xmlhttp.open("GET","../like.php?id="+id,true);
		xmlhttp.send();
		return false;
		}
	}
