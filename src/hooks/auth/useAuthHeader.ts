import api from "@/api/api";
import { useEffect, useState } from "react"

const useAuthHeader = () => {
    const [hasAuthHeader, setHasAuthHeader] = useState(false);

    useEffect(() => {
        const checkHeader = () => {
            const authHeader = api.defaults.headers.common["Authorization"];
            setHasAuthHeader(!!authHeader);
        };

        checkHeader();

        // optional: storage가 바뀌었을 때도 반응
        const onStorageChange = () => checkHeader();
        window.addEventListener("storage", onStorageChange);

        return () => {
            window.removeEventListener("storage", onStorageChange);
        };
    }, []);

    return hasAuthHeader;
}
export default useAuthHeader;