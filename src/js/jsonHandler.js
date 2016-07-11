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
