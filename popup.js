
chrome.storage.sync.get(["passwordRule"]).then((result) => {
  document.querySelector("#value").innerHTML = result.passwordRule.length;
  document.querySelector("#length").value = result.passwordRule.length;
  document.querySelector("#upperCase").checked = result.passwordRule.uppercase;
  document.querySelector("#numbers").checked = result.passwordRule.numbers;
  document.querySelector("#symbols").checked = result.passwordRule.symbols;
  document.querySelector("#clipboard").checked = result.passwordRule.clipboard;
});

const value = document.querySelector("#value")
const input = document.querySelector("#length")
value.innerHTML = input.value;
input.addEventListener("input", (event) => {
  value.innerHTML = event.target.value
});

const saveBtn = document.querySelector("#save")
saveBtn.addEventListener("click", () => {
 // loop to the submitted value
  chrome.storage.sync.set(
    { 
      passwordRule: {
        length: document.querySelector("#length").value,
        uppercase: document.querySelector("#upperCase").checked,
        numbers: document.querySelector("#numbers").checked,
        symbols: document.querySelector("#symbols").checked,
        clipboard: document.querySelector("#clipboard").checked
      }

    }, () => {
    console.log("saved");
  });

  window.close();
});