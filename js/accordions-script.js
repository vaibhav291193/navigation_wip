/*
Do not delete the following comment. It is essential for tracking purposes.
#Merc2021DoNotDelete
*/

(function () {
    function findElement(arr, callback) {
        for (var i = 0; i < arr.length; i++) {
            var match = callback(arr[i]);
            if (match) {
                return arr[i];
            }
        }
    }

    function openAllAccordions(item, content) {
        item.classList.remove("ds-accordions-expander--active");
        item.classList.add("ds-accordions-expander--active");
        item.firstElementChild.setAttribute("aria-expanded", "true");

        content.forEach(function (item) {
            item.classList.remove("ds-expander__content--opened");
            item.classList.add("ds-expander__content--opened");

            item.setAttribute("aria-hidden", "false");
        });
    }

    function closeAllAccordions(item, content) {
        item.classList.remove("ds-accordions-expander--active");
        item.firstElementChild.setAttribute("aria-expanded", "false");

        content.forEach(function (item) {
            item.classList.remove("ds-expander__content--opened");

            item.setAttribute("aria-hidden", "true");
        });
    }

    function toggleExpandAllButton(accordionExpandAllButton) {
        // toggle expand all button class
        accordionExpandAllButton.parentNode.classList.toggle(
            "ds-accordion__controls--active"
        );

        // toggle aria-expanded value of expand all button class if it contains active class
        accordionExpandAllButton.parentNode.classList.contains(
            "ds-accordion__controls--active"
        )
            ? accordionExpandAllButton.setAttribute("aria-expanded", "true")
            : accordionExpandAllButton.setAttribute("aria-expanded", "false");
    }

    function allAccordionsOpenCheck() {
        // get all open accordions
        var openExpanders = document.getElementsByClassName(
            "ds-accordions-expander--active"
        );

        // get total accordions
        var accordionContainers = Array.prototype.slice.call(
            document.querySelectorAll(".ds-accordion")
        );

        if (openExpanders.length === accordionContainers.length) {
            toggleExpandAllButton(
                document.getElementsByClassName(
                    "ds-accordion__button--expand-all"
                )[0]
            );
        }

        if (openExpanders.length === 0) {
            var accordionExpandAllButton = document.getElementsByClassName(
                "ds-accordion__button--expand-all"
            )[0];

            accordionExpandAllButton.setAttribute("aria-expanded", "false");

            accordionExpandAllButton.parentElement.classList.remove(
                "ds-accordion__controls--active"
            );
        }
    }

    function toggleExpanderByLink(links, expandableItems) {
        var accordions = Array.prototype.slice.call(
            document.querySelectorAll(".ds-accordion")
        );

        links.forEach(function (link) {
            link.addEventListener("click", function () {
                var id = this.hash.substring(1);

                var relatedAccordion = findElement(
                    accordions,
                    function (accordion) {
                        return accordion.id === id;
                    }
                );

                relatedAccordion.classList.add("ds-accordions-expander--active");

                window.setTimeout(function () {
                    relatedAccordion.firstElementChild.focus();
                }, 0);

                var content = relatedAccordion.querySelector(
                    "[data-toggle='expander-content']"
                );

                content.classList.add("ds-expander__content--opened");
                content.setAttribute("aria-hidden", "false");
                relatedAccordion.setAttribute("aria-expanded", "true");
            });
        });
    }

    function toggleExpander(expanders) {
        expanders.forEach(function (item, index) {
            item.addEventListener("click", function () {
                item.parentNode.classList.toggle("ds-accordions-expander--active");
                var content = item.parentNode.querySelector(
                    "[data-toggle='expander-content']"
                );
                content.classList.toggle("ds-expander__content--opened");
                content.classList.contains("ds-expander__content--opened")
                    ? content.setAttribute("aria-hidden", "false")
                    : content.setAttribute("aria-hidden", "true");
                this.parentNode.classList.contains("ds-accordions-expander--active")
                    ? this.setAttribute("aria-expanded", "true")
                    : this.setAttribute("aria-expanded", "false");

                // if expander is an accordion
                if (
                    document.getElementsByClassName(
                        "ds-accordion__button--expand-all"
                    ).length
                ) {
                    allAccordionsOpenCheck();
                }
            });
        });
    }

    function toggleAllAccordions(expandAllButton) {
        expandAllButton.forEach(function (button, index) {
            button.addEventListener("click", function () {
                console.log(this);
                var accordionContainer = this.parentNode.parentNode;
                var accordionExpandAllButton = this;
                var accordionItems = Array.prototype.slice.call(
                    accordionContainer.querySelectorAll(".ds-accordion")
                );

                toggleExpandAllButton(accordionExpandAllButton);

                // loop over every accordion item, add correct classes + aria attribuutes if the expand all button is active or not
                accordionItems.forEach(function (item, index) {
                    var content = Array.prototype.slice.call(
                        item.parentNode.querySelectorAll(
                            "[data-toggle='expander-content']"
                        )
                    );

                    accordionExpandAllButton.parentNode.classList.contains(
                        "ds-accordion__controls--active"
                    )
                        ? openAllAccordions(item, content)
                        : closeAllAccordions(item, content);
                });
            });
        });
    }

    function ButtonEventHandler(event) {
        var type = event.type;
        if (type === 'keyup') {
            if (event.keyCode === 13 || event.keyCode === 32) {
                event.target.classList.remove('by-keyboard');
            }
            else if (event.keyCode === 9) {
                event.target.classList.remove('by-keyboard');
            }
        } else if (type === 'click' && event.keyCode !== 32) {
            event.target.classList.add('by-keyboard');
        }
        else if (type === 'blur') {
            event.target.classList.add('by-keyboard');
        }
    }

    window.addEventListener("DOMContentLoaded", function () {
        var expandableItems = Array.prototype.slice.call(
            document.querySelectorAll("[data-toggle='collapse']")
        );
        var expandAllButtons = Array.prototype.slice.call(
            document.querySelectorAll(".ds-accordion__button--expand-all")
        );
        var accordionLinks = Array.prototype.slice.call(
            document.querySelectorAll(".accordion-link")
        );

        document.querySelectorAll('a, button, [role="link"], [role="button"], [type="button"], [type="submit"], [type="reset"]').forEach(function (el) {
            // Add event listeners to the various buttons
            // el.addEventListener('click', ButtonEventHandler);
            el.addEventListener('keyup', ButtonEventHandler);
            el.addEventListener('blur', ButtonEventHandler);
        });

        toggleExpander(expandableItems);
        toggleAllAccordions(expandAllButtons);
        toggleExpanderByLink(accordionLinks);
    });
})();