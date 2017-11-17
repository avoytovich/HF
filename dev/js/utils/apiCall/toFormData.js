export const toFormData = files => {
  let formData = new FormData();
  for (var key in files) {
    if (files.hasOwnProperty(key)) {
      formData.append(key, files[key])
    }
  }
  return formData;
};