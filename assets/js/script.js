$(document).ready(function(){
    var giphy = {

        apiKey: "dc6zaTOxFJmzC",
        topics: ["one punch man", "attack on titan", "akira", 
              "gundam", "princess mononoke", "mob psycho 100", 
              "psycho pass", "outlaw star", "cowboy bebop", 
              "death note", "rurouni kenshin", "dragon ball z",
              "sword art online", "spirited away", "FLCL"],

        setInitialTopics: function(buttonTopics) {
            var topicArray = buttonTopics;
            for (var topicIndex = 0; topicIndex < topicArray.length; topicIndex++) {
                var button = topicArray[topicIndex];
                giphy.setButton(button);
            }
        },

        setButton: function(button) {
            var newButtonTopic = button;
            function build(topic) {
                var newButton = $("<button>");
                newButton.attr("type", "button");
                newButton.addClass("btn btn-primary anime");
                newButton.text(topic.toLowerCase());
                $("#animeButtons").append(newButton);
                console.log("New Button: " + topic);

            }
            return build(newButtonTopic);
        },

        checkTopicPush: function(newTopic) {
            var topic = newTopic.toLowerCase();
            function pushTopic(topicToAdd) {
                if (giphy.topics.indexOf(topicToAdd) == -1 && topicToAdd != "" && jQuery.trim(topicToAdd).length != 0) {
                    $("#anime-input").val("");
                    giphy.topics.push(topicToAdd);
                    giphy.setButton(topicToAdd);
                }
            }
            return pushTopic(topic);
        },
    }

    giphy.setInitialTopics(giphy.topics);
    
    $(window).keydown(function(event){
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    $("#addAnime").on("click", function(){
        giphy.checkTopicPush($("#anime-input").val());
    });

    $(".anime").on("click", function(){
        var currentTopic = $(this).text();
        currentTopic = currentTopic.replace(/ /g, '+');
        console.log("Current topic is: " + currentTopic);
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q=" + currentTopic + "&api_key=dc6zaTOxFJmzC",
            method: "GET",
        }).done(function(response) {
            console.log(response);
        });
    });
});