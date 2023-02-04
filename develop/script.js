// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var dateEl = $('#currentDay');

var saveBtn = $('.saveBtn')
//time in variables is based on hours 0-23


var hour9 = $('#hour-9');
var hour10 = $('#hour-10');
var hour11 = $('#hour-11');
var hour12 = $('#hour-12');
var hour13 = $('#hour-13');
var hour14 = $('#hour-14');
var hour15 = $('#hour-15');
var hour16 = $('#hour-16');
var hour17 = $('#hour-17');

var timeBlock = $('.time-block')



function renderText(){
  $('textarea').each(function(){
    $(this).text(localStorage.getItem($(this).parent().attr('id')))
  })
};

saveBtn.on('click',function(){
  var key = $(this).parent().attr('id')
  var description = $(`#${key}`).children().eq(1).val()
  localStorage.setItem(key,description)
})



function updateTimeDisplay(){
  setInterval(function(){
    var today = dayjs();
    var currentHour = dayjs().format('H');
    dateEl.text(today.format('[It is currently] dddd MMMM, D [at] h:mm a'))   
  },1000) 
}

function colorChangeTimer(){
  setInterval(colorChanger,600000) 
}

function colorChanger(){
  var currentHour = Number(dayjs().format('H'));
  $('textarea').each(function(){
    var hourId = $(this).parent().attr('id')
    var idSplitArray = hourId.split("-");
    var hour = Number(idSplitArray[1])
    console.log(typeof currentHour)
    console.log(typeof hour)
    console.log(currentHour > hour)
    console.log(hour +"this is hour")
    console.log(hourId + "this is hourId")
    
    $(`#${hourId}`).removeClass()
    $(`#${hourId}`).addClass('row')
    $(`#${hourId}`).addClass('time-block')

  if(currentHour > hour){
      $(`#${hourId}`).addClass('past')
    console.log("past")
   } else if (currentHour === hour){
      $(`#${hourId}`).addClass('present')
      console.log("present")
   } else if(currentHour < hour){
      $(`#${hourId}`).addClass('future')
      console.log("future")
   }
  })
  

  
}

 
 
  
  



$(function () {
  renderText()
  updateTimeDisplay()
  colorChangeTimer()
  colorChanger()

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
      
  });
 
    
 
    
//    display current day at top of calendar using day.js  use set interval to update time?
  
//   color code each block for past present and future
//   use local storage to enter an event and save it to local storage after the "save" button is clicked
// create if statement if(current time) give 'present' class
// if(current time)
