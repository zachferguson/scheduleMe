'use strict';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let calMonth = [];
let prevMonthData = [];
let nextMonthData = [];
let today = new Date();
let dateTable = [];
let docTable = "calContents";

setAndPub(today);

document.getElementById("calNavBack").addEventListener("click", function() {backBtnFunct()}); 

function backBtnFunct () {
	if (today.getMonth() == 0) {
		today.setFullYear(today.getFullYear() - 1);
		today.setMonth(11);
		setAndPub(today);
		return;
	}
	today.setMonth(today.getMonth() - 1);
	setAndPub(today);
	return;
}

document.getElementById("calNavForw").addEventListener("click", function() {forwBtnFunct()}); 

function forwBtnFunct () {
	if (today.getMonth() == 11) {
		today.setFullYear(today.getFullYear() + 1);
		today.setMonth(0);
		setAndPub(today);
		return;
	}
	today.setMonth(today.getMonth() + 1);
	setAndPub(today);
	return;
}

function setAndPub (date) {
	/*
	runs all of the functions necessary to create and display the calendar data
	*/
	monthSpan(date);
	populateCalandarDates();
	dateDisplay();
	tableify();
}


function dateDisplay () {
	let mainDateData = months[today.getMonth()] + ", " + today.getFullYear();
	document.getElementById("displayDate").innerHTML = mainDateData;
}

function monthSpan(currentMonth) {
	/*
	checks if the next or previous month is in a different year, calls the monthfill function for the correct months/years
	*/
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

function populateCalandarDates () {
	/*
	creates n array of weeks, and if 1st not on Sunday or last not on Saturday, fills in the necessary days from previous / next month
	*/
	dateTable.length = 0;
	// create array to be written to the calendar
	let tempArr = [];
	let first;
	let last = calMonth[calMonth.length - 1].getDay();
	let curMonthStart;
	// locate where the first goes
	for (let c = 0; c < 7; c++) {
		if (days[calMonth[0].getDay()] != days[c]) {
			continue;
		}
		if (days[calMonth[0].getDay()] == days[c]) {
			first = c;
			break;
		}
	}
	// fill the tempArr starting from last month till next month to fill the first calendar week
	while (true) {
		let weekArr = [];
		// if the first of the month is not == to 0 / does not fall on the first of the month
		if (first != 0) {
			for (let c = prevMonthData.length - first; c < prevMonthData.length; c++) {
				weekArr.push(prevMonthData[c]);
			}	
		}
		if (weekArr.length != 7) {
			let arrLength = 7 - weekArr.length;
			for (let c = 0; c < arrLength; c++) {
				weekArr.push(calMonth[c]);
				curMonthStart = c;
			}
		}
		tempArr.push(weekArr);
		break;
	}
	// fill the remaining weeks, including part of next month if current month doesn't end on a Saturday
	let counter = curMonthStart + 1
	while (true) {
		let weekArr = [];
		for (let c = 0; c < 7; c++) {
			let temp = counter + c;
			if (calMonth[temp]) {
				weekArr.push(calMonth[temp]);
			}

			if (!calMonth[temp]) {
				for (let p = 0; p < 8; p++) {
					if (weekArr.length == 7) {
						tempArr.push(weekArr);
						for (let t = 0; t < tempArr.length; t++) {
							dateTable.push(tempArr[t]);
						}
						return;
					}
					weekArr.push(nextMonthData[p]);
				}
			}
			
			if (weekArr.length == 7) {
				tempArr.push(weekArr);
				console.log(weekArr);
				counter += 7;
				continue;
			}
		}
		if (counter <= calMonth.length) {
			continue;
		}
		return;
	}
}

function tableify () {
	/*
	publishes the week array created by the populateCalendarDates function, applies the correct classes to display the dates
	*/
	while (document.getElementById(docTable).firstChild) document.getElementById(docTable).removeChild(document.getElementById(docTable).firstChild);
	for (let c = 0; c < dateTable.length; c++) {
		let tempRow = "<tr>";
		for (let t = 0; t < dateTable[c].length; t++) {
			let currentDay = new Date();
			let tempDay = '<td class="';
			let tempClass = "";
			if (currentDay.getFullYear() == dateTable[c][t].getFullYear() && currentDay.getMonth() == dateTable[c][t].getMonth()) {
				if (currentDay.getDate() == dateTable[c][t].getDate()) {
					tempClass += "currentDay ";
				}
				tempClass += "currentMonth";
			}
			if (c == 0 && dateTable[c][t].getDate() > 7) {
				tempClass += "otherMonth";
			}
			if (c == (dateTable.length - 1) && dateTable[c][t].getDate() < 7) {
				tempClass += "otherMonth";
			}
			tempRow += tempDay + tempClass + '">' + dateTable[c][t].getDate() + "</td>";
		}
		tempRow += "</tr>";
		document.getElementById(docTable).innerHTML += tempRow;
	}
}

function monthFill (inDate, month) {
	/*
	gets the day data for a month, making sure to end when a new month is reached (the 29th, or the 31st, etc)
	*/
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
