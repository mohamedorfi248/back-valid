import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { editContact, getOneContact } from "../../JS/Actions/contact";
import { Button, TextField } from "@mui/material";

const EditContact = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const match = useMatch("/EditContact/:id");
  const [newContact, setNewContact] = useState({});

  const [file, setFile] = useState(null);

  const contactToGet = useSelector(
    (state) => state.contactReducer.contactToGet
  );
  const load = useSelector((state) => state.contactReducer.load);

  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.value]: e.target.name });
  };

  useEffect(() => {
    dispatch(getOneContact(match.params.id));
  },[]);

  const handlePhoto = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("name", newContact.name);
    data.append("phone", newContact.phone);
    data.append("email", newContact.email);
    data.append("image", file);
    
    dispatch(editContact(match.params.id, data));
  };

  return (
    <div>
      <h1>Edit contact</h1>

      <TextField id="standard-basic" type="text" label={`${contactToGet.name}`} variant="standard" onChange={handleChange} name="name" />
      <br/><br/>
      <TextField id="standard-basic" type="email" label={`${contactToGet.email}`}  variant="standard" onChange={handleChange} name="email" />
      <br/><br/>
      <TextField id="standard-basic" type="number" label={`${contactToGet.phone}`}  variant="standard" onChange={handleChange} name="phone" />
      <br/><br/>
      <input type="file" id="file-input" encType="multipart/form-data" onChange={handlePhoto} />
      <br/><br/>
      <Button variant="contained" color="success" onClick={handleEdit} >
        Edit
      </Button>
    </div>
  );
};

export default EditContact;
