## [PUT] 프로필 이미지 수정

<br>
<br>

![changeProfile](https://user-images.githubusercontent.com/55133871/90434535-8bd1ec80-e108-11ea-8aff-c29ec88438e3.png)

<br>
<br>

| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
| PUT    | /user/mypage/img | 유저의 프로필 이미지를 수정한다. |

<br>
<br>


### Request Body

```javascript
{
   "user_idx": INT,
   "user_img": FILE,
   "user_img_flag": INT
}
```
* 데이터 타입을 적어두었습니다. 상황에 따라 맞는 값을 보내주시면 됩니다.
* user_idx : 사용자 인덱스
* user_img : (새로운) 유저 이미지
* user_img_flag : 변경된 이미지의 유형에 따라


<br>
<br>

### Response



<b> < Success >

```json
{
    "status": 200,
    "success": true,
    "message": "프로필 이미지 수정 성공"
}
```

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