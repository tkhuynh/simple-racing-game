function timer(start) {
    if (start === 0) {
       $(".middle-column>#annoucement").html("<h2>Let's Race</h2>").fadeIn(500).fadeOut(500).fadeIn(500);
    } else if (start > 0) {
        $(".middle-column>#annoucement").html("<h1>"+ start + "</h1>");
        setTimeout(timer, 1000, start -1);
    }
}
function getValFromInput(setVal, input) {
  if (input.val() === "") {
    return setVal;
  } else {
    return input.val();
  }
}
$(document).ready(function(){
  $(".beginner-rule").hide();
  $(".car-options").hide();
  $(".player1").hide();
  $(".player2").hide();
  $("#beginner").mouseenter(function(){
    $(".beginner-rule").slideDown();
  }).mouseleave(function(){
    $(".beginner-rule").slideUp();
  });
  var $name1;
  var $name2;
  $("#beginner").click(function(){
    $(".beginner-rule").remove();
    $(".player1").show();
    $(".player1 #getName").click(function(){
      $name1 = getValFromInput("Player 1", $("input.player1"));
      $('div.player1').html("<h3><span class='label label-warning player1'>"+ $name1 +"</span></h3>");
      $('div.player1').append("<h3>Score<br><span class='label label-warning' id='player1Score'>0</span></h3>");
      $(".car-options").slideDown();
      $(".car-options img").on("click", function() {
        $(".racing-road #car1").append(this);
        $(".car-options").slideUp();
        $(this).off("click");
        $(".player2").show();
        $(".player2 #getName").click(function(){
          $name2 = getValFromInput("Player 2", $("input.player2"));
          $('div.player2').html("<h3><span class='label label-warning player1'>"+ $name2 +"</span></h3>");
          $('div.player2').append("<h3>Score<br><span class='label label-warning' id='player2Score'>0</span></h3>");
          $(".car-options").slideDown();
          $(".car-options img").on("click", function() {
            $(".racing-road #car2").append(this);
            $(".car-options").slideUp();
            $(this).off("click");
            $(".level").hide();
            $("#finish-line").append("<img src='finish-line.png'>");
            $(".middle-column").append("<button type='button' class='btn btn-info btn-block' id='start'>Start</button>");
            $(".middle-column").append("<button type='button' class='btn btn-info btn-block' id='playAgain'>Play Again</button>");
            $(".middle-column").append("<div id='annoucement'></div>");
          });
        });
      });
    });
  });
  var finishLinePosition = $(window).width() - 230;
  $("#finish-line").css("right", finishLinePosition);
  var player1win = 0;
  var player2win = 0;
  var count1 = 0;
  var count2 = 0;
  var increment = (($(window).width() - 250) / 20).toFixed(0);
  function play() {
    timer(3);
    $(".middle-column>#start").addClass("disabled");
    $(".middle-column>#playAgain").addClass("disabled");
    setTimeout (function(){
      $(window).on("keypress",function(e){ 
        if (e.keyCode === 115) {
          $("#car1>img").animate({left: "+="+increment+"px"},10);
          count1++;
        }
        if (e.keyCode === 53) {
          $("#car2>img").animate({left: "+="+increment+"px"},10);
          count2++;
        }
        if (count1 === 20) {
          $(window).off("keypress");
          $(".middle-column>#annoucement").html("<h2>" + $name1 +" wins!</h2>");
          $("#player1Score").html(function(i, value){
            return value*1+1;
          });
          $(".middle-column>#playAgain").removeClass("disabled");
          player1win++;
        } else if (count2 === 20) {
          $(window).off("keypress");
          $(".middle-column>#annoucement").html("<h2>" + $name2 +" wins!</h2>");
          $("#player2Score").html(function(i, value){
            return value*1+1;
          });
          $(".middle-column>#playAgain").removeClass("disabled");
          player2win++;
        }
      });
    },3000);
  }
  var backOff1, backOff2;
  function resetGame() {
    $(".middle-column").on("click", "#playAgain", function() {
      $(".middle-column>#start").removeClass("disabled");
      backOff1 = count1 * increment;
      backOff2 = count2 * increment;
      $("#car1>img").animate({left: "10px"},500);
      $("#car2>img").animate({left: "10px"},500);
      count1 = 0;
      count2 = 0;
    });
  }
  $(".middle-column").on("click", "#start", play);
  resetGame();
});