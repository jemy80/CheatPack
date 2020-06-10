const readyStateCheckInterval = setInterval(() => {
	if (document.readyState === 'complete') {
		clearInterval(readyStateCheckInterval);
		chrome.runtime.sendMessage({ query: "serverAddress" }, function (response) {
			let serverAddress = response.serverAddress; // Server address

			// I18n for sidebar links.
			document.getElementById('settingsLink').innerHTML = chrome.i18n.getMessage('settingsLink');
			document.getElementById('informationsLink').innerHTML = chrome.i18n.getMessage('informationsLink');
			document.getElementById('discordLink').innerHTML = chrome.i18n.getMessage('discordLink');

			// Discord link
			document.getElementById('discordLink').href = `${serverAddress}/discord`;

			const xhr = new XMLHttpRequest(); // AJAX for Informations
			const content = document.getElementById('content');

			xhr.onload = () => {
				if (xhr.status == 200) {
					let res = JSON.parse(xhr.responseText);
					let newContent = '';

					newContent += `<section id="cheatpackInfo">`;
					newContent += `<h2 style="line-height: 0;padding-top: 0.5em;"><b>CheatPack</b></h2>`;
					newContent += `<br />`;
					newContent += `${chrome.i18n.getMessage('author')}: <b>${res.cheatpackInfo.author}</b>`;
					newContent += `<br />`;
					newContent += `<a href="${res.cheatpackInfo.github}" target="_blank">GitHub</a>`;
					newContent += `</section>`;

					const lang = navigator.language.substring(0, navigator.language.indexOf('-'));
					if (lang == 'pl') {
						for (let i = 0; i < res.cheats.length; i++) {
							newContent += `<section class="cheatInfo"><section>`;
							newContent += `<b>${res.cheats[i].name}</b>`;
							newContent += `<br />`;
							newContent += `${chrome.i18n.getMessage('author')}: <a href="${res.cheats[i].github}" target="_blank"><b>${res.cheats[i].author[0]}</b></a>`;
							newContent += `<br />`;
							if (lang == 'pl') {
								newContent += `${chrome.i18n.getMessage('description')}: <i>${res.cheats[i].description_pl}</i>`;
								newContent += `<br />`;
								if (res.cheats[i].comments_pl != '') {
									newContent += `${chrome.i18n.getMessage('comments')}: <code>${res.cheats[i].comments_pl}</code>`;
								}
							} else if (lang == 'en') {
								newContent += `${chrome.i18n.getMessage('description')}: <i>${res.cheats[i].description_en}</i>`;
								newContent += `<br />`;
								if (res.cheats[i].comments_en != '') {
									newContent += `${chrome.i18n.getMessage('comments')}: <code>${res.cheats[i].comments_en}</code>`;
								}
							}
							newContent += `</section></section>`;
						};
					}
					newContent += `<section id="specialThanks">${chrome.i18n.getMessage('specialThanks')}: `;
					newContent += `<br />`;
					for (let i = 0; i < res.specialThanks.length; i++) {
						newContent += `<br />`;
						newContent += `${res.specialThanks[i]}`;
						if (i != res.specialThanks.length - 1) {
							newContent += `,`;
						} else {
							newContent += `.`;
						}
					}
					newContent += `</section>`;

					content.innerHTML = newContent; // Adding content to site
				} else {
					content.innerHTML = '<code>' + chrome.i18n.getMessage('xhrError') + '</code>'; // Error handling
				}
			};

			xhr.open('GET', `${serverAddress}/info.json`, true); // Opening XHR
			xhr.send(null); // Sending request
		});
	}
}, 10);
