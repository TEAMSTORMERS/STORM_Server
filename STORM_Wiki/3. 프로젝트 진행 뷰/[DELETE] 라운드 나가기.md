## [DELETE] 라운드 나가기

<br>
<br>

![나가기](https://user-images.githubusercontent.com/55133871/87724800-04d2e100-c7f7-11ea-96fa-90b5b07ccee8.png)

<br>
<br>

| Method |             URL          | 기능                                     |
| ------ | ------------------------ | ---------------------------------------- |
| DELETE | round/leave/:user_idx/:project_idx/:round_idx | 프로젝트 참여 후 밖으로 나갈 경우 |

<br>
<br>


### Request Query

| key          | 설명                 | 타입 | 비고     |
| ------------ | -------------------- | ---- | -------- |
| :user_idx | 유저 인덱스 | INT  | NOT NULL |
| :project_idx | 해당 프로젝트 인덱스 | INT  | NOT NULL |
| :round_idx | 해당 라운드 인덱스 | INT  | NOT NULL |

<br>
<br>


### Response


<b> < Success >

```json
{
    "status": 200,
    "success": true,
    "message": "라운드 나가기 성공"
}
```

<br>


<b> < Fail >


1. 데이터 누락

```json
{
    "status": 400,
    "success": false,
    "message": "필요한 값이 없습니다"
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