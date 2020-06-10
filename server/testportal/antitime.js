/**
 * Testportal time cheat script. Mechanics written by Lummit (https://github.com/Lumm1t), comments by Naveq (https://github.com/Naveq)
 * IT IS VERY EXPERIMENTAL! USE IT AT YOUR OWN RISK!!!
 * @author Lummit
 * @version 2.3
 */

const antiTestportalTimeScript = document.createElement("script"); // Create script element for cheat
const timeBypass = document.createTextNode(`
    // If time has elapsed, don't do anything.
    onCountdownFinished = () => {};
`);

antiTestportalTimeScript.appendChild(timeBypass);
antiTestportalTimeScript.type = "text/javascript"; // Set MIME type for script element
document.body.appendChild(antiTestportalTimeScript);
