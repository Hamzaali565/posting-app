import { useEffect, useState } from "react";
import moment from "moment/moment"
import { initializeApp } from "firebase/app";
import './index.css'
import axios from "axios";
import {
    getFirestore, collection, addDoc, orderBy,
    getDocs, doc, onSnapshot, query,
    serverTimestamp, deleteDoc, updateDoc
} from "firebase/firestore";
// import { editableInputTypes } from "@testing-library/user-event/dist/utils";


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




const Home = () => {

    // const [comp, setComp] = useState([])
    // const [text, setText] = useState("")

    const [postText, setPostText] = useState("");
    const [comp, setComp] = useState([]);
    const [pic, setPic] = useState(null);
    const [isEditing, setEditing] = useState(null);
    const [isEditingText, setEditingText] = useState("");


    const send = async (e) => {

        const cloudinaryData = new FormData();
        cloudinaryData.append("file", pic);
        cloudinaryData.append("upload_preset", "postingApp");
        cloudinaryData.append("cloud_name", "dozqa9pai");
        // console.log(cloudinaryData);
        axios.post(`https://api.cloudinary.com/v1_1/dozqa9pai/image/upload`,
            cloudinaryData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }

            })
            .then(async res => {

                console.log("from then", res.data);
                try {
                    const docRef =
                        await addDoc(collection(db, "CoPost"), {
                            profile: "https://www.unigreet.com/wp-content/uploads/2020/04/Smiley-816x1024.jpg",
                            createdOn: serverTimestamp(),
                            text: postText,
                            pic: res?.data?.url
                        });
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })
            .catch(err => {
                console.log("from catch", err)
            })

        e.preventDefault();

    }

    useEffect(() => {

        let unsubscribe = null;
        const getRealTimeData = async () => {
            const q = query(collection(db, "CoPost"), orderBy("createdOn", "desc"));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const posts = [];
                querySnapshot.forEach((doc) => {
                    // posts.push(doc.data());
                    let data = doc.data();
                    data.id = doc.id;
                    posts.push(data);
                });
                setComp(posts);
                // console.log("Posts", posts);
            });

        };
        getRealTimeData();

        return () => {
            unsubscribe();
            console.log("cleanUp Function");
        }



    }, [])
    // {console.log(posts)}

    const deletePost = async (takeId) => {
        await deleteDoc(doc(db, "CoPost", takeId));

    }
    // const updatePost2 = async (e) => {
    //     e.preventDefault();
    //     await updateDoc((db, "CoPost", isEditing), {
    //         text: isEditingText
    //     })
    //     setEditing(null)
    //     setEditingText("")
    // }

    const updatePost = async (e) => {
        e.preventDefault();

        // Set the "capital" field of the city 'DC'
        await updateDoc(doc(db, "CoPost", isEditing), {
            text: isEditingText
        });
        setEditing(null);
        setEditingText("");

    };

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
                                    className="fail" type="file"
                                    onChange={(e) => {
                                        setPic(e.currentTarget.files[0])
                                    }}
                                />
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
            <div>


                {
                    comp.map((eachPost, i) => (
                        <div className="post1" key={i}>
                            <div className="post2">
                                <div className="imagedate">

                                    <div>
                                        <img src={eachPost?.profile}
                                         alt="" width="50" height="50"
                                          className="img1" />
                                    </div>
                                    <div className="namedate">
                                        <span className="name">
                                            Hamza Ali</span>
                                            <br />
                                        <span>{
                                            moment(
                                                (eachPost?.createdOn?.seconds) ?
                                                    eachPost?.createdOn?.seconds 
                                                    * 1000
                                                    :
                                                    undefined
                                            )
                                                .fromNow()
                                            // .format ('Do MMMM, h:mm a ')
                                        }</span>
                                    </div>
                                    <div className="twoButtons">
                                        <button
                                            onClick={() => {
                                                setEditing(eachPost?.id);
                                                setEditingText(eachPost?.text);
                                            }}
                                        >Edit</button>
                                        <button
                                            onClick={() => {
                                                deletePost(eachPost.id)
                                            }}
                                        >Delete</button>

                                    </div>
                                </div>

                                <div className="caption">
                                    {(eachPost.id === isEditing) ?
                                       <div className="update"> <form onSubmit={updatePost}>
                                            <input type="text"
                                                value={isEditingText}
                                                placeholder="Enter Your New Text"
                                                onChange={(e) => {
                                                    setEditingText(e.target.value)
                                                }}
                                            />
                                            <button type="submit">Update</button>
                                        </form>
                                        </div>
                                        :
                                        eachPost.text
                                    }</div>
                                <div className="pic"><img src={eachPost?.pic} alt="" /></div>
                                <div className="threePair">

                                    <div>Like</div>
                                    <div>Comment</div>
                                    <div>Share</div>

                                </div>
                            </div>

                        </div>
                    ))
                }


            </div>
        </div>
    )
}
export default Home;