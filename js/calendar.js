'use strict';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let calMonth = [];
let prevMonth = [];
let nextMonth = [];
let today = new Date();
let dateTable = [];

let docTable = "calContents";

function dateDisplay () {
	let mainDateData = months[today.getMonth()] + ", " + today.getFullYear();
	document.getElementById("displayDate").innerHTML = mainDateData;
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

function monthFill () {
	let monthCheck = today.getMonth();
	let c = 1;
	while (true) {
		let tempDate = new Date(today.getFullYear(), today.getMonth(), c);
		if (tempDate.getMonth() !== today.getMonth()) {
			return;
		}
		calMonth.push(tempDate);
		c+=1;
	}
}

monthFill();
tableify();
dateDisplay();
