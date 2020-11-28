
// eslint-disable-next-line 
const handleCameraUpload = async (uri) => {
  const randInt = Math.floor(Math.random() * 1000000)

  await storage.ref(`${userId}/images/temp_${randInt}`)
    .putString(uri, 'data_url').then(async snap => {

      console.log("uploaded base64 image")
      console.log(snap)

      const storageResponse = await storage
        .ref(`${userId}/images`)
        .child(`temp_${randInt}`)
        .getDownloadURL()

      const firebaseUrl = storageResponse ? storageResponse : {}

      let data = {
        src: firebaseUrl,
        alt: imageAsFile.name,
        innerTitle: title,
        innerdescription: description,
      };

      // Save in db 
      setUploadedImage((prevObject) => ({
        ...data,
        ...prevObject,
        imgUrl: firebaseUrl,
      }));

      // Get predictions 
      fetchPredictions(firebaseUrl)
    }).catch(err => console.log(err));

}

export { handleCameraUpload }