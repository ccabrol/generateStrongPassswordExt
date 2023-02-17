// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(async () => {

  chrome.contextMenus.create({
    id: 'generateText16',
    title: 'Generate strong password',
    type: 'normal',
    contexts: ['editable'],
  });
});

// Open a new search tab when the user clicks a context menu
chrome.contextMenus.onClicked.addListener((item, tab) => {
  if (tab.url?.startsWith("chrome://")) return undefined;
  try {
    
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
      },
      func: () => {

        const generatePassword = (passwordRule) => {
          const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
          const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          const numberChars = '0123456789';
          const specialChars = '!@#$%^&*()_+{}:"<>?[];,./\\|`~';
          
        
          let password = '';
          let allChars = lowercaseChars;

          if(passwordRule.uppercase) {
          allChars += uppercaseChars;
          password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
          }

          if(passwordRule.numbers) {
          allChars += numberChars;
          password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
          }

          if(passwordRule.symbols) {
          allChars += specialChars;
          password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
          }

          const remainingLength = passwordRule.length - password.length;
          // generate random characters with allChars
          for (let i = 0; i < remainingLength; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
          }
          //shuffle password
          password = password.split('').sort(() => Math.random() - 0.5).join('');
          if(passwordRule.clipboard){
            navigator.clipboard.writeText(password);
          }
          
          return password;
        }

        const activeElement = document.activeElement;

        if (activeElement) {
          let passwordRule;
          chrome.storage.sync.get(["passwordRule"]).then((result) => {
            passwordRule = result.passwordRule;
            activeElement.value = generatePassword(passwordRule);
          });
        }
      },
    });
  } catch (err) {
    console.error(`failed to execute script: ${err}`);
  }
});
