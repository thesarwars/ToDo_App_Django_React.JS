import { useEffect, useState } from "react";
import Header from "./Header";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import { Link } from "react-router-dom";
import CreateModal from "./CreateModal";

function Home(){
    const [data,setData] = useState([])
    const [modalShow,setModalShow] = useState(false)
    const [particularData,setParticularData] = useState({})
    const [createModal,setCreateModal]=useState(false)
    const handleModalData = (cardData)=>{
        setParticularData(cardData)
        setModalShow(true)
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
        <div className="row mt-p1">
        <div class="card col-md-3" onClick={() => setCreateModal(true)}>
  <div class="card-body">
  <button type="button" class="btn btn-primary">Create</button>
  </div>
</div>
<CreateModal
show={createModal}
onHide={() => setCreateModal(false)}/>
            {data.map((card,index) => <div key={index} className="col-md-3">
                <div className="card" style={{width: 18+'rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">{card?.title}</h5>
                        <p className="card-text">{card?.description}</p>
                        <Link className="card-link">Card link</Link>
                        <Link className="card-link">Another link</Link>
                        <Button variant="primary" onClick={() => handleModalData(card)}>
        View
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        cardData = {particularData}
      />
                    </div>
                </div>
            </div>)}
        </div>
        </>
    )
}

export default Home;