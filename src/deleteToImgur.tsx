import axios from 'axios';

const deleteImageFromImgur = async (imageId:any) => {
  const clientId = '081bb7fbbb3e62d';  // Replace with your Imgur Client ID
  try {
    const response = await axios.delete(
      `https://api.imgur.com/3/image/${imageId}`,
      {
        headers: {
          Authorization: `Client-ID ${clientId}`
        }
      }
    );
    if (response.data.success) {
      console.log('Image deleted successfully:', response.data.data);
      return true;
    } else {
      console.log('Failed to delete image:', response.data.data);
      return false;
    }
  } catch (error) {
    console.error('Error deleting image from Imgur:', error);
    return false;
  }
};

export default deleteImageFromImgur;