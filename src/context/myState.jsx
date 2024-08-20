import React, { useEffect } from "react";
import myContext from "./myContext";
import { useState } from "react";
import { fireDB } from "../firebase/FireBaseConfig";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import toast from "react-hot-toast";

function MyState({ children }) {
  
  const [loading, setLoading] = useState(false);

  //--------------------------------------------------------------------------------------------------------
  //belongs to get product
  const [getAllProduct, setGetAllProduct] = useState([]);
  //console.log(getAllProduct);
  /**========================================================================
    //  * Get All Product Function
  *========================================================================**/

  const getAllProductFunction = async () => {
    setLoading(true);

    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllProduct(productArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //2nd part

      // Order State 
      const [getAllOrder, setGetAllOrder] = useState([]);


      /**================GET ALL ORDER FUNCTION========================================================
       *========================================================================**/
  
      const getAllOrderFunction = async () => {
          setLoading(true);
          try {
              const q = query(
                  collection(fireDB, "order"),
                  orderBy('time')
              );
              const data = onSnapshot(q, (QuerySnapshot) => {
                  let orderArray = [];
                  QuerySnapshot.forEach((doc) => {
                      orderArray.push({ ...doc.data(), id: doc.id });
                  });
                  setGetAllOrder(orderArray);
                  setLoading(false);
              });
              return () => data;
          } catch (error) {
              console.log(error);
              setLoading(false);
          }
      }

// console.log(getAllOrder);


    // Delete oder Function
    const deleteProduct = async (id) => {
      setLoading(true)
      try {
          await deleteDoc(doc(fireDB, 'order', id))
          toast.success('Order Deleted successfully')
          getAllOrderFunction();
          setLoading(false)
      } catch (error) {
          console.log(error)
          setLoading(false)
      }
  }


  // user State 
  const [getAllUser, setGetAllUser] = useState([]);


  /**================== Get All User Function ======================================================
   *========================================================================**/

  const getAllUserFunction = async () => {
      setLoading(true);
      try {
          const q = query(
              collection(fireDB, "user"),
              orderBy('time')
          );
          const data = onSnapshot(q, (QuerySnapshot) => {
              let userArray = [];
              QuerySnapshot.forEach((doc) => {
                  userArray.push({ ...doc.data(), id: doc.id });
              });
              setGetAllUser(userArray);
              setLoading(false);
          });
          return () => data;
      } catch (error) {
          console.log(error);
          setLoading(false);
      }
  }

  useEffect(() => {
    getAllProductFunction();
    getAllOrderFunction();
    getAllUserFunction();
  }, []);

  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <myContext.Provider value={{ loading, setLoading, getAllProduct,getAllProductFunction,getAllOrder,deleteProduct,getAllUser }}>
      {children}
    </myContext.Provider>
  );
}

export default MyState;
