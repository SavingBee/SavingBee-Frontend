import { create } from "zustand";

//상품데이터 ---- zustand 전역관리
export const products = [];


type ApiState = {
    loading: boolean;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
};

const useApiStore = create<ApiState>((set) => ({
    loading: false,
    error: null,
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
export default useApiStore;