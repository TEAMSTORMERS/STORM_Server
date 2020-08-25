## [POST] 비밀번호 확인

<br>
<br>

![withdrawal](https://user-images.githubusercontent.com/55133871/90432984-149b5900-e106-11ea-96e1-80522ba6ff75.png)

<br>
<br>

| Method |  URL   |                    기능                     |
| :----: | :-----: | :-----------------------------------------: |
|  POST  | /user/checkPassword | 회원탈퇴 전 비밀번호 확인 |



<br>
<br>



### Request Header

```
{
 "Content-Type": "application/json"
}
```


<br>
<br>




### Request Body

```javascript
{
    "user_idx" : INT,
    "user_password" : STRING
}
```

* 데이터 타입을 적어두었습니다. 상황에 따라 맞는 값을 보내주시면 됩니다.
* user_idx : 유저의 인덱스
* user_password : 유저의 비밀번호

<br>
<br>

### Response

<br>

<b>< Success >

```javascript
{
    "status": 200,
    "success": true,
    "message": "비밀번호가 일치합니다."
}
```


**ㅤ**

<br>

<b> < Fail >

1. 데이터 누락

```javascript
{
  "status": 400,
  "success": false,
  "message": "필요한 값이 없습니다."
}
```

2. 인증 실패
```javascript
{
    "status": 400,
    "success": false,
    "message": "비밀번호가 맞지 않습니다."
}
```

3. DB 오류

```javascript
{
  "status": 600,
  "success": false,
  "message": "DB 오류"
}
```

4. 서버 에러

```javascript
{
  "status": 500,
  "success": false,
  "message": "서버 에러"
}
```