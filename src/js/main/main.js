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
        $.getJSON('../../dist/data/formdata.json', function(formData){
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
          console.log(truths);
          //Append truth count to result element within the last fieldset,
          //displaying a score to the user upon form submission
          var customMessage;
          var quizLength = formData.questions.length;
          var passrate = (formData.passratepercentage)/100;
          if(truths == quizLength) {
            customMessage = "Wow, full marks! You passed!";
          } else if (truths/quizLength < passrate) {
            customMessage = "You failed!";
          } else {
            customMessage = "You passed!";
          }
          $('#result').html('<span> Score: ' + truths.toString() + '/' + quizLength.toString() + '</span>' + '</br>' + customMessage);
        });
        // $('#output').text(JSON.stringify(answerData, undefined, 2));
        return false;
    });
});

(function(){
	var content = document.getElementById('content');
	var html = '';
	var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': '../../dist/data/formdata.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
	})();

	// Handlebars.registerHelper('bold', function(text){
	// 	text = Handlebars.escapeExpression(text);
	// 	return new Handlebars.SafeString(
	// 		'<b>' + text + '</b>'
	// 	);
	// });
	//
	// Handlebars.registerHelper('list', function(items, options){
	// 	var out = '<ul>';
	//
	// 	for(var i = 0, length = items.length; i < length; i++){
	// 		out += '<li>' + options.fn(items[i]) + '</li>';
	// 	}
	//
	// 	return out + '</ul>';
	// });

	var template = Handlebars.compile(document.getElementById('questions-template').innerHTML);

	content.innerHTML = template(json);

})();

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
