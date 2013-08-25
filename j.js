  (function($) {

      $.fn.arena = function() {

          $this = $(this);
          //initially all the index variables are set to zero. There are two arrays,
          //$aar and $arr2 are used to hold the question set and answer set.
          var $arr, $arr2, $i = 0;
          var $i2 = 0, $i3 = 0, flag = 0;
        
        // different sites use different scripting languages, so i decided to put the questions
        //and answers in two text files.. "questions" and "answers". the data is parsed from
        //these two files and placed in the two arrays.
        
          $.get('questions.txt', function(data) {
              $arr = data.split("\n");
          });
//NOTE: IN THE BELOW CODE ,THE ANSWERS ARE PLACED IN $arr2 ARRAY AND THE ANSWERS 
//ARE APPENDED BY "\n", SO THE LENGTH IS INCREASED BY +1 FOR ALL ANSWERS EXCEPT THE LAST ANSWER.
          $.get('answers.txt', function(data) {
              $arr2 = data.split("\n");
          });
          
          //Initially the chart is hidden, this indicates, the percentage of questions answered by you. 
          for (i = 1; i <= 4; i++)
              $("#chart" + i).hide();

//click on "start" text, to start the game.
          $("span#start").click(function() {
            
//the input area is displayed to enter the answers.

//NOTE: "inputarea" is present outside the div tag, so, please check for conflicts. 
              $("#inputarea").removeAttr("disabled");
              $(this).hide();

              function animation(i) {
//Animation fo questions.
                  $("#start").parent().append("<div class='floodgates'>" + $arr[i] + "</div>");
                  $('div.floodgates')
         .animate({ fontSize: "24px" }, 2000)
         .animate({ "top": "+=350px" }, 10000, function() {
//NOTE: PRESENTLY THE TIME ALLOCATED TO ANSWER THE QUESTIONS IS 12 SECONDS(2000+1000 "MILLISECONDS"),
// YOU CAN INCREASE THE TIME BY INCREASING THE VALUES IN THE ANIMATE PROPERTY.
             alert("You Lose!");
             alert("The correct answer was:  " + $arr2[$i3].toString());
         });
              }

//On keyup, the text of the input area is checked with the array of answers.
              $('#inputarea').keyup(function() {

                  var temp = $arr2[$i3].toString();
                  var temp2 = $(this).val().toString();
                  flag = 0;

                  if (temp2.charAt($i2) == temp.charAt($i2)) {
//this is for the last answer, as the last answer has the correct length in the array as in the text file.
                      if ($i == ($arr2.length) - 1) {
                          if ($i2 === ($arr2[$i3].length) - 1) {
//if flag is set to one, it means, there is a match.
                              flag = 1;
                          }
                      }
                      else {
//this is for all answers except the last answer, as all answers except the last answer has length increased by +1 because of the "\n" appended at their end.
                          if ($i2 === ($arr2[$i3].length) - 2) {
//if flag is set to one, it means, there is a match.
                              flag = 1;
                          }
                      }
                      $i2++;
                  }
//For the display of Score charts, as you answer the questions.
                  if (flag == 1) {
                      if ((($i + 1) / $arr2.length) >= 0.25 && (($i + 1) / $arr2.length) < 0.50)
                          {
                          $("#chart1").show();
                          $("#chart1").html("<b style=\"font-size: 25px;\">25%</b>");
                            }
                      if ((($i + 1) / $arr2.length) >= 0.50 && (($i + 1) / $arr2.length) < 0.75)
                      {
                          $("#chart2").show();
                          $("#chart1").html("<b style=\"font-size: 25px;\">50%</b>");
                          }

                      if ((($i + 1) / $arr2.length) >= 0.75 && (($i + 1) / $arr2.length) < 1)
                         {
                          $("#chart3").show();
                          $("#chart1").html("<b style=\"font-size: 25px;\">75%</b>");
                            }

                      if ((($i + 1) / $arr2.length) == 1)
                      {
                          $("#chart4").show();
                          $("#chart1").html("<b style=\"font-size: 25px;\">100%</b>");
                        }
                      $i2 = 0;
                      $i3 = $i3 + 1;
                      var s = 'div.floodgates';
                      $(s).stop().hide();

                      $("#start").parent().find("div.floodgates").remove();
                      
//the input text area is set to empty string on entering the correct answer.
                      $("#inputarea").val("");

                      $i = $i + 1;

                      if ($i < ($arr2.length)) {

                          animation($i);
                      }

                      if ($i == ($arr2.length)) {
//If you answer all the questions correct.
                          alert("You Won.");
                          $('#inputarea').attr("disabled", "true");
                          $("span#start").show();
                          
//if flag is set to 2, then the animation will stop.
                          flag = 2;
                          $i = 0;
                          $i2 = 0; $i3 = 0;
                          
//The same "arena" function is called again, if you answer all questions correctly, the game goes to its beginning state.
                          $this.arena();

                      }

                  }

              });
//if flag is not set to 2, the animation of questions will continue.
              if (flag != 2)
                  animation($i);
          });


          return $this;

      };
  })(jQuery);


