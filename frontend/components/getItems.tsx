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

//get expenses by user
export const fetchUserExpenses = async (user: User) => {
  const q = query(
    collection(FIREBASE_BD, "expenses"),
    where("phoneNumber", "==", `${user.phoneNumber}`)
  );
  const querySnapshot = await getDocs(q);
  const userExpenses = querySnapshot.docs.map((doc) => doc.data());
  console.log("User Expenses: ", userExpenses);
  return userExpenses;
};

//get user by id
export const fetchUserDatas = async (user: User | any) => {
  if (!user.uid) {
    const userObject = JSON.parse(user);
    console.log("userObject", userObject);
    throw new Error("L'id' de l'utilisateur n'est pas défini.");
  }
  console.log("user: ", { user });
  const q = query(
    collection(FIREBASE_BD, "users"),
    where("phone", "==", `${user.phoneNumber}`)
  );
  const querySnapshot = await getDocs(q);
  const userDatas = querySnapshot.docs.map((doc) => doc.data());
  console.log("User datas: ", userDatas);
  return userDatas;
};
