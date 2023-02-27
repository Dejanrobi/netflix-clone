import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestoreDb } from '../../firebase';
import "./PlanScreen.css";

const PlanScreen = () => {
    const [products, setProducts] = useState([]);

    // Obtaining products where active == true

    // fetch products data
    
    useEffect(()=>{
        const fetchProducts= async()=>{

            const products = query(
                collection(firestoreDb, 'products'),
                where("active", "==", true)
            )
    
            const querySnapshot = await getDocs(products);
            
            const productsDetails={};
            

            querySnapshot.forEach(async(snap)=>{
                productsDetails[snap.id]=snap.data();

                const prices = query(
                    collection(firestoreDb, 'products', `${snap.id}`, 'prices'),
                    where('active', "==", true)
                )

                const querySnapshot = await getDocs(prices);

                querySnapshot.forEach((price)=>{
                    productsDetails[snap.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })

                


                
                
            })

            setProducts(productsDetails)
    
        }
        fetchProducts();

        

    },[])

    console.log(products);
  return (
    <div className='planScreen'>
      <p>PlanScreen</p>
    </div>
  )
}

export default PlanScreen
