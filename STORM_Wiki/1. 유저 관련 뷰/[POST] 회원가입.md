## [POST] 회원가입

<br>
<br>

![signUp](https://user-images.githubusercontent.com/55133871/90430953-40690f80-e103-11ea-8cbc-6209b904369d.png)

<br>
<br>

| Method |  URL   |                    기능                     |
| :----: | :-----: | :-----------------------------------------: |
|  POST  | /user/signup | 회원가입 |



<br>
<br>



### Request Header

```
{
 "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>"
}
```


<br>
<br>




### Request Body

```javascript
{
  "user_img": FILE,
  "user_name": STRING,
  "user_email": STRING,
  "user_password": STRING,
  "user_img_flag": INT
}
```

* 데이터 타입을 적어두었습니다. 상황에 따라 맞는 값을 보내주시면 됩니다.
* user_img : 유저의 프로필 이미지
* user_name : 유저의 닉네임
* user_email : 유저의 이메일
* user_password : 유저의 비밀번호
* user_img_flag : 마이페이지 조회 시 이미지 형태에 따라 뷰를 구분하기 위해 받는 flag


<br>
<br>

### Response

<br>

<b>< Success >

```javascript
{
    "status": 200,
    "success": true,
    "message": "회원 가입 성공",
    "data": 1
}
```
- data : user_idx

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

2. 이메일 중복
```javascript
{
    "status": 600,
    "success": false,
    "message": "이미 사용중인 이메일입니다."
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