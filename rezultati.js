$(document).ready(function() {
    generateLeaderboardPage();

    function generateLeaderboardPage() {
        // Retrieve user scores from localStorage
        var userScores = JSON.parse(localStorage.getItem("rezultati")) || {};

        // Convert user scores object into an array of objects for easier sorting
        var scoresArray = [];
        for (var user in userScores) {
            scoresArray.push({ name: user, score: userScores[user] });
        }

        // Sort scores array by score in descending order
        scoresArray.sort((a, b) => b.score - a.score);

        // Get reference to HTML elements
        var topUsersList = document.getElementById("topUsersList");
        var mostRecentUser = document.getElementById("mostRecentUser");

        // Generate leaderboard HTML
        var topUsersHTML = "";
        for (var i = 0; i < Math.min(scoresArray.length, 5); i++) {
            topUsersHTML += "<li>" + scoresArray[i].name + " - " + scoresArray[i].score + "</li>" + "<hr>"
        }

        // Populate top 5 users list
        topUsersList.innerHTML = topUsersHTML;
        // Determine the most recent user who played
        var mostRecent = scoresArray.length > 0 ? JSON.parse(localStorage.getItem("mostRecent")) : "Nema odigranih partija";

        // Populate most recent user
        mostRecentUser.textContent = mostRecent;
    }

})