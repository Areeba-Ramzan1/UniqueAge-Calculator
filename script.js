        const yearDropdown = document.getElementById("year");
        const monthDropdown = document.getElementById("month");
        const dayDropdown = document.getElementById("day");
        const resultDiv = document.getElementById("result");
        const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Populate Year Dropdown (1900 to Current Year)
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 1900; year--) {
            yearDropdown.innerHTML += `<option value="${year}">${year}</option>`;
        }

        // Update Day Dropdown Based on Month and Year
        function populateDays() {
            const year = +yearDropdown.value || currentYear;
            const month = +monthDropdown.value;

            let daysInMonth = months[month - 1] || 31;

            // Leap Year Check for February
            if (month === 2 && (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))) {
                daysInMonth = 29;
            }

            dayDropdown.innerHTML = `<option value="" disabled selected>Day</option>`;
            for (let day = 1; day <= daysInMonth; day++) {
                dayDropdown.innerHTML += `<option value="${day}">${day}</option>`;
            }
        }

        yearDropdown.addEventListener("change", populateDays);
        monthDropdown.addEventListener("change", populateDays);

        // Calculate Age
        function calculateAge() {
            const selectedYear = +yearDropdown.value;
            const selectedMonth = +monthDropdown.value;
            const selectedDay = +dayDropdown.value;

            if (!selectedYear || !selectedMonth || !selectedDay) {
                resultDiv.textContent = "Please select Year, Month, and Day!";
                resultDiv.style.color = "red";
                return;
            }

            const today = new Date();
            const birthDate = new Date(selectedYear, selectedMonth - 1, selectedDay);

            let ageYears = today.getFullYear() - birthDate.getFullYear();
            let ageMonths = today.getMonth() - birthDate.getMonth();
            let ageDays = today.getDate() - birthDate.getDate();

            if (ageDays < 0) {
                ageMonths--;
                ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            }

            if (ageMonths < 0) {
                ageYears--;
                ageMonths += 12;
            }

            resultDiv.textContent = `You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old.`;
            resultDiv.style.color = "#e19b2c";
        }
