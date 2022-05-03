window.onload = function() {
    // get the name of current html file
    const CWD = window.location.pathname;
    let pathname = CWD.substring(1).trim();

    // change html depending on what user wants
    const DOMAIN = document.getElementById('meat_and_potatoes');
    let milist = document.getElementById("menu_items_list");
    let mitems = Array.from(milist.querySelectorAll('.menu_items_button_class'));

    let curr = null;
    function refine(src) {
        let root = mitems.find((e) => e.textContent.toLowerCase().includes(src));
        if (curr != null) curr.disabled = false;
        curr = root;
        curr.disabled = true;
        return `html/${src.trim()}.html`;
    }

    function requestMenuPage(src) {
        let srcURL = refine(src);
        DOMAIN.innerHTML = src;
        fetch(srcURL)
            .then((response) => response.text())
            .then((text) => DOMAIN.innerHTML = text)
            .catch((err) => console.error(err));
    }

    mitems.forEach(function(item) {
        var str = item.textContent.toLowerCase();
        item.addEventListener('click', () => requestMenuPage(str), false);
    })
}