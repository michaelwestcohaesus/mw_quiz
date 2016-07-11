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
