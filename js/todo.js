$(document)
    .ready(function () {

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        // code to be implemented
        $("#button").click(function() {
            var item = '<li id=' + generateUUID() + ' class=""><input name="done-todo" type="checkbox" class="done-todo"> ' + $("input.input-text").val() + ' </li>';
            if ($("input.input-text").val()) {
                $("ol").append(item);
            }
            $("input.input-text").val("");
        })

        $("body").on("click", ".done-todo", function() {
            var currentClass = $(this).parent().attr("class");
            if (currentClass === "") {
                $(this).parent().attr("class", "checked");
            } else {
                $(this).parent().attr("class", "");
            }
        })

        $("#filters a").click(function() {
            $("#filters a").attr("class", "");
            $(this).attr("class", "selected");
            var text = $(this).text();
            switch(text) {
                case "ALL":
                    $("ol li").show();
                    break;
                case "Active":
                    $("ol li").filter(".checked").hide();
                    $('ol li[class=""]').show();
                    break;
                case "Complete":
                    $("ol li").filter(".checked").show();
                    $('ol li[class=""]').hide();
                    break;
            }
        })

        $("body").on("click", "ol li", function() {
            if ($(this).attr("class") === "") {
                $(this).children("input").attr("contentEditable", false);
                $(this).attr("contentEditable", true);
            }
        })
    });