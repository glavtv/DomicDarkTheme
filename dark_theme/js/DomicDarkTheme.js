//Use Jquery 3.5.1
var nj = $.noConflict(true);

//Vars
var DarkDomic_Stable = null,
	FirstDataLoad = 0,
	Original_Title = "",
	Original_Icon_Link = "http://domic.isu.ru/favicon.ico";		//eror, get: 500

//Default Vars for local storage
var EnableTheme = "Enabled",
    EnableCustomIcon = "Enabled",
    CustomIconLink = "[Default]",
    CustomSiteTitle = "Dark Domic",
    ColourOfTheme = "Default";

//Work with BackgroundWorker
var myPort = browser.runtime.connect({name:"DarkDomic-Port"});

myPort.onMessage.addListener(function(m) 
{
	var NewData = m.greeting;
	if (FirstDataLoad == 0)
	{
		FirstDataLoad = 1;
		Original_Title = document.title;
		UpdateVars(NewData);
		if (EnableTheme == "Enabled")
		{
			//SetTheme("Default");
			//window.storage.sync.clear("color");
		}
		else
		{
			//window.storage.sync.clear("color");
		}
		console.log("{Dark Domic Extension} - Settings loaded.");
	}
	else
	{
		if (EnableTheme != NewData.EnableTheme || EnableCustomIcon != NewData.EnableCustomIcon || CustomIconLink != NewData.CustomIconLink || CustomSiteTitle != NewData.CustomSiteTitle || ColourOfTheme != NewData.ColourOfTheme)
		{
			UpdateVars(NewData);
			OnThemeOrUpdate();
			console.log("{Dark Domic Extension} - Settings сhanged.");
		}
		else
		{
			console.log("{Dark Domic Extension} - Without changes.");
		}
	}
});

function UpdateVars(NewData)
{
	if (NewData != null)
	{
		//Enable Theme
		EnableTheme = (NewData.EnableTheme == "Enabled") ? EnableTheme = "Enabled" : EnableTheme = "Disabled" ;
		
		//Enable Custom Icon
		EnableCustomIcon = (NewData.EnableCustomIcon == "Enabled") ? EnableCustomIcon = "Enabled" : EnableCustomIcon = "Disabled" ;
		
		//Custom Icon Link
		CustomIconLink = NewData.CustomIconLink;
		
		//Custom Title
		CustomSiteTitle = NewData.CustomSiteTitle;
		
		//Selected Colour
		ColourOfTheme = NewData.ColourOfTheme;
	}
}
//

function SetIcon (LinkToIcon)
{
	if(LinkToIcon == "[Default]")
	{
		if (document.readyState || document.body.readyState =='complete')
		{
			if (nj("#SiteIcon").length > 0)
			{
				nj("#SiteIcon").remove();
			}
			nj('head').prepend('<link id="SiteIcon" rel="shortcut icon" type="image/png" href="' + browser.runtime.getURL("assets/icons/logo_128.png") +'" />');
		}
	}
	else
	{
		if (document.readyState || document.body.readyState =='complete')
		{
			if (nj("#SiteIcon").length > 0)
			{
				nj("#SiteIcon").remove();
			}
			nj('head').prepend('<link id="SiteIcon" rel="shortcut icon" type="image/png" href="' + LinkToIcon + '" />');
		}
	}
}

function SetTheme (ThemeLink)
{
	var path;
	var set = "false";
	switch(ThemeLink)
	{
			case "Default":
			{
				path = browser.runtime.getURL("dark_theme/css/DarkThemeStyle.css");
				set = "true";
				break;
			}
			case "FullDark":
			{
				break;
			}
			case "Purple":
			{
				break;
			}
			case "Clear":
			{
				window.storage.sync.remove("color"); 
				break;
			}
	}
	
	if(set == "true")
	{
		window.addEventListener("DOMSubtreeModified", function() 
		{
			nj('<link>', {
					id: 'DarkDomicStyle',
					rel: 'stylesheet',
					type: 'text/css',
					href: path
				}).prependTo('head');
			});
	}
}

nj(document).ready(function() 
{
    Run_DarkDomic_Stable();
});

function Run_DarkDomic_Stable()
{
    if (EnableTheme == "Enabled")
	{
        OnThemeOrUpdate();
    }
	else
	{
		OffTheme();
	}
	setTimeout(Run_DarkDomic_Stable, 750);
}

function OffTheme()
{
	//Set light Site Icon (Original get:500)	
	SetIcon(browser.runtime.getURL("assets/icons/toolbar_32_light.png"));
		
	//Custom Site Title
	document.title = Original_Title;
		
	//Delete Theme
	//SetTheme("Clear");
}

function OnThemeOrUpdate()
{
	if (EnableTheme == "Enabled")
	{
        //Custom Site Title
		if ((CustomSiteTitle == "[None]" && document.title != Original_Title) || (CustomSiteTitle == "[Default]" && document.title != "Dark Domic") || (CustomSiteTitle != "[None]" && CustomSiteTitle != "[Default]" && document.title != CustomSiteTitle))
		{
			if (CustomSiteTitle == "[None]")
			{
				document.title = Original_Title;
			}
			else if (CustomSiteTitle == "[Default]")
			{
				document.title = "Dark Domic";
			}
			else
			{
				document.title = CustomSiteTitle;
			}	
		}
		
		
		//Custom Icon
		if (EnableCustomIcon == "Enabled")
		{
			SetIcon(CustomIconLink);
		}
		else
		{
			if (nj("#SiteIcon").length > 0)
			{
				//Set light Site Icon (Original get:500)	
				SetIcon(browser.runtime.getURL("assets/icons/toolbar_32_light.png"));
				nj("#SiteIcon").remove();
			}
		}
		
		//Set Theme
		//SetTheme(ColourOfTheme);
    }
}