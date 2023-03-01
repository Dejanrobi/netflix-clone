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

    // Subscriptions
    const [subscription, setSubscription] = useState(null);
    
    // runnning a useEffect to set the subscription 
    // The useEffect runs whenever the user changes
    useEffect(()=>{

        // Getting all the subscriptions
        const retrieveSubscriptions= async()=>{
            const querySnapshot = await getDocs(collection(firestoreDb, "customers", `${currentUser.uid}`, "subscriptions"));

            querySnapshot.forEach( async(doc)=>{
                setSubscription({
                    role: doc.data().role,
                    current_period_end: doc.data().current_period_end.seconds,
                    current_period_start: doc.data().current_period_start.seconds,
                    

                })

            })

        }

        retrieveSubscriptions();
        
    },[currentUser.uid])

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
    // console.log(subscription);

    // Load Checkout
    const loadCheckout =async(priceId)=>{
        try {
            

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
        {
            subscription && <p>Renewal Date: {new Date(subscription?.current_period_end*1000).toLocaleDateString()} </p>
        }
        
      {Object.entries(products).map(([productId, productData])=>{
        //Add some logic to check if the user's subscriptions is  active
        // console.log(productId, productData)

        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
        return(
            <div key={productId} className={`${isCurrentPackage && 'planScreen__plan--disabled'} planScreen__plan`}>
                <div className="planScreen__info">
                    <h5>{productData.name}</h5>
                    <h6>{productData.description}</h6>
                </div>

                <button onClick={()=> !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                   {isCurrentPackage?'Current Package': "Subscribe"}
                </button>
            </div>
        )

        
      })}
    </div>
  )
}

export default PlanScreen
