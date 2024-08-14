import { getFirestore, collection, limit , doc, getDoc,getDocs,query } from 'firebase/firestore';
import { app, db } from '../firebase';
function WordBank(){
    async function getUserData(userId) {
        try {
          // Create a reference to the user document
          const userDocRef = doc(db, "user_data", userId);
      
          // Get the document snapshot
          const docSnap = await getDoc(userDocRef);
      
          // Check if the document exists
          if (docSnap.exists) {
            // Convert document data to a JavaScript object
            const userData = docSnap.data();
            console.log("User data:", userData);
            return userData; // Return the data for further use
          } else {
            console.log("No such document!");
            return null; // Return null if document doesn't exist
          }
        } catch (error) {
          console.error("Error retrieving user data:", error);
          return null; // Return null on errors
        }
      }
      async function getFirst50UserData() {
        try {
          const usersCollectionRef = collection(db, "term_bank");
          const q = query(usersCollectionRef, limit(50));
          const querySnapshot = await getDocs(q);
          const userData = [];
      
          querySnapshot.forEach((doc) => {
            userData.push(doc.data());
          });
      
          console.log("First 50 user data:", userData);
          return userData;
        } catch (error) {
          console.error("Error retrieving user data:", error);
        }
      }
      async function getAllUserData() {
        try {
          const usersCollectionRef = collection(db, "term_bank");
          const querySnapshot = await getDocs(usersCollectionRef);
          const userData = [];
      
          querySnapshot.forEach((doc) => {
            userData.push(doc.data());
            const data = doc.data();
          });
      
          console.log("All user data:", userData);
          return userData;
        } catch (error) {
          console.error("Error retrieving user data:", error);
        }
      }
      getFirst50UserData()
      getAllUserData()
      // Example usage: Replace 'yourUserId' with the actual user ID
      getUserData('cUYUrFibdgUzzmJdCs9kYnyJTGI3').then(data => {
        if (data) {
          // Access the retrieved user data here
          console.log("Username:", data.username);
          console.log("Email:", data.email);
          // ... Use the data as needed in your application
        } else {
          console.log("Failed to retrieve user data");
        }
      });
    
    return(
        <div>
            <h1>
                Hellow world
            </h1>
        </div>
    )
}
export default WordBank;
