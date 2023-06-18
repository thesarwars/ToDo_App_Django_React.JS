import { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Header from './Header';
import { useParams } from 'react-router-dom';

function EditNote(){
    const [EditNote, setEditNote] = useState({
        title: '',
        description: '',
    })

    const {todo_id} = useParams()

    const handleChange =(event)=>{
        setEditNote({
            ...EditNote,
            [event.target.name]:event.target.value
        })
    }

    const handleSubmit = () =>{
        const _formData = new FormData();
        _formData.append('title', EditNote.title);
        _formData.append('description', EditNote.description);

        try{
            axios.put('http://127.0.0.1:8000/apiview/modify/'+todo_id, _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response)=>{
                if(response.status===200||response.status===201){
                    console.log('Data Save Successfully')
                    // setModifyData(false)
                    // fetchData();
                    window.location.href = 'http://127.0.0.1:8000/'

                }
            })
        }catch(error){
            console.log(error)
        }
    }


    
    useEffect(() => {
        try{
            axios.get('http://127.0.0.1:8000/apiview/modify/'+todo_id)
            .then((response) => {
                setEditNote({
                    title: response.data.title,
                    description: response.data.description,
                })
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    return(
        <>
        <Header />
            <div className="row mt-3 mb-1 ms-3">
                <div className="col-5">
                    <div className="card">
                        <h5 className="card-header">Modify Quiz</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Quiz Title</label>
                                    <input id="title" value={EditNote.title} onChange={handleChange} name="title" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label" htmlFor="email">Details</label>
                                    <textarea id="description" value={EditNote.description} onChange={handleChange} name="description" className="form-control"></textarea>
                                </div>
                                <button type="button" onClick={handleSubmit} className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditNote;