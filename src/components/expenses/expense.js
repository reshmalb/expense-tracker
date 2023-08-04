import React, { useState } from 'react'
import './Expense.css'
import axios from 'axios';

const Expense = () => {

const [amount,setAmount]=useState();
const [description,setDescription]=useState('');
const [category,setCategory]=useState('')



const handlelAmountChange=(e)=>{
    setAmount(e.target.value)
}

const handleDescriptionChange=(e)=>{
    setDescription(e.target.value)
}


const handleCategoryChange=(e)=>{
    setCategory(e.target.value)

}
const handleAddExpense= async(e)=>{
    e.preventDefault();

    try{
          const response=  await axios.post('/expense/storedata',{
            amount:amount,
            description:description,
            category:category
          })

          console.log("expense response",response)

    }
    catch(error){
        console.log(error);
    }

}


  return (
    <div className='expense-conatiner'>
        <form className='expense-form' onSubmit={handleAddExpense}>
            <div className='expense-items'>
                <label>Choose Amount:</label> 
                <input type="number" required value={amount} onChange={handlelAmountChange}></input>
            </div>
             <div className='expense-items'>
                <label>Choose Description:</label>
                <input type="text" required value={description} onChange={handleDescriptionChange} ></input>
            </div>
             <div className='expense-items'>
                <label>Choose Category:</label>
                <select value={category} onChange={handleCategoryChange}>
                    <option> Food</option>
                    <option> Salary</option>
                    <option> Petrol</option>
                </select>
            </div>
             <div className='expense-items'>     
                <button type="submit">Add</button>
            </div>
        </form>      
    </div>
  )
}

export default Expense
