

let cardValidationData = {"VISA":{"cardPattern":"/^4/","cardNumberLength":16,"cvv":"required","cvvLength":3,"displayText":"Visa"},"MASTERCARD":{"cardPattern":"/^5[1-5]/","cardNumberLength":16,"cvv":"required","cvvLength":3,"displayText":"Master"},"MAESTRO":{"cardPattern":"/^(50|63|66|5[6-8]|6[8-9]|600[0-9]|6010|601[2-9]|60[2-9]|61|620|621|6220|6221[0-1])/","cardNumberLength":19,"cvv":"optional","cvvLength":4,"displayText":"Maestro"}};

function getSavedCards() {
	let savedCards = JSON.parse(localStorage.getItem('cardDetails')) === null ? [] : JSON.parse(localStorage.getItem('cardDetails'));
	let savedCardElement = document.getElementById('saved-cards');
	let savedCardWrapper = document.getElementById('saved-cards-wrapper');
	if(savedCards.length == 0) {
		savedCardWrapper.style.display = 'none';
	}
	else 
		savedCardWrapper.style.display = 'block';

	for(let i = 0 ; i < savedCards.length; i++) {
		let cardNumberElement = document.createElement('div');
		cardNumberElement.innerHTML = savedCards[i].cardNumber;
		savedCardElement.appendChild(cardNumberElement)
		let cardNameElement = document.createElement('div');
		cardNameElement.innerHTML = savedCards[i].displayText;
		savedCardElement.appendChild(cardNameElement)
	}

}

function addNewCard() {
	let cardNumber = document.getElementById("cnum").value;
	let cvv = document.getElementById("cvv").value;
	let year = document.getElementById("year").value;
	let month = document.getElementById("month").value;

	let validatonData = validation(cardNumber, cvv);
	if (validatonData.isValid)
	{	
		let savedCards = JSON.parse(localStorage.getItem('cardDetails')) === null ? [] : JSON.parse(localStorage.getItem('cardDetails'));

		let newCardDetails = {
			'cardNumber': cardNumber,
			'cvv': cvv,
			'year': year,
			'month': month,
			'displayText': validation(cardNumber, cvv).displayText
		}
		savedCards.push(newCardDetails);
		localStorage.setItem('cardDetails',JSON.stringify(savedCards))
	}
	else {
		showInvalid(validatonData.error)
	}
}

function validation(cardNumber,cvv) {
	let cardType = Object.keys(cardValidationData).filter((key) => {
		var regExp = new RegExp(cardValidationData[key].cardPattern.split('/').join(''));
		return regExp.test(cardNumber) === true; 
	})
	if(cardValidationData[cardType[0]].cardNumberLength !== cardNumber.length) {
		return {
			"isValid": false, "error": "Card Number Not Valid"
		}
	}
	else {
		return{

			"isValid": true, "error": "", "displayText": cardValidationData[cardType[0]].displayText
		}
	}
}

function showInvalid(error) {
	let errorWrapper = document.getElementById('error-wrapper');
	let errorElement = document.createElement('div');
	errorElement.innerHTML = error;
	errorWrapper.appendChild(errorElement);
}

getSavedCards();
