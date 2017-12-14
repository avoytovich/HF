export const getBase64Promise = (file) => new Promise((resolve, reject) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log('success');
    resolve(reader);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
    reject(error);
  };
});