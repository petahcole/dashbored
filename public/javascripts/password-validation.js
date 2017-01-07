
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

function captureRegCheckboxes() {
  var data = [];
  $("#registrationForm :checked").each(function() {
    data.push($(this).val());
  });
  return data;
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
      password: $(`#registrationForm input[name="password"]`).val(),
      prefIds: captureRegCheckboxes()
    })
    .then(function(result){
      console.log(result);
      if (result.status === 'error') {

      } else {
        let id = result.userId;
        console.log(`/users/${id}`);
        window.location = `/users/${id}`;
      }
    }).catch(function(error) {
      $('.error-container').html(
        `<p class="alert alert-danger">${error.responseJSON.message}</p>`
      );
    });
  }
})
