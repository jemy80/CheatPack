let xhr = new XMLHttpRequest();
let quizizzCheat, quizizzOptionsAutoAnswer, quizizzAutoAnswerTime;

chrome.storage.sync.get(['quizizzCheat', 'quizizzOptionsAutoAnswer', 'quizizzAutoAnswerTime'], async (result) => {
	quizizzCheat = result.quizizzCheat ? true : false;
	quizizzOptionsAutoAnswer = result.quizizzOptionsAutoAnswer ? true : false;
	quizizzAutoAnswerTime = result.quizizzAutoAnswerTime;
	chrome.runtime.sendMessage({ query: "serverAddress" }, function (response) {
		let serverAddress = response.serverAddress;

		if (quizizzCheat) {
			xhr.open('GET', `${serverAddress}/quizizz/inject.js`, true); // Base inject script
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
				if (scriptNumber == 2) console.info(`%c${chrome.i18n.getMessage('quizizzLoading')}`, "font-style: italic"); // Console log to make sure the script has been loaded.
			}
		}

		const nextXHR = (scriptNumber) => {
			if (scriptNumber == 1) {
				if (quizizzCheat) {
					xhr.open('GET', `${serverAddress}/quizizz/highlightanswers.js`, true); // Correct answer highlighter
					xhr.send(null);
				}
			}
			if (scriptNumber == 2) {
				if (quizizzOptionsAutoAnswer == true) {
					if (quizizzAutoAnswerTime != '') {
						if (!isNaN(quizizzAutoAnswerTime)) {
							const AutoAnswerTimeScriptElement = document.createElement("script");
							const timeconst = document.createTextNode(`
							const time = ${quizizzAutoAnswerTime};
							const waitTimePromptLabel = '${chrome.i18n.getMessage('quizizzWaitTimePromptLabel')}';
							const invalidNumberError = '${chrome.i18n.getMessage('invalidNumberError')}';	
						`);
							AutoAnswerTimeScriptElement.appendChild(timeconst);
							AutoAnswerTimeScriptElement.type = "text/javascript";
							document.body.appendChild(AutoAnswerTimeScriptElement);
							xhr.open('GET', `${serverAddress}/quizizz/autoanswer.js`, true); // AutoAnswer script
							xhr.send(null);
						}
					}
				}
			}
		}
	});
});

