// Some beautiful changes ;)
const logo = Array.from(
  document.querySelectorAll("img.logo_wide.logo_default")
)[0];
logo.src = "https://naveq-devteam.github.io/CheatPack/server/testportal/testportal.png";

// We're blocking sending errors to the server. Fuck testportal ¯\_(ツ)_/¯
const antiLogScript = document.createElement("script");
const logOverride = document.createTextNode(`
		function logToServer() {
			console.log('Fuck testportal ツ');
		};
		`);
antiLogScript.appendChild(logOverride);
antiLogScript.type = "text/javascript";
document.body.appendChild(antiLogScript);
