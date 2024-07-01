import { FIREBASE_BD } from "@/firebaseConfig";
import { User } from "firebase/auth";
import {
  Timestamp,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

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
    where("uid", "==", user.uid)
  );
  const querySnapshot = await getDocs(q);
  const userBudgets = querySnapshot.docs.map((doc) => doc.data());
  console.log("User Budgets getItems: ", userBudgets);
  // onSnapshot(q, (snapShop) => {
  //   const userBudgets = snapShop.docs.map((doc) => doc.data());
  //   console.log("User Budgets: ", userBudgets);
  // setBudgets(userBudgets);
  // });
  return userBudgets;
};

//get revenue by user
export const fetchUserIncomes = async (user: User) => {
  const q = query(
    collection(FIREBASE_BD, "incomes"),
    where("uid", "==", user.uid)
  );
  const querySnapshot = await getDocs(q);
  const userIncomes = querySnapshot.docs.map((doc) => doc.data());
  console.log("User Incomes getItems: ", userIncomes);
  // onSnapshot(q, (snapShop) => {
  //   const userBudgets = snapShop.docs.map((doc) => doc.data());
  //   console.log("User Budgets: ", userBudgets);
  // setBudgets(userBudgets);
  // });
  return userIncomes;
};

//get expenses by user
export const fetchUserExpenses = async (user: User) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  const q = query(
    collection(FIREBASE_BD, "expenses"),
    where("phoneNumber", "==", `${user.phoneNumber}`),
    where("timestamp", ">=", Timestamp.fromDate(startOfDay)),
    where("timestamp", "<=", Timestamp.fromDate(endOfDay))
  );
  const querySnapshot = await getDocs(q);
  const userExpenses = querySnapshot.docs.map((doc) => doc.data());
  console.log("User Expenses: ", userExpenses);
  // onSnapshot(q, (snapShot) => {
  //   const userExpenses = snapShot.docs.map((doc) => doc.data());
  //   setExpenses(userExpenses);
  //   console.log("User Expenses: ", userExpenses);
  // });
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
