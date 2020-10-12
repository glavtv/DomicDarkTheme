var EnableTheme = "Enabled",
    EnableCustomIcon = "Enabled",
    CustomIconLink = "[Default]",
    CustomSiteTitle = "[Default]",
    ColourOfTheme = "Default";

var LoadedUserData = null;

$(document).ready(function() 
{
	//localStorage.removeItem("DarkDomicData");
	LoadSavedData();
	SetIcon(EnableTheme);
	
   $('#SaveAndRefresh').on('click', function(e)
	{
		e.preventDefault();
		SaveData();
	});
	
	$('#themeEnabled').on('click', function(e)
	{
		if($('#themeEnabled').is(":checked"))
		{
			ThemeEnabled();
		}
		else
		{
			ThemeDisabled();
		}
	});
	
});

function SaveData()
{
	RefreshData();
	var UserData = 
	{
		"EnableTheme": EnableTheme,
		"EnableCustomIcon": EnableCustomIcon,
		"CustomIconLink": CustomIconLink,
		"CustomSiteTitle": CustomSiteTitle,
		"ColourOfTheme": ColourOfTheme
	};
	localStorage.setItem('DarkDomicData', JSON.stringify(UserData));
}

function RefreshData()
{
	EnableTheme = ($('#themeEnabled').is(":checked")) ? "Enabled" : "Disabled" ;
	EnableCustomIcon = ($('#customIcon').is(":checked")) ? "Enabled" : "Disabled" ;
	CustomIconLink = $('#customIconLink').val();
	CustomSiteTitle = $('#customTitle').val();
	ColourOfTheme = $('input[name=style_colour]:checked', '#Settings-Form').val();
}

function LoadSavedData()
{
	LoadedUserData = JSON.parse(localStorage.getItem('DarkDomicData'));
	if (LoadedUserData != null)
	{
		
		//Enable Theme
		if (LoadedUserData.EnableTheme == "Enabled")
		{
			ThemeEnabled();
			EnableTheme = "Enabled";
			$('#themeEnabled').prop('checked', true);
		}
		else
		{
			ThemeDisabled();
			EnableTheme = "Disabled";
			$('#themeEnabled').prop('checked', false);
		}
		
		//Enable Custom Icon
		if (LoadedUserData.EnableCustomIcon == "Enabled")
		{
			EnableCustomIcon = "Enabled";
			$('#customIcon').prop('checked', true);
		}
		else
		{
			EnableCustomIcon = "Disabled";
			$('#customIcon').prop('checked', false);
		}
		
		//Custom Icon Link
		CustomIconLink = LoadedUserData.CustomIconLink;
		$('#customIconLink').val(CustomIconLink);
		
		//Custom Title
		CustomSiteTitle = LoadedUserData.CustomSiteTitle;
		$('#customTitle').val(CustomSiteTitle);
		
		//Selected Colour
		ColourOfTheme = LoadedUserData.ColourOfTheme;
		switch(ColourOfTheme)
		{
			case "Default":
			{
				$('input[name="style_colour"]').prop('checked', false);
				$('input[name="style_colour"][value="Default"]').prop('checked', true);
				break;
			}
			case "FullDark":
			{
				$('input[name="style_colour"]').prop('checked', false);
				$('input[name="style_colour"][value="FullDark"]').prop('checked', true);
				break;
			}
			case "Purple":
			{
				$('input[name="style_colour"]').prop('checked', false);
				$('input[name="style_colour"][value="Purple"]').prop('checked', true);
				break;
			}
		}
	}
	else
	{
		SaveData();
	}
}

function SetIcon(Theme) {
	(Theme == "Disabled") ? browser.browserAction.setIcon({path: browser.runtime.getURL("assets/icons/toolbar_32_light.png")}) : browser.browserAction.setIcon({path: browser.runtime.getURL("assets/icons/toolbar_32_dark.png")}) ;
}

function ThemeDisabled()
{
	$('#customIcon').prop( "disabled", true );
	$('#customIconLink').prop( "disabled", true );
	$('#customTitle').prop( "disabled", true );
	$('input[name="style_colour"]').prop( "disabled", true );
	SetIcon("Disabled");
}

function ThemeEnabled()
{
	$('#customIcon').prop( "disabled", false );
	$('#customIconLink').prop( "disabled", false );
	$('#customTitle').prop( "disabled", false );
	$('input[name="style_colour"]').prop( "disabled", false );
	SetIcon("Enabled");
}