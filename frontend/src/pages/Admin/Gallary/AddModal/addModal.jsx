import React, { useState } from 'react'
import './addModal.css'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const AddModal = (props) => {
  const [image, setImage] = useState(null)
  const [loader, setLoader] = useState(false)

  const uploadImage = async (e) => {
  const files = e.target.files;
  if (!files || !files[0]) return;

  if (files[0].size > 5 * 1024 * 1024) {
    alert("Image must be less than 5MB");
    return;
  }

  const data = new FormData();
  data.append('file', files[0]);
  data.append('upload_preset', 'college_disp');
  data.append('folder', 'college_gallery');

  const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;

  setLoader(true);
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      data
    );
    console.log(response.data.secure_url);

    setImage(response.data.secure_url);

  } catch (err) {
    console.error(err);
    alert("Upload failed");
  } finally {
    setLoader(false);
  }
};

  const handleSubmit = async()=>{
    await axios.post('http://localhost:4000/api/gallary/add',{link:image},{withCredentials:true}).then(resp=>{
      window.location.reload();
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className='addModal'>
      <div className='addModal-card'>
        <div>Add Image</div>
        <div className='modal-add-btns'>
          <div className='cancel-modal-btn' onClick={() => props.onClose()}>Cancel</div>

          <label htmlFor="fileInput" className='cancel-modal-btn' >Upload</label>
          <input id="fileInput" accept="image/*" onChange={(e) => { uploadImage(e) }} className='cancel-file' type='file' />
        </div>
        {
          loader && <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        }

        {
          image && <img src={image} style={{width:"200px",height:"200px",marginTop:20}} />
        }

        {
          image && <div className='cancel-modal-btn' onClick={handleSubmit}>Submit</div>
        }
      </div>

    </div>
  )
}

export default AddModal


