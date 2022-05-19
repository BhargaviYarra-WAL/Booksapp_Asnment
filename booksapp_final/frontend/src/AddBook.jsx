/* eslint-disable no-alert */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable indent */
/* eslint-disable object-shorthand */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import './styles/List.css';
import { Form, FormGroup, Button, Input } from 'reactstrap';

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [availability, setAvailability] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryid, setCategoryid] = useState([]);
  const [finalCat, setFinalCat] = useState('');
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');
  const token = JSON.parse(localStorage.getItem('regtoken'));
  useEffect(() => {
    axios
      .get('/category')
      .then((res) => {
        setCategoryid(res.data.data);
        console.log('Category', res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const addBook = async (e) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('price', price);
    formData.append('availability', availability);
    formData.append('description', description);
    formData.append('categoryid', finalCat);
    console.log(formData);
    try {
      const res = await axios.post(
        '/book',

        formData,
        {
          headers: {
            token,
          },
        }
      );
      alert('Book Added Successfully');
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div>
      <h1 className="text-center">Add Book</h1>
      <div className="card mx-auto col-lg-4 col-md-6 p-3 my-5">
        <Form>
          <FormGroup>
            <Input
              type="text"
              name="title"
              placeholder="Enter Book Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="author"
              placeholder="Enter Book author"
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              name="price"
              placeholder="Enter Book price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="boolean"
              name="availability"
              placeholder="Enter availability 1 or 0"
              onChange={(e) => {
                setAvailability(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <select
              name="categoryid"
              className="form-control"
              onChange={(e) => {
                setFinalCat(e.target.value);
              }}
            >
              <option>Select category</option>
              {categoryid.map((val) => {
                return <option value={val.id}>{val.name}</option>;
              })}
            </select>
          </FormGroup>

          <FormGroup>
            <Input
              type="file"
              accept="image/*"
              name="image"
              onChange={saveFile}
              id="file_input"
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="textarea"
              name="description"
              placeholder="Enter book subject"
              id="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </FormGroup>
          <div className="text-center">
            <Button color="success" type="button" onClick={addBook}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
