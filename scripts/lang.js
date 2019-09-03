var translateWebPage = function (jsdata)
{	
	$("[lg-key]").each (function ()
	{
		var strTr = jsdata [$(this).attr ('lg-key')];
	    $(this).html (strTr);
	});
}


