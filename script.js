window.onload = function() {

    // change html depending on what user wants
    const DOMAIN = document.getElementById('meat_and_potatoes');
    let milist = document.getElementById("menu_items_list");
    let mitems = Array.from(
        milist.querySelectorAll('.menu_items_button_class')
    );
    let x = document.getElementById("poof");

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
        x.style.display = 'none';
        fetch(srcURL)
            .then((response) => response.text())
            .then((text) => DOMAIN.innerHTML = text)
            .catch((err) => console.error(err));
    }

    mitems.forEach(function(item) {
        var str = item.textContent.toLowerCase();
        item.addEventListener('click', () => requestMenuPage(str), false);
    })

    // enable dark and/or light mode
    // SOURCE: https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting
    function detectDarkMode() {
        var c = document.documentElement.classList;
        if (c.contains('light')) {
            c.remove("light");
            c.add("dark");
        } else if (c.contains("dark")) {
            c.remove("dark");
            c.add("light");
        } else {
            c.add(
                (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ) ? "light" : "dark");
        }
    }

    let darkMode = document.getElementById("dark-a");
    darkMode.addEventListener('click', function() {
        const temp = document.getElementById('dark-test');
        temp.innerHTML = "Changing color scheme...";
        setTimeout(function() {
            temp.innerHTML = "";
            detectDarkMode();
        }, 2000)
    })
}