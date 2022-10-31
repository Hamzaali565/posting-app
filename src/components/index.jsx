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
    measurementId: "G-BBLPP702K7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);




const Post = () => {

    const [comp, setComp] = useState([])
    const [text, setText] = useState("")

    useEffect(() => {

        const callData = async () => {
            const querySnapshot = await getDocs(collection(db, "CoPost"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => `, doc.data());
                setComp([...comp, doc.data()])
                //  another way
                // setComp((prev) => {
                //     let newArray = [...prev, doc.data()];
                //     return newArray;
                // });

            });
        }
        // callData();

        let unsubscribe = null;
        const realTime = async () => {
            const q = query(collection(db, "CoPost"), orderBy("createdOn", "desc"));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const CoPost = [];
                querySnapshot.forEach((doc) => {
                    CoPost.push(doc.data());
                });
                setComp(CoPost)
                console.log("send", comp);
            });
        };
        realTime();
        return () => {
            unsubscribe();
        }
    }, [])




    const send = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "CoPost"), {
                // profile: "https://www.unigreet.com/wp-content/uploads/2020/04/Smiley-816x1024.jpg",
                // createdOn: serverTimestamp(),
                Text: text,
                // post: "abbacus",
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
                                        setText(e.target.value)
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
            <div>


            {comp.map((eachvalue, i) => {
                <div key={i}>

                    {/* <div><img src={eachvalue?.profile} alt="" /> <span>{
                        moment(
                            (eachvalue?.createdOn?.seconds) ?
                                eachvalue?.createdOn?.seconds * 1000
                                :
                                undefined
                        )
                            .fromNow()
                        // .format ('Do MMMM, h:mm a ')
                    }</span></div> */}
                    <div>
                        {eachvalue?.Text}
                    </div>
                    {/* <div>
                        {eachvalue?.post}
                    </div> */}

                </div>



            })}
</div>


        </div>
    )
};
export default Post;