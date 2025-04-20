// Akan names mapping
const akanNames = {
    male: {
        0: "Kwasi", // Sunday
        1: "Kwadwo", // Monday
        2: "Kwabena", // Tuesday
        3: "Kwaku", // Wednesday
        4: "Yaw", // Thursday
        5: "Kofi", // Friday
        6: "Kwame" // Saturday
    },
    female: {
        0: "Akosua", // Sunday
        1: "Adwoa", // Monday
        2: "Abenaa", // Tuesday
        3: "Akua", // Wednesday
        4: "Yaa", // Thursday
        5: "Afua", // Friday
        6: "Ama" // Saturday
    }
};

function calculateAkanName() {
    // Get input values
    const birthdate = document.getElementById("birthdate").value;
    const gender = document.getElementById("gender").value;
    const outputDiv = document.getElementById("output");

    // Validate input
    if (!birthdate) {
        outputDiv.innerHTML = "Please enter a valid birth date.";
        return;
    }

    // Validate date format (YYYY-MM-DD)
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(birthdate)) {
        outputDiv.innerHTML = "Date must be in YYYY-MM-DD format.";
        return;
    }

    // Parse the date (already in YYYY-MM-DD format)
    const date = new Date(birthdate);
    if (isNaN(date.getTime())) {
        outputDiv.innerHTML = "Invalid date. Please enter a valid date in YYYY-MM-DD format.";
        return;
    }

    // Additional validation: Check if the date is in the future or too far in the past
    const today = new Date();
    const minYear = 1900; // Formula may not be reliable before 1900
    if (date > today) {
        outputDiv.innerHTML = "Birth date cannot be in the future.";
        return;
    }
    if (date.getFullYear() < minYear) {
        outputDiv.innerHTML = "Birth date is too far in the past. Please enter a date after 1900.";
        return;
    }

    // Extract date components
    const DD = date.getDate(); // Day of the month
    const MM = date.getMonth() + 1; // Months are 0-11 in JavaScript, so add 1 (1-12)
    const year = date.getFullYear();
    const CC = Math.floor(year / 100); // First two digits of the year
    const YY = year % 100; // Last two digits of the year

    // Debugging: Log the components
    console.log(`Date Components: DD=${DD}, MM=${MM}, Year=${year}, CC=${CC}, YY=${YY}`);

    // Calculate day of the week using the formula
    // d = ( (CC/4 - 2*CC - 1) + (5*YY/4) + (26*(MM+1)/10) + DD ) mod 7
    const part1 = Math.floor(CC / 4) - 2 * CC - 1;
    const part2 = Math.floor((5 * YY) / 4);
    const part3 = Math.floor((26 * (MM + 1)) / 10);
    const d = (part1 + part2 + part3 + DD) % 7;

    // Debugging: Log the formula parts
    console.log(`Formula Parts: part1=${part1}, part2=${part2}, part3=${part3}, DD=${DD}, d=${d}`);

    // Ensure d is in the range 0-6 (Sunday to Saturday)
    let dayOfWeek = d;
    if (d < 0) {
        dayOfWeek = (d + 7) % 7;
    }
    dayOfWeek = Math.floor(dayOfWeek); // Ensure it's an integer

    // Debugging: Log the final day of week
    console.log(`Final dayOfWeek: ${dayOfWeek}`);

    // Validate dayOfWeek
    if (dayOfWeek < 0 || dayOfWeek > 6 || isNaN(dayOfWeek)) {
        outputDiv.innerHTML = "Error calculating the day of the week. Please try again.";
        return;
    }

    // Map to day names and Akan names
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const akanName = akanNames[gender][dayOfWeek];

    // Validate Akan name
    if (!akanName) {
        outputDiv.innerHTML = "Error retrieving Akan name. Please check your input.";
        return;
    }

    // Display output
    outputDiv.innerHTML = `You were born on a ${days[dayOfWeek]}. Your Akan name is <strong>${akanName}</strong>!`;
}