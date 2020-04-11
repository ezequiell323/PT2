$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    console.log(data);
    $(".member-name").text(data.email);
  });
  
  $("#seeAnotherField").change(function() {
    if ($(this).val() == "yes") {
      $('#otherFieldDiv').show();
      $('#otherField').attr('required', '');
      $('#otherField').attr('data-error', 'This field is required.');
    } else {
      $('#otherFieldDiv').hide();
      $('#otherField').removeAttr('required');
      $('#otherField').removeAttr('data-error');
    }
  });
  $("#seeAnotherField").trigger("change");

  $("#submit").click(function() {
    $("#statusEntry").toggle();
  });

});
