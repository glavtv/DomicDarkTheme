var DarkDomic_Port;

window.addEventListener('storage', function(e) { 
	DarkDomic_Port.postMessage({greeting: GetNewSettigns()});
});

function Сonnect(Port) {
	DarkDomic_Port = Port;
	DarkDomic_Port.postMessage({greeting: GetNewSettigns()});
}

function GetNewSettigns()
{
	var LoadedUserData = JSON.parse(localStorage.getItem('DarkDomicData'));
	return LoadedUserData;
}

browser.runtime.onConnect.addListener(Сonnect);