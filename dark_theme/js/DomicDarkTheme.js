//Use Jquery 3.5.1
var nj = $.noConflict(true);

//Vars
var DarkDomic_Stable = null,
    DarkDomic_UnStable = null,
	FirstDataLoad = 0,
	Original_Title = "",
	Original_Icon_Link = "http://domic.isu.ru/favicon.ico";

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
		console.log("Data loaded.");
	}
	else
	{
		var NewData_fromSettings = 0;
	
		if ( EnableTheme != NewData.EnableTheme )
		{
			NewData_fromSettings++;
		}
		if ( EnableCustomIcon != NewData.EnableCustomIcon )
		{
			NewData_fromSettings++;
		}
		if ( CustomIconLink != NewData.CustomIconLink )
		{
			NewData_fromSettings++;
		}
		if ( CustomSiteTitle != NewData.CustomSiteTitle )
		{
			NewData_fromSettings++;
		}
		if ( ColourOfTheme != NewData.ColourOfTheme )
		{
			NewData_fromSettings++;
		}
		if (NewData_fromSettings > 0)
		{
			UpdateVars(NewData);
			RefreshInjectedData();
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

function RefreshInjectedData()
{
	if (EnableTheme == "Enabled")
	{
		//Custom Site Title
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

		//Custom Icon
		if (EnableCustomIcon == "Enabled")
		{
			SetIcon(CustomIconLink);
		}
		else
		{
			if (nj("#SiteIcon").length > 0)
			{
				nj("#SiteIcon").remove();
			}
		}
	}
	else
	{
		
		jQuery.ajax({
			type: "GET",
			url: Original_Icon_Link,
			dataType: "image/jpg",
			success: function (image) {
				console.log("SEX CESS");
			},
			error: function () {
				console.log("EROR");
			}
		});
		
		
		//Delete Site Icon
		SetIcon(Original_Icon_Link);
		//nj("#SiteIcon").remove();
		
		//Custom Site Title
		document.title = Original_Title;
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

nj(document).ready(function() 
{
    //DarkDomic_Stable = setTimeout(DarkDomic_Stable);
    //setTimeout(Run_DarkDomic_UnStable);
});

function Run_DarkDomic_Stable()
{
    if (nj("#DarkDomicStyle").length < 1) 
    {
        document.title = "Dark Domic";
        nj('head').append('<style id="DarkDomicStyle">@import url("' + browser.runtime.getURL("dark_theme/css/DarkThemeStyle.css") + '");</style>');
        nj('head').prepend('<link id="SiteIcon" rel="shortcut icon" type="image/png" href="' + browser.runtime.getURL("assets/icons/logo_128.png") +'" />');
    }
}

function Run_DarkDomic_UnStable()
{
    if (document.readyState || document.body.readyState =='complete')
    {
        if (nj("#DarkDomicStyle").length < 1) 
        {
            document.title = "Dark Domic";
            nj('head').append('<style id="DarkDomicStyle">@import url("' + browser.runtime.getURL("dark_theme/css/DarkThemeStyle.css") + '");</style>');
            nj('head').prepend('<link id="SiteIcon" rel="shortcut icon" type="image/png" href="' + browser.runtime.getURL("assets/icons/logo_128.png") +'" />');
        }
    }
	DarkDomic_UnStable = setInterval(DarkDomic_UnStable, 1000);
}