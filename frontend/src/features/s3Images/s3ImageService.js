import axios from 'axios'

const API_URL = "/api/s3-image"

// get S3 upload URL for post image
const getUploadURL = async () => {

  const response = await axios.get(API_URL)
  return response.data
}

const s3ImageService = {
  getUploadURL, 
}

export default s3ImageService