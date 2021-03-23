/* Clickable dropdown menu that serves as an input for the period
https://www.w3schools.com/howto/howto_js_dropdown.asp */

/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function toggleDropdown() {
    gid("dropdown-content").classList.toggle("show");
}

/* Close the dropdown menu if the user clicks outside of it */
window.onclick = function (event) {
    if (!event.target.matches('.dropdown-button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}