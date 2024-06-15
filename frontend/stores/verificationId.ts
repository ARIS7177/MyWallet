import { create } from "zustand";

type IVerificationIdState = {
  verificationId: any;
  setVerificationId: (VerificationId: any) => void;
};
const useVerificationId = create<IVerificationIdState>((set) => ({
  verificationId: null,
  setVerificationId: (verificationId) => set(() => ({ verificationId })),
}));

export { useVerificationId };
