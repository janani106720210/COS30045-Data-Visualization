document.addEventListener("DOMContentLoaded", function () {

    // Current year
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // FAQ accordion
    const accordionButtons = document.querySelectorAll(".accordion");

    accordionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const panel = button.nextElementSibling;
            const icon = button.querySelector("span");

            const isOpen = panel.style.display === "block";

            // Close all panels
            document.querySelectorAll(".panel").forEach(function (item) {
                item.style.display = "none";
            });

            // Reset all icons
            document.querySelectorAll(".accordion span").forEach(function (item) {
                item.textContent = "+";
            });

            // Open selected panel
            if (!isOpen) {
                panel.style.display = "block";

                if (icon) {
                    icon.textContent = "−";
                }
            }
        });
    });


    // Energy calculator
    const energyForm = document.getElementById("energyForm");

    if (energyForm) {

        energyForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const power = Number(document.getElementById("power").value);
            const hours = Number(document.getElementById("hours").value);
            const price = Number(document.getElementById("price").value);

            const results = document.getElementById("results");


            // Validation
            if (
                power <= 0 ||
                hours <= 0 ||
                hours > 24 ||
                price < 0 ||
                !Number.isFinite(power) ||
                !Number.isFinite(hours) ||
                !Number.isFinite(price)
            ) {

                results.innerHTML = `
                    <p class="error-message">
                        Please enter valid values.
                        Power must be greater than 0 W,
                        usage must be between 0 and 24 hours,
                        and electricity price cannot be negative.
                    </p>
                `;

                return;
            }


            // Calculations
            const dailyEnergy = (power * hours) / 1000;
            const monthlyEnergy = dailyEnergy * 30;
            const yearlyEnergy = dailyEnergy * 365;

            const priceInDollars = price / 100;

            const monthlyCost = monthlyEnergy * priceInDollars;
            const yearlyCost = yearlyEnergy * priceInDollars;


            // Display results
            results.innerHTML = `
                <h3>Energy Consumption Results</h3>

                <div class="results-grid">

                    <div class="result-card">
                        <strong>Daily Consumption</strong>
                        ${dailyEnergy.toFixed(2)} kWh
                    </div>

                    <div class="result-card">
                        <strong>Monthly Consumption</strong>
                        ${monthlyEnergy.toFixed(2)} kWh
                    </div>

                    <div class="result-card">
                        <strong>Yearly Consumption</strong>
                        ${yearlyEnergy.toFixed(2)} kWh
                    </div>

                    <div class="result-card">
                        <strong>Estimated Monthly Cost</strong>
                        $${monthlyCost.toFixed(2)}
                    </div>

                    <div class="result-card">
                        <strong>Estimated Yearly Cost</strong>
                        $${yearlyCost.toFixed(2)}
                    </div>

                </div>
            `;
        });
    }

});