import { auth, firestore } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { makeAutoObservable } from "mobx";

class AuthStore {
  user = null;
  userData = null;
  loading = true;

  constructor() {
    makeAutoObservable(this);
    this.initAuth();
  }

  initAuth = () => {
    const storedUser = localStorage.getItem('user');
    const storedUserData = localStorage.getItem('userData');

    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userData = JSON.parse(storedUserData);
      this.loading = false;
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fetchUserData(user.uid);
        } else {
          this.user = null;
          this.userData = null;
        }
        this.loading = false;
      });
    }
  }

  fetchUserData = async (uid) => {
    const userDoc = await getDoc(doc(firestore, "users", uid));
    if (userDoc.exists()) {
      this.userData = userDoc.data();
      localStorage.setItem('userData', JSON.stringify(this.userData));
    }
  }

  signup = async (email, password, name, phone, address) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        name: name,
        phone: phone,
        address: address,
        createdAt: new Date().toISOString(),
      });

      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      this.fetchUserData(user.uid);
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }

  login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      this.user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      this.fetchUserData(userCredential.user.uid);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  logout = async () => {
    try {
      await signOut(auth);
      this.user = null;
      this.userData = null;
      localStorage.removeItem('user');
      localStorage.removeItem('userData');
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  }
}

const authStore = new AuthStore();
export default authStore;