startList = function () {

    document.querySelectorAll('a').forEach(function (el) {
        // Add event listeners to the various buttons
        el.addEventListener('click', ButtonEventHandler);
        el.addEventListener('keyup', ButtonEventHandler);
        el.addEventListener('blur', ButtonEventHandler);
    });

    if (document.getElementById) {
        navRoot = document.getElementById("nav");
        // console.log(navRoot);
        for (i = 0; i < navRoot.childNodes.length; i++) {
            node = navRoot.childNodes[i];
            console.log(node);
            if (node.nodeName == "LI") {
                node.onclick = function () {
                    this.className = (this.className == "on") ? "off" : "on";
                    var abc = (this.className == "on") ? "true" : "false";
                    this.setAttribute("aria-expanded", abc)
                }
            }
        }
    }
}

function ButtonEventHandler(event) {
    var type = event.type;
    if (type === 'keyup') {
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.target.classList.remove('by-keyboard');
            event.preventDefault();
        }
        else if (event.keyCode === 9) {
            event.target.classList.remove('by-keyboard');
        }
    } else if (type === 'click') {
        event.target.classList.add('by-keyboard');
    }
    else if (type === 'blur') {
        event.target.classList.add('by-keyboard');
    }
}
window.onload = startList;