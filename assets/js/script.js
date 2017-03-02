$(document).ready(function(){
    var giphy = {

        topics: ["my neighbor totoro", "full metal alchemist",
            "one punch man", "attack on titan", "akira", 
            "gundam", "princess mononoke", "mob psycho 100",                  
            "psycho pass", "outlaw star", "cowboy bebop", 
            "death note", "rurouni kenshin", "dragon ball z",
            "sword art online", "spirited away", "flcl", 
            "pom poko", "my hero academia"],
        
        apiData: null,

        // Set topic if not current topic, empty string, or string of spaces.
        setTopic: function (topic) {
            if (giphy.topics.indexOf(topic) == -1 && topic != "" && jQuery.trim(topic).length != 0) {
                $("#anime-input").val("");
                giphy.topics.push(topic);
                giphy.setButton(topic);
            }
        },

        // Set button for a topic.
        setButton: function (button) {
            function build(topic) {
                var newButton = $("<button>");
                newButton.attr("type", "button");
                newButton.addClass("btn anime");
                newButton.text(topic.toLowerCase());
                $("#animeButtons").append(newButton);
            }
            return build(button);
        },

        // Set initial topics.
        setInitialTopics: function (buttonTopics) {
            for (var topicIndex = 0; topicIndex < buttonTopics.length; topicIndex++) {
                var button = buttonTopics[topicIndex];
                giphy.setButton(button);
            }
        },

        // Get API data for topic.
        getInfo: function (topic) {
            $("#anime").empty();
            $.ajax({
                url: "http://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=dc6zaTOxFJmzC",
                method: "GET",
            }).done(function(response) {
                giphy.apiData = response.data;
                console.log(giphy.apiData);
                gifToDom(giphy.apiData);
            });

            // Loop through each gif object and call setDom on each.
            function gifToDom(data) {
                for (var item = 0; item < data.length; item++) {
                    var thumbnail = data[item].images.fixed_height_still.url;
                    var rating = data[item].rating;
                    giphy.setDom(thumbnail, rating, item);
                }
            }   
        },

        // Set DOM elements for a gif.
        setDom: function (image, rating, item) {
            var newGif = $("<div>");
            var ratElement = $("<p>");
            var imgElement = $("<img>");

            // Set rating DOM element.
            function setRating(ele, rating) {
                ele.text("Rating: " + rating);
                newGif.append(ele);
            }

            // Set image DOM element.
            function setImage(ele, img, item) {
                ele.addClass("imgs");
                ele.attr("src", img);
                ele.attr("id", item);
                newGif.append(ele);
            }

            // Set element to DOM.
            function setElement() {
                newGif.addClass("gifs");
                $("#anime").append(newGif);
                setRating(ratElement, rating);
                setImage(imgElement, image, item);
            }

            setElement();
        },

        // Set image source
        setSrc: function (index, currentSrc) {
            var gifItem = giphy.apiData[index];
            var itemId = "#" + index;

            // Set to image
            function setImgSrc(id) {
                $(id).attr("src", gifItem.images.fixed_height_still.url);
            }

            // Set to gif
            function setGifSrc(id) {
                $(id).attr("src", gifItem.images.fixed_height.url);
            }

            // Check if current image source is the image or gif
            if (gifItem.images.fixed_height_still.url == currentSrc) {
                setGifSrc(itemId);
            } else {
                setImgSrc(itemId);
            }
        }
    }

    giphy.setInitialTopics(giphy.topics);

    // Prevents enter key press from reloading page.
    $(window).keydown(function(event){
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    // Push new topic to array and get API data for it when pushing Submit
    $("#addAnime").on("click", function () {
        var newItem = $("#anime-input").val();
        giphy.setTopic(newItem);
        giphy.getInfo(newItem);
    });

    // Get API data when pressing a topic button
    $("#animeButtons").on("click", ".anime", function () {
        var currentTopic = $(this).text();
        currentTopic = currentTopic.replace(/ /g, '+');
        giphy.getInfo(currentTopic);
    });

    // Get gif index and image source when clicking a gif
    $("#anime").on("click", ".gifs .imgs", function () {
        var gifIndex = $(this).attr('id');
        var gifSrc = $(this).attr('src');
        giphy.setSrc(gifIndex, gifSrc);
    });
});