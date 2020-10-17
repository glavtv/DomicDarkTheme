//Use Jquery 3.5.1
var nj = $.noConflict(true);

//Vars
var DarkDomic_Stable = null,
	FirstDataLoad = 0,
	ActiveTheme = "none",
	Original_Title = "",
	Original_Icon_Link = "http://domic.isu.ru/favicon.ico";		//eror, get: 500

//Default Vars for local storage
var EnableTheme = "Enabled",
    EnableCustomIcon = "Enabled",
    CustomIconLink = "[Default]",
    CustomSiteTitle = "[Default]",
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
		console.log("{Dark Domic Extension} - Settings loaded.");
	}
	else
	{
		if (EnableTheme != NewData.EnableTheme || EnableCustomIcon != NewData.EnableCustomIcon || CustomIconLink != NewData.CustomIconLink || CustomSiteTitle != NewData.CustomSiteTitle || ColourOfTheme != NewData.ColourOfTheme)
		{
			console.log("{Dark Domic Extension} - Settings сhanged.");
		}
		else
		{
			console.log("{Dark Domic Extension} - Without changes.");
		}
	}
	UpdateVars(NewData);
	Run_DarkDomic_Stable();
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
	if (document.readyState || document.body.readyState =='complete')
	{
		if (nj("#SiteIcon").length > 0)
		{
			nj("#SiteIcon").remove();
		}
		if(LinkToIcon == "[Default]")
		{
			nj('head').prepend('<link id="SiteIcon" rel="shortcut icon" type="image/png" href="' + browser.runtime.getURL("assets/icons/logo_128.png") +'" />');
		}
		else
		{
			nj('head').prepend('<link id="SiteIcon" rel="shortcut icon" type="image/png" href="' + LinkToIcon + '" />');
		}
	}
	else
	{
		setTimeout(SetIcon, 500, LinkToIcon);
	}
}

function SetTheme (ThemeLink)
{
	if (ThemeLink == "Clear" || (ThemeLink != ActiveTheme && ActiveTheme != "none"))
	{
		if (ThemeLink == "Clear")
		{
			ActiveTheme = "none";
		}
		nj("head #DarkDomicStyle").remove();
	}
	if (ActiveTheme == "none" || (ThemeLink != ActiveTheme && ActiveTheme != "none"))
	{
		var path,
			set = "false";
		
		switch(ThemeLink)
		{
			case "Default":
			{
				ActiveTheme = "Default";
				path = browser.runtime.getURL("dark_theme/css/DarkThemeStyle.css");
				set = "true";
				break;
			}
			case "FullDark":
			{
				ActiveTheme = "FullDark";
				break;
			}
			case "Purple":
			{
				ActiveTheme = "Purple";
				break;
			}
		}
		
		if(set == "true")
		{
			nj('<link>', {
				id: 'DarkDomicStyle',
				rel: 'stylesheet',
				type: 'text/css',
				href: path
			}).prependTo('head');
		}
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
}

function OffTheme()
{
	//Set light Site Icon (Original get:500)	
	SetIcon(browser.runtime.getURL("assets/icons/toolbar_32_light.png"));
		
	//Custom Site Title
	document.title = Original_Title;
		
	//Delete Theme
	SetTheme("Clear");
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
			//SetIcon(Original_Icon_Link);
			SetIcon(browser.runtime.getURL("assets/icons/toolbar_32_light.png"));
		}
		
		//Set Theme
		SetTheme(ColourOfTheme);
    }
}