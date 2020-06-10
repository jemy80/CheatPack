chrome.runtime.onMessage.addListener(
	function (req, sender, sendResponse) {
		if (req.query == "serverAddress") {
			sendResponse({ serverAddress: "https://raw.githubusercontent.com/Naveq-DevTeam/CheatPack/master/server" }); // CheatPack Server address
		}
	}
);
