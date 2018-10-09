import firebase from 'react-native-firebase';
// import rea
let user = null;
let ref = null;

const setUser = function (userObj) {
	user = userObj;
	setToDoRef();
};

const getFireStoreToDORef = function () {
	return ref;
};

var setToDoRef = function () {
	if (user && user.uid) {
		const string = `todo-${user.uid}-${user.displayName}`;
		ref = firebase.firestore().collection(string);
		return;
	}
	ref = null;
};

const getUser = function () {
	return user;
};

export { setUser, getUser, getFireStoreToDORef };
