$(document).ready(function(){
    var giphy = {

        topics: ["my neighbor totoro", "full metal alchemist",
            "one punch man", "attack on titan", "akira", 
            "gundam", "princess mononoke", "mob psycho 100",                  
            "psycho pass", "outlaw star", "cowboy bebop", 
            "death note", "rurouni kenshin", "dragon ball z",
            "sword art online", "spirited away", "flcl"],
        
        apiData: null,
        
        
        
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
                giphy.apiData = response.data;
                console.log(giphy.apiData);
                gifToDom(giphy.apiData);
            });
            
            function gifToDom(data) {
                for (var item = 0; item < data.length; item++) {
                    var thumbnail = data[item].images.fixed_height_still.url;
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

        setSrc: function (index, currentSrc) {
            var gifItem = giphy.apiData[index];
            var itemId = "#" + index;

            function setImgSrc(id) {
                $(id).attr("src", gifItem.images.fixed_height_still.url);
                console.log(gifItem.images.fixed_height_still.url);
            }

            function setGifSrc(id) {
                $(id).attr("src", gifItem.images.fixed_height.url);
                console.log(gifItem.images.fixed_height_still.url);

            }

            if (gifItem.images.fixed_height_still.url == currentSrc) {
                setGifSrc(itemId);
            } else {
                setImgSrc(itemId);
            }
        }
    }

    giphy.setInitialTopics(giphy.topics);
    
    $(window).keydown(function(event){
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    $("#addAnime").on("click", function () {
        $("#anime").empty();
        var newItem = $("#anime-input").val();
        giphy.pushTopic(newItem);
        giphy.getInfo(newItem);
    });

    $("#animeButtons").on("click", ".anime", function () {
        $("#anime").empty();
        var currentTopic = $(this).text();
        currentTopic = currentTopic.replace(/ /g, '+');
        giphy.getInfo(currentTopic);
    });

    $("#anime").on("click", ".gifs .imgs", function () {
        var gifIndex = $(this).attr('id');
        var gifSrc = $(this).attr('src');
        giphy.setSrc(gifIndex, gifSrc);
    });
});