var acl, contentType, key, policy, successActionRedirect, successActionStatus, xAmzAlgorithm, xAmzCredential, xAmzDate, xAmzSecurityToken, xAmzSignature;
var responseSignKey;
function showFileObject() {
  console.log($('input'));
  var amazonKeys = {};
  getAmazonUrl();
  console.log("amazonKeys: " + amazonKeys);
  var fd = new FormData();
  console.log(fd);
  var myAudioFile1 = $('input').prop('files');
  var myAudioFile2 = $('input')[0].files[0];
  console.log(myAudioFile1);
  console.log(myAudioFile2);

}

function getAmazonUrl() {
  console.log("inside getAmazonURL");
  // $.ajax('http://localhost:3000/amazon/sign_key', {
  //   success: function(response) {
  //     console.log("response: " + response);
  //     setTimeout(function() {
  //       console.log("response: " + response);
  //     }, 4000);
  //   }
  // });
  $.get('http://localhost:3000/amazon/sign_key', function(response) {
    console.log("response: " + response.key);
    responseSignKey = response;
  });

  // .success(function(response)
  //   console.log(response);
  // }).error(function(data, status, headers, config){
  //   console.log(data);
  //   console.log(status);
  //   console.log("error");
  // });
}
function uploadToS3() {
  var myString1 = '<input id="uploadSignature" type="hidden" name="Signature" value="' + responseSignKey.signature + '">'
                  +'<input id="acl" type="hidden" name="acl" value="' + responseSignKey.acl + '">'
                  +'<input id="key" type="hidden" name="key" value="' + responseSignKey.key + '">'
                  +'<input id="accessKey" type="hidden" name="AWSAccessKeyId" value="' + responseSignKey.access_key + '">'
                  +'<input id="uploadPolicy" type="hidden" name="Policy" value="' + responseSignKey.policy + '">';
  var myString2 = '<input id="submitButton" type="submit" name="submit" value="send to s3">'
  $('#form-for-s3').prepend(myString1);
  $('#form-for-s3').append(myString2);
  setTimeout(function() {
    $('#submitButton').trigger('click');
  }, 2000);

}

$(document).ready(function() {
  $('#amazon-keys-button').on('click', getAmazonUrl);
  $('#upload-button').on('click', uploadToS3);
})
