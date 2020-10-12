//Use Jquery 3.5.1
var nj = $.noConflict(true);

//Main logic
function checkDarkDomic() 
{
    if (document.readyState || document.body.readyState =='complete')
    {
		console.log(DarkDomicSettings);
        if (nj("#DarkDomicStyle").length < 1) 
        {
            document.title = "Dark Domic";
            nj('head').append('<style id="DarkDomicStyle">@import url("' + browser.runtime.getURL("dark_theme/css/DarkThemeStyle.css") + '");</style>');
            nj('head').prepend('<link id="SiteIcon" rel="shortcut icon" type="image/png" href="' + browser.runtime.getURL("assets/icons/logo_128.png") +'" />');
        }
    }
	setTimeout(checkDarkDomic, 20);
}
checkDarkDomic();