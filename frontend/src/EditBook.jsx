/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */

import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  FormGroup,
  Input,
  Label,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import BooksContext from './BooksContext';

function EditBook(props) {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [availability, setAvailability] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [categorydata, setCategorydata] = useState([]);
  const [finalCat, setFinalCat] = useState();
  const [error, setError] = useState(false);
  const { edit, setEdit } = props;
  const { getBooks } = useContext(BooksContext);
  const urlParams = useParams();
  console.log('category', category);
  console.log('urlParams', urlParams);
  const token = JSON.parse(localStorage.getItem('regtoken'));
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const changeToggle = () => {
    setToggle(!toggle);
    navigate('/list');
  };

  useEffect(() => {
    axios
      .get('/category', {
        headers: {
          token,
        },
      })
      .then((res) => setCategorydata(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`/book/${urlParams.id}`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        console.log('output', response.data.data);
        setTitle(response.data.data.title);
        setAuthor(response.data.data.author);
        setPrice(response.data.data.price);
        setAvailability(response.data.data.availability);
        setDescription(response.data.data.description);
        setCategory(response.data.data.categoryid);
      });
  }, []);

  function updateDetails(e) {
    e.preventDefault();
    const data = {
      title,
      author,
      price,
      availability,
      description,
      categoryid: finalCat,
    };
    axios
      .put(`/book/${urlParams.id}`, data, {
        headers: {
          token,
        },
      })
      .then((response) => {
        console.log(response);
        alert('updated successfully');
        setToggle(false);
        setEdit(false);
        setError(false);
      })
      /* eslint-disable no-shadow */
      .catch((error) => {
        setError(true);
        console.log('An error occurred:', error.response);
      });
    navigate('/list');
    getBooks();
  }
  return (
    /* eslint-disable react/jsx-no-bind */
    <Modal isOpen={toggle} fullscreen>
      <ModalHeader toggle={changeToggle}>Update the details</ModalHeader>
      <ModalBody>
        <div className="card mx-auto col-lg-4 col-md-6 p-3 my-5">
          <Form onSubmit={updateDetails} size="sm">
            <FormGroup>
              <Input
                type="text"
                id="title"
                className="form-control mb-2"
                value={title || ''}
                onInput={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                className="form-control mb-2"
                id="prodDescription"
                value={author || ''}
                onInput={(e) => setAuthor(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="number"
                id="number"
                className="form-control mb-2"
                value={price || ''}
                onInput={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
            <Label for="availability">Choose 1 or 0</Label>
            <FormGroup>
              <Input
                type="boolean"
                id="availability"
                className="form-control mb-2"
                value={availability || ''}
                onInput={(e) => setAvailability(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="textarea"
                className="form-control mb-2"
                id="prodDescription"
                value={description || ''}
                onInput={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <select
                name="category"
                className="form-control"
                onChange={(e) => setFinalCat(e.target.value)}
              >
                {categorydata.map((val) => {
                  return <option value={val.id}>{val.name}</option>;
                })}
              </select>
            </FormGroup>
            <div className="text-center">
              <Button color="success">Save</Button>
              <Link to="/list">
                <Button className=" m-2" color="info">
                  Go back
                </Button>
              </Link>
            </div>
          </Form>
        </div>
        <div className="text-center">
          {error ? <h1>Book Edited successfully</h1> : ''}
        </div>
      </ModalBody>
    </Modal>
  );
}
export default EditBook;
