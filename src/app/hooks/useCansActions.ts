import { useCallback } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { CanType } from "@/types/can";
import { db, storage } from "../../../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import imageCompression from "browser-image-compression";

export const useCanActions = () => {
  const { user } = useAuth();

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const getCanCollection = useCallback(async (): Promise<CanType[]> => {
    try {
      if (!user) return [];

      // Tenta pegar do sessionStorage primeiro
      const savedCollection = sessionStorage.getItem(`canList_${user.uid}`);
      if (savedCollection) {
        console.log("Pegou do storage");
        return JSON.parse(savedCollection);
      }

      console.log("Pegou do firebase");

      const canCollectionRef = collection(db, user.uid);
      const data = await getDocs(canCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        name: doc.data().name,
        year: doc.data().year,
        month: doc.data().month,
        type: doc.data().type,
        imgurl: doc.data().imgurl,
        userId: doc.data().userId,
        id: doc.id,
      }));

      const response = await fetch(filteredData[0].imgurl);
      console.log(response);
      // Salva no sessionStorage para evitar chamadas repetidas
      sessionStorage.setItem(
        `canList_${user.uid}`,
        JSON.stringify(filteredData)
      );

      return filteredData;
    } catch (err) {
      console.error("Error fetching can collection", err);
      return [];
    }
  }, [user]);

  const addCan = async (newCan: CanType, file: File) => {

    const fileRef = ref(storage, `${user?.uid}/${newCan.id}`);

    try {
      const compressedFile = await imageCompression(file, options);
      await uploadBytes(fileRef, compressedFile);
      const imgUrl = await getDownloadURL(fileRef);
      newCan.imgurl = imgUrl;
      newCan.userId = user?.uid || "";
      if (!user?.uid) {
        throw new Error("User UID is undefined");
      }
      const cansCollectionRef = collection(db, user.uid);
      const docRef = await addDoc(cansCollectionRef, newCan);
      newCan.id = docRef.id;
      return newCan;
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCan = async (id: string, url: string) => {
    
    if (!user) return;
    const canDoc = doc(db, user?.uid, id);
    try {
      console.log("Deletar ID no firebase:", canDoc);
      await deleteDoc(canDoc);
      const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/`;
      const filePath = decodeURIComponent(
        url.replace(baseUrl, "").split("?")[0]
      );
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getCanCollection,
    addCan,
    deleteCan,
  };
};
