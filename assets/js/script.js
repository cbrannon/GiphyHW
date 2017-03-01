$(document).ready(function(){
    var giphy = {

        apiKey: "dc6zaTOxFJmzC",
        topics: ["one punch man", "attack on titan", "akira", 
              "gundam", "princess mononoke", "mob psycho 100", 
              "psycho pass", "outlaw star", "cowboy bebop", 
              "death note", "rurouni kenshin", "dragon ball z",
              "sword art online", "spirited away"],

        setInitialTopics: function(buttonTopics) {
            var topicArray = buttonTopics;
            function setTopic(topicsToBuild) {
                for (var topicIndex = 0; topicIndex < topicsToBuild.length; topicIndex++) {
                    var button = topicsToBuild[topicIndex];
                    giphy.setButton(button);
                }
            }
            return setTopic(topicArray);
        },

        setButton: function(button) {
            var newButtonTopic = button;
            function build(topic) {
                var newButton = $("<button>");
                newButton.attr("type", "button");
                newButton.addClass("btn btn-primary");
                newButton.text(topic.toLowerCase());
                $("#animeButtons").append(newButton);
                console.log("New Button: " + topic);

            }
            return build(newButtonTopic);
        },

        checkTopicPush: function(newTopic) {
            var topic = newTopic.toLowerCase();
            function pushTopic(topicToAdd) {
                if (giphy.topics.indexOf(topicToAdd) == -1 && topicToAdd != "") {
                    giphy.topics.push(topicToAdd);
                    giphy.setButton(topicToAdd);
                    console.log(giphy.topics);
                }
            }
            return pushTopic(topic);
        },
    }

    giphy.setInitialTopics(giphy.topics);
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
        event.preventDefault();
        return false;
        }
    });

    $("#addAnime").on("click", function(){
        var newTopic = $("#anime-input").val();
        giphy.checkTopicPush(newTopic);
        $("#anime-input").val("");
        console.log("Button Pressed");
        return false;
    });
});