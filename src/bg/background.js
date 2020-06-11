chrome.runtime.onMessage.addListener(
	function (req, sender, sendResponse) {
		if (req.query == "serverAddress") {
			sendResponse({ serverAddress: "https://cdn.jsdelivr.net/gh/Naveq-DevTeam/CheatPack-Server" }); // CheatPack Server address
		}
	}
);
