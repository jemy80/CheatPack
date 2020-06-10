const readyStateCheckInterval = setInterval(() => {
	if (document.readyState === "complete") {
		const xhr = new XMLHttpRequest();
		const lang = navigator.language.substring(0, navigator.language.indexOf('-'));
		chrome.runtime.sendMessage({ query: "serverAddress" }, function (response) {
			let serverAddress = response.serverAddress;
			let link = document.createElement("link");
			link.href = `${serverAddress}/news/news.css`;
			link.type = "text/css";
			link.rel = "stylesheet";
			document.getElementsByTagName("head")[0].appendChild(link);

			xhr.onload = () => {
				if (xhr.status == 200) {
					document.getElementById('popup-inject').innerHTML = xhr.responseText;
				}
			}

			if (lang == 'pl') {
				xhr.open('GET', `${serverAddress}/news/news_pl.html`, true);
			} else if (lang == en) {
				xhr.open('GET', `${serverAddress}/news/news_en.html`, true);
			}
			xhr.send('I love Anime, Anime is my life xD');
		});
	}
}, 10);
