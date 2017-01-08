
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

function captureCheckboxes(formID) {
  var data = [];
  $(`#${formID} :checked`).each(function() {
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
      prefIds: captureCheckboxes('registrationForm')
    })
    .then(function(result){
        window.dashUserId = result.userId
        let id = result.userId;
        window.location = `/users/${id}`;
    }).catch(function(error) {
      $('.error-container').html(
        `<p class="alert alert-danger">${error.responseJSON.message}</p>`
      );
    });
  }
})

$('#preference-editing').click(function(event)  {
  var id = extractIdCookie()
  event.preventDefault();
  // let id = $.cookie('dashId')
  $.ajax({
      url: `/users/${id}`,
      type: 'PUT',
      data: {
            prefIds: captureCheckboxes('preferenceForm')
      }
  })
  .then(function(result){
    var id = extractIdCookie()
    window.location = `/users/${id}`;
  })
})


function extractIdCookie (){
  var regex = /dashId=[1-9]+/;
  var isolated = document.cookie.match(regex)[0];
  var result = isolated.replace('dashId=', '')
  return Number(result)
}
