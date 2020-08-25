## [GET] 라운드 참여자 목록 조회

<br>
<br>

![라운드참여자목록](https://user-images.githubusercontent.com/55133871/87724608-b6bddd80-c7f6-11ea-89e6-40b12a4a79bd.png)

<br>
<br>

| Method | URL             | 기능                |
| :----: | :-------------------------: | :--: |
|  GET   | round/memberList/:project_idx/:round_idx | 현재 라운드 참여자 목록 받아오기 |

<br>
<br>


### Request Query

| key          | 설명                 | 타입 | 비고     |
| ------------ | -------------------- | ---- | -------- |
| :project_idx | 해당 프로젝트 인덱스 | INT  | NOT NULL |
| :round_idx | 해당 라운드 인덱스 | INT  | NOT NULL |

<br>
<br>

### Response

<b> < Success >

```javascript
{
    "status": 200,
    "success": true,
    "message": "라운드 참여자 목록 출력 성공",
    "data": [
        {
            "user_idx": 5,
            "user_name": "김성규",
            "user_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/159864724.JPEG",
            "user_host_flag": 1
        },
        {
            "user_idx": 1,
            "user_name": "아요",
            "user_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/1597859.JPEG",
            "user_host_flag": 0
        }
    ]
}

```
- user_idx: 라운드 참여자의 유저 인덱스
- user_name: 라운드 참여자의 이름
- user_img: 라운드 참여자의 프로필 이미지
- user_host_flag : 해당 유저가 호스트인지 여부 (호스트면 1 / 멤버면 0)

<br>

<b>< Fail >

1. 데이터 누락

```javascript
{
  "status": 400,
  "success": false,
  "message": "필요한 값이 없습니다."
}
```

2. DB 오류

```javascript
{
  "status": 600,
  "success": false,
  "message": "DB 오류"
}
```

3. 서버 에러

```javascript
{
  "status": 500,
  "success": false,
  "message": "서버 에러"
}
```

