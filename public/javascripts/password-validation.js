function validatePassword(password, passwordConfirm) {
  return password === passwordConfirm &&
          typeof user.password == 'string' &&
          user.password.trim() != '' &&
          user.password.trim().length >= 5;
}

function alertError() {
  $('.error-container').html(
    '<p class="alert alert-danger">Passwords have to match</p>'
  );
}

function clearAlert() {
  $('.error-container').html('');
}

$('#register-submit').click(function(event) {
  let password = $('#register-pass').val();
  let confirmPassword = $('input[name="confirm-password"]').val();
  let isValid = validatePassword(password, confirmPassword);
  if(isValid) {
    clearAlert();
  } else {
    event.preventDefault();
    alertError();
  }
})
