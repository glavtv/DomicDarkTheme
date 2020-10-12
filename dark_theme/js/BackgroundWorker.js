var portFromCS;

var LoadedUserData = JSON.parse(localStorage.getItem('DarkDomicData'));

window.addEventListener('storage', function(e) { 
	RefreshUserData();
	portFromCS.postMessage({greeting: LoadedUserData});
});

function Сonnect(p) {
	portFromCS = p;
	portFromCS.postMessage({greeting: LoadedUserData});
}

function RefreshUserData()
{
	LoadedUserData = JSON.parse(localStorage.getItem('DarkDomicData'));
}

browser.runtime.onConnect.addListener(Сonnect);