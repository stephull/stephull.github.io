window.onload = function() {

    // change html depending on what user wants
    const DOMAIN = document.getElementById('meat_and_potatoes');
    let milist = document.getElementById("menu_items_list");
    let mitems = Array.from(
        milist.querySelectorAll('.menu_items_button_class')
    );

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

    // for education, make a timer for until graduation
    // SOURCE: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_countdown 
    var gradDay = new Date("Dec 15, 2022 00:00:00").getTime();
    let countdown = document.getElementById('countdown-p');
    var x = setInterval(function() {
        var now = new Date().getTime();
        var dist = gradDay - now;
        console.log(dist);
        var d = Math.floor(dist / (1000 * 60 * 60 * 24));
        var h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((dist % (1000 * 60)) / 1000);
        countdown.innerHTML = `Countdown to graduation: ${d} days, ${h} hours, ${m} minutes, and ${s} seconds!`;
        if (dist < 0) {
            clearInterval(x);
            countdown.innerHTML = "Graduated!";
        }
    }, 1000);

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