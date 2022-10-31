
import { useEffect, useState } from "react";
import moment from "moment/moment"
import { initializeApp } from "firebase/app";
// import './index.css'
import {
    getFirestore, collection, addDoc, orderBy,
    getDocs, doc, onSnapshot, query, serverTimestamp
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCuFtjuEJLeQSmI7HSonBzve3Pq1NxIkF4",
    authDomain: "completepost-abd5b.firebaseapp.com",
    projectId: "completepost-abd5b",
    storageBucket: "completepost-abd5b.appspot.com",
    messagingSenderId: "1087595352198",
    appId: "1:1087595352198:web:4de7331a64f3dc66e88107",
    // measurementId: "G-BBLPP702K7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const Dombo = () => {
    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
       
let unsubscribe = null;
        const getRealTimeData = async () =>{
            const q = query(collection(db, "posts"));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
              const posts = [];
              querySnapshot.forEach((doc) => {
                  posts.push(doc.data());
              });
              setPosts(posts);
              console.log("Posts", posts);
            });   
   
        };
        getRealTimeData();

        return () =>{
            unsubscribe();
            console.log("cleanUp Function");
        }
    }, [])
    // {console.log(posts)}

    const savePost = async (e) => {
        e.preventDefault();



        console.log('postText', postText);

        try {
            const docRef =
                await addDoc(collection(db, "posts"), {
                    text: postText,
                    createdOn: new Date().getTime(),
                });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    return (
        <div >
            <h1>Parag. Post</h1>
            <div className="Container">
                <div className="inBut">
                    <form onSubmit={savePost}>
                        <textarea type="text"
                            placeholder=
                            "What is in your mind ..."
                            onChange={(e) => {
                                setPostText(e.target.value)
                            }}

                        />
                        <br />
                        <div className="butt">
                            <button type="submit">Post</button>
                        </div>
                    </form>
                </div>
                <div className="allPosts">

                    {posts.map((eachpost, i) => (
                        <div key={i} className="MainPost"><div className="post">
                            <h3>{eachpost.text}</h3>
                            <p>{eachpost.createdOn}</p>
                            <div className="dit">
                                <button>Delete</button>
                                <button>Edit</button>
                            </div>
                        </div></div>
                    ))}


                </div>

            </div>
        </div>
    )
}
export default Dombo;