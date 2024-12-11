let money = 0;
let multiplier = 1;
let autoclicker = false;
let autoClickerCost = 500;

const $display = document.getElementById("$display");
const mdisplay = document.getElementById("mdisplay");
const moneyplus = document.getElementById("moneyplus");
const click1 = document.getElementById("click1");
const autoClickerButton = document.getElementById('autoClickerBtn');

function saveProgress() {
	localStorage.setItem("money", money);
	localStorage.setItem("multiplier", multiplier);
	localStorage.setItem("autoclicker", autoclicker);
}

function loadProgress() {
	money = parseInt(localStorage.getItem("money")) || 0;
	multiplier = parseInt(localStorage.getItem("multiplier")) || 1;
	autoclicker = localStorage.getItem("autoclicker") === 'true';

	updateUI();
}

function updateUI() {
	mdisplay.textContent = `Geld pro Klick: ${multiplier}`;
	$display.textContent = `Geld: ${money}`;
	click1.textContent = `1+ Klick | -${100 * multiplier} Geld`;
	autoClickerButton.textContent = `Auto-Klicker kaufen | -${autoClickerCost} Geld`;
}

function MoneyCalculatorAfterRebirth() {
	let requiredMoney = 100 * multiplier;
	if (money >= requiredMoney) {
		money -= requiredMoney;
		multiplier++;
		updateUI();
		saveProgress();
	} else {
		alert("Uh oh! Du hast nicht genug Geld!");
	}
}

function activateAutoClicker() {
	if (money >= autoClickerCost && !autoclicker) {
		money -= autoClickerCost;
		autoclicker = true;
		updateUI();
		saveProgress();

		setInterval(() => {
			money += multiplier;
			$display.textContent = `Geld: ${money}`;
			saveProgress();
		}, 1000);
	}
}

function MoneyPlus() {
	money += multiplier;
	$display.textContent = `Geld: ${money}`;
	saveProgress();
}

autoClickerButton.addEventListener('click', () => {
	if (money >= autoClickerCost) {
		activateAutoClicker();
	} else {
		alert("Uh oh! Du hast nicht genug Geld!");
	}
});

click1.addEventListener("click", MoneyCalculatorAfterRebirth);
moneyplus.addEventListener("click", MoneyPlus);

window.addEventListener("load", loadProgress);