function validUser(user) {
  const validEmail = typeof user.email=='string' &&
                      user.email.trim() != '';
  return validEmail
}

function alertError() {
  $('.error-container').html(
    '<p class="alert alert-danger">Must have valid Email</p>'
  );
}

function clearAlert() {
  $('.error-container').html('');
}

$('#register-submit').click(function(event) {
  let isValid = validUser(user);
  if(isValid) {
    clearAlert();
  } else {
    event.preventDefault();
    alertError();
  }
})
