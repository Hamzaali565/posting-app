import { useEffect, useState } from "react";
import moment from "moment/moment"
import { initializeApp } from "firebase/app";
import './index.css'
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




const Post = () => {

    // const [comp, setComp] = useState([])
    // const [text, setText] = useState("")

    const [postText, setPostText] = useState("");
    const [comp, setComp] = useState([]);


    useEffect(() => {


        // let unsubscribe = null;
        // const getRealTimeData = async () => {
        //     const q = query(collection(db, "CoPost"));
        //     unsubscribe = onSnapshot(q, (querySnapshot) => {
        //         const posts = [];
        //         querySnapshot.forEach((doc) => {
        //             posts.push(doc.data());
        //         });
        //         setComp(posts);
        //         console.log("Posts", comp);
        //     });

        // };
        // getRealTimeData();

        // return () => {
        //     unsubscribe();
        //     console.log("cleanUp Function");
        // }

        let unsubscribe = null;
        const getRealTimeData = async () => {
            const q = query(collection(db, "CoPost"));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const posts = [];
                querySnapshot.forEach((doc) => {
                    posts.push(doc.data());
                });
                setComp(posts);
                console.log("Posts", posts);
            });

        };
        getRealTimeData();

        return () => {
            unsubscribe();
            console.log("cleanUp Function");
        }



    }, [])
    // {console.log(posts)}




    const send = async (e) => {
        // e.preventDefault();

        // try {
        //     const docRef =
        //         await addDoc(collection(db, "CoPost"), {
        //              createdOn: new Date().getTime(),
        //             text: postText,
        //             // post: "abbacus",
        //         });
        //     console.log("Document written with ID: ", docRef.id);
        // } catch (e) {
        //     console.error("Error adding document: ", e);
        // }

        e.preventDefault();



        // console.log('postText', postText);

        try {
            const docRef =
                await addDoc(collection(db, "CoPost"), {
                    profile: "https://www.unigreet.com/wp-content/uploads/2020/04/Smiley-816x1024.jpg",
                    createdOn: serverTimestamp(),
                    text: postText,
                    pic: "abbacus"
                });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div>
            <h1 className="head">Posting App</h1>
            <div className="opload">
                <div className="upload">
                    <form >
                        <div className="inpContainer">
                            <div>
                                <input
                                    className="inp1"
                                    type="text"
                                    placeholder="type caption . . ."
                                    onChange={(e) => {
                                        setPostText(e.target.value)
                                    }}
                                />
                                <input
                                    className="fail" type="file" />
                            </div>
                        </div>
                        <div className="Post">
                            <button onClick={send}>
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="post1">

                {
                    comp.map((eachPost, i) => (
                        <div className="post2" key={i}>
                            <div className="imagedate">
                                <div>
                                    <img src={eachPost?.profile} alt="" width="50" height="50" className="img1" />
                                </div>                        
                                <div className="namedate">
                                    <span className="name">Hamza Ali</span><br />
                                    <span>{
                                        moment(
                                            (eachPost?.createdOn?.seconds) ?
                                                eachPost?.createdOn?.seconds * 1000
                                                :
                                                undefined
                                        )
                                            .fromNow()
                                        // .format ('Do MMMM, h:mm a ')
                                    }</span>
                                </div>
                            </div>

                            <div className="caption">{eachPost?.text}</div>
                        </div>

                    ))
                }

            </div>


        </div>
    )
}
export default Post;