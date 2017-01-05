$(document).ready(function() {
    $.get("/templates/events").then((eventInfo) => {
        $("#event-info").html(eventInfo)
    }).catch(error => console.error);

    $.get("/templates/news").then((newsInfos) => {
        $("#news-info").html(newsInfos)
    })

    $.get("/templates/maps").then((mapInfos) => {
        $("#map-info").html(mapInfos)
    })
})
