import { FIREBASE_BD } from "@/firebaseConfig";
import { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

interface BudgetData {
  montant: number;
  objectif?: string;
  startDate: Date;
  endDate: Date;
  uid: string;
}

//get budget by user
export const fetchUserBudgets = async (user: User) => {
  const q = query(
    collection(FIREBASE_BD, "budgets"),
    where("iud", "==", user.uid)
  );
  const querySnapshot = await getDocs(q);
  const userBudgets = querySnapshot.docs.map((doc) => doc.data());
  console.log("User Budgets: ", userBudgets);
  return userBudgets;
};

//get user by id
export const fetchUserDatas = async (user: User) => {
  const q = query(
    collection(FIREBASE_BD, "users"),
    where("iud", "==", user.uid)
  );
  const querySnapshot = await getDocs(q);
  const userDatas = querySnapshot.docs.map((doc) => doc.data());
  console.log("User datas: ", userDatas);
  return userDatas;
};
