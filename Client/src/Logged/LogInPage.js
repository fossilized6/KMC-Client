// router, cookie, async && await
import React, { useState, useReducer } from 'react';
import '../App.css';
// import cookie
import cookie from 'react-cookie';
// import redux
// - connect 함수를 통해 redux와 연결 할 수 있다.
import { connect } from 'react-redux';
// - 서정한 props들을 import 한다.
//? import {...} from "..."

//! 1. User가 정보를 입력하고 서버에 보낸다.(request)
//* 2. 서버에서 DB에 있는 사용자의 정보를 확인한다.
//* 3. 서버에서 회원 정보 세션을 생성해 세션저장소에 보낸다.
//* 4. 세션 저장소에서 세션ID를 발급 받아 서버에 가져온다.
// // ! 5. 서버가 세션ID를 사용자에게 준다.(응답)
// 세션ID를 받아오면 프론트 측에서 "쿠키(cookie)"에 저장을 해야한다.
// cookie(access token & refresh token), redux store를 사용한다.
//! 6. 데이터(+쿠키)를 서버에 요청한다. (token)
//* 7. 서버에서 DB에 쿠키를 검증한다.
//* 8. 세션 저장소에서 유저정보(세션)을 획득한다.
//! 9. 서버에서 유저에게 응답(+요청데이터)해준다.

// - 로그아웃 경우 refresh token를 서버에 삭제 요청을 한다.
// - 서버에서 refresh token이 제대로 삭제 되었다는 status200 응답을 받으면,
//   cookie에 있는 access token & refresh token을 삭제해준다.

// 라우터로 전달받은 prameter 설정
function LogInPage({ router, token }) {
  // 값을 세팅하는 함수
  // 서버에 보내줄 정보
  // Button의 상태를 결정할 함수 >> token이 있다면, 유저의 정보를 가져온다.

  // 로그인 입력창,패스워드 입력창, 로그인 버튼, 처음 오셨나요 >> 회원가입 페이지로 이동
  // 로그인 시, 로그아웃 버튼
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // 로그인 라우터 생성
  // 요청된 이메일이 데이터베이스에 있다면, 비밀번호가 맞는지 확인한다.
  // 비밀번호까지 맞자면 토큰을 생성하기

  const onSubmit = (event) => {
    // 1. event를 인자로 받아와서
    // 2. 입력한 정보가 리셋이 되는 것을 막아준다. >> event.preventDefault();
    event.preventDefault();
    // email을 입력하지 않았다면 에러메세지
    if (email.length == 0) {
      console.log(setEmailError);
      return setEmailError(true);
      // 비밀번호가 8자 이하거나 입력되지 않았다면 에러메세지
    } else if (password.length <= 0 || password.length < 8) {
      console.log(setPasswordError);
      return setPasswordError(true);
      // 그 외에 제대로 입력 됬다면 성공
    } else {
      alert('로그인에 성공하셧습니다.');
      console.log(email, password);
    }
  };

  return (
    <center>
      <form onSubmit={onSubmit}>
        <h1>로그인</h1>
        <table bgcolor="#424242" cellspacing="5">
          <tr>
            <td>E-Mail</td>
            <td>
              <input
                type="email"
                placeholder="Your E-Mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {emailError && (
                <div style={{ color: 'red' }}>이메일을 입력하세요</div>
              )}
            </td>
          </tr>

          <tr>
            <td>Password</td>
            <td>
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {passwordError && (
                <div style={{ color: 'red' }}>비밀번호를 확인하세요.</div>
              )}
            </td>
          </tr>
        </table>
        <button type="submit">로그인</button>
      </form>
    </center>
  );
}

export default LogInPage;
