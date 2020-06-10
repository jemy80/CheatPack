let xhr = new XMLHttpRequest();
let brainlyCheat;

chrome.storage.sync.get(['brainlyCheat'], async (result) => {
	brainlyCheat = result.brainlyCheat ? true : false;
	chrome.runtime.sendMessage({ query: "serverAddress" }, function (response) {
		let serverAddress = response.serverAddress;

		if (brainlyCheat) {
			xhr.open('GET', `${serverAddress}/brainly/inject.js`, true); // Base inject script
			xhr.send(null);
		}

		let scriptNumber = 0;

		xhr.onload = () => {
			if (xhr.status == 200) {
				const scriptElement = document.createElement('script');
				script = document.createTextNode(xhr.responseText);
				scriptElement.appendChild(script);
				scriptElement.type = 'text/javascript';
				document.body.appendChild(scriptElement);
				scriptNumber++;
				nextXHR(scriptNumber);
				if (scriptNumber == 1) console.info(`%c${chrome.i18n.getMessage('brainlyLoading')}`, "font-style: italic"); // Console log to make sure the script has been loaded.
			}
		}

		const nextXHR = (scriptNumber) => {
			if (scriptNumber == 1) {
				if (brainlyCheat) {
					xhr.open('GET', `${serverAddress}/brainly/limitbypass.js`, true); // Bypass answers view limit
					xhr.send(null);
				}
			}
		}
	});
});
