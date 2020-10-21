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
    ColourOfTheme = "Default",
	CustomStyleLink = "[None]";

//Css Fix Vars
var OpenHomeworkPage = window.location.pathname;

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
		
		//Custom Style Link
		CustomStyleLink = NewData.CustomStyleLink;
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
	if (ThemeLink == "Clear" || (ThemeLink != ActiveTheme && ActiveTheme != "none") || ThemeLink == "CustomStyle")
	{
		if (ThemeLink == "Clear")
		{
			ActiveTheme = "none";
		}
		nj("head #DarkDomicStyle").remove();
	}
	if (ActiveTheme == "none" || (ThemeLink != ActiveTheme && ActiveTheme != "none") || ThemeLink == "CustomStyle")
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
			case "CustomStyle":
			{
				ActiveTheme = "CustomStyle";
				if (CustomStyleLink != "[None]")
				{
					path = CustomStyleLink;
					set = "true";
				}
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
	CssFix();
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

function CssFix()
{
	var student = OpenHomeworkPage.match(/\bstudent\b/i);
	var entity = OpenHomeworkPage.match(/\bentity\b/i);
	if (student != null && entity != null && OpenHomeworkPage.length < 24)
	{
		Fix_Comment();
	}
	
	var content = OpenHomeworkPage.match(/\bcontent\b/i);
	var html_page_opened = OpenHomeworkPage.match(/\b.html\b/i);
	if (content != null && html_page_opened != null)
	{
		Fix_HomeWork_Content();
	}
}

function Fix_Comment()
{
	var Deadline,
		HWChecked,
		CommentSection;
	
	Deadline = nj( "#content #navbar + h2 + h3 + h4 + p + div" );
	HWChecked = nj( "#content #studyEntity-requirements + div" );
	CommentSection = nj( "#content .student-comment + div" );
	
	if (HWChecked.length < 1)
	{
		HWChecked = nj( "#content .instructor-comment + div" );
	}
	if (CommentSection.length < 1)
	{
		CommentSection = nj( "#content #studyEntity-requirements + div + hr + h4 + div" );
		if (CommentSection.length < 1)
		{
			CommentSection = nj( "#content #studyEntity-requirements + hr + h4 + div" );
		}
	}
	
	if ( nj(Deadline).css('background-color') == 'rgb(255, 192, 203)')
	{
		nj(Deadline)
			.css('background-color', '#f72c2c')
			.css('border-radius','4px')
			.css('padding','0px')
			.css('width','300px');
	}
	if ( nj(HWChecked).css('background-color') == 'rgb(173, 216, 230)')
	{
		nj(HWChecked)
			.css('background-color', 'var(--dark-theme-score2)')
			.css('border-radius','4px');
	}
	if ( nj(CommentSection).css('background-color') == 'rgb(255, 192, 203)')
	{
		nj(CommentSection)
			.css('background-color', '')
			.css('padding-top', '20px')
			.css('padding-left', '10px')
			.css('border-top', '1px solid var(--dark-theme-gray)')
			.css('border-bottom', '1px solid var(--dark-theme-gray)')
			.css('border-radius','5px');
	}
	
	/*
	console.log(Deadline);
	console.log(HWChecked);
	console.log(CommentSection);
	*/
}

function Fix_HomeWork_Content()
{
	nj("body").eq(0).css("all", "initial")
}