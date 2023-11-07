import React, { useEffect, useState } from 'react'
import {omit} from 'lodash'

const App = () => {

  const [state, setState] = useState({ id: "" })
  const [data, setData] = useState(JSON?.parse(localStorage?.getItem('user')) || [])
  // var user = JSON.parse(localStorage.getItem('user')) || [];
  const [isEdit, setIsEdit] = useState(false)
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(!isEdit)
    state.id = new Date().getTime().toString();
  }, [state])

  const handlechange = (e) => {
    const { name, value } = e?.target;
    validate(e,name,value);
    setState({ ...state, [name]: value })
  }

  console.log(errors);
  const deleteFunction = (id) => {
    var user = data?.filter((state) => state?.id !== id)
    localStorage.setItem('user', JSON.stringify(user));
    setData(JSON?.parse(localStorage?.getItem('user')))
  }

  const editFunction = (id) => {
    setIsEdit(true)
    const index = data?.findIndex((sb) => sb?.id == id)
    const selectdata = data?.find((sb) => sb?.id == id)
    setState(selectdata)
    // newDataa[index]=state;
    // console.log([...newDataa])

    // localStorage.setItem('user',JSON.stringify(user));
    // setData(JSON?.parse(localStorage?.getItem('user')))
  }

  const finalSubmit = () => {
    const newData = data;
    newData.push(state);
    // setData(newData);
    // console.log(newData);
    localStorage.setItem('user', JSON.stringify(newData));
    setData(JSON?.parse(localStorage?.getItem('user')))
    setState({})
    // setData({...data,...state})
    // localStorage.setItem('user',JSON.stringify(data));
  }

  const updateFunction = () => {
    let newDataa = data;
    const index = data?.findIndex((sb) => sb?.id == state?.id)
    newDataa[index] = state;

    localStorage.setItem('user', JSON.stringify([...newDataa]));
    setData(JSON?.parse(localStorage?.getItem('user')))
    setIsEdit(false)
    setState({})
  }

  const validate = (event, name, value) => {
    //A function to validate each input values

    switch (name) {
        case 'firstname':
            if(value.length <= 3){
                setErrors({
                    ...errors,
                    firstname:'Firstname atleast have 3 letters'
                })
            }else{
           //omit function removes/omits the value from given object and returns a new object
                let newObj = omit(errors, "firstname");
                setErrors(newObj);
            }
            break;

            case 'lastname':
              if(value.length <= 3){
                  setErrors({
                      ...errors,
                      lastname:'LastName atleast have 3 letters'
                  })
              }else{
             //omit function removes/omits the value from given object and returns a new object
                  let newObj = omit(errors, "lastname");
                  setErrors(newObj);
              }
              break;
              
              case 'phone':
              if(value.length <= 10 && value?.length >=12){
                  setErrors({
                      ...errors,
                      phone:'Phone Number Between 10 to 12'
                  })
              }else{
             //omit function removes/omits the value from given object and returns a new object
                  let newObj = omit(errors, "phone");
                  setErrors(newObj);
              }
              break;
    
        case 'email':
            if(
                !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
            ){
                setErrors({
                    ...errors,
                    email:'Enter a valid email address'
                })
            }else{

                let newObj = omit(errors, "email");
                setErrors(newObj);
                
            }
        break;
        
        default:
            break;
    }
}


  return (
    <div className='text-center mt-5'>

      <form>

        <label> Firstname </label>&nbsp;
        <input type="text" name="firstname" value={state?.firstname || ""} required onChange={handlechange} /> <br /> <br />

        <label> Lastname: </label>&nbsp;
        <input type="text" name="lastname" value={state?.lastname || ""} required onChange={handlechange} /> <br /> <br />

        <label> Email </label>&nbsp;
        <input type="email" name="email" value={state?.email || ""} required onChange={handlechange} /> <br /> <br />

        <label> Phone No </label>&nbsp;
        <input type="number" name="phone" value={state?.phone || ""} required onChange={handlechange} /> <br /> <br />

        <label> DOB </label>&nbsp;
        <input type="date" name="dob" value={state?.dob || ""} required onChange={handlechange} /> <br /> <br />

        <input type="button"
          value={isEdit ? "Update" : "Submit"}
          onClick={() => {
            if (isEdit)
              updateFunction()
            else
              finalSubmit()
          }} />
      </form>

      {data?.length &&
        <div className='text-center'>
          <table className='text-center'>
            <tr>
              <td>firstname</td>
              <td>lastname</td>
              <td>email</td>
              <td>phone</td>
              <td>DOB</td>
              <td>Opertaion</td>
              <td>Opertaion</td>
            </tr>
            {
              data?.map((state) =>
                <tr>
                  <td>{state?.firstname}</td>
                  <td>{state?.lastname}</td>
                  <td>{state?.lastname}</td>
                  <td>{state?.email}</td>
                  <td>{state?.phone}</td>
                  <td>{state?.dob}</td>
                  <td><button onClick={() => editFunction(state?.id)}>Edit</button></td>
                  <td><button onClick={() => deleteFunction(state?.id)}>Delete</button></td>
                </tr>)
            }
          </table>
        </div>
      }

    </div>
  )
}

export default App