## [GET] 마이페이지

<br>
<br>

![mypage](https://user-images.githubusercontent.com/55133871/90032988-eb3f8f00-dcf9-11ea-9f54-a001d97c3f32.png)

<br>
<br>

| Method |  URL   |                    기능                     |
| :----: | :-----: | :-----------------------------------------: |
|  GET  | /user/mypage/:user_idx | 마이페이지 화면에서 유저 정보 조회하기 |



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




### Request Query

| key       | 설명             | 타입 | 비고     |
| --------- | ---------------- | ---- | -------- |
| :user_idx | 각 유저의 idx 값 | INT  | NOT NULL |

<br>
<br>

### Response

<br>

<b>< Success >

```javascript
{
    "status": 200,
    "success": true,
    "message": "프로필 조회 성공",
    "data": {
        "user_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/15972.PNG",
        "user_name": "이름",
        "user_img_flag": 1
    }
}
```
- user_img: 프로필 이미지
- user_name : 닉네임
- user_img_flag : 이미지 형태 구분을 위한 flag

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

2. 없는 user_idx

```javascript
{
    "status": 400,
    "success": false,
    "message": "존재하지 않는 회원입니다."
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