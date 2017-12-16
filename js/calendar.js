'use strict';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



let calMonth = [];

let prevMonthData = [];

let nextMonthData = [];

let today = new Date();

let dateTable = [];



let docTable = "calContents";



function dateDisplay () {

	let mainDateData = months[today.getMonth()] + ", " + today.getFullYear();

	document.getElementById("displayDate").innerHTML = mainDateData;

}


function monthSpan(currentMonth) {
	console.log("monthspan called");
	calMonth.length = 0;
	prevMonthData.length = 0;
	nextMonthData.length = 0;
	let nextMonth;
	let previousMonth;
	if (currentMonth.getMonth() == 12) {
			nextMonth = new Date(currentMonth.getFullYear() + 1, 1, 1);
			previousMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
	}
	if (currentMonth.getMonth() == 0) {
			nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
			previousMonth = new Date(currentMonth.getFullYear() - 1, 11, 1);
	}
	else {
			nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
			previousMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
	}	
	monthFill(currentMonth, calMonth);
	monthFill(nextMonth, nextMonthData);
	monthFill(previousMonth, prevMonthData);
}


function tableify () {

	let c = 0;

	while (true) {

		let tempRow = "<tr>";

		for (let i = 0; i < days.length; i++) {

			if (c >= calMonth.length){

				for (let t = i; t < days.length; t++) {

					tempRow += "<td></td>";

				}

				tempRow += "</tr>";

				dateTable.push(tempRow);

				for (let v = 0; v < dateTable.length; v++) {

					document.getElementById(docTable).innerHTML += dateTable[v];

				}

				return;

			}

			

			if (days[calMonth[c].getDay()] != days[i]) {

				tempRow += "<td></td>";

				continue;

			}

			if (days[calMonth[c].getDay()] == days[i]) {

				tempRow += "<td class='currentMonth'>" + calMonth[c].getDate() + "</td>";

				if (days[calMonth[c].getDay()] != "Saturday"){

					c++;

				}

			}



			if (i == days.length -1) {

				tempRow += "</tr>";

				dateTable.push(tempRow);

				break;

			}



		}

		c++;

	}

}



function monthFill (inDate, month) {
	console.log("monthFill called for " + inDate);

	let monthCheck = inDate.getMonth();

	let c = 1;

	while (true) {

		let tempDate = new Date(inDate.getFullYear(), inDate.getMonth(), c);

		if (tempDate.getMonth() !== inDate.getMonth()) {

			return;

		}

		month.push(tempDate);

		c+=1;

	}

}



monthSpan(today);
console.log("last month:");
console.log(prevMonthData);
console.log("this month:");
console.log(calMonth);
console.log("next month:");
console.log(nextMonthData);

tableify();

dateDisplay();
