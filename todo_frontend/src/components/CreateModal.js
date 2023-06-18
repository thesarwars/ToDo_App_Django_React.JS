import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';



function CreateModal(props) {
    const [CreateData, setCreateData] = useState({
        title: '',
        description: '',
    });



    const handleInputChange = (event) =>{
        setCreateData({
            ...CreateData,
            [event.target.name]:event.target.value
        })
    }

    const handleSubmit = () =>{
        const _formData = new FormData();
        _formData.append('title', props.title);
        _formData.append('description', props.description);

        try{
            axios.post('http://127.0.0.1:8000/apiview/', _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response)=>{
                if(response.status===200||response.status===201){
                    console.log('Data Save Successfully')
                }
            })
        }catch(error){
            console.log(error)
        }
    }
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name='title' value={CreateData.title} onChange={handleInputChange} placeholder="Give your note a title" autoFocus />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control name='description' value={CreateData.description} onChange={handleInputChange} as="textarea" rows={3} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleSubmit} type='submit' variant='primary'>Save</Button>
        </Modal.Footer>
    </Modal>
  );
}



export default CreateModal