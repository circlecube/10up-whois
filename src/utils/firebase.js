import firebase from 'firebase';

var firebaseConfig = {
	apiKey: "AIzaSyCFNG-pU5Gg76H7ssYPKGSqBo_4aP-56WU",
	authDomain: "upwhois.firebaseapp.com",
	databaseURL: "https://upwhois.firebaseio.com",
	projectId: "upwhois",
	storageBucket: "upwhois.appspot.com",
	messagingSenderId: "406850437886",
	appId: "1:406850437886:web:5d83e5e5089899849e5baf",
	measurementId: "G-8M7VBFVV1L"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;