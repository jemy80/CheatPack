const readyStateCheckInterval = setInterval(() => {
	if (document.readyState === 'complete') {
		clearInterval(readyStateCheckInterval);
		chrome.runtime.sendMessage({ query: "serverAddress" }, function (response) {
			let serverAddress = response.serverAddress; // Server address

			// I18n for sidebar links.
			document.getElementById('settingsLink').innerHTML = chrome.i18n.getMessage('settingsLink');
			document.getElementById('informationsLink').innerHTML = chrome.i18n.getMessage('informationsLink');
			document.getElementById('discordLink').innerHTML = chrome.i18n.getMessage('discordLink');

			// Naming individual sites based on I18n.
			document.getElementById('testportalHeader').innerHTML = chrome.i18n.getMessage('testportalName');
			document.getElementById('quizizzHeader').innerHTML = chrome.i18n.getMessage('quizizzName');
			document.getElementById('brainlyHeader').innerHTML = chrome.i18n.getMessage('brainlyName');

			// We ask the user what cheats he wants to use. Using I18n we translate these questions.
			document.getElementById('testportalCheatQuestion').innerHTML = chrome.i18n.getMessage('testportalCheatQuestion');
			document.getElementById('quizizzCheatQuestion').innerHTML = chrome.i18n.getMessage('quizizzCheatQuestion');
			document.getElementById('brainlyCheatQuestion').innerHTML = chrome.i18n.getMessage('brainlyCheatQuestion');

			// Discord link
			document.getElementById('discordLink').href = `${serverAddress}/discord`;

			// I18n for experimental warning.
			Array.from(document.querySelectorAll('.experimentalWarning')).forEach(label => {
				label.innerHTML += chrome.i18n.getMessage('experimentalWarning');
			});

			// And we translate checkbox labels...
			Array.from(document.querySelectorAll('.cheatEnableLabel')).forEach(label => {
				label.innerHTML += chrome.i18n.getMessage('cheatEnableLabel');
			});

			// And now we are adding event listeners for checkboxes.
			const testportalCheckbox = document.getElementById('testportalCheckbox');
			const quizizzCheckbox = document.getElementById('quizizzCheckbox');
			const brainlyCheckbox = document.getElementById('brainlyCheckbox');

			testportalCheckbox.addEventListener('change', () => {
				if (testportalCheckbox.checked) {
					chrome.storage.sync.set({ 'testportalCheat': true });
					document.getElementById('testportalOptionsTimeCheatCheckbox').disabled = false;
				} else {
					chrome.storage.sync.set({ 'testportalCheat': false });
					document.getElementById('testportalOptionsTimeCheatCheckbox').disabled = true;
				}
			});
			quizizzCheckbox.addEventListener('change', () => {
				if (quizizzCheckbox.checked) {
					chrome.storage.sync.set({ 'quizizzCheat': true });
					document.getElementById('quizizzOptionsAutoAnswerCheckbox').disabled = false;
					if (document.getElementById('quizizzOptionsAutoAnswerCheckbox').checked) document.getElementById('quizizzOptionsAutoAnswerTime').disabled = false;
				} else {
					chrome.storage.sync.set({ 'quizizzCheat': false });
					document.getElementById('quizizzOptionsAutoAnswerCheckbox').disabled = true;
					document.getElementById('quizizzOptionsAutoAnswerTime').disabled = true;
				}
			});
			brainlyCheckbox.addEventListener('change', () => {
				if (brainlyCheckbox.checked) {
					chrome.storage.sync.set({ 'brainlyCheat': true });
				} else {
					chrome.storage.sync.set({ 'brainlyCheat': false });
				}
			});

			// We will now check what settings are setted and mark the appropriate checkboxes when some of them are already set. 
			chrome.storage.sync.get(['testportalCheat'], (result) => {
				document.getElementById('testportalCheckbox').checked = result.testportalCheat ? true : false;
				if (!document.getElementById('testportalCheckbox').checked) {
					document.getElementById('testportalOptionsTimeCheatCheckbox').disabled = true;
				}
			});
			chrome.storage.sync.get(['quizizzCheat'], (result) => {
				document.getElementById('quizizzCheckbox').checked = result.quizizzCheat ? true : false;
				if (!document.getElementById('quizizzCheckbox').checked) {
					document.getElementById('quizizzOptionsAutoAnswerCheckbox').disabled = true;
					document.getElementById('quizizzOptionsAutoAnswerTime').disabled = true;
				}
			});
			chrome.storage.sync.get(['brainlyCheat'], (result) => {
				document.getElementById('brainlyCheckbox').checked = result.brainlyCheat ? true : false;
			});

			// And again I18n...
			Array.from(document.querySelectorAll('.cheatOptionsHeader')).forEach(element => {
				element.innerHTML = chrome.i18n.getMessage('cheatOptionsHeader'); ``
			});

			// I18n for Quizizz cheat options.
			document.getElementById('quizizzOptionsAutoAnswerLabel').innerHTML += chrome.i18n.getMessage('quizizzOptionsAutoAnswerLabel');
			document.getElementById('AutoAnswerTimeLabel').innerHTML += chrome.i18n.getMessage('AutoAnswerTimeLabel');
			document.getElementById('seconds').innerHTML = chrome.i18n.getMessage('seconds');

			// I18n for Testportal cheat options.
			document.getElementById('testportalOptionsTimeCheatLabel').innerHTML += chrome.i18n.getMessage('testportalOptionsTimeCheatLabel');

			// Quizizz cheat options.
			const quizizzOptionsAutoAnswerCheckbox = document.getElementById('quizizzOptionsAutoAnswerCheckbox');
			const quizizzAutoAnswerTimeInput = document.getElementById('quizizzOptionsAutoAnswerTime');

			quizizzOptionsAutoAnswerCheckbox.addEventListener('change', () => {
				if (quizizzOptionsAutoAnswerCheckbox.checked) {
					chrome.storage.sync.set({ 'quizizzOptionsAutoAnswer': true });
					quizizzAutoAnswerTimeInput.disabled = false;
				} else {
					chrome.storage.sync.set({ 'quizizzOptionsAutoAnswer': false });
					quizizzAutoAnswerTimeInput.disabled = true;
				}
			});

			chrome.storage.sync.get(['quizizzOptionsAutoAnswer', 'quizizzAutoAnswerTime'], (result) => {
				if (result.quizizzOptionsAutoAnswer == true) {
					quizizzOptionsAutoAnswerCheckbox.checked = true;
				} else {
					quizizzAutoAnswerTimeInput.disabled = true;
				}
				quizizzAutoAnswerTimeInput.value = result.quizizzAutoAnswerTime;
			});

			quizizzAutoAnswerTimeInput.addEventListener('input', () => {
				quizizzOptionsAutoAnswerCheckbox.checked = true;
				chrome.storage.sync.set({ 'quizizzOptionsAutoAnswer': true });
				if (quizizzAutoAnswerTimeInput.value == '') quizizzAutoAnswerTimeInput.value = 0;
				while (quizizzAutoAnswerTimeInput.value.charAt(0) === '0' && quizizzAutoAnswerTimeInput.value != 0) {
					quizizzAutoAnswerTimeInput.value = quizizzAutoAnswerTimeInput.value.substr(1);
				}
				chrome.storage.sync.set({ 'quizizzAutoAnswerTime': quizizzAutoAnswerTimeInput.value });
			});

			quizizzAutoAnswerTimeInput.addEventListener('focus', () => {
				quizizzOptionsAutoAnswerCheckbox.checked = true;
				chrome.storage.sync.set({ 'quizizzOptionsAutoAnswer': true });
			});

			// Testportal cheat options.
			const testportalOptionsTimeCheatCheckbox = document.getElementById('testportalOptionsTimeCheatCheckbox');

			testportalOptionsTimeCheatCheckbox.addEventListener('change', () => {
				if (testportalOptionsTimeCheatCheckbox.checked) {
					chrome.storage.sync.set({ 'testportalOptionsTimeCheat': true });
				} else {
					chrome.storage.sync.set({ 'testportalOptionsTimeCheat': false });
				}
			});

			chrome.storage.sync.get(['testportalOptionsTimeCheat'], (result) => {
				testportalOptionsTimeCheatCheckbox.checked = result.testportalOptionsTimeCheat ? true : false;
			});
		});

	}
}, 10);
