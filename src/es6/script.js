

$(document).ready(function(){
    console.log('Ready!');
    var matrix = [
        [ 1, 2, 3, 4 ],
        [ 4, 5, 6, 5 ],
        [ 7, 8, 9, 7 ],
        [ 7, 8, 9, 7 ]    
    ];

    function sumUpDiagonals(matrix) {
        var mainDiagonal = 0;
        var sideDiagonal = 0;
        var n = matrix.length;

        for(var i=0; i<n; i++) {
            mainDiagonal += matrix[i][i];
            sideDiagonal += matrix[i][n-1-i];
        }

        console.log("Main diagonal: " + mainDiagonal + "; Side diagonal: " + sideDiagonal);
       
    }
    sumUpDiagonals(matrix);

    const REQUEST_FORM = $('.form.request-form');

    $(".owl-carousel").owlCarousel(
        {
            loop: true,
            margin: 10,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 3
                }
            }
        }
    );

    $(".popup__close-button, .popup").click(function(){
        var clearClass = getThisPopupClearClass($(this)); // getting class of popup to close
        closePopup(clearClass);
    });

    $(".popup__main").click(function(e){ // no closing on clicking main form content
        e.stopPropagation();
    });

    $(".btn-popup").click(function(){
        var buttonClearLink = getThisButtonLink($(this)); // getting class of popup to open
        closeAllPopups();
        openPopup(buttonClearLink);
    });

    function getThisButtonLink(buttonElement) {
        var buttonClassNames = buttonElement.attr("class").split(" ");
        var buttonLinkToPopup;
        for (var i = buttonClassNames.length-1; i >= 0; i--) {
            if(buttonClassNames[i].lastIndexOf('openPopup') !== 0){
                buttonClassNames.splice(i, 1);
            } else {
                buttonLinkToPopup = buttonClassNames[i].substring(4, buttonClassNames[i].length);
            }
        }
        return buttonLinkToPopup.charAt(0).toLowerCase() + buttonLinkToPopup.slice(1); // returning lowercased name of popup to open
    }

    function getThisPopupClearClass(popupElement){
        var classNames = popupElement.closest(".popup.active").attr("class").split(" ");
        for (var i = classNames.length; i >= 0; i--) {
            if (classNames[i] === "popup" || classNames[i] === "active") {
                classNames.splice(i, 1);
            }
        }
        var classOfPopup = classNames.join(".");
        return classOfPopup; // returning popup class to close
    }

    function closePopup(className){
        $("." + className).removeClass("active");
        console.log("Closed popup with class: '" + className + "'");
    }

    function closeAllPopups(){
        $(".popup").removeClass("active");
        console.log("closed all popups");
    }

    function openPopup(popupToOpen){
        closeAllPopups();
        $("." + popupToOpen).addClass("active");
        console.log("Opened popup with class: '" + popupToOpen + "'");
    }

    REQUEST_FORM.submit(function(e){
        e.preventDefault();
        var formData = $(this).serialize();
        var currentForm = $(this);
        console.log(formData);
        $.ajax({
            type: "POST",
            url: "send.php",
            data: formData,
            success: function(msg){
                var result = jQuery.parseJSON(msg);
                console.log(result);
                if (result["errors"] === 0) {
                    openPopup("popupSuccess");
                    currentForm.trigger("reset");
                    refreshDangerFields();
                } else {
                    setErrorWarnings(result);
                }
            }
        });
    });
    
    function setErrorWarnings(result){
        for(var k in result["errorlog"]) {
            var errMessage = result["errorlog"][k];
            $("input[name='" + k +"'] ~ .form__danger").text(errMessage);
        }
    }

    function refreshDangerFields(){
        $(".form__danger").text("");
    }

    $(".block-btn").click(function(){
        showBlocks("block-item", 300);
    });

    function showBlocks(blocksClass, timing) {
        var blocks = $("."+blocksClass);
        blocks.each(function(index){
            var blockElement = $(this);
            setTimeout(function(){
                blockElement.toggleClass("invisible");
            }, timing*index);
        });
    }

    $(".tab-header").click(function(){

        var container = $(this).parents(".tab-container");

        $(".tab-container").removeClass("opened");

        if(container.outerHeight() > 30){
            container.removeClass("opened");
        } else {
            container.addClass("opened");
        }

    });



});

