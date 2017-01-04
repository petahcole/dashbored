$(document).ready(function()    {
    $.get("/templates/events", function(eventInfo)  {
    $("#event-info").html(eventInfo)
    })
})