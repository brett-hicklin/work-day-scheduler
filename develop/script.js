// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// declares variable for the id to add the date/time on screen, and declares variable for the save button
var dateEl = $("#currentDay");
var saveBtn = $(".saveBtn");
//renders the text for the text area shown in each hour block
function renderText() {
  $("textarea").each(function () {
    $(this).text(localStorage.getItem($(this).parent().attr("id")));
  });
}
//uses the id from the parent div to set local storage key to the hour the text is in
saveBtn.on("click", function () {
  var key = $(this).parent().attr("id");
  var description = $(`#${key}`).children().eq(1).val();
  localStorage.setItem(key, description);
});
//keeps the current time on the top of the scheduler
function updateTimeDisplay() {
  setInterval(function () {
    var today = dayjs();
    var currentHour = dayjs().format("H");
    dateEl.text(today.format("[It is currently] dddd MMMM, D [at] h:mm a"));
  }, 1000);
}
//runs the colorChanger function every minute to update the colors for each hour
function colorChangeTimer() {
  setInterval(colorChanger, 60000);
}
//updates the colors for each hour block by using the id in each div to compare it to the current time (0-23), removing current classes, and re-adding new updated classes
function colorChanger() {
  var currentHour = Number(dayjs().format("H"));
  $("textarea").each(function () {
    var hourId = $(this).parent().attr("id");
    var idSplitArray = hourId.split("-");
    var hour = Number(idSplitArray[1]);

    $(`#${hourId}`).removeClass();
    $(`#${hourId}`).addClass("row");
    $(`#${hourId}`).addClass("time-block");

    if (currentHour > hour) {
      $(`#${hourId}`).addClass("past");
    } else if (currentHour === hour) {
      $(`#${hourId}`).addClass("present");
    } else if (currentHour < hour) {
      $(`#${hourId}`).addClass("future");
    }
  });
}

$(function () {
  //places time on page when it loads so there isn't a 1 second delay
  var today = dayjs();
  dateEl.text(today.format("[It is currently] dddd MMMM, D [at] h:mm a"));

  renderText();
  updateTimeDisplay();
  colorChangeTimer();
  colorChanger();
  
});
