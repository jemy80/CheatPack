chrome.runtime.onMessage.addListener(
	function (req, sender, sendResponse) {
		if (req.query == "serverAddress") {
			sendResponse({ serverAddress: "https://cdn.jsdelivr.net/gh/Naveq-DevTeam/CheatPack@0.0.3/server" }); // CheatPack Server address
		}
	}
);
