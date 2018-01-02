export const getBase64Promise = (file) => new Promise((resolve, reject) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log('success');
    reader.binary = _base64ToArrayBuffer(reader.result.split(',').pop())
    resolve(reader);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
    reject(error);
  };

  function _base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }


  // var contentType = 'image/png';
  // var b64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
  //
  // var blob = b64toBlob(b64Data, contentType);
  // var blobUrl = URL.createObjectURL(blob);
  //
  // var img = document.createElement('img');
  // img.src = blobUrl;
  // document.body.appendChild(img);
});



