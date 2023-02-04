// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// declares variable for the id to add the date/time on screen, and declares variable for the save button
var dateEl = $("#currentDay");
var saveBtn = $(".saveBtn");

function renderText() {
  $("textarea").each(function () {
    $(this).text(localStorage.getItem($(this).parent().attr("id")));
  });
}

saveBtn.on("click", function () {
  var key = $(this).parent().attr("id");
  var description = $(`#${key}`).children().eq(1).val();
  localStorage.setItem(key, description);
});

function updateTimeDisplay() {
  setInterval(function () {
    var today = dayjs();
    var currentHour = dayjs().format("H");
    dateEl.text(today.format("[It is currently] dddd MMMM, D [at] h:mm a"));
  }, 1000);
}

function colorChangeTimer() {
  setInterval(colorChanger, 60000);
}

function colorChanger() {
  var currentHour = Number(dayjs().format("H"));
  $("textarea").each(function () {
    var hourId = $(this).parent().attr("id");
    var idSplitArray = hourId.split("-");
    var hour = Number(idSplitArray[1]);

    console.log(currentHour);
    console.log(hour);
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
  renderText();
  updateTimeDisplay();
  colorChangeTimer();
  colorChanger();
});
