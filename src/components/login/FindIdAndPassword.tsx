import { Link } from "react-router-dom";

const FindIdAndPassword = () => {
    return (
        <ul className="flex items-center justify-center gap-1 mt-4 text-sm text-black6">
            <li><Link to="/find_id">아이디 찾기</Link></li>
            <li>ㆍ</li>
            <li><Link to="/find/password">비밀번호 찾기</Link></li>
        </ul>
    )
}
export default FindIdAndPassword;