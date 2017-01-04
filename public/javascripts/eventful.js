$(document).ready(function()    {
console.log("working!");
    $.get("/templates/events").then((eventInfo) => {

      $("#event-info").html(eventInfo)
    })

    $.get("/templates/news").then((newsInfos) => {
      $("#news-info").html(newsInfos)
    })

    $.get("/templates/maps").then((mapInfos) => {
      $("#map-info").html(mapInfos)
    })





})
