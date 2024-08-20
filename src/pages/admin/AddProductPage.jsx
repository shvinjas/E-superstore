import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { fireDB } from "../../firebase/FireBaseConfig";






const categoryList = [
  {
    name: "fashion",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "mobile",
  },
  {
    name: "laptop",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "books",
  },
];
const AddProductPage = () => {

  const context=useContext(myContext);
  const {loading,setLoading}=context

  //navigate
  const navigate = useNavigate();


//add product state

const [product,setProduct] = useState({
title:"",
price:"",
productImageUrl:"",
category:"",
description:"",
quantity:1,
time:Timestamp.now(),
date: new Date().toLocaleString("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
}),
});


const addProductFunction=async()=>{
//validation

if (product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "") {
  return toast.error("all fields are required")
}

setLoading(true);
try{

  //create reference
  const productRef=collection(fireDB,"products")


  //add user detail
  await addDoc(productRef,product)
  toast.success("Add product successfully")
  navigate("/admin-dashboard")
  setLoading(false)
}catch(error){
  console.log(error);
  setLoading(false)
  toast.error("Add product failed");
}





}

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {/* Login Form  */}
        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500 ">
              Add Product
            </h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e)=>setProduct({...product,title:e.target.value})}
              placeholder="Product Title"
              className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="number"
              onChange={(e)=>setProduct({...product,price:e.target.value})}
              value={product.price}
              placeholder="Product Price"
              className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>

          {/* Input Three  */}
          <div className="mb-3">
            <input
              type="text"
              value={product.productImageUrl}
              onChange={(e)=>setProduct({...product,productImageUrl:e.target.value})}
              placeholder="Product Image Url"
              className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>

          {/* Input Four  */}

{/* //Code with Explicit Return
//In JavaScript, when using the curly braces {} in an arrow function, you need to explicitly return the JSX. */}

          {/* <div className="mb-3">
            <select className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none">
              {categoryList.map((value, index) => {
                return (
                  <option className="first-letter:uppercase" key={index}>
                    {value.name}
                  </option>
                );
              })}
            </select>
          </div> */}


{/* Code with Implicit Return */}
{/* If you use parentheses (), the return is implicit. Here's how you can correct your code: */}

          <div className="mb-3">
            <select
             value={product.category}
             onChange={(e)=>setProduct({...product,category:e.target.value})} 
            className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none">
              {categoryList.map((value, index) => (
                <option className="first-letter:uppercase" key={index}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>



          {/* Input Five  */}
          <div className="mb-3">
            <textarea
              name="description"
              value={product.description}
              onChange={(e)=>setProduct({...product,description:e.target.value})}
              placeholder="Product Description"
              rows="5"
              className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 "
            ></textarea>
          </div>

          {/* Add Product Button  */}
          <div className="mb-3">
            <button
              type="button"
              onClick={addProductFunction}
              className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
