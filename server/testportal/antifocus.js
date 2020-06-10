/**
 * Testportal focus cheat script. Mechanics written by Lummit (https://github.com/Lumm1t), comments by Naveq (https://github.com/Naveq)
 * @author Lummit
 * @version 2.3
 */

const antiTestportalFocusScript = document.createElement("script"); // Create anti-testportal script
const antiBlurBypass = document.createTextNode(`
    // Don't display warning about leaving the page.
    window['honestRespondentBlockade_popup'] = () => {};
    window.honestRespondentBlockade_popup.open = () => {};
    document.querySelectorAll('div.mdc-dialog#honestRespondentBlockade_popup').forEach(shit => {
        shit.parentNode.removeChild(shit);
    });
    // Don't send number of page changes to test creator.
    updateCt = () => {};
    // If we changed page, remove blurs count.
    window.onblur = function() {
        eraseCookie('blurs');
    }
`); // Focus cheat script

antiTestportalFocusScript.appendChild(antiBlurBypass);
antiTestportalFocusScript.type = "text/javascript"; // Set MIME type for script element
document.body.appendChild(antiTestportalFocusScript);
