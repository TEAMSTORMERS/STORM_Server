## [POST] 이메일 중복 확인

<br>
<br>

![checkemail](https://user-images.githubusercontent.com/55133871/91044000-8b2cdf00-e64f-11ea-9cdc-88de214313b2.png)

<br>
<br>

| Method |  URL   |                    기능                     |
| :----: | :-----: | :-----------------------------------------: |
|  POST  | /user/checkemail | 회원가입 전 이메일 중복 체크 |



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
  "user_email": STRING
}
```

* 데이터 타입을 적어두었습니다. 상황에 따라 맞는 값을 보내주시면 됩니다.
* user_email : 유저의 이메일


<br>
<br>

### Response

<br>

<b>< Success >

```javascript
{
    "status": 200,
    "success": true,
    "message": "사용 가능한 이메일입니다."
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