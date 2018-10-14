
$(document).ready(function () {
 
        class Character {
            constructor(stats) {
                this.health = stats[0];
                this.totalAttack = stats[1];
                this.baseAttack = stats[2];
                this.counter = stats[3];
                this.name = stats[4];
                this.stats = stats;
            }


            toString() {

                var stats = this.stats;
                var s = "";
                for (var i = 0; i < stats.length - 1; i++) {
                    s += stats[i] + ",";
                }
                s += stats[stats.length - 1];
                return s;
            }
        };

        var graveyard = [];
        var characters =
            [[80, 15, 15, 9, "Mace Windu"],
            [95, 25, 25, 7, "Luke Skywalker"],
            [75, 50, 50, 5, "Han Solo"],
            [80, 15, 15, 10, "Darth Sidious"],
            [80, 25, 25, 7, "Darth Vader"],
            [120, 15, 15, 15, "Jar Jar"]
            ];
        var attributeNames = ["health", "attack", "baseAttack", "counter", "name"];

        var characterCards = $("#cardStorage").find(".card");
        for (var i = 0; i < characters.length; i++) {
            var card = $(characterCards[i]);
            var stats = characters[i];

            for (var j = 0; j < attributeNames.length; j++) {
                card.attr(attributeNames[j], stats[j]);
            }
            setCardStats(card);
        }

        var playerSet = false;
        var enemySet = false
        var playerCard;
        var enemyCard;


        function getCardStats(card) {
            var stats = []
            for (var i = 0; i < 5; i++) {
                stats.push(card.find($("." + attributeNames[i])));
            }
            return stats;
        }

        function setCardStats(card) {
            var attributeNames = ["health", "attack", "baseAttack", "counter", "name"];
            for (var i = 0; i < 5; i++) {
                card.find($("." + attributeNames[i])).text(card.attr(attributeNames[i]));
            }

        }




        $(".card").click(function (event) {
            var card = $(this);
            var name = card.attr("name");
            if (graveyard.includes(name)) return;


            if (!playerSet) {
                playerSet = true;
                $(this).appendTo($("#1"));
                playerCard = $(this);

            } else if (!enemySet && (!$(this).is(playerCard))) {

                enemySet = true;
                enemyCard = $(this);

                $(this).appendTo($("#2"));


            }




        });

        $("#attack").click(function (event) {
            if (playerSet && enemySet) {

                console.log("attacking");

                attack(playerCard, enemyCard);
            }

        });

        function attack(player, enemy) {
            console.log(enemy.attr("health"));
            var enemyHealth = parseInt(enemy.attr("health"), 10);
            var playerHealth = parseInt(player.attr("health"), 10);
            var totalAttack = parseInt(player.attr("attack"), 10);
            var baseAttack = parseInt(player.attr("baseAttack"), 10);
            var counter = parseInt(enemy.attr("counter"), 10);

            enemy.attr("health", enemyHealth - totalAttack);
            player.attr("attack", baseAttack + totalAttack);
            player.attr("health", playerHealth - counter);

            setCardStats(playerCard, player);
            setCardStats(enemyCard, enemy);
            if (enemy.attr("health") <= 0) {
                $("#graveyard").append(enemyCard);
                graveyard.push(enemyCard.attr("name"));
                enemyCard = null;
                enemySet = false;
                if (graveyard.length == characters.length - 1) {
                    if (confirm("You won! Play again?")) {
                        location.reload();
                    }
                }
            } else if (player.attr("health") <= 0) {
                if (confirm("YOU DIED. Play again?")) {
                    location.reload();
                }
                playerCard = null;
                playerSet = false;

            }
        };

});

