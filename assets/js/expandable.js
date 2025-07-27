const openIcon = "<i class='fa-solid fa-angle-down'></i>";
const closedIcon = "<i class='fa-solid fa-angle-right'></i>";

function toggleExpandable(srcElement) {
    const target = srcElement.getAttribute("target-panel");
    const content = document.querySelector(target);
    const tagName = srcElement.tagName.toLowerCase();
    const button =
        tagName === "button" ? srcElement : srcElement.previousElementSibling;
    if (content.style.display === "none") {
        content.style.display = "block";
        button.innerHTML = openIcon;
    } else {
        content.style.display = "none";
        button.innerHTML = closedIcon;
    }
}

function toggleAll() {
    const toggleButton = document.getElementById("toggle-button");
    const expandText = "Expand All";
    const collapseText = "Collapse All";
    const btnText = toggleButton.innerHTML.trim();
    const toggleIcons = document.querySelectorAll(".toggle-button");
    const divs = document.querySelectorAll(".expandable-content");
    if (btnText === expandText) {
        divs.forEach((div) => (div.style.display = "block"));
        toggleIcons.forEach((btn) => (btn.innerHTML = openIcon));
        toggleButton.innerHTML = collapseText;
    } else {
        divs.forEach((div) => (div.style.display = "none"));
        toggleIcons.forEach((btn) => (btn.innerHTML = closedIcon));
        toggleButton.innerHTML = expandText;
    }
}

window.addEventListener("scroll", function () {
    const button = document.getElementById("toggle-button");
    // console.log(document.documentElement.scrollTop);
    // Check the scroll position
    if (document.documentElement.scrollTop > 70) {
        // console.log("show");
        button.classList.remove("hide"); // Show the button
    } else {
        // console.log("hide");
        button.classList.add("hide"); // Hide the button
    }
});
