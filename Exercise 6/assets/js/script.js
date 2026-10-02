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

});