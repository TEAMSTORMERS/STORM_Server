## [POST] 로그인

<br>
<br>

![login](https://user-images.githubusercontent.com/55133871/90432121-0c8ee980-e105-11ea-84f6-6678eb5a4151.png)

<br>
<br>

| Method |  URL   |                    기능                     |
| :----: | :-----: | :-----------------------------------------: |
|  POST  | /user/signin | 로그인 |



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
    "user_email" : STRING
    "user_password" : STRING
}
```

* 데이터 타입을 적어두었습니다. 상황에 따라 맞는 값을 보내주시면 됩니다.
* user_email : 유저의 이메일
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
    "message": "로그인 성공",
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

2. 로그인 실패
```javascript
{
    "status": 600,
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