var EnableTheme = "Enabled",
    EnableCustomIcon = "Enabled",
    CustomIconLink = "[Default]",
    CustomSiteTitle = "Dark Domic",
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











/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
/**
const hidePage = `body > :not(.beastify-image) {
                    display: none;
                  }`;
 */

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
/** 
function listenForClicks() {
  document.addEventListener("click", (e) => {
*/
    /**
     * Given the name of a beast, get the URL to the corresponding image.
     */
    /** 
    function beastNameToURL(beastName) {
      switch (beastName) {
        case "dark":
          return browser.extension.getURL("assets/icons/toolbar_32_dark.png");
        case "light":
          return browser.extension.getURL("assets/icons/light.png");
      }
    }
*/
    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    /** 
    function beastify(tabs) {
      browser.tabs.insertCSS({code: hidePage}).then(() => {
        let url = beastNameToURL(e.target.textContent);
        browser.tabs.sendMessage(tabs[0].id, {
          command: "beastify",
          beastURL: url
        });
      });
    }
    */

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "reset" message to the content script in the active tab.
     */
    /** 
    function reset(tabs) {
      browser.tabs.removeCSS({code: hidePage}).then(() => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "reset",
        });
      });
    }
    */

    /**
     * Just log the error to the console.
     */
    /** 
    function reportError(error) {
      console.error(`Could not beastify: ${error}`);
    }
    */

    /**
     * Get the active tab,
     * then call "beastify()" or "reset()" as appropriate.
     */
    /** 
    if (e.target.classList.contains("beast")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(beastify)
        .catch(reportError);
    }
    else if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }
  });
}
*/

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
/** 
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}
*/

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
/** 
browser.tabs.executeScript({file: "/content_scripts/beastify.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
*/