$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var statusForm = $("form.status");
  var statusOption = $("#statusOption option:selected");
  var reason = $("#reasonOption option:selected");
  var comments = $("input#comments-input");

  $.get("/api/user_data").then(function(data) {
    console.log(data);
    $(".member-name").text(data.email);
  });
  
  $("#statusOption").change(function() {
    if ($(this).val() == "Out of Office") {
      $('#reasonDiv').show();
      $('#reason').attr('required', '');
      $('#reason').attr('data-error', 'This field is required.');
    } else {
      $('#reasonDiv').hide();
      $('#reason').removeAttr('required');
      $('#reason').removeAttr('data-error');
    }
  });
  $("#statusOption").trigger("change");
  $

    // When the submit button is clicked, we validate the email and password are not blank
    statusForm.on("submit", function(event) {
      console.log("Submit Pressed");
      $("#statusEntry").hide();
      event.preventDefault();
      var userData = {
        status: statusOption.val().trim(),
        reason: reason.val().trim(),
        comments: comments.val().trim(),

      };
      console.log(userData);
  
      if (!userData.status) {
        return;
      }
      // If we have an status, run the saveStatus function
      saveStatus(userData.status, userData.reason, userData.comments);
      statusOption.val("");
      reason.val("");
      comments.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function saveStatus(status, reason, comments) {
      $.post("/api/status", {
        status: status,
        reason: reason,
        comments: comments
      })
        .then(function(data) {
          window.location.replace("/members");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(saveErr);
    }
  
    function saveErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }


});
