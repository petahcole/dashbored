$(document).ready(function()    {
    $.get("/templates/events").then((eventInfo) => {
      console.log("INFO: ");
      console.log(eventInfo);
      $("#event-info").html(eventInfo)
    }).catch(error => console.error);

    $.get("/templates/news").then((newsInfos) => {
      $("#news-info").html(newsInfos)
    })

    $.get("/templates/maps").then((mapInfos) => {
      $("#map-info").html(mapInfos)
    })
})
