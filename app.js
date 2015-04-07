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
  var formData = new FormData();
  formData.append('acl', responseSignKey.acl);
  formData.append('key', responseSignKey.key);
  formData.append('AWSAccessKeyId', responseSignKey.access_key);
  formData.append('Policy', responseSignKey.policy);
  formData.append('Signature', responseSignKey.signature);
  formData.append('file', $('#audio-file')[0].files[0]);

  $.ajax({
    url: 'http://emphonic-player-demo.s3.amazonaws.com/',
    type: 'POST',
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    beforeSend: function(request) {
      console.log("sending file to S3...")
    },
    success: function(data,textStatus,jqXHR){
      // console.log(data);
      // console.log(textStatus);
      console.log(jqXHR.status);
    },
    error: function(jqXHR, exception) {
      console.log(jqXHR);
      console.log(exception);
    },
    complete: function() {
      console.log('finished file upload.');
      sendToRails();
    }
  });
}
function sendToRails() {

}

$(document).ready(function() {
  $('#amazon-keys-button').on('click', getAmazonUrl);
  $('#upload-button').on('click', uploadToS3);
})
