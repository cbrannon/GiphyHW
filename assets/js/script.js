$(document).ready(function(){
    var giphy = {

        apiKey: "dc6zaTOxFJmzC",
        topics: ["one punch man", "attack on titan", "akira", 
              "gundam", "princess mononoke", "mob psycho 100", 
              "psycho pass", "outlaw star", "cowboy bebop", 
              "death note", "rurouni kenshin", "dragon ball z",
              "sword art online", "spirited away"],

        setButtons: function(buttonTopics) {
            var topicArray = buttonTopics;
            function setButton(topicsToBuild) {
                for (var topicIndex = 0; topicIndex < topicsToBuild.length; topicIndex++) {
                    var button = topicsToBuild[topicIndex];
                    console.log("New Button: " + button);
                    giphy.buildButton(button);
                }
            }
            return setButton(topicArray);
        },

        buildButton: function(button) {
            var newButtonTopic = button;
            function build(topic) {
                var newButton = $("<button>");
                newButton.attr("type", "button");
                newButton.addClass("btn btn-primary");
                newButton.text(topic.toLowerCase());
                $("#animeButtons").append(newButton);
            }
            return build(newButtonTopic);
        },

        checkTopicPush: function(newTopic) {
            var topic = newTopic.toLowerCase();
            function pushTopic(topicToAdd) {
                if (giphy.topics.indexOf(topicToAdd) == -1) {
                    giphy.topics.push(topicToAdd);
                    console.log(giphy.topics);
                }
            }
            return pushTopic(topic);
        },
    }

    giphy.setButtons(giphy.topics);

    $("#addAnime").on("click", function(){
        var newAnime = $("#anime-input").val();
        giphy.checkTopicPush(newAnime);
        giphy.buildButton(newAnime);
        $("#anime-input").val("");
    });
});