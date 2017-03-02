$(document).ready(function(){
    var giphy = {

        topics: ["my neighbor totoro", "full metal alchemist",
                 "one punch man", "attack on titan", "akira", 
                 "gundam", "princess mononoke", "mob psycho 100", 
                 "psycho pass", "outlaw star", "cowboy bebop", 
                 "death note", "rurouni kenshin", "dragon ball z",
                 "sword art online", "spirited away", "flcl"],
        
        pushTopic: function (topic) {
            if (giphy.topics.indexOf(topic) == -1 && topic != "" && jQuery.trim(topic).length != 0) {
                $("#anime-input").val("");
                giphy.topics.push(topic);
                giphy.setButton(topic);
            }
        },
        
        checkTopicPush: function (newTopic) {
            var topic = newTopic.toLowerCase();
            function pushTopic(topicToAdd) {
                
            }
            return pushTopic(topic);
        },

        setButton: function (button) {
            function build(topic) {
                var newButton = $("<button>");
                newButton.attr("type", "button");
                newButton.addClass("btn btn-primary anime");
                newButton.text(topic.toLowerCase());
                $("#animeButtons").append(newButton);
            }
            return build(button);
        },

        setInitialTopics: function (buttonTopics) {
            for (var topicIndex = 0; topicIndex < buttonTopics.length; topicIndex++) {
                var button = buttonTopics[topicIndex];
                giphy.setButton(button);
            }
        },

        getInfo: function (topic) {
            $.ajax({
                url: "http://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=dc6zaTOxFJmzC",
                method: "GET",
            }).done(function(response) {
                var gifData = response.data;
                console.log(gifData);
                gifToDom(gifData);
            });
            
            function gifToDom(data) {
                for (var item = 0; item < data.length; item++) {
                    var thumbnail = data[item].images.fixed_height.url;
                    var rating = data[item].rating;
                    giphy.setDom(thumbnail, rating, item);
                }
            }   
        },

        setDom: function (image, rating, item) {
            var newGif = $("<div>");
            var ratElement = $("<p>");
            var imgElement = $("<img>");

            function setRating(ele, rating) {
                ele.text("Rating: " + rating);
                newGif.append(ele);
            }

            function setImage(ele, img, item) {
                ele.addClass("imgs");
                ele.attr("src", img);
                ele.attr("id", item);
                newGif.append(ele);
            }

            function setElement() {
                newGif.addClass("gifs");
                $("#anime").append(newGif);
                setRating(ratElement, rating);
                setImage(imgElement, image, item);
            }

            setElement();
        },
    }

    giphy.setInitialTopics(giphy.topics);
    
    $(window).keydown(function(event){
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    $("#addAnime").on("click", function () {
        var newItem = $("#anime-input").val();
        giphy.pushTopic(newItem);
        giphy.getInfo(newItem);
    });

    $("#animeButtons").on("click", ".anime", function () {
        $("#anime").empty();
        var currentTopic = $(this).text();
        currentTopic = currentTopic.replace(/ /g, '+');
        console.log("Current topic is: " + currentTopic);
        giphy.getInfo(currentTopic);
    });
});