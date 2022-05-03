window.onload = function() {
    const DIRECTORY = "Menu";

    // get the name of current html file
    const CWD = window.location.pathname;
    let pathname = CWD.substring(1).trim();

    // change html depending on what user wants
    const DOMAIN = document.getElementById('meat_and_potatoes');
    let milist = document.getElementById("menu_items_list");
    let mitems = Array.from(milist.querySelectorAll('.menu_items_button_class'));

    /*function refineURL(src) {
        let temp = src+".html";
        return mitems.find(temp)
    }*/

    function requestMenuPage(src) {
        //let srcURL = refineURL(src);
        DOMAIN.innerHTML = ("You clicked on " + src);
    }

    mitems.forEach(function(item) {
        var str = item.textContent.toLowerCase();
        if (pathname.includes(str)) {
            item.style.display = 'none';
        }
        item.addEventListener('click', () => requestMenuPage(str), false);
    })
}