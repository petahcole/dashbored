
function validatePassword(password, passwordConfirm) {
  return password === passwordConfirm &&
          typeof password == 'string' &&
          password.trim() != '' &&
          password.trim().length >= 5;
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
  event.preventDefault();
  var passWordValid = validatePassword($(`#registrationForm input[name="password"]`).val(),
                                       $(`#registrationForm input[name="confirm-password"]`).val());
  if (passWordValid === false) {
    alertError()
  } else {
    $.post('/users', {
      username: $(`#registrationForm input[name="username"]`).val(),
      email: $(`#registrationForm input[name="email"]`).val(),
      password: $(`#registrationForm input[name="password"]`).val()
    })
    .then(function(result){
      $('.error-container').html(
        `<p class="alert alert-danger">${result.message}</p>`
      );
    });
  }
})
