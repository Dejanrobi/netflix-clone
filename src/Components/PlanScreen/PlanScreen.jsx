import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthContext';
import { firestoreDb } from '../../firebase';
import "./PlanScreen.css";
import { loadStripe } from '@stripe/stripe-js';

const PlanScreen = () => {
    const [products, setProducts] = useState([]);

    // current user
    const { currentUser } = useAuth();

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

    // console.log(products);

    // Load Checkout
    const loadCheckout =async(priceId)=>{
        try {
            // // Get a reference to the subcollection
            // const subcollectionRef = collection(firestoreDb, "customers", `${currentUser.uid}`, "checkout_sessions");

            // // Add a document to the subcollection
            // const docRef = await addDoc(subcollectionRef, {
            //     price: priceId,
            //     success_url: window.location.origin,
            //     cancel_url: window.location.origin
            // });

            // // Listen for changes to the subcollection and redirect to Stripe Checkout
            // onSnapshot(docRef, async(docSnapshot) => {
            // // Get the session id from the added document
            //     const sessionId = docSnapshot.id;

            //     const stripe = await loadStripe('pk_test_51MetEpJnzz2MgDNqpdRv9rcndwLKXT9G7aT7nBTziNa1H0maS8qUXMysXKnM1BzWPyMPEwgYVUKQ5E6xlxyf0T3r00SWqc2T3I');

            //     // Redirect to Stripe Checkout with the session id
            //     stripe.redirectToCheckout({ sessionId })
            //         .then(result => {
            //         // Handle any errors
            //         if (result.error) {
            //             console.log(result.error.message);
            //         }
            //         });
            // });

            // Get a reference to the subcollection
            const subcollectionRef = collection(firestoreDb, "customers", `${currentUser.uid}`, "checkout_sessions");

            // Add a document to the subcollection
            const docRef = await addDoc(subcollectionRef, {
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            });

            // Listen for changes to the subcollection
            onSnapshot(subcollectionRef, async(querySnapshot) => {
                // Get the added document from the query snapshot
                const addedDoc = querySnapshot.docs.find(doc => doc.id === docRef.id);
                
                // Get the data of the added document
                const { sessionId } = addedDoc.data();


                const stripe = await loadStripe('pk_test_51MetEpJnzz2MgDNqpdRv9rcndwLKXT9G7aT7nBTziNa1H0maS8qUXMysXKnM1BzWPyMPEwgYVUKQ5E6xlxyf0T3r00SWqc2T3I');

                // Redirect to Stripe Checkout with the session id
                stripe.redirectToCheckout({ sessionId })
                    .then(result => {
                    // Handle any errors
                    if (result.error) {
                        console.log(result.error.message);
                    }
                });
                
                
            });

            
        } catch (error) {
            console.log(error)
        }

        
    }
  return (
    <div className='planScreen'>
      {Object.entries(products).map(([productId, productData])=>{
        //Add some logic to check if the user's subscriptions is  active
        // console.log(productId, productData)
        return(
            <div key={productId} className="planScreen__plan">
                <div className="planScreen__info">
                    <h5>{productData.name}</h5>
                    <h6>{productData.description}</h6>
                </div>

                <button onClick={()=>loadCheckout(productData.prices.priceId)}>
                   Subscribe 
                </button>
            </div>
        )

        
      })}
    </div>
  )
}

export default PlanScreen
