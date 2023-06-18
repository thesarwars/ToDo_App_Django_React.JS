import { useEffect, useState } from "react";
import Header from "./Header";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
// import CreateModal from "./CreateModal";

function Home(){
    const [data,setData] = useState([])
    const [modalShow,setModalShow] = useState(false)
    const [particularData,setParticularData] = useState({})
    const [createModal,setCreateModal]=useState(false)
    const handleModalData = (cardData)=>{
        setParticularData(cardData) 
        setModalShow(true)
    }
    const [CreateData, setCreateData] = useState({
        title: '',
        description: '',
    });

    const [ModifyData, setModifyData] = useState({
        title: '',
        description: '',
    })

    const handleInputChange = (event) =>{
        setCreateData({
            ...CreateData,
            [event.target.name]:event.target.value
        })
    }

    const handleSubmit = () =>{
        const _formData = new FormData();
        _formData.append('title', CreateData.title);
        _formData.append('description', CreateData.description);

        try{
            axios.post('http://127.0.0.1:8000/apiview/', _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response)=>{
                if(response.status===200||response.status===201){
                    console.log('Data Save Successfully')
                    setCreateModal(false)
                    // fetchData();

                }
            })
        }catch(error){
            console.log(error)
        }
    }

    const handleModify = (todoId) =>{
        const _modifyData = new FormData();
        _modifyData.append('title', CreateData.title);
        _modifyData.append('description', CreateData.description);

        try{
            axios.put('http://127.0.0.1:8000/apiview/modify/'+todoId, _modifyData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response)=>{
                if(response.status===200||response.status===201){
                    console.log('Data Save Successfully')
                    setCreateModal(false)
                    // fetchData();

                }
            })
        }catch(error){
            console.log(error)
        }
    }

    
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/apiview/')
        .then(function (response) {
            // handle success
            setData(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    },[])


    return(
        <>
        <Header/>
        <div className="row mt-3 mb-1 ms-3">
            {/* Note Create start */}
            <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-3">
            <div className="card col-md-3" onClick={() => setCreateModal(true)}>
                <div className="card-body">
                    <button type="button" className="btn btn-primary d-grid gap-2 col-6 mx-auto">Create</button>
                </div>
            </div>
            <Modal show={createModal} onHide={()=>setCreateModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
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
            </div>
            {/* <CreateModal show={createModal} onHide={() => setCreateModal(false)}/> */}
            {/* Note Create End */}

            {/* Note view, edit, delete start */}
            {data.map((card,index) => 
                <div key={index} className="col-md-3">
                    <div className="card mb-3" style={{width: 18+'rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">{card?.title}</h5>
                            <p className="card-text">{card?.description}</p>
                            <Button className="btn-sm" variant="primary" onClick={() => handleModalData(card)}>View</Button>
                            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} cardData = {particularData} />
                            <Button className="btn btn-secondary ms-3 btn-sm">Modify</Button>
                            <Button className="btn btn-danger ms-3 btn-sm float-end">Delete </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* Note view, edit, delete end */}
        </div>
        </>
    )
}

export default Home;