//serializeObject.js
//Allows a form submission to be transformed into a json object
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//scoreCalculator.js
//calculates correct answers and displays score to user upon form submission
$(function() {
    $('form').submit(function() {
        //Create json object from form submission
        var answerData = $(this).serializeObject();
        // console.log(Object.keys(answerData).length);
        $.getJSON('../../src/js/formdata.json', function(formData){
          console.log(formData);
          //truth will count the amount of correct answers given in the submitted form
          var truths = 0;
          // console.log(Object.keys(answerData).length);
          //checking if submitted answers have a correct property with value true in formdata.json,
          //if so 1 truth will be added to the count
          for (var i = 0; i < Object.keys(answerData).length; i++) {
            // console.log(parseInt(answerData['question'+((i+1).toString())]));
            // console.log(formData.questions[i].answers[parseInt(answerData['question'+((i+1).toString())])-1].correct);
            if(formData.questions[i].answers[parseInt(answerData['question'+((i+1).toString())])-1].correct == true) {
              truths ++;
            }
            // console.log(formData.questions[i].answers[i].correct)
            // if(formData.questions[i].answers[parseInt(answerData['question'+(i+1)])].correct == true) {
            //   var truths ++;
            // }
          }
          // console.log(truths);
          //Append truth count to result element within the last fieldset,
          //displaying a score to the user upon form submission
          $('#result').html('<span> You got ' + truths.toString() + ' correct answers.</span>');
        });
        // $('#output').text(JSON.stringify(answerData, undefined, 2));
        return false;
    });
});

//json handler
//appends correct question titles and answers to each respective fieldset (1 per question)
$(function() {
  $.getJSON('../../src/js/formdata.json', function(data){
    console.log(data);
    //set quiz title based on value in test.json
    $('#title').html('<p>' + data.title + '</p>');
    //set welcome message based on value in test.json
    $('#welcome').html('<p>' + data['welcome message'] + '</p>');
    //set thank you message based on value in test.json
    $('#thankyou').html('<p>' + data['thank you message'] + '</p>');
    //iterate through quiz length to append question title
    for (var i = 0; i < data.questions.length; i++) {
      $('#question'+((i+1).toString())).html('<p>' + data.questions[i].title + '</p>');
      //for each question, iterate through answers and append answer title to element in index.html
      for (var j = 0; j < data.questions[i].answers.length; j++) {
        $('#'+((i+1).toString())+"answer"+((j+1).toString())).html(data.questions[i].answers[j].title);
      };
    };
  });
});

//dynamicLoad.js
//Allows fieldsets to load one at a time, with next and back buttons
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 0.7 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		}
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 0.7 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		}
	});
});

$(".submit").click(function(){
	if(animating) return false;
	animating = true;

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 0.7 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		}
	});
});

$(".startagain").click(function(){
	location.reload();
});
