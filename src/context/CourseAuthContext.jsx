import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

const CourseAuthContext = createContext();

export const useCourseAuth = () => useContext(CourseAuthContext);

export const CourseAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Listen to Firestore document for this user to get purchase status and progress
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setHasPurchased(data.hasPurchasedCourse || false);
            setCompletedLessons(data.completedLessons || []);
          } else {
            // Document might not exist yet if they just signed up via Google, we create it in signup or unlock
            setHasPurchased(false);
            setCompletedLessons([]);
            setDoc(userDocRef, { hasPurchasedCourse: false, completedLessons: [] }, { merge: true });
          }
          setLoading(false);
        });
        
        return () => unsubscribeSnapshot();
      } else {
        setHasPurchased(false);
        setCompletedLessons([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Create user document
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      hasPurchasedCourse: false,
      completedLessons: [],
      createdAt: new Date()
    });
    return userCredential;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // Ensure document exists
    const userDocRef = doc(db, 'users', result.user.uid);
    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists()) {
      await setDoc(userDocRef, {
        email: result.user.email,
        hasPurchasedCourse: false,
        completedLessons: [],
        createdAt: new Date()
      });
    }
    return result;
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const unlockCourse = async () => {
    if (!currentUser) throw new Error("Must be logged in to unlock course.");
    setHasPurchased(true); // Optimistic UI update
    const userDocRef = doc(db, 'users', currentUser.uid);
    await setDoc(userDocRef, { hasPurchasedCourse: true }, { merge: true });
  };

  const markLessonComplete = async (lessonId) => {
    if (!currentUser) return;
    if (completedLessons.includes(lessonId)) return; // Already completed
    
    // Optimistic UI update
    setCompletedLessons(prev => [...prev, lessonId]);
    
    // Update Firestore
    const userDocRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const currentCompleted = docSnap.data().completedLessons || [];
      if (!currentCompleted.includes(lessonId)) {
        await setDoc(userDocRef, { completedLessons: [...currentCompleted, lessonId] }, { merge: true });
      }
    }
  };

  const value = {
    currentUser,
    hasPurchased,
    completedLessons,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    unlockCourse,
    markLessonComplete
  };

  return (
    <CourseAuthContext.Provider value={value}>
      {!loading && children}
    </CourseAuthContext.Provider>
  );
};

